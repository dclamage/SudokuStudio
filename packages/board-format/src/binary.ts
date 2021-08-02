import { Geometry, Grid, Idx, IdxBitset, IdxMap, schema } from "@sudoku-studio/schema";
import * as LZMA from "./lzma_worker";
import * as Base64 from "base64-js";
import { array2arrayObj, arrayObj2array, cellIdxMax, edgeIdxMax, seriesIdxMax } from "@sudoku-studio/board-utils";

const utf8encoder = new TextEncoder();
const utf8decoder = new TextDecoder();

export class ReaderWriter {
    dataView: DataView;
    offset: number;

    constructor(initialByteLength?: number);
    constructor(arrayBufferView: ArrayBufferView);
    constructor(arg: number | ArrayBufferView = 1024) {
        if ('number' === typeof arg) {
            this.dataView = new DataView(new ArrayBuffer(arg));
        }
        else {
            this.dataView = new DataView(arg.buffer, arg.byteOffset, arg.byteLength);
        }
        this.offset = 0;
    }

    private _alloc(newBytes: number): void {
        if (this.dataView.byteLength < this.offset + newBytes) {
            const arrBuf = new ArrayBuffer(2 * this.dataView.byteLength);
            (new Uint8Array(arrBuf)).set(new Uint8Array(this.dataView.buffer));
            this.dataView = new DataView(arrBuf);
        }
    }

    atEnd(): boolean {
        return this.offset === this.dataView.byteLength;
    }

    readUint8(): number {
        const val = this.dataView.getUint8(this.offset);
        this.offset += 1;
        return val;
    }
    writeUint8(val: number): void {
        this._alloc(1);
        this.dataView.setUint8(this.offset, val);
        this.offset += 1;
    }

    readUint16(): number {
        const val = this.dataView.getUint16(this.offset, false);
        this.offset += 2;
        return val;
    }
    writeUint16(val: number): void {
        this._alloc(2);
        this.dataView.setUint16(this.offset, val, false);
        this.offset += 2;
    }

    readUint32(): number {
        const val = this.dataView.getUint32(this.offset, false);
        this.offset += 4;
        return val;
    }
    writeUint32(val: number): void {
        this._alloc(4);
        this.dataView.setUint32(this.offset, val, false);
        this.offset += 4;
    }

    readLengthPrefixedUtf8String(): string {
        const byteLength = this.readUint32();
        const val = utf8decoder.decode(new Uint8Array(this.dataView.buffer, this.offset, byteLength));
        this.offset += byteLength;
        return val;
    }
    writeLengthPrefixedUtf8String(val: string): void {
        const bytes = utf8encoder.encode(val);
        this.writeUint32(bytes.length);

        this._alloc(bytes.length);
        (new Uint8Array(this.dataView.buffer)).set(bytes, this.offset);
        this.offset += bytes.length;
    }

    asUint8Array(): Uint8Array {
        return new Uint8Array(this.dataView.buffer, 0, this.offset);
    }
}

function hash(str: string): number {
    return (str.match(/.{1,4}/g) || []).reduce((hash, quad) => {
        hash *= 31;
        hash += (quad.charCodeAt(0) || 0) << 18;
        hash += (quad.charCodeAt(1) || 0) << 16;
        hash += (quad.charCodeAt(2) || 0) <<  8;
        hash += (quad.charCodeAt(3) || 0);
        hash |= 0; // Truncate to int32.
        if (hash < 0) hash += 0xFFFFFFFF;
        return hash;
    }, 0);
}

function writeBitset(writer: ReaderWriter, bitset: { [N in number]?: true }, max: number): void {
    const byteLength = Math.ceil(max / 8);
    for (let b = 0; b < byteLength; b++) {
        let byte = 0;
        for (let i = 0; i < 8; i++) {
            if (bitset[(b << 3) + i]) {
                byte |= 1 << i;
            }
        }
        writer.writeUint8(byte);
    }
}
function readBitset(reader: ReaderWriter, bitset: { [N in number]?: true }, max: number): boolean {
    let anySet = false;
    const byteLength = Math.ceil(max / 8);
    for (let b = 0; b < byteLength; b++) {
        let byte = reader.readUint8();
        for (let i = 0; i < 8; i++) {
            if (1 & (byte >> i)) {
                anySet = true;
                bitset[(b << 3) + i] = true;
            }
        }
    }
    return anySet;
}

function color2uint32(hashColor: string): [ number, number, number ] {
    if (hashColor.match(/#[0-9A-Fa-f]{3}/)) {
        const r = parseInt(hashColor.charAt(1), 16);
        const g = parseInt(hashColor.charAt(1), 16);
        const b = parseInt(hashColor.charAt(1), 16);
        return [
            r << 8 + r,
            g << 8 + g,
            b << 8 + b,
        ];
    }
    if (hashColor.match(/#[0-9A-Fa-f]{6}/)) {
        const r = parseInt(hashColor.slice(1, 3), 16);
        const g = parseInt(hashColor.slice(3, 5), 16);
        const b = parseInt(hashColor.slice(5, 7), 16);
        return [ r, g, b ];
    }
    throw Error(`Cannot handle color: ${JSON.stringify(hashColor)}.`);
}
function writeColor(writer: ReaderWriter, hashColor: undefined | null | string): void {
    const colorRgb = hashColor ? color2uint32(hashColor) : [ 0, 0, 0 ];
    writer.writeUint8(colorRgb[0]);
    writer.writeUint8(colorRgb[1]);
    writer.writeUint8(colorRgb[2]);
    writer.writeUint8(0);
}
function readColor(reader: ReaderWriter): string {
    const r = reader.readUint8();
    const g = reader.readUint8();
    const b = reader.readUint8();
    // @ts-ignore
    const _ = reader.readUint8();
    return '#' + [ r, g, b ].map(x => x.toString(16).padStart(2, '0')).join('');
}

function writeLine(writer: ReaderWriter, cells: Idx<Geometry.CELL>[]): void {
    writer.writeUint32(cells.length);
    for (const cellIdx of cells) {
        writer.writeUint8(cellIdx);
    }
}
function readLine(reader: ReaderWriter): Idx<Geometry.CELL>[] {
    const cells: Idx<Geometry.CELL>[] = [];
    const numCells = reader.readUint32();

    for (let _j = 0; _j < numCells; _j++) {
        const cellIdx = reader.readUint8();
        cells.push(cellIdx);
    }
    return cells;
}

type ElementSerde<T extends schema.Element> = {
    type: string,
    currentVersion: number,
    serialize  (writer: ReaderWriter, grid: Grid, value: T['value']): void,
    deserialize(reader: ReaderWriter, grid: Grid, version: number): T['value'],
}

function makeJsonSerde<T extends schema.Element>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, _grid: Grid, value: T['value']): void {
            writer.writeLengthPrefixedUtf8String(JSON.stringify(value));
        },
        deserialize(reader: ReaderWriter, _grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`JsonSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            return JSON.parse(reader.readLengthPrefixedUtf8String());
        },
    } as const;
}

function makeDigitElementSerde<T extends schema.DigitElement>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, grid: Grid, value: T['value']): void {
            const digits: IdxMap<Geometry.CELL, number> = value || {};
            for (let idx = 0; idx < cellIdxMax(grid); idx++) {
                writer.writeUint8(digits[idx] || 0);
            }
        },
        deserialize(reader: ReaderWriter, grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`DigitElementSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            const digits: IdxMap<Geometry.CELL, number> = {};
            for (let idx = 0; idx < cellIdxMax(grid); idx++) {
                const digit = reader.readUint8();
                if (0 !== digit) digits[idx] = digit;
            }
            return digits;
        },
    }
}

function makePencilMarksElementSerde<T extends schema.PencilMarksElement>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, grid: Grid, value: T['value']): void {
            const range = Math.max(grid.width, grid.height);
            const marks: IdxMap<Geometry.CELL, { [N in number]?: true }> = value || {};
            for (let idx = 0; idx < cellIdxMax(grid); idx++) {
                const bitset = marks[idx] || {};
                writeBitset(writer, bitset, range);
            }
        },
        deserialize(reader: ReaderWriter, grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`DigitElementSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            const range = Math.max(grid.width, grid.height);
            const marks: IdxMap<Geometry.CELL, { [N in number]?: true }> = {};
            for (let idx = 0; idx < cellIdxMax(grid); idx++) {
                const bitset = {};
                const anySet = readBitset(reader, bitset, range);
                if (anySet) marks[idx] = bitset;
            }
            return marks;
        },
    }
}

function makeLineElementSerde<T extends schema.LineElement>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, _grid: Grid, value: T['value']): void {
            const lines = Object.values(value || {});
            writer.writeUint32(lines.length);
            for (const line of lines) {
                writeLine(writer, arrayObj2array(line));
            }
        },
        deserialize(reader: ReaderWriter, _grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`LineElementSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            const out: T['value'] = {};
            const numLines = reader.readUint32();
            for (let i = 0; i < numLines; i++) {
                out[i] = array2arrayObj(readLine(reader));
            }
            return out;
        },
    }
}

function makeRegionElementSerde<T extends schema.RegionElement>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, grid: Grid, value: T['value']): void {
            const bitset: IdxBitset<Geometry.CELL> = value || {};
            writeBitset(writer, bitset, cellIdxMax(grid));
        },
        deserialize(reader: ReaderWriter, grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`RegionElementSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            const bitset: IdxBitset<Geometry.CELL> = {};
            readBitset(reader, bitset, cellIdxMax(grid));
            return bitset;
        },
    }
}

function makeEdgeNumberElementSerde<T extends schema.EdgeNumberElement>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, grid: Grid, value: T['value']): void {
            const map: IdxMap<Geometry.EDGE, number | true> = value || {};
            for (let idx = 0; idx < edgeIdxMax(grid); idx++) {
                const v = map[idx];
                writer.writeUint8(null == v ? 0 : true === v ? 0xFF : v);
            }
        },
        deserialize(reader: ReaderWriter, grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`EdgeNumberElementSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            const map: IdxMap<Geometry.EDGE, number | true> = {};
            for (let idx = 0; idx < edgeIdxMax(grid); idx++) {
                const x = reader.readUint8();
                if (0 !== x) map[idx] = 0xFF === x ? true : x;
            }
            return map;
        },
    }
}

function makeSeriesNumberElementSerde<T extends schema.SeriesNumberElement>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, grid: Grid, value: T['value']): void {
            const map: IdxMap<Geometry.SERIES, number | true> = value || {};
            for (let idx = 0; idx < seriesIdxMax(grid); idx++) {
                const v = map[idx];
                writer.writeUint8(null == v ? 0 : true === v ? 0xFF : v);
            }
        },
        deserialize(reader: ReaderWriter, grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`SeriesNumberElementSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            const map: IdxMap<Geometry.SERIES, number | true> = {};
            for (let idx = 0; idx < seriesIdxMax(grid); idx++) {
                const x = reader.readUint8();
                if (0 !== x) map[idx] = 0xFF === x ? true : x;
            }
            return map;
        },
    }
}

function makeBooleanElementSerde<T extends schema.BooleanElement>(type: T['type'], currentVersion: number) {
    return {
        type, currentVersion,
        serialize(writer: ReaderWriter, _grid: Grid, value: T['value']): void {
            writer.writeUint8(value ? 1 : 0);
        },
        deserialize(reader: ReaderWriter, _grid: Grid, version: number): T['value'] {
            if (currentVersion !== version) throw Error(`BooleanElementSerde cannot handle different version: expected ${currentVersion}, received ${version}.`);
            return 0 < reader.readUint8();
        },
    }
}

const GridElementSerde = {
    type: 'grid',
    currentVersion: 1,
    serialize(_writer: ReaderWriter, _grid: Grid, _value: schema.NullElement['value']): void {
    },
    deserialize(_reader: ReaderWriter, _grid: Grid, version: number): schema.NullElement['value'] {
        if (this.currentVersion !== version) throw Error(`GridElementSerde cannot handle different version: expected ${this.currentVersion}, received ${version}.`);
        return null;
    },
} as const;

const ArrowElementSerde = {
    type: 'arrow',
    currentVersion: 1,
    serialize(writer: ReaderWriter, _grid: Grid, value: schema.ArrowElement['value']): void {
        const arrows = Object.values(value || {});
        writer.writeUint32(arrows.length);
        for (const arrow of arrows) {
            writeLine(writer, arrayObj2array(arrow.bulb));
            writeLine(writer, arrayObj2array(arrow.body || {}));
        }
    },
    deserialize(reader: ReaderWriter, _grid: Grid, version: number): schema.ArrowElement['value'] {
        if (this.currentVersion !== version) throw Error(`ArrowElementSerde cannot handle different version: expected ${this.currentVersion}, received ${version}.`);
        const value: schema.ArrowElement['value'] = {};
        const numArrows = reader.readUint32();
        for (let i = 0; i < numArrows; i++) {
            const bulb = array2arrayObj(readLine(reader));
            const body = array2arrayObj(readLine(reader));
            value[i] = { bulb, body };
        }
        return value;
    },
} as const;

const CloneElementSerde = {
    type: 'clone',
    currentVersion: 1,
    serialize(writer: ReaderWriter, _grid: Grid, value: schema.CloneElement['value']): void {
        const cloneValues = Object.values(value || {});
        writer.writeUint32(cloneValues.length);
        for (const cloneValue of cloneValues) {
            writer.writeLengthPrefixedUtf8String(cloneValue.label || '');
            writeColor(writer, cloneValue.color);
            writeLine(writer, arrayObj2array(cloneValue.a || {}));
            writeLine(writer, arrayObj2array(cloneValue.b || {}));
        }
    },
    deserialize(reader: ReaderWriter, _grid: Grid, version: number): schema.CloneElement['value'] {
        if (this.currentVersion !== version) throw Error(`CloneElementSerde cannot handle different version: expected ${this.currentVersion}, received ${version}.`);
        const value: schema.CloneElement['value'] = {};
        const numCloneValues = reader.readUint32();
        for (let i = 0; i < numCloneValues; i++) {
            const label = reader.readLengthPrefixedUtf8String() || undefined;
            const color = readColor(reader);
            const a = array2arrayObj(readLine(reader));
            const b = array2arrayObj(readLine(reader));
            value[i] = { label, color, a, b };
        }
        return value;
    },
} as const;

const KillerElementSerde = {
    type: 'killer',
    currentVersion: 1,
    serialize(writer: ReaderWriter, grid: Grid, value: schema.KillerElement['value']): void {
        const cages = Object.values(value || {});
        writer.writeUint32(cages.length);
        for (const cage of cages) {
            writer.writeUint32(cage.sum || 0);
            writeBitset(writer, cage.cells, cellIdxMax(grid));
        }
    },
    deserialize(reader: ReaderWriter, grid: Grid, version: number): schema.KillerElement['value'] {
        if (this.currentVersion !== version) throw Error(`KillerElementSerde cannot handle different version: expected ${this.currentVersion}, received ${version}.`);
        const cages: schema.KillerElement['value'] = {};
        const numCages = reader.readUint32();
        for (let i = 0; i < numCages; i++) {
            const sum = reader.readUint32() || undefined;
            const cells: IdxBitset<Geometry.CELL> = {};
            readBitset(reader, cells, cellIdxMax(grid));
            cages[i] = { sum, cells };
        }
        return cages;
    },
};

const ELEMENT_SERDES = [
    GridElementSerde,
    makeJsonSerde<schema.BoxElement>('box', 1),

    makeDigitElementSerde<schema.DigitElement>('givens', 1),
    makeDigitElementSerde<schema.DigitElement>('filled', 1),
    makePencilMarksElementSerde<schema.PencilMarksElement>('center', 1),
    makePencilMarksElementSerde<schema.PencilMarksElement>('corner', 1),
    makeJsonSerde<schema.ColorsElement>('colors', 1),

    makeLineElementSerde<schema.LineElement>('thermo', 1),
    makeLineElementSerde<schema.LineElement>('slowThermo', 1),
    makeLineElementSerde<schema.LineElement>('between', 1),
    makeLineElementSerde<schema.LineElement>('palindrome', 1),
    makeLineElementSerde<schema.LineElement>('whisper', 1),
    makeLineElementSerde<schema.LineElement>('renban', 1),
    ArrowElementSerde,

    makeRegionElementSerde<schema.RegionElement>('min', 1),
    makeRegionElementSerde<schema.RegionElement>('max', 1),
    makeRegionElementSerde<schema.RegionElement>('odd', 1),
    makeRegionElementSerde<schema.RegionElement>('even', 1),

    makeJsonSerde<schema.QuadrupleElement>('quadruple', 1),
    CloneElementSerde,
    KillerElementSerde,

    makeEdgeNumberElementSerde<schema.EdgeNumberElement>('difference', 1),
    makeEdgeNumberElementSerde<schema.EdgeNumberElement>('ratio', 1),
    makeEdgeNumberElementSerde<schema.EdgeNumberElement>('xv', 1),

    makeSeriesNumberElementSerde<schema.SeriesNumberElement>('sandwich', 1),
    makeSeriesNumberElementSerde<schema.SeriesNumberElement>('skyscraper', 1),
    makeSeriesNumberElementSerde<schema.SeriesNumberElement>('xsum', 1),
    makeJsonSerde<schema.LittleKillerElement>('littleKiller', 1),

    makeBooleanElementSerde<schema.BooleanElement>('knight', 1),
    makeBooleanElementSerde<schema.BooleanElement>('king', 1),
    makeBooleanElementSerde<schema.BooleanElement>('disjointGroups', 1),
    makeBooleanElementSerde<schema.BooleanElement>('selfTaxicab', 1),

    makeJsonSerde<schema.DiagonalElement>('diagonal', 1),
    makeJsonSerde<schema.ConsecutiveElement>('consecutive', 1),
] as const;

// @ts-ignore
function __assertAreElementSerdes<T extends ElementSerde<any>>(): void {
    __assertAreElementSerdes<(typeof ELEMENT_SERDES)[Extract<keyof typeof ELEMENT_SERDES, number>]>();
};

const MAGIC_SDSK = 0x5344530a; // 'SDS\n'
const MAGIC_META = 0x4D455441; // 'META'

export function writeBuffer(board: schema.Board): Uint8Array {
    const writer = new ReaderWriter();

    writer.writeUint32(MAGIC_SDSK) // MAGIC HEADER
    writer.writeUint32(1);    // VERSION

    const { width, height } = board.grid;
    writer.writeUint8(height);
    writer.writeUint8(width);
    writer.writeUint8(0); // RESERVED
    writer.writeUint8(0); // RESERVED

    writer.writeUint32(0); // RESERVED
    writer.writeUint32(0); // RESERVED
    writer.writeUint32(0); // RESERVED

    for (const element of Object.values(board.elements)) {
        const elementSerde: undefined | ElementSerde<any> = ELEMENT_SERDES.find(serde => element.type === serde.type);
        if (null == elementSerde) {
            throw Error(`Cannot serialize element of type ${JSON.stringify(element.type)}.`);
        }
        else {
            const elemMagic = hash(element.type);
            writer.writeUint32(elemMagic);
            writer.writeUint16(0x0000); // Empty flags.
            writer.writeUint16(element.order);
            writer.writeUint16(elementSerde.currentVersion);
            elementSerde.serialize(writer, board.grid, element.value);
        }
    }

    if (board.meta) {
        writer.writeUint32(MAGIC_META);
        writer.writeLengthPrefixedUtf8String(JSON.stringify(board.meta));
    }

    return writer.asUint8Array();
}

export function readBuffer(bin: ArrayBufferView): schema.Board {
    const board: schema.Board = {
        grid: {
            width: 0,
            height: 0,
        },
        elements: {},
        meta: undefined,
    };

    const reader = new ReaderWriter(bin);
    if (MAGIC_SDSK !== reader.readUint32()) throw Error('Invalid SDSK_MAGIC');
    const version = reader.readUint32();
    if (1 !== version) throw Error(`Unknown version: ${version}.`);

    board.grid.height = reader.readUint8();
    board.grid.width  = reader.readUint8();
    reader.readUint8();
    reader.readUint8();

    reader.readUint32();
    reader.readUint32();
    reader.readUint32();

    let elemIdCounter = 0;
    while (!reader.atEnd()) {
        const elemMagic = reader.readUint32();
        if (MAGIC_META === elemMagic) {
            board.meta = JSON.parse(reader.readLengthPrefixedUtf8String());
            continue;
        }
        const elementSerde: undefined | ElementSerde<any> = ELEMENT_SERDES.find(serde => elemMagic === hash(serde.type));
        if (null == elementSerde) {
            throw Error(`Unknown element with magic 0x${elemMagic.toString(16).padStart(8, '0')} at 0x${(reader.offset - 4).toString(16)}.`);
        }

        // @ts-ignore
        const _flags = reader.readUint16();
        const order = reader.readUint16();
        const version = reader.readUint16();

        board.elements[++elemIdCounter] = {
            type: elementSerde.type,
            order,
            value: elementSerde.deserialize(reader, board.grid, version)
        } as any;
    }

    return board;
}

export async function writeLzmaBase64(board: schema.Board): Promise<string> {
    const buffer = writeBuffer(board);
    const compressed = await new Promise<number[]>((resolve, reject) => LZMA.compress(buffer, 9, (result, error) => error ? reject(error) : resolve(result)))
        .then(arr => Uint8Array.from(arr));
    const b64 = Base64.fromByteArray(compressed);
    return b64;
}

export async function readLzmaBase64(b64: string): Promise<schema.Board> {
    const compressed = Base64.toByteArray(b64);
    const buffer = await new Promise<number[]>((resolve, reject) => LZMA.decompress(compressed, (result, error) => error ? reject(error) : resolve(result)))
        .then(arr => Uint8Array.from(arr));
    const board = readBuffer(buffer);
    return board;
}

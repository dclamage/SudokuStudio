import { StateManager } from '@sudoku-studio/state-manager';

export const MARK_TYPES = [
    'filled', 'corner', 'center', 'colors',
] as const;

export const userState = (window as any).userState = new StateManager();
userState.update({
    select: {},
    cursor: {
        index: null,
        isShown: false,
    },

    tool: '120', // TODO magic numbers.
    prevTool: '120',
    marks: {
        filled: '120', // TODO magic numbers.
        corner: '130',
        center: '140',
        colors: '150',
    },
    history: {},
    historyUndone: {},
});

export const userSelectState = userState.ref('select');
export const userCursorIndexState = userState.ref('cursor', 'index');
export const userCursorIsShownState = userState.ref('cursor', 'isShown');

export const userPrevToolState = userState.ref('prevTool');
export const userToolState = userState.ref('tool');
export const TOOL_INPUT_NAME = 'tool';

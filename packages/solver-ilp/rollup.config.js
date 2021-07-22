import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/solver-ilp.ts',
    output: [
        // {
        //     sourcemap: true,
        //     format: 'es',
        //     dir: 'lib',
        // },
        {
            sourcemap: true,
            format: 'iife',
            name: 'solverIlp',
            file: 'lib/solver-ilp.iife.js',
        }
    ],
    plugins: [
        copy({
            targets: [
                {
                    src: [
                        'external/cryptominisat_web/cryptominisat5_simple.wasm',
                        'external/pblib-wasm/dist/pblib.wasm',
                    ],
                    dest: 'lib',
                },
            ],
        }),
        replace({
            preventAssignment: true,
            // https://linguinecode.com/post/how-to-add-environment-variables-to-your-svelte-js-app
            values: {
                // "Module['ENVIRONMENT']": false,
                ENVIRONMENT_IS_WEB: true,
                ENVIRONMENT_IS_WORKER: false,
                ENVIRONMENT_IS_NODE: false,
                ENVIRONMENT_IS_SHELL: false,
            },
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
        }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
    ],
};

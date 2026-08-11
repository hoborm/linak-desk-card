import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import del from 'rollup-plugin-delete';

const dev = process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/linak-desk-card.ts',
    output: {
      file: 'linak-desk-card.js',
      format: 'es',
    },
    plugins: [
      del({ targets: 'linak-desk-card.js' }),
      nodeResolve({}),
      typescript(),
      json(),
      image(),
      alias({
        entries: [
          {
            find: 'lit-html/lib/shady-render.js',
            replacement: 'node_modules/lit-html/lit-html.js',
          },
        ],
      }),
      terser({ output: { comments: false } }),
      dev &&
        serve({
          contentBase: ['./'],
          host: '0.0.0.0',
          port: 5000,
          allowCrossOrigin: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }),
    ],
  },
];

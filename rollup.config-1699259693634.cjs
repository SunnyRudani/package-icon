'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var babel = require('@rollup/plugin-babel');
var peerDepsExternal = require('rollup-plugin-peer-deps-external');
var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');
var postcss = require('rollup-plugin-postcss');
var jsx = require('acorn-jsx');
var dts = require('rollup-plugin-dts');

const packageJson = require("./package.json");

// eslint-disable-next-line import/no-anonymous-default-export
var rollup_config = [
  {
  input: packageJson.source,
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  acornInjectPlugins: [jsx()],
  files: [
    "dist"
  ],
  plugins: [
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        extensions: [".js", ".ts", ".jsx", ".tsx"],
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json"}),
    postcss(),
  ],
  external: ["react", "react-dom"],
},
{
  input: "build/types/index.d.ts",
  output: [{ file: "build/index.d.ts", format: "esm" }],
  plugins: [dts.default()],
  external: [/\.scss$/],
},
];

exports.default = rollup_config;

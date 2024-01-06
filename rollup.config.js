import babel from '@rollup/plugin-babel';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import jsx from 'acorn-jsx';
import dts  from "rollup-plugin-dts";

const packageJson = require("./package.json");

// eslint-disable-next-line import/no-anonymous-default-export
export default [
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
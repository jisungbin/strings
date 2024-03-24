import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import html from "@rollup/plugin-html"
import svelte from "rollup-plugin-svelte"
import {terser} from "rollup-plugin-terser"
import svg from "rollup-plugin-svg"
import postcss from "rollup-plugin-postcss"
import cssnano from "cssnano"

const production = !process.env.ROLLUP_WATCH

// noinspection JSValidateTypes
/** @type {import('rollup').RollupOptions} */
const uiConfig = {
  input: 'src/main.ts',
  output: {
    name: 'ui',
    format: 'iife',
    file: 'dist/bundle.js',
  },
  plugins: [
    typescript(),
    svelte({
      compilerOptions: {
        dev: !production,
      },
    }),
    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte'],
      dedupe: (importee) => importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    svg(),
    postcss({
      extensions: ['.css'],
      plugins: [cssnano()],
    }),
    html({
      fileName: 'ui.html',
      template({bundle}) {
        return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>strings</title>
  </head>
  <body>
    <script>${bundle['bundle.js'].code}</script>
  </body>
</html>
        `
      },
    }),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}

/** @type {import('rollup').RollupOptions} */
const codeConfig = {
  input: 'src/strings.ts',
  output: {
    format: 'cjs',
    file: 'dist/strings.js',
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte'],
    }),
    production && terser(),
  ],
}

// noinspection JSUnusedGlobalSymbols
export default [uiConfig, codeConfig]
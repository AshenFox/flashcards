import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import del from "rollup-plugin-delete";
import multiInput from "rollup-plugin-multi-input";
import tscAlias from "rollup-plugin-tsc-alias";

const watch = process.env.ROLLUP_WATCH;
const isDev = !!watch;

const config = defineConfig({
  input: "src/**/*.{ts,js}",
  output: {
    dir: ".build",
    format: "cjs",
    sourcemap: true,
  },
  cache: isDev,

  plugins: [
    del({ targets: ".build", runOnce: true }),
    {
      ...multiInput(),
      buildStart: null,
    },
    typescript({
      tsconfig: "tsconfig.json",
      sourceMap: isDev,
      declaration: isDev,
      declarationMap: isDev,
    }),
    tscAlias(),

    !isDev && terser(),
  ],

  onwarn: (warning, warn) => {
    if (warning.code === "EMPTY_BUNDLE") return;
    if (warning.code === "UNRESOLVED_IMPORT") return;
    warn(warning);
  },
});

export default config;

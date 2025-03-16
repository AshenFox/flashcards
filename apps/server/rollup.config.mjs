import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import multiInput from "rollup-plugin-multi-input";
import tscAlias from "rollup-plugin-tsc-alias";

const isDev = process.env.NODE_ENV === "development";

const config = defineConfig({
  input: "src/**/*.{ts,js}",
  output: {
    dir: ".build",
    format: "cjs",
    sourcemap: true,
  },
  cache: isDev,

  plugins: [
    {
      ...multiInput(),
      buildStart: null,
    },
    typescript({
      tsconfig: "tsconfig.json",
      sourceMap: true,
      declaration: true,
      declarationMap: true,
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

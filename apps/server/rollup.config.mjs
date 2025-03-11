import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { spawn } from "child_process";
import { defineConfig } from "rollup";
import del from "rollup-plugin-delete";
import multiInput from "rollup-plugin-multi-input";
import tscAlias from "rollup-plugin-tsc-alias";

const watch = process.env.ROLLUP_WATCH;
const isDev = !!watch;

const runAfterBundle = command => {
  let childProcess = null;
  return {
    name: "run-after-bundle",
    writeBundle() {
      if (childProcess) childProcess.kill();
      childProcess = spawn(command, {
        stdio: "inherit",
        shell: true,
      });
    },
  };
};

const config = defineConfig({
  input: "src/**/*.{ts,js}",
  output: {
    dir: ".build",
    format: "cjs",
    sourcemap: true,
  },
  cache: isDev,

  plugins: [
    del({ targets: ".build", runOnce: true, force: true }),
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

    isDev && runAfterBundle("node ./.build/index.js"),
    !isDev && terser(),
  ],

  onwarn: (warning, warn) => {
    if (warning.code === "EMPTY_BUNDLE") return;
    if (warning.code === "UNRESOLVED_IMPORT") return;
    warn(warning);
  },
});

export default config;

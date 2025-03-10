import { defineConfig } from "tsup";

export default defineConfig(options => ({
  entry: ["src/**/*"],
  outDir: ".build",
  format: ["cjs"],
  target: "es2016",
  sourcemap: "inline",
  minify: !options.watch,
  dts: options.watch
    ? {
        compilerOptions: {
          composite: false,
        },
      }
    : false,
  clean: true,
  esbuildOptions: options => ({ ...options, allowJs: true }),
  tsconfig: "tsconfig.json",
  // silent: true,
}));

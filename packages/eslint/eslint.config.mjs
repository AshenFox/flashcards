import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules/**"],
  },
];

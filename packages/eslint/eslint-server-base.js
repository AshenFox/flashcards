import baseConfig from "./eslint-base.js";

export default [
  ...baseConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
];

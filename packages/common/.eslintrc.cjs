const js = require("@eslint/js");

module.exports = {
  extends: [require.resolve("../../.eslintrc.cjs")],
  rules: {
    ...js.configs.recommended.rules,
    "no-undef": "off",
    "no-unused-vars": "off",
  },
};

const js = require("@eslint/js");

module.exports = {
  extends: [require.resolve("@flashcards/eslint/eslint-base")],
  rules: {
    ...js.configs.recommended.rules,
    "no-undef": "off",
    "no-unused-vars": "off",
  },
};

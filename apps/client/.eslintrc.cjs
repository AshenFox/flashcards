module.exports = {
  extends: [
    "next/core-web-vitals",
    require.resolve("@flashcards/eslint/eslint-base"),
  ],
  settings: {
    next: {
      rootDir: "apps/client/",
    },
  },
  rules: {
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": ["error", __dirname],
  },
};

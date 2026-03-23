import path from "node:path";
import { fileURLToPath } from "node:url";

import { baseConfig } from "@flashcards/eslint";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = [
  {
    ignores: [
      ".build/**",
      ".next/**",
      "node_modules/**",
      "dist/**",
      "coverage/**",
    ],
  },
  ...nextCoreWebVitals,
  ...baseConfig,
  {
    settings: {
      next: {
        rootDir: "apps/client/",
      },
    },
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": ["error", __dirname],
    },
  },
];

export default config;

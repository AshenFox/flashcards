import { serverConfig } from "@flashcards/eslint";

export default [
  {
    ignores: [".build/**", "node_modules/**", "dist/**", "coverage/**"],
  },
  ...serverConfig,
];

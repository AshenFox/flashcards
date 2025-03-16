import path from "path";

const configDir = path.dirname(require.resolve("@flashcards/config"));
process.env.NODE_CONFIG_DIR = configDir;

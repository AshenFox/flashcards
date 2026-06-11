import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, "../../packages/config/.env"),
});

const nextConfig = {
  // for the love of god don't forget to have the distDir point to an actual folder unless you want to erase a lot of your files
  distDir: "./.build",
  transpilePackages: ["@flashcards/common"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

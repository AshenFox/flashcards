import { loadClientEnv } from "@flashcards/config/load-env";

loadClientEnv();

const nextConfig = {
  // for the love of god don't forget to have the distDir point to an actual folder unless you want to erase a lot of your files
  distDir: "./.build",
  transpilePackages: ["@flashcards/common"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

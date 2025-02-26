module.exports = {
  // for the love of god don't forget to have the distDir point to an actual folder
  distDir: "../../.next",
  transpilePackages: ["@flashcards/common"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = {
  // for the love of god don't forget to have the distDir point to an actual folder
  distDir: "../.client",
  transpilePackages: ["@flashcards/common", "@flashcards/config"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

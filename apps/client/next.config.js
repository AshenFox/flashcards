const nextConfig = {
  // for the love of god don't forget to have the distDir point to an actual folder
  distDir: "./.build",
  transpilePackages: ["@flashcards/common", "@flashcards/config"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

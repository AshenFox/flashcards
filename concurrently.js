import concurrently from "concurrently";

const commands = [
  {
    command: "npm run buildDev -w @flashcards/common",
    name: "Common",
    prefixColor: "blue",
  },
  {
    command: "npm run buildDev -w @flashcards/server",
    name: "Server",
    prefixColor: "green",
  },
  {
    command: "nodemon --config nodemon.json",
    name: "Dev",
    prefixColor: "yellow",
  },
];

(async () => {
  try {
    await concurrently(commands, {
      killOthers: ["failure"],
      restartTries: 3,
      prefix: "[{name}]",
    }).result;

    console.log("All processes completed successfully");
  } catch (error) {
    console.error("One or more processes failed", error);
  }
})();

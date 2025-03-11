import concurrently from "concurrently";

const commands = [
  {
    command: "npm run dev -w @flashcards/common",
    name: "Common",
    prefixColor: "red",
  },
  {
    command: "npm run dev -w @flashcards/server",
    name: "Server",
    prefixColor: "green",
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

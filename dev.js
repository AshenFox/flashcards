import { exec } from "child_process";
import concurrently from "concurrently";
import { config } from "dotenv";
import util from "util";

config({ path: ".env" });
console.log({ NODE_ENV: process.env.NODE_ENV });

const execPromise = util.promisify(exec);

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
    await execPromise("npm run cleanBuild").then(({ stdout, stderr }) => {
      console.log(stdout);
      console.error(stderr);
    });

    await execPromise("npm run build -w @flashcards/common").then(
      ({ stdout, stderr }) => {
        console.log(stdout);
        console.error(stderr);
      },
    );
    await execPromise("npm run build -w @flashcards/server").then(
      ({ stdout, stderr }) => {
        console.log(stdout);
        console.error(stderr);
      },
    );

    await concurrently(commands, {
      killOthers: ["failure"],
      restartTries: 3,
      prefix: "[{name}]",
    }).result;

    console.log("All processes closed successfully");
  } catch (error) {
    console.error("One or more processes failed", error);
  }
})();

import path from "path";
import util from "util";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { spawn, exec, fork } from "child_process";
import nodemon from "nodemon";

config({ path: ".env" });
console.log({ NODE_ENV: process.env.NODE_ENV });

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rollupOrder = [
  {
    name: "Common",
    color: "blue",
    packagePath: "packages/common",
  },
  {
    name: "Server",
    color: "green",
    packagePath: "apps/server",
  },
];

/* const commands = [
  {
    command: "npx nodemon --config nodemon.json",
    name: "Client",
    prefixColor: "yellow",
  },
]; */

// Function containing the logic for the child process
function childLogic() {
  const PACKAGE_PATH = process.env.PACKAGE_PATH;
  const NAME = process.env.NAME;
  const COLOR = process.env.COLOR;

  const chalk = require("chalk");
  const path = require("path");
  const { loadConfigFile } = require("rollup/loadConfigFile");
  const { watch } = require("rollup");

  const prefix = message => chalk[COLOR](`[${NAME}]`) + " " + message;

  const configPath = path.resolve(__dirname, "rollup.config.mjs");

  loadConfigFile(configPath).then(config => {
    for (const options of config.options) {
      const watcher = watch(options);

      watcher.on("event", event => {
        switch (event.code) {
          case "START":
            console.log(prefix(`▶  Starting build for ${NAME}`));
            process.send?.("START");
            break;
          case "BUNDLE_END":
            event.result.close();
            console.log(prefix(`Bundled ${NAME} in ${event.duration}ms`));
            process.send?.("BUNDLE_END");
            break;
          case "END":
            console.log(prefix(`✔  Build complete for ${NAME}`));
            process.send?.("END");
            break;
          case "ERROR":
            console.error(prefix(`❌ Error building ${NAME}`), event.error);
            process.send?.("ERROR");
            break;
        }
      });
    }
  });

  process.on("exit", (code, signal) => {
    console.log(`child exited (${code || signal})`);
    process.send?.("EXIT");
  });
}

// Convert the function to a string for execution in a child process
const childLogicString = `(${childLogic.toString()})();`;

// Function to spawn a child process for each package
async function spawnChildProcess(data) {
  const { packagePath, color, name } = data;
  const pkgDir = path.resolve(__dirname, packagePath);

  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["-e", childLogicString], {
      cwd: pkgDir,
      stdio: ["inherit", "inherit", "inherit", "ipc"],
      env: {
        ...process.env,
        COLOR: color,
        PACKAGE_PATH: packagePath,
        NAME: name,
      },
    });

    child.on("message", message => {
      // console.log("CHILD message", message);

      switch (message) {
        case "ERROR":
          reject();
          break;
        case "END":
          resolve();
          break;
      }
    });
  });
}

(async () => {
  await execPromise("npm run cleanBuild").then(({ stdout, stderr }) => {
    console.log(stdout);
    console.error(stderr);
  });

  // Kick off child processes for each package
  for await (const data of rollupOrder) {
    await spawnChildProcess(data);
  }

  console.log("🎉 All initial builds complete — launching dev server…\n");

  // Use nodemon API to start the server
  nodemon({
    script: "nodemon.json",
    exec: "npm run dev -w @flashcards/server",
    watch: ["./apps/server/.build", "./packages/common/.build"],
    ext: "*",
    delay: "1000",
    stdout: "inherit",
    legacyWatch: true,
  });

  nodemon
    .on("start", function () {
      console.log("Nodemon has started");
    })
    .on("quit", function () {
      console.log("Nodemon has quit");
      process.exit();
    })
    .on("restart", function (files) {
      console.log("Nodemon restarted due to: ", files);
    })
    .on("log", function (log) {
      console.log(log.colour);
    });

  /* await execPromise("npx nodemon --config nodemon.json").then(
    ({ stdout, stderr }) => {
      console.log(stdout);
      console.error(stderr);
    },
  ); */

  /* await concurrently(commands, {
    killOthers: ["failure"],
    restartTries: 3,
    prefix: "[{name}]",
  }).result; */
})();

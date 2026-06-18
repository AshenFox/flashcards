import path from "path";
import util from "util";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { spawn, exec } from "child_process";
import nodemon from "nodemon";

config({ path: ".env" });
console.log({ NODE_ENV: process.env.NODE_ENV });

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rollupOrder = [
  {
    name: "Common build",
    color: "blue",
    packagePath: "packages/common",
  },
  {
    name: "Server build",
    color: "green",
    packagePath: "apps/server",
  },
];

// Function containing the logic for the child process
function childLogic() {
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
            console.log(
              prefix(`${chalk.yellow("▶")}  Starting build for ${NAME}`),
            );
            process.send?.("START");
            break;
          case "BUNDLE_END":
            event.result.close();
            console.log(prefix(`Bundled ${NAME} in ${event.duration}ms`));
            process.send?.("BUNDLE_END");
            break;
          case "END":
            console.log(
              prefix(`${chalk.green("✔")}  Build complete for ${NAME}`),
            );
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
        NAME: name,
      },
    });

    child.on("message", message => {
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
  // Start the local MongoDB container (detached) before anything else, so it
  // has time to boot while the builds run. `npm run db` is the single source of
  // truth for the compose file/flags. Left running on exit — use `npm run
  // db-stop` to tear it down.
  console.log("🐳 Starting MongoDB container…");
  try {
    const { stdout, stderr } = await execPromise("npm run db");
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (err) {
    // Don't abort the whole dev session (builds, watchers, client work) just
    // because the DB couldn't start — most often Docker Desktop isn't running.
    console.error(
      "⚠️  Could not start the MongoDB container (is Docker running?). " +
        "Continuing without it — the server won't be able to connect until " +
        "you start it with `npm run db`.",
    );
    if (err.stderr) console.error(err.stderr);
  }

  await execPromise("npm run cleanBuild").then(({ stdout, stderr }) => {
    console.log(stdout);
    console.error(stderr);
  });

  // Kick off child processes for each package
  for await (const data of rollupOrder) {
    await spawnChildProcess(data);
  }

  console.log("✨ All initial builds complete — launching dev server…\n");

  // Use nodemon API to start the server
  const appMonitor = nodemon({
    script: "nodemon.json",
    exec: "npm run dev -w @flashcards/server",
    watch: ["./apps/server/.build", "./packages/common/.build"],
    ext: "*",
    delay: "1000",
    legacyWatch: true,
  });

  appMonitor.on("log", function (log) {
    console.log(log.colour);
  });
})();

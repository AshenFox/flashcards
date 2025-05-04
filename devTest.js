import { watch } from "rollup";
import { loadConfigFile } from "rollup/loadConfigFile";
import path from "path";
import { exec } from "child_process";
import util from "util";
import { fileURLToPath } from "url";
import chalk from "chalk";
import concurrently from "concurrently";

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rollupOrder = [
  {
    name: "Common build",
    color: chalk.blue,
    packagePath: "packages/common",
    config: undefined,
    watchers: [],
  },
  /* {
    name: "Server build",
    color: chalk.green,
    packagePath: "apps/server",
    config: undefined,
    watchers: [],
  }, */
];

const commands = [
  {
    command: "npx nodemon --config nodemon.json",
    name: "Client",
    prefixColor: "yellow",
  },
];

const deployBundleWatcher = async data => {
  const { packagePath, color, name } = data;

  const configPath = path.resolve(__dirname, packagePath, "rollup.config.mjs");
  // process.chdir(path.resolve(__dirname, packagePath));

  const config = await loadConfigFile(configPath, {
    format: "es",
  });

  data.config = config;

  for await (const options of config.options) {
    const watcher = watch(options);

    const watcherPromise = new Promise((resolve, reject) => {
      watcher.on("event", event => {
        switch (event.code) {
          case "START":
            console.log(
              `▶  Starting build for ${path.basename(config.name ?? "")}`,
            );
            break;
          case "BUNDLE_END":
            event.result.close();
            console.log(
              `✔  Bundled ${path.basename(config.name ?? "")} in ${event.duration}ms`,
            );

            break;
          case "END":
            // first successful bundle
            resolve();
            break;
          case "ERROR":
            console.error(
              `❌ Error building ${path.basename(config.name ?? "")}`,
              event.error,
            );
            reject();
            // process.exit(1);
            break;
        }
      });
    });

    data.watchers.push(watcher);

    await watcherPromise;
  }
};

(async () => {
  await execPromise("npm run cleanBuild").then(({ stdout, stderr }) => {
    console.log(stdout);
    console.error(stderr);
  });

  console.log(rollupOrder);

  // Kick off watchers for each package
  for await (const data of rollupOrder) {
    await deployBundleWatcher(data);
  }

  console.log("🎉 All initial builds complete — launching dev server…\n");

  // now start your nodemon (or whatever) …
  /* const server = spawn("nodemon", ["--config", "nodemon.json"], {
    stdio: "inherit",
  });
  server.on("exit", code => process.exit(code)); */

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

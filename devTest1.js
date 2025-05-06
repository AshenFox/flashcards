import path from "path";
import util from "util";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { spawn, exec } from "child_process";
import chokidar from "chokidar";
import chalk from "chalk";

config({ path: ".env" });
console.log({ NODE_ENV: process.env.NODE_ENV });

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rollupOrder = [
  { name: "Common build", color: "blue", packagePath: "packages/common" },
  { name: "Server build", color: "green", packagePath: "apps/server" },
];

// --- childLogic and spawnChildProcess unchanged from your version ---
function childLogic() {
  const NAME = process.env.NAME;
  const COLOR = process.env.COLOR;
  const chalk = require("chalk");
  const path = require("path");
  const { loadConfigFile } = require("rollup/loadConfigFile");
  const { watch } = require("rollup");

  const prefix = msg => chalk[COLOR](`[${NAME}]`) + " " + msg;
  const configPath = path.resolve(__dirname, "rollup.config.mjs");

  loadConfigFile(configPath).then(config => {
    for (const options of config.options) {
      const watcher = watch(options);
      watcher.on("event", event => {
        switch (event.code) {
          case "START":
            console.log(prefix(`▶ Starting build for ${NAME}`));
            process.send?.("START");
            break;
          case "BUNDLE_END":
            event.result.close();
            console.log(prefix(`Bundled ${NAME} in ${event.duration}ms`));
            process.send?.("BUNDLE_END");
            break;
          case "END":
            console.log(prefix(`✔ Build complete for ${NAME}`));
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
    console.log(`child exited (${code ?? signal})`);
    process.send?.("EXIT");
  });
}

const childLogicString = `(${childLogic.toString()})();`;

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

    data.child = child;
    child.on("message", msg => {
      if (msg === "ERROR") reject();
      if (msg === "END") resolve();
    });
  });
}

// --- main bootstrap ---
(async () => {
  // 1) Clean & initial Rollup builds
  await execPromise("npm run cleanBuild").then(({ stdout, stderr }) => {
    console.log(stdout);
    console.error(stderr);
  });

  for await (const data of rollupOrder) {
    await spawnChildProcess(data);
  }

  console.log("🎉 All initial builds complete — launching dev server…\n");

  const prefix = msg => chalk.yellow(`[App]`) + " " + msg;

  // 2) Spawn your dev server
  let serverProc = spawn("npm", ["run", "dev", "-w", "@flashcards/server"], {
    stdio: ["pipe", "pipe", "pipe"],
    shell: true,
  });

  // pipe logs
  serverProc.stdout.on("data", d =>
    prefix(`stdout: ${d}`)
      .split("\n")
      .forEach(l => l && console.log(l)),
  );
  serverProc.stdout.on("", d =>
    prefix(`stdout: ${d}`)
      .split("\n")
      .forEach(l => l && console.log(l)),
  );
  serverProc.stderr.on("data", d =>
    prefix(`stderr: ${d}`)
      .split("\n")
      .forEach(l => l && console.error(l)),
  );

  // 3) Watch for rebuilds and restart server
  const watcher = chokidar.watch(
    ["./apps/server/.build", "./packages/common/.build"],
    {
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 1000 },
    },
  );

  const restart = () => {
    prefix("Changes detected, restarting server…");
    if (!serverProc.killed) serverProc.kill("SIGINT");
    /* serverProc = spawn("npm", ["run", "dev", "-w", "@flashcards/server"], {
      stdio: ["pipe", "pipe", "pipe"],
      shell: true,
    });
    serverProc.stdout.on("data", d =>
      prefix(`stdout: ${d}`)
        .split("\n")
        .forEach(l => l && console.log(l)),
    );
    serverProc.stderr.on("data", d =>
      prefix(`stderr: ${d}`)
        .split("\n")
        .forEach(l => l && console.error(l)),
    ); */
  };

  watcher.on("all", (_event, file) => {
    prefix(`File changed: ${file}`);
    restart();
  });
})();

import fs from "fs";
import { consoleCommand } from "./utils/console-command.js";
import { clientDirectory } from "../utils/directories.js";

const main = async () => {
  console.log("Start: build client");
  if (shouldInstallClientNodeModules()) {
    console.log("Installing node modules");
    await installClientNodeModules();
    console.log("Installed node modules");
  }

  await buildClient();
  console.log("End: build client");
};

const shouldInstallClientNodeModules = () =>
  !fs.existsSync(`${clientDirectory}/node_modules`);

const installClientNodeModules = async () =>
  consoleCommand(`
  cd client;
  npm install
`);

const buildClient = async () =>
  consoleCommand(`
  cd client;
  npm run build;
`).then((stdout) => console.log(stdout));

main();

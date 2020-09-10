import { consoleCommand } from "./utils/console-command.js";

const main = () =>
  consoleCommand(`
    cd client;
    npm run build;
  `).then((stdout) => console.log(stdout));

main();

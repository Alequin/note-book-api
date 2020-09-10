import { exec } from "child_process";

export const consoleCommand = async (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, _stderr) =>
      error ? reject(error) : resolve(stdout),
    );
  });

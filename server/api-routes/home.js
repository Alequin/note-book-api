import { clientDirectory } from "../utils/directories.js";

export const home = (_req, res) => {
  res.sendFile(`${clientDirectory}/index.html`);
};

import { clientDirectory } from "../utils/directories.js";

export const getReactApp = (_req, res) => {
  res.sendFile(`${clientDirectory}/index.html`);
};

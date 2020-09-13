import express from "express";
import { CURRENT_ENVIRONMENT } from "./config/environments.js";
import { PORT } from "./config/port.js";
import { clientDirectory } from "../utils/directories.js";

const CLIENT_BUILD_DIRECTORY = `${clientDirectory}/build`;
const app = express();

app.get("/_health", (_req, res) => {
  res.send(`
    Running: true,
    Environment: ${CURRENT_ENVIRONMENT}
    `);
});

app.use(express.static(`${CLIENT_BUILD_DIRECTORY}`));

app.get("/", (_req, res) => {
  res.sendFile(`${CLIENT_BUILD_DIRECTORY}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

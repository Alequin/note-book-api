import express from "express";
import { CURRENT_ENVIRONMENT } from "./config/environments.js";
import { PORT } from "./config/port.js";
import { rootDirectory } from "../root-directory.js";

const CLIENT_BUILD_DIRECTORY = `${rootDirectory}/client/build`;
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

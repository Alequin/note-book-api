import express from "express";
import { CURRENT_ENVIRONMENT } from "./config/environments.js";
import { PORT } from "./config/port.js";
import { clientDirectory } from "./utils/directories.js";

const app = express();

app.get("/_health", (_req, res) => {
  res.send(`
    Running: true,
    Environment: ${CURRENT_ENVIRONMENT}
    `);
});

app.use(express.static(`${clientDirectory}`));

app.get("/", (_req, res) => {
  res.sendFile(`${clientDirectory}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

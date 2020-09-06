import express from "express";
import { CURRENT_ENVIRONMENT } from "./config/environments.js";
import { PORT } from "./config/port.js";

const app = express();

app.get("/_health", (_req, res) => {
  res.send(`
    Running: true,
    Environment: ${CURRENT_ENVIRONMENT}
    `);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

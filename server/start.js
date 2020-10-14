import express from "express";
import { PORT } from "./config/port.js";
import { clientDirectory } from "./utils/directories.js";

import { apiRoutes, home, health } from "./api-routes";

const app = express();

app.use(express.static(`${clientDirectory}`));

app.get(apiRoutes.home, home);
app.get(apiRoutes.health, health);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

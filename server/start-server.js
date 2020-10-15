// Import resolves error "ReferenceError: regeneratorRuntime is not defined". See https://github.com/babel/babel/issues/9849#issuecomment-487040428
import regeneratorRuntime from "regenerator-runtime";

import express from "express";
import { PORT } from "./config/port.js";
import { clientDirectory } from "./utils/directories.js";

import { apiRoutes, home, health, storeFlashCard } from "./api-routes";

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${clientDirectory}`));

app.get(apiRoutes.home, home);
app.get(apiRoutes.health, health);
app.post(apiRoutes.storeFlashCard, storeFlashCard);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

export default app;
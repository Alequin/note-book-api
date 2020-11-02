import express from "express";
import { PORT } from "./config/port.js";
import { clientDirectory } from "./utils/directories.js";

import {
  apiRoutes,
  getReactApp,
  health,
  getFlashCard,
  getFlashCards,
  storeFlashCard,
  deleteFlashCard,
} from "./api-routes";
import { isProductionEnv } from "./config/environments.js";

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${clientDirectory}`));

app.get(apiRoutes.health, health);

app.get(apiRoutes.getFlashCard, getFlashCard);
app.get(apiRoutes.getFlashCards, getFlashCards);

const shouldEnableFlashCardEditing = !isProductionEnv();
if (shouldEnableFlashCardEditing) {
  app.post(apiRoutes.storeFlashCard, storeFlashCard);
  app.delete(apiRoutes.deleteFlashCard, deleteFlashCard);
}

// Catch all routes so react routes can also be used
app.get("*", getReactApp);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

export default app;

import { newScript } from "../new-script";
import { createFlashCardTempFiles } from "./create-flash-card-temp-files";

newScript({
  name: "create-flash-card-temp-files",
  expectedArgs: ["flashCardName"],
  script: createFlashCardTempFiles,
});

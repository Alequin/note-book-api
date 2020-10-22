import fs from "fs";
import { kebabCase } from "lodash";

import { NEW_FLASH_CARD_DIR } from "./new-flash-card-dir";

export const createFlashCardTempFiles = ({ flashCardName }) => {
  const exisitingTempFiles = fs.readdirSync(NEW_FLASH_CARD_DIR);

  ["question.md", "answer.md", "tags.json"].forEach((cardType) => {
    const newFileName = `${kebabCase(flashCardName)}.${cardType}`;
    if (exisitingTempFiles.some((fileName) => newFileName === fileName)) {
      throw new Error("flash card temp file already exists");
    }
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/${newFileName}`,
      newFileName.endsWith("md") ? `# ${cardType}` : JSON.stringify([]),
    );
  });
};

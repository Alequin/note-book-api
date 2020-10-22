import fs from "fs";
import { groupBy } from "lodash";

import DataURI from "datauri";
import marked from "marked";
import { NEW_FLASH_CARD_DIR } from "./new-flash-card-dir";
import { databaseCommands } from "../database/commands";

export const insertFlashCards = async () => {
  const flashCardTempFiles = fs
    .readdirSync(NEW_FLASH_CARD_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith("tags.json"));

  const cardsByName = groupBy(flashCardTempFiles, (fileName) => {
    const [commonName] = fileName.match(/[^\.]*/);
    return commonName;
  });

  for (const flashCardFiles of Object.values(cardsByName)) {
    const questionMarkdown = question(flashCardFiles);
    const answerMarkdown = answer(flashCardFiles);

    await databaseCommands.insertFlashCard({
      questionHtml: marked(await swapImagePathsForDataUris(questionMarkdown)),
      answerHtml: marked(await swapImagePathsForDataUris(answerMarkdown)),
      tags: tags(flashCardFiles),
    });

    deleteFiles(flashCardFiles);
  }
};

const question = (files) => {
  const questionFile = files.find((file) => file.includes("question"));
  return fs.readFileSync(prependFlashCardDir(questionFile)).toString();
};

const answer = (files) => {
  const answerFile = files.find((file) => file.includes("answer"));
  return fs.readFileSync(prependFlashCardDir(answerFile)).toString();
};

const tags = (files) => {
  const tagsFile = files.find((file) => file.includes("tags.json"));
  return JSON.parse(fs.readFileSync(prependFlashCardDir(tagsFile)).toString());
};

const swapImagePathsForDataUris = async (markdown) => {
  const markdownImages = markdown.match(/!\[.*\]\(.*\)/g) || [];

  return (
    await Promise.all(
      markdownImages.map(async (markdownImage) => {
        const [_, imagePath] = markdownImage.match(/\((.+)\)/);
        return {
          originalImage: markdownImage,
          imageWithUri: markdownImage.replace(
            imagePath,
            `${await DataURI(prependFlashCardDir(imagePath))}`,
          ),
        };
      }),
    )
  ).reduce(
    (updatedMarkdown, { originalImage, imageWithUri }) =>
      updatedMarkdown.replace(originalImage, imageWithUri),
    markdown,
  );
};

const deleteFiles = (files) =>
  files.forEach((file) => fs.unlinkSync(prependFlashCardDir(file)));

const prependFlashCardDir = (file) => `${NEW_FLASH_CARD_DIR}/${file}`;

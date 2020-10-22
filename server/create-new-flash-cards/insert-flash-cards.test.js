import fs from "fs";
import { databaseCommands } from "../database/commands";
import { resetTestDatabaseAfterEach } from "../database/reset-test-database-after-each";

jest.mock("./new-flash-card-dir", () => {
  const { uuid } = require("uuidv4");
  return {
    NEW_FLASH_CARD_DIR: `./mock-temp-flash-card-dir-${uuid()}`,
  };
});

jest.mock("datauri");
import DataURI from "datauri";

import { NEW_FLASH_CARD_DIR } from "./new-flash-card-dir";

import { insertFlashCards } from "./insert-flash-cards";

describe("insert-flash-cards", () => {
  resetTestDatabaseAfterEach();

  beforeAll(() => {
    fs.mkdirSync(NEW_FLASH_CARD_DIR);
    DataURI.mockImplementation(async () => "pretend-data-uri");
  });

  afterEach(() =>
    fs
      .readdirSync(NEW_FLASH_CARD_DIR)
      .map((fileName) => `${NEW_FLASH_CARD_DIR}/${fileName}`)
      .forEach((filePath) => fs.unlinkSync(filePath)),
  );

  afterAll(() => fs.rmdirSync(NEW_FLASH_CARD_DIR));

  it("Uses flash card temp files to create new flash cards in the database", async () => {
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.question.md`,
      "How does this thing work?",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.answer.md`,
      "Magic!!",
    );
    const expectedTags = ["tag1", "tag2", "tag3"];
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.tags.json`,
      JSON.stringify(expectedTags),
    );

    await insertFlashCards();

    const storedFlashCards = await databaseCommands.readFlashCards();
    expect(storedFlashCards).toHaveLength(1);
    expect(storedFlashCards).toEqual([
      {
        id: 1,
        question_html: "<p>How does this thing work?</p>\n",
        answer_html: "<p>Magic!!</p>\n",
        tags: expectedTags,
      },
    ]);
  });

  it("Converts question and answer text from markdown to html", async () => {
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.question.md`,
      "# How does this thing work?",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.answer.md`,
      "**Magic!!**",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.tags.json`,
      JSON.stringify([]),
    );

    await insertFlashCards();

    const storedFlashCards = await databaseCommands.readFlashCards();
    expect(storedFlashCards).toHaveLength(1);
    expect(storedFlashCards).toEqual([
      {
        id: 1,
        question_html:
          '<h1 id="how-does-this-thing-work">How does this thing work?</h1>\n',
        answer_html: "<p><strong>Magic!!</strong></p>\n",
        tags: [],
      },
    ]);
  });

  it("Converts image paths to data uri's", async () => {
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.question.md`,
      "How does this thing work?",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.answer.md`,
      "Review this image ![awesome image](./mock-image.png)",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.tags.json`,
      JSON.stringify([]),
    );

    await insertFlashCards();

    const storedFlashCards = await databaseCommands.readFlashCards();
    expect(storedFlashCards).toHaveLength(1);
    expect(storedFlashCards).toEqual([
      {
        id: 1,
        question_html: "<p>How does this thing work?</p>\n",
        answer_html:
          '<p>Review this image <img src="pretend-data-uri" alt="awesome image"></p>\n',
        tags: [],
      },
    ]);
  });

  it("Cleans up markdown files once they have been used to create flash cards", async () => {
    const questionFile = `${NEW_FLASH_CARD_DIR}/mock-flash-card.question.md`;
    fs.writeFileSync(questionFile, "How does this thing work?");

    const answerFile = `${NEW_FLASH_CARD_DIR}/mock-flash-card.answer.md`;
    fs.writeFileSync(answerFile, "Magic!!");

    const tagsFile = `${NEW_FLASH_CARD_DIR}/mock-flash-card.tags.json`;
    fs.writeFileSync(tagsFile, JSON.stringify(["tag1", "tag2", "tag3"]));

    expect(fs.existsSync(questionFile)).toBe(true);
    expect(fs.existsSync(answerFile)).toBe(true);
    expect(fs.existsSync(tagsFile)).toBe(true);

    await insertFlashCards();

    expect(fs.existsSync(questionFile)).toBe(false);
    expect(fs.existsSync(answerFile)).toBe(false);
    expect(fs.existsSync(tagsFile)).toBe(false);
  });

  it("Errors if there is no question file", async () => {
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.answer.md`,
      "Review this image ![awesome image](./mock-image.png)",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.tags.json`,
      JSON.stringify([]),
    );

    await expect(insertFlashCards()).rejects.toThrow();
  });

  it("Errors if there is no answer file", async () => {
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.question.md`,
      "How does this thing work?",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.tags.json`,
      JSON.stringify([]),
    );

    await expect(insertFlashCards()).rejects.toThrow();
  });

  it("Errors if there is no tags file", async () => {
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.question.md`,
      "How does this thing work?",
    );
    fs.writeFileSync(
      `${NEW_FLASH_CARD_DIR}/mock-flash-card.answer.md`,
      "Review this image ![awesome image](./mock-image.png)",
    );

    await expect(insertFlashCards()).rejects.toThrow();
  });
});

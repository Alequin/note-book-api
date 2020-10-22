import fs from "fs";

jest.mock("./new-flash-card-dir", () => {
  const { uuid } = require("uuidv4");
  return {
    NEW_FLASH_CARD_DIR: `./mock-temp-flash-card-dir-${uuid()}`,
  };
});
import { NEW_FLASH_CARD_DIR } from "./new-flash-card-dir";

import { createFlashCardTempFiles } from "./create-flash-card-temp-files";

describe("create-flash-card-temp-files", () => {
  beforeAll(() => fs.mkdirSync(NEW_FLASH_CARD_DIR));

  afterEach(() =>
    fs
      .readdirSync(NEW_FLASH_CARD_DIR)
      .map((fileName) => `${NEW_FLASH_CARD_DIR}/${fileName}`)
      .forEach((filePath) => fs.unlinkSync(filePath)),
  );

  afterAll(() => fs.rmdirSync(NEW_FLASH_CARD_DIR));

  it("Creates temp files for question, answer and tags in the expected directory", () => {
    createFlashCardTempFiles({ flashCardName: "new flash card" });

    expect(fs.readdirSync(NEW_FLASH_CARD_DIR)).toEqual(
      expect.arrayContaining([
        `new-flash-card.answer.md`,
        `new-flash-card.question.md`,
        `new-flash-card.tags.json`,
      ]),
    );
  });

  it("Prefils the tags json file with an empty array", () => {
    createFlashCardTempFiles({ flashCardName: "new flash card" });
    expect(
      fs.existsSync(`${NEW_FLASH_CARD_DIR}/new-flash-card.tags.json`),
    ).toBe(true);
  });

  it("Errors if there is already a flash card by the same name", () => {
    createFlashCardTempFiles({ flashCardName: "new flash card" });
    expect(() =>
      createFlashCardTempFiles({ flashCardName: "new flash card" }),
    ).toThrow();
  });
});

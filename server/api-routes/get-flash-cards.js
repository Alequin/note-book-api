import { databaseCommands } from "../database/commands";

export const getFlashCards = async (_req, res) => {
  try {
    const flashCards = await databaseCommands.readFlashCards();
    res.json(flashCards);
  } catch (error) {
    console.error(`Unable to read flash cards / Error: ${error.message}`);
    res.status(500).send("Unable to get flash cards");
  }
};

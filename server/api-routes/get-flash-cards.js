import { databaseCommands } from "../database/commands";

export const getFlashCards = async (req, res) => {
  try {
    const flashCards = await databaseCommands.readFlashCards();
    res.json(flashCards);
  } catch (error) {
    console.error(`Unable to get flash cards / Error: ${error.message}`);
    res.status(500).send("Unable to get flash cards");
  }
};

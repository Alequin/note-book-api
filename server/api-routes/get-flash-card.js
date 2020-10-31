import { databaseCommands } from "../database/commands";

export const getFlashCard = async (req, res) => {
  const tags = req.query.tags;
  try {
    res.json(
      await databaseCommands.readRandomFlashCard({
        tags,
      }),
    );
  } catch (error) {
    console.error(`Unable to read flash card / Error: ${error.message}`);
    res.status(500).send("Unable to get flash card");
  }
};

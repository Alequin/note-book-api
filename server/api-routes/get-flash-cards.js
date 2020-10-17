import { databaseCommands } from "../database/commands";

export const getFlashCards = async (req, res) => {
  const count = Number(req.query.count);
  const offset = Number(req.query.offset);
  const tags = req.query.tags;

  if (count <= 0) {
    return res.status(400).send("count param cannot be less than 1");
  }

  try {
    const flashCards = await databaseCommands.readFlashCards({
      count,
      offset,
      tags,
    });
    res.json(flashCards);
  } catch (error) {
    console.error(`Unable to read flash cards / Error: ${error.message}`);
    res.status(500).send("Unable to get flash cards");
  }
};

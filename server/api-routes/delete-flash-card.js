import { databaseCommands } from "../database/commands";

export const deleteFlashCard = async (req, res) => {
  const { flashCardId } = req.body;
  if (isRequestBodyInvalid(req.body))
    return res
      .status(400)
      .send(
        `Unable to delete flash card / Expected arugments not in JSON: flashCardId: ${flashCardId}`,
      );

  try {
    await databaseCommands.deleteFlashCardById({
      id: flashCardId,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(`Unable to delete flash card / Error: ${error.message}`);
    res.status(500).send("Unable to delete flash card");
  }
};

const isRequestBodyInvalid = ({ flashCardId }) => !flashCardId;

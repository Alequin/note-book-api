import { databaseCommands } from "../database/commands";

export const updateFlashCard = async (req, res) => {
  const { id, question, answer, tags } = req.body;
  if (isRequestBodyInvalid(req.body))
    return res
      .status(400)
      .send(
        `Unable to store flash card / Expected arugments not in JSON: id: ${id}, question: ${question}, answer: ${answer}, tags: ${tags}`,
      );

  try {
    const updatedCard = await databaseCommands.updateFlashCardById({
      id,
      questionHtml: question,
      answerHtml: answer,
      tags,
    });
    res.json(updatedCard);
  } catch (error) {
    console.error(`Unable to store flash card / Error: ${error.message}`);
    res.status(500).send("Unable to store flash card");
  }
};

const isRequestBodyInvalid = ({ id, question, answer, tags }) =>
  !id || !question || !answer || !tags;

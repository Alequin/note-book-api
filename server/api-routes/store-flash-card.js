import { databaseCommands } from "../database/commands";

export const storeFlashCard = async (req, res) => {
  const { question, answer, tags } = req.body;
  if (isRequestBodyInvalid(req.body))
    return res
      .status(400)
      .send(
        `Unable to store flash card / Expected arugments not in JSON: question: ${question}, answer: ${answer}, tags: ${tags}`,
      );

  try {
    await databaseCommands.insertFlashCard({
      questionHtml: question,
      answerHtml: answer,
      tags,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(`Unable to store flash card / Error: ${error.message}`);
    res.status(500).send("Unable to store flash card");
  }
};

const isRequestBodyInvalid = ({ question, answer, tags }) =>
  !question || !answer || !tags;

import pgFormat from "pg-format";
import { query } from "../query";

export const insertMultipleFlashCards = async (flashCards) =>
  query(
    pgFormat(
      "INSERT INTO flash_cards (question_html, answer_html, tags) VALUES %L",
      flashCards.map(toInputList),
    ),
  );

const toInputList = ({ questionHtml, answerHtml, tags }) => [
  questionHtml,
  answerHtml,
  `{${tags.join(",")}}`,
];

export const insertFlashCard = async (flashCard) =>
  insertMultipleFlashCards([flashCard]);

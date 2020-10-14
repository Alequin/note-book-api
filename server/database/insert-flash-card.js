import { query } from "./query";

export const insertFlashCard = async ({ questionHtml, answerHtml, tags }) =>
  query(
    "INSERT INTO flash_cards (question_html, answer_html, tags) VALUES ($1, $2, $3)",
    [questionHtml, answerHtml, tags],
  );

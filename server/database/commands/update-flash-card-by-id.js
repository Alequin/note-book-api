import { query } from "../query";

export const updateFlashCardById = async ({
  id,
  questionHtml,
  answerHtml,
  tags,
}) =>
  query(
    `UPDATE flash_cards SET question_html=$1, answer_html=$2, tags=$3 WHERE id=$4 RETURNING *`,
    [questionHtml, answerHtml, `{${tags.join(",")}}`, id],
  ).then((cards) => cards[0] || null);

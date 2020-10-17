import { isNumber } from "lodash";
import { query } from "../query";

const MAX_FLASH_CARDS_TO_RETURN = 50;

export const readFlashCards = async ({ count, offset, tags } = {}) =>
  query(
    tags
      ? `SELECT * FROM flash_cards WHERE tags @> $3 ORDER BY id DESC LIMIT $1 OFFSET $2`
      : `SELECT * FROM flash_cards ORDER BY id DESC LIMIT $1 OFFSET $2`,
    queryArgs(count, offset, tags),
  );

const queryArgs = (count, offset, tags) => {
  const limit =
    count && isNumber(count)
      ? Math.min(count, MAX_FLASH_CARDS_TO_RETURN)
      : MAX_FLASH_CARDS_TO_RETURN;
  const tagsAsQuery = tags && `{${tags}}`;
  const offsetToUse = offset || 0;

  return tagsAsQuery ? [limit, offsetToUse, tagsAsQuery] : [limit, offsetToUse];
};

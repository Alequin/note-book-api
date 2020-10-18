import { query } from "../query";

export const deleteFlashCardById = async ({ id }) =>
  query("DELETE FROM flash_cards WHERE id=$1", [id]);

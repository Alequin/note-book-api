import { query } from "./query";

export const readFlashCards = async () => query("SELECT * FROM flash_cards");

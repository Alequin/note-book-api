import { query } from "./query";

export const insertFlashCard = async () => query("SELECT * FROM flash_cards");

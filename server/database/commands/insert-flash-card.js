import { insertMultipleFlashCards } from "./insert-multiple-flash-cards";

export const insertFlashCard = async (flashCard) =>
  insertMultipleFlashCards([flashCard]);

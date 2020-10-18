import {
  insertFlashCard,
  insertMultipleFlashCards,
} from "./insert-flash-cards";
import { readFlashCards } from "./read-flash-cards";
import { deleteFlashCardById } from "./delete-flash-card-by-id";

export const databaseCommands = {
  insertFlashCard,
  insertMultipleFlashCards,
  deleteFlashCardById,
  readFlashCards,
};

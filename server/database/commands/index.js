import {
  insertFlashCard,
  insertMultipleFlashCards,
} from "./insert-flash-cards";
import { readFlashCards } from "./read-flash-cards";
import { readRandomFlashCard } from "./read-random-flash-card";
import { deleteFlashCardById } from "./delete-flash-card-by-id";

export const databaseCommands = {
  insertFlashCard,
  insertMultipleFlashCards,
  deleteFlashCardById,
  readFlashCards,
  readRandomFlashCard,
};

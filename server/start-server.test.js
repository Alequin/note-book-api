import request from "supertest";
import app from "./start-server";
import { apiRoutes } from "./api-routes";

import { databaseCommands } from "./database/commands";
import { resetTestDatabaseAfterEach } from "./database/reset-test-database-after-each";

describe("Server", () => {
  resetTestDatabaseAfterEach();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Returns the react app from the home route", async () => {
    const { text, statusCode } = await request(app).get(apiRoutes.home);

    expect(statusCode).toBe(200);
    expect(text).toMatch("<title>React App</title>");
  });

  it("Returns operation details from the health endpoint", async () => {
    const { text, statusCode } = await request(app).get(apiRoutes.health);

    expect(statusCode).toBe(200);

    const actual = JSON.parse(text);
    expect(actual.running).toBe(true);
    expect(actual.environment).toBe("test");
    expect(actual.time).toMatch(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d/);
  });

  describe("storing flash cards", () => {
    it("Stores a new flash card when a POST requests is sent to the flash card endpoint", async () => {
      const { statusCode } = await request(app)
        .post(apiRoutes.storeFlashCard)
        .send({
          question: "question",
          answer: "answer",
          tags: ["a", "b", "c"],
        })
        .set("Accept", "application/json");

      expect(statusCode).toBe(200);

      const storedFlashCards = await databaseCommands.readFlashCards();
      expect(storedFlashCards).toHaveLength(1);
      expect(storedFlashCards[0]).toEqual({
        answer_html: "answer",
        id: 1,
        question_html: "question",
        tags: ["a", "b", "c"],
      });
    });

    it("Errors with a status of 400 if invalid args are passed while storing flash cards", async () => {
      const { statusCode } = await request(app)
        .post(apiRoutes.storeFlashCard)
        .send({})
        .set("Accept", "application/json");

      expect(statusCode).toBe(400);

      const storedFlashCards = await databaseCommands.readFlashCards();
      expect(storedFlashCards).toHaveLength(0);
    });

    it("Errors with a status of 500 if there are any errors while storing flash cards", async () => {
      jest.spyOn(databaseCommands, "insertFlashCard").mockImplementation(() => {
        throw new Error("mock error to create a 500 status");
      });
      jest.spyOn(console, "error").mockImplementation(() => {});

      const { statusCode } = await request(app)
        .post(apiRoutes.storeFlashCard)
        .send({
          question: "question",
          answer: "answer",
          tags: ["a", "b", "c"],
        })
        .set("Accept", "application/json");

      expect(statusCode).toBe(500);
      expect(console.error).toHaveBeenCalledWith(
        "Unable to store flash card / Error: mock error to create a 500 status",
      );

      const storedFlashCards = await databaseCommands.readFlashCards();
      expect(storedFlashCards).toHaveLength(0);
    });
  });
});

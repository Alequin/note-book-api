import request from "supertest";
import app from "./start-server";
import { apiRoutes } from "./api-routes";

import { databaseCommands } from "./database/commands";
import { resetTestDatabaseAfterEach } from "./database/reset-test-database-after-each";

describe("Server", () => {
  resetTestDatabaseAfterEach();

  beforeEach(() => {
    jest.restoreAllMocks();
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

  describe("reading flash cards", () => {
    it("Reads stored flash cards when a GET request is sent to the flash card endpoint", async () => {
      await databaseCommands.insertFlashCard({
        questionHtml: "question",
        answerHtml: "answer",
        tags: ["1"],
      });

      const { statusCode, body } = await request(app).get(
        apiRoutes.getFlashCards,
      );

      expect(statusCode).toBe(200);

      expect(body).toHaveLength(1);
      expect(body[0]).toEqual({
        id: 1,
        question_html: "question",
        answer_html: "answer",
        tags: ["1"],
      });
    });

    it("Reads the requested number of flash cards when a GET request is sent to the flash card endpoint with count param", async () => {
      await databaseCommands.insertFlashCard({
        questionHtml: "question1",
        answerHtml: "answer1",
        tags: ["1"],
      });
      await databaseCommands.insertFlashCard({
        questionHtml: "question2",
        answerHtml: "answer2",
        tags: ["2"],
      });

      const { statusCode, body } = await request(app).get(
        `${apiRoutes.getFlashCards}?count=1`,
      );

      expect(statusCode).toBe(200);

      expect(body).toHaveLength(1);
      expect(body[0]).toEqual({
        id: 2,
        question_html: "question2",
        answer_html: "answer2",
        tags: ["2"],
      });
    });

    it("Reads flash cards in decending creation order", async () => {
      await databaseCommands.insertFlashCard({
        questionHtml: "question1",
        answerHtml: "answer1",
        tags: ["1"],
      });
      await databaseCommands.insertFlashCard({
        questionHtml: "question2",
        answerHtml: "answer2",
        tags: ["2"],
      });

      const { statusCode, body } = await request(app).get(
        apiRoutes.getFlashCards,
      );

      expect(statusCode).toBe(200);

      expect(body).toHaveLength(2);
      expect(body[0].id).toBe(2);
      expect(body[1].id).toBe(1);
    });

    it("Does not return more than the max flash cards if too many are requested", async () => {
      for (let number = 0; number < 1000; number++) {
        await databaseCommands.insertFlashCard({
          questionHtml: `question${number}`,
          answerHtml: `answer${number}`,
          tags: [number],
        });
      }

      const { statusCode, body } = await request(app).get(
        `${apiRoutes.getFlashCards}?count=999999999999999`,
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(50);
    });

    it("Errors with a 400 status if count is less than 1", async () => {
      jest.spyOn(databaseCommands, "readFlashCards");

      const { statusCode } = await request(app).get(
        `${apiRoutes.getFlashCards}?count=0`,
      );

      expect(statusCode).toBe(400);
      expect(databaseCommands.readFlashCards).not.toHaveBeenCalled();
    });

    it("Reads the of flash cards from the requested offset when a GET request is sent to the flash card endpoint with the offset param", async () => {
      await databaseCommands.insertFlashCard({
        questionHtml: "question1",
        answerHtml: "answer1",
        tags: ["1"],
      });
      await databaseCommands.insertFlashCard({
        questionHtml: "question2",
        answerHtml: "answer2",
        tags: ["2"],
      });

      const { statusCode, body } = await request(app).get(
        `${apiRoutes.getFlashCards}?count=1&offset=1`,
      );

      expect(statusCode).toBe(200);

      expect(body).toHaveLength(1);
      expect(body[0]).toEqual({
        id: 1,
        question_html: "question1",
        answer_html: "answer1",
        tags: ["1"],
      });
    });

    it("Reads the of flash cards which have matching tags when a GET request is sent to the flash card endpoint with the tags param", async () => {
      await databaseCommands.insertFlashCard({
        questionHtml: "question1",
        answerHtml: "answer1",
        tags: ["1", "2"],
      });
      await databaseCommands.insertFlashCard({
        questionHtml: "question2",
        answerHtml: "answer2",
        tags: ["2", "3"],
      });
      await databaseCommands.insertFlashCard({
        questionHtml: "question3",
        answerHtml: "answer3",
        tags: ["2", "3"],
      });

      const { statusCode, body } = await request(app).get(
        `${apiRoutes.getFlashCards}?tags=2,3`,
      );

      expect(statusCode).toBe(200);

      expect(body).toHaveLength(2);
      expect(body).toEqual([
        {
          id: 3,
          question_html: "question3",
          answer_html: "answer3",
          tags: ["2", "3"],
        },
        {
          id: 2,
          question_html: "question2",
          answer_html: "answer2",
          tags: ["2", "3"],
        },
      ]);
    });

    it("Throws an error if there are any issues while reading flash cards", async () => {
      jest.spyOn(databaseCommands, "readFlashCards").mockImplementation(() => {
        throw new Error("mock error to create a 500 status");
      });
      jest.spyOn(console, "error").mockImplementation(() => {});

      await databaseCommands.insertFlashCard({
        questionHtml: "question",
        answerHtml: "answer",
        tags: ["1"],
      });

      const { statusCode } = await request(app).get(apiRoutes.getFlashCards);

      expect(statusCode).toBe(500);
      expect(console.error).toHaveBeenCalledWith(
        "Unable to read flash cards / Error: mock error to create a 500 status",
      );
    });
  });
});

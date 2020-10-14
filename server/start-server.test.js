import request from "supertest";
import app from "./start-server";
import { apiRoutes } from "./api-routes";
import { readFlashCards } from "./database/read-flash-cards";
import { thing } from "./database/reset-test-database-after-each";

describe("Server", () => {
  thing();

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

    const storedFlashCards = await readFlashCards();
    expect(storedFlashCards).toHaveLength(1);
    expect(storedFlashCards[0]).toEqual({
      answer_html: "answer",
      id: 1,
      question_html: "question",
      tags: ["a", "b", "c"],
    });

    it.todo(
      "returns a 400 if bad arguments are passed when making flash cards",
    );
    it.todo("returns a 500 if there is an error while making flash cards");
  });
});

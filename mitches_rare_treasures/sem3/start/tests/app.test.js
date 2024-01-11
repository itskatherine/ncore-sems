const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");
const seed = require("../db/seed");
const db = require("../db/connection");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET all owners", () => {
  test("200: returns an array of owners", () => {
    return request(app)
      .get("/api/owners")
      .expect(200)
      .then(({ body }) => {
        const { owners } = body;
        expect(owners.length).toBe(4);
      });
  });
});

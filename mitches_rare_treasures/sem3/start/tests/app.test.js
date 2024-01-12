const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");
const seed = require("../db/seed");
const db = require("../db/connection");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET all pokemon", () => {
  test("200: returns an array of pokemon", () => {
    return request(app)
      .get("/api/pokemon")
      .expect(200)
      .then(({ body }) => {
        const { pokemon } = body;
        expect(pokemon.length).toBe(15);
        pokemon.forEach((singlePokemon) => {
          expect(singlePokemon).toMatchObject({
            pokemon_id: expect.any(Number),
            owner_id: expect.any(Number),
            pokemon_name: expect.any(String),
            battles_won: expect.any(Number),
            type: expect.any(String),
          });
        });
      });
  });
});

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

  test("200: the pokemon are sorted by name by default", () => {
    return request(app)
      .get("/api/pokemon")
      .expect(200)
      .then(({ body }) => {
        const { pokemon } = body;
        expect(pokemon).toBeSorted({ key: "pokemon_name" });
      });
  });

  test("200: should accept a sort_by query", () => {
    return request(app)
      .get("/api/pokemon?sort_by=battles_won")
      .expect(200)
      .then(({ body }) => {
        const { pokemon } = body;
        expect(pokemon).toBeSorted({ key: "battles_won" });
      });
  });

  test("400: shouldn't accept an invalid sort_by query", () => {
    return request(app)
      .get("/api/pokemon?sort_by=katherine")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort query");
      });
  });
  test("200 should have the ability to change order ASC or DESC", () => {
    return request(app)
      .get("/api/pokemon?sort_by=battles_won&order=DESC")
      .expect(200)
      .then(({ body }) => {
        const { pokemon } = body;
        expect(pokemon).toBeSortedBy("battles_won", { descending: true });
      });
  });
  test("400 shouldn't accept an invalid order query", () => {
    return request(app)
      .get("/api/pokemon?sort_by=battles_won&order=katherine")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });

  // test("200: should accept a valid owner query", () => {
  //   return request(app)
  //     .get("/api/pokemon?owner_name=Katherine")
  //     .expect(200)
  //     .then(({ body }) => {
  //       const { pokemon } = body;
  //       expect(pokemon.length).toBe(4);
  //       pokemon.forEach((singlePokemon) => {
  //         expect(singlePokemon.owner_name).toBe("Katherine");
  //       });
  //     });
  // });
});

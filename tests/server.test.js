const test = require("tape");
const supertest = require("supertest");
const router = require("../src/app");

test("testing supertest", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .end((err, res) => {
      t.equal(1, 1, "Supertest is working");
      t.end();
    });
});

test("Checking 404 error", t => {
  supertest(router)
    .get("/thisIsNotAnEndpoint")
    .expect(404)
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

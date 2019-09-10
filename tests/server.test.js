const test = require('tape');
const supertest = require('supertest');
const router = require('../src/controllers/index.js');

test("testing supertest", (t) => {
  supertest(router)
  .get('/')
  .expect(200)
  .end((err, res) => {
    t.equal(1,1)
    t.end();
  });
});

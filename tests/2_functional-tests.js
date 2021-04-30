const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=kyle")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello kyle");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");
          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
        });

      done();
    });
  });
});

const Browser = require("zombie");
//add project URL to the site property of the variable Browser:
Browser.site = "https://boilerplate-mochachai.sabritrabelsi.repl.co/"; // If you are testing on a local environment replace the line above with
// Browser.localhost('example.com', process.env.PORT || 3000);

// instantiate a new instance of the Browser object with the following code:
const browser = new Browser();
// use the suiteSetup hook to direct the browser to the / route with the following code:
suiteSetup(function (done) {
  return browser.visit("/", done);
});

suite("Functional Tests with Zombie.js", function () {
  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser.fill("surname", "Colombo").pressButton("submit", function () {
        browser.assert.success();
        browser.assert.text("span#name", "Cristoforo");
        browser.assert.text("span#surname", "Colombo");
        browser.assert.element("span#dates", 1);
        done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      browser.fill("surname", "Vespucci").pressButton("submit", function () {
        browser.assert.success();
        browser.assert.text("span#name", "Amerigo");
        browser.assert.text("span#surname", "Vespucci");
        browser.assert.element("span#dates", 1);
        done();
      });
    });
  });
});

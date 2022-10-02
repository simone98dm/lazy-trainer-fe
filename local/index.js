const express = require("express");
const cors = require("cors");
const app = express();

const fakeTrainer = require("./trainer.json");
const fakeSign = require("./sign.json");
const fakeUser = require("./user.json");

app.use(cors());

app.get("/", (req, res) => {
  res.end("Fake server");
});

// signin endpoints
app.get("/api/auth/sign", (req, res) => {
  return res.json(fakeSign).end();
});
app.post("/api/auth/sign", (req, res) => {
  return res.json(fakeSign).end();
});

// trainer endpoints
app.get("/api/trainer", (req, res) => {
  return res.json(fakeTrainer).end();
});

// user endpoints
app.get("/api/user", (req, res) => {
  return res.json(fakeUser).end();
});

app.listen(3001, () => console.log("Fake server listening on port 3001!"));

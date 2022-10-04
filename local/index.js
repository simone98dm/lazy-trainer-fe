const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const fakeTrainer = require("./trainer.json");
const fakeSign = require("./sign.json");
const fakeUser = require("./user.json");
const fakeGroup = require("./groups.json");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.end("Fake server");
});

app.get("/api/auth/sign", (req, res) => {
  const { authorization } = req.headers;
  const user = fakeSign.users.find(
    (u) => u.data.token === authorization.split(" ")[1]
  );
  if (!user) {
    return res.status(404).end();
  }
  return res.json(user).end();
});
app.post("/api/auth/sign", (req, res) => {
  const { username } = req.body;
  const user = fakeSign.users.find((u) => u.data.name === username);
  if (!user) {
    return res.status(404).end();
  }
  return res.json(user).end();
});

app.get("/api/trainer", (req, res) => {
  return res.json(fakeTrainer).end();
});

app.post("/api/group", (req, res) => {
  return res.json(fakeGroup).end();
});

app.post("/api/user/trainer", (req, res) => {
  return res.json(fakeTrainer).end();
});

app.get("/api/user", (req, res) => {
  return res.json(fakeUser).end();
});

const port = 3001;
app.listen(port, () => console.log(`🚀 Fake server listening on port ${port}`));

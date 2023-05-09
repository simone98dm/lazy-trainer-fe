import express from "express";
import user from "./user.json";
import trainer from "./trainer.json";
import complete from "./complete.json";
import sign from "./sign.json";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/auth/sign", (req, res) => {
  res.json(sign).end();
});

app.get("/api/auth/sign", (req, res) => {
  res.json(sign).end();
});

app.get("/api/user", (req, res) => {
  res.json(user).end();
});

app.get("/api/trainer", (req, res) => {
  res.json(trainer).end();
});

app.get("/api/workout/complete", (req, res) => {
  res.json(complete).end();
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

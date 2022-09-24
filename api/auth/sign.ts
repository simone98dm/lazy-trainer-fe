import { SECRET_KEY } from "./../const";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../utils";

export default async (request: VercelRequest, response: VercelResponse) => {
  const body = JSON.parse(request.body);

  try {
    if (!body.username) {
      response.status(400).send({ error: "username not provided" });
      return;
    }

    if (!body.password) {
      response.status(400).send({ error: "password not provided" });
      return;
    }

    //find user
    const client = await connectToDatabase();
    if (!client) {
      throw new Error("mongoClient is null");
    }
    console.log("🚀 ~ file: sign.ts ~ line 23 ~ client", client)
    const db = client.db("lazyTrainerDb");
    console.log("🚀 ~ file: sign.ts ~ line 28 ~ db", db);
    const collection = db.collection("users");
    console.log("🚀 ~ file: sign.ts ~ line 29 ~ collection", collection);
    const user = await collection.findOne({ name: body.username });
    console.log("🚀 ~ file: sign.ts ~ line 31 ~ user", user);
    if (!user) {
      response.status(404).send({ error: "username or password not valid" });
      return;
    }

    //compare hash password
    const founded = await bcrypt.compare(body.password, user?.hashPassword || "");
    if (!founded) {
      response.status(404).send({ error: "username or password not valid" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const userResponse = {
      data: {
        name: user.name,
        id: user.id,
        token,
      },
    };

    response.status(200).send(userResponse);
  } catch (error) {
    response.status(500).send({ error: "something went wrong" });
  }
};

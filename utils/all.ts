import { ITokenPayload } from "./../src/models/User";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
export const SECRET_KEY = process.env.SECRET_KEY || "";
const options = {};

let mongoClient: MongoClient;

if (!uri) {
  throw new Error("uri not setted");
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return mongoClient;
    }

    mongoClient = await new MongoClient(uri, options).connect();

    return mongoClient;
  } catch (error) {
    console.error(error);
  }
}

import jwt from "jsonwebtoken";
export function verifyToken(token: string): ITokenPayload | undefined {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded) {
      return decoded as ITokenPayload;
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

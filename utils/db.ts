import { MongoClient } from "mongodb";
import { uri } from "./const";

const options = {};

let mongoClient: MongoClient;

if (!uri) {
  throw new Error("uri not setted");
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      console.log("🚀 returned cached client");
      return mongoClient;
    }

    mongoClient = await new MongoClient(uri, options).connect();
    console.log("🔥 create new client");

    return mongoClient;
  } catch (error) {
    console.error(error);
  }
}

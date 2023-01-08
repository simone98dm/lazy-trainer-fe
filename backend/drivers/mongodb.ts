import { MongoClient } from "mongodb";
import { uri } from "..";

const options = {};

let mongoClient: MongoClient;

if (!uri) {
  throw new Error("uri not setted");
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      console.log("return cached mongoClient");
      return mongoClient;
    }

    mongoClient = await new MongoClient(uri, options).connect();
    console.log("new mongoClient");

    return mongoClient;
  } catch (error) {
    console.error(error);
  }
}

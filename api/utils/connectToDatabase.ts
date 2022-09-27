import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
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

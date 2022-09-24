import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let mongoClient: MongoClient;

if (!uri) {
  throw new Error();
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return mongoClient;
    }

    mongoClient = await new MongoClient(uri, options).connect();

    console.log("🚀 connected");

    return mongoClient;
  } catch (error) {
    console.log("🚀 ~ file: connectToDatabase.ts ~ line 21 ~ connectToDatabase ~ error", error);
  }
}

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let mongoClient: MongoClient | undefined;
let mongoClientPromise: Promise<MongoClient | undefined>;

if (!uri) {
  throw new Error();
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return mongoClient;
    }

    mongoClient = new MongoClient(uri, options);
    mongoClientPromise = mongoClient.connect();

    console.log("🚀 connected");

    return mongoClientPromise;
  } catch (error) {
    console.log("🚀 ~ file: connectToDatabase.ts ~ line 21 ~ connectToDatabase ~ error", error);
  }
}

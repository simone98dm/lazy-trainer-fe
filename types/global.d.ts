import { MongoClient } from "mongodb";

declare global {
  interface globalThis {
    _mongoClientPromise: Promise<MongoClient>;
  }
}

import postgres from "postgres";
import { uri } from "../index";

const options = {};

let postgresClient;

if (!uri) {
  throw new Error("uri not setted");
}

export async function connectToDatabase() {
  try {
    if (postgresClient) {
      return postgresClient;
    }

    postgresClient = postgres(uri, options);

    return postgresClient;
  } catch (error) {
    console.error(error);
  }
}

import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./const";
import { ITokenPayload } from "../src/models/User";

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

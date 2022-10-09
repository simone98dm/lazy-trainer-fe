import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./const";
import { ITokenPayload } from "../src/models/User";

/**
 * Verify token and return ITokenPayload interface
 * @param token
 * @returns ITokenPayload
 */
export function verifyToken(token: string): ITokenPayload | undefined {
  try {
    if (token) {
      const decoded = jwt.verify(token, SECRET_KEY);
      if (decoded) {
        return decoded as ITokenPayload;
      }
    } else {
      throw new Error("Token is null");
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

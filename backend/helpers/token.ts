import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../const";
import { ITokenPayload } from "../../src/models/User";

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

export function validateUser(request: any) {
  const bearer = extractTokenFromRequest(request);
  if (!bearer) {
    throw new Error("Token not found");
  }

  const isValid = verifyToken(bearer);
  if (!isValid) {
    throw new Error("Token not valid");
  }

  return isValid;
}

export async function signToken(payload: any) {
  return await jwt.sign(payload, SECRET_KEY, {
    expiresIn: "3d",
  });
}

export function extractTokenFromRequest(request: any): string {
  return request.headers.authorization?.split(" ")[1] ?? "";
}

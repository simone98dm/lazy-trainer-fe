import jwt from "jsonwebtoken";
import { VercelRequest } from "@vercel/node";
import { ITokenPayload, SECRET_KEY } from "..";

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

export function validateUser(request: VercelRequest) {
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

export async function signToken(payload: ITokenPayload) {
  return await jwt.sign(payload, SECRET_KEY, {
    expiresIn: "3d",
  });
}

export function extractTokenFromRequest(request: VercelRequest): string {
  return request.headers.authorization?.split(" ")[1] ?? "";
}

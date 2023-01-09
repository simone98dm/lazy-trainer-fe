import { VercelResponse } from "@vercel/node";

export function notFound(response: VercelResponse, data?: unknown) {
  return response.status(404).send({ error: data });
}
export function badRequest(response: VercelResponse, data?: unknown) {
  return response.status(400).send({ error: data });
}
export function internalServerError(response: VercelResponse, data?: unknown) {
  return response.status(500).send({ error: data });
}
export function ok(response: VercelResponse, data?: unknown) {
  return response.status(200).send(data);
}
export function notOk(response: VercelResponse, data?: unknown) {
  return response.status(200).send(data);
}

import { VercelResponse } from "@vercel/node";

export const commonResponse = {
  notFound: (response: VercelResponse, data?: unknown) =>
    response.status(404).send({ error: data }),
  badRequest: (response: VercelResponse, data?: unknown) =>
    response.status(400).send({ error: data }),
  internalServerError: (response: VercelResponse, data?: unknown) =>
    response.status(500).send({ error: data }),
  ok: (response: VercelResponse, data?: unknown) => response.status(200).send(data),
  notOk: (response: VercelResponse, data?: unknown) => response.status(200).send(data),
};

import { VercelResponse } from "@vercel/node";

export const commonResponse = {
  notFound: (response: VercelResponse, data?: any) =>
    response.status(404).send({ success: false, error: data }),
  badRequest: (response: VercelResponse, data?: any) =>
    response.status(400).send({ success: false, error: data }),
  internalServerError: (response: VercelResponse, data?: any) =>
    response.status(500).send({ success: false, error: data }),
  ok: (response: VercelResponse, data?: any) =>
    response.status(200).send({ success: true, data }),
  notOk: (response: VercelResponse, data?: any) =>
    response.status(200).send({ success: false, data }),
};

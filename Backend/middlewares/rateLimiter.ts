import { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";

export const limiter: RequestHandler = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

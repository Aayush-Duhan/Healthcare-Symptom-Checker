import type { ErrorRequestHandler } from "express";
import { logger } from "../logger.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error({ err }, "Unhandled error");
  if (process.env.NODE_ENV === "production") {
    return res.status(500).json({ error: "Internal server error" });
  }
  return res.status(500).json({ error: String(err) });
};



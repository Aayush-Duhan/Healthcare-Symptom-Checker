import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import triageRouter from "./routes/triage.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./logger.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", triageRouter);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, model: env.GEMINI_MODEL }, "Server started");
});



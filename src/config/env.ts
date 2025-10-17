import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  GOOGLE_API_KEY: z.string().min(1, "GOOGLE_API_KEY is required"),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  NODE_ENV: z.string().optional(),
  LOG_LEVEL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("Invalid environment variables", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  PORT: parseInt(parsed.data.PORT, 10),
  GOOGLE_API_KEY: parsed.data.GOOGLE_API_KEY,
  GEMINI_MODEL: parsed.data.GEMINI_MODEL,
  NODE_ENV: parsed.data.NODE_ENV,
  LOG_LEVEL: parsed.data.LOG_LEVEL,
};



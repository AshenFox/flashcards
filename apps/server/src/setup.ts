import { loadAllConfigEnv } from "@flashcards/config/load-env";
import { z } from "zod";

loadAllConfigEnv();

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  MONGO_URI_DEV: z.string().min(1),
  MONGO_URI_PROD: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NEXT_PUBLIC_VAPID_KEY: z.string().min(1),
  VAPID_PRIVATE_KEY: z.string().min(1),
  WEBPUSH_SUBJECT: z.string().min(1),
  GOOGLE_CSE_ID: z.string().min(1),
  GOOGLE_API_KEYS: z.string().min(1),
});

export const env = schema.parse(process.env);

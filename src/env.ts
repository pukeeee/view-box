import { z } from "zod";

const envSchema = z.object({
  TMDB_API_KEY: z.string().min(1, { message: "TMDB_API_KEY is required." }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.treeifyError(parsedEnv.error),
  );
  throw new Error("Invalid environment variables. Check your .env.local file.");
}

export const env = parsedEnv.data;

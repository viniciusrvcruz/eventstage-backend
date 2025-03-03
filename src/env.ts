import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.coerce.number().default(3333),
    POSTGRES_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    WEB_URL: z.string().url(),
    SECRET_KEY: z.string()
})

export const env = envSchema.parse(process.env)
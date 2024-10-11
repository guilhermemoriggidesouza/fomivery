import { createClient } from "@libsql/client";
import 'dotenv/config'
import { drizzle } from "drizzle-orm/libsql";

const createDrizzleClient = () => {
  const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  return drizzle(turso);
}

const globalForDrizzle = globalThis as unknown as {
  drizzle: ReturnType<typeof createDrizzleClient> | undefined;
};

export const db = globalForDrizzle.drizzle ?? createDrizzleClient();

if (process.env.NODE_ENV !== "production") globalForDrizzle.drizzle = db;

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({ path: ".env" });
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.log("postgres url not found");
}
const client = postgres(process.env.NEXT_PUBLIC_SUPABASE_URL as string, {
  max: 1,
});
const db = drizzle(client, { schema });
// console.log(db);

export default db;

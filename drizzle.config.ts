import { defineConfig, type Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.log("db url not found");
}
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
export default defineConfig({
  schema: "./src/utils/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:process.env.NEXT_PUBLIC_SUPABASE_URL!,
    ssl: {
      rejectUnauthorized: false, // This line allows self-signed certificates
    },
  },
});
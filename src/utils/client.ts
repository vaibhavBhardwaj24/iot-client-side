import { createBrowserClient } from "@supabase/ssr";

export const createClient = async () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL2!,
    process.env.NEXT_PUBLIC_ANON_KEY!
  );
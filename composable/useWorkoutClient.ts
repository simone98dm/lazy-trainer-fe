import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { type Database } from "~/models/database.types";

let supabase: SupabaseClient | null = null;

export function useWorkoutClient() {
  const config = useRuntimeConfig();

  if (!supabase) {
    supabase = createClient<Database>(config.app.SUPABASE_URL, config.app.SUPABASE_ANON_KEY);
    console.log("Create new client");
  }

  console.log("Used cached client");
  return supabase;
}

import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { type Database } from "~/models/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase: SupabaseClient<Database> | null = null;

export function useWorkoutClient() {
  if (!supabase) {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    console.log("Create new client");
  }

  console.log("Used cached client");
  return supabase;
}

import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { type Database } from "~/models/database.types";
import mockedPlan from "~/mock/plan.json";
import mockedSessions from "~/mock/session.json";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase: SupabaseClient<Database> | null = null;

const fakeClient = {
  from: (tableName: "plans" | "sessions" | "activities" | "stats") => {
    if (tableName === "plans") {
      return mockedPlan as any;
    }
    if (tableName === "sessions") {
      return mockedSessions as any;
    }
    if (tableName === "activities") {
      return mockedSessions[0].activities as any;
    }
  },
};

export function useWorkoutClient() {
  if (process.env.VITE_DEV) {
    return fakeClient;
  }

  if (!supabase) {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}

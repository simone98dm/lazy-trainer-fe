import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { type Database } from '~/models/database.types';

let supabase: SupabaseClient<Database> | null = null;

export function useWorkoutClient() {
  if (!supabase) {
    const {
      public: { supabaseUrl, supabaseAnonKey },
    } = useRuntimeConfig();
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}

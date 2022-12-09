import { Client, ClientConfig, Pool } from "pg";
import { uri } from "../const";

const options: ClientConfig = {
  user: process.env.VITE_SUPABASE_USERNAME,
  password: process.env.VITE_SUPABASE_PASSWORD,
  host: process.env.VITE_SUPABASE_HOST,
  port: Number(process.env.VITE_SUPABASE_PORT),
  database: process.env.VITE_SUPABASE_DATABASE,
};

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  max: 20,
  idleTimeoutMillis: 30000,
});

import "reflect-metadata";
import { DataSource } from "typeorm";
import { activities, plans, sessions, users } from "./entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.VITE_SUPABASE_URL,
  port: Number(process.env.VITE_SUPABASE_PORT),
  username: process.env.VITE_SUPABASE_USERNAME,
  password: process.env.VITE_SUPABASE_USERNAME,
  database: process.env.VITE_SUPABASE_DATABASE,
  synchronize: false,
  logging: false,
  entities: [activities, plans, sessions, users],
  migrations: [],
  subscribers: [],
});

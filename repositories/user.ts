import { type User } from "~/models/User";
import { type Repository } from "./common";
import { useWorkoutClient } from "~/composable/useWorkoutClient";
import { type UserConfigurations } from "~/utils";

export interface UserRepository {
  getUserData(userId: string): Promise<User | null>;
  getTrainerClients(userId: string): Promise<
    | {
        name: any;
      }[]
    | null
  >;
  saveConfiguration(userId: string, configuration: UserConfigurations): Promise<void>;
}

async function getUserData(userId?: string): Promise<User | null> {
  if (!userId) {
    return null;
  }

  if (process.env.VITE_DEV) {
    return {
      configurations: {
        audioDisabled: false,
        darkMode: false,
        easyMode: false,
      },
      id: "000",
      name: "DEMO USER",
      role: "2",
    } as User;
  }

  const client = useWorkoutClient();
  const { data, error } = await client
    .from("configurations")
    .select("*")
    .eq("id", userId)
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as User;
}
async function getTrainerClients(userId: string) {
  const client = useWorkoutClient();
  const { data, error } = await client.from("plans").select("name").eq("trainerId", userId);
  if (error) {
    return null;
  }

  return data;
}
async function saveConfiguration(userId: string, configuration: UserConfigurations): Promise<void> {
  const client = useWorkoutClient();
  await client
    .from("users")
    .update({ configurations: JSON.stringify(configuration) })
    .eq("id", userId);
}

export const userRepository: Repository<UserRepository> = {
  getUserData,
  getTrainerClients,
  saveConfiguration,
};

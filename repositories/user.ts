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

async function getUserData(userId: string): Promise<User | null> {
  const client = useWorkoutClient();
  const userResponse = await client
    .from("users")
    .select("id,name,role,configurations")
    .eq("id", userId);

  if (userResponse.error) {
    return null;
  }

  const [user] = userResponse.data;

  return user as User;
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

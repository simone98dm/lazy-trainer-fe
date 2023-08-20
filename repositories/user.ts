import { ITokenPayload } from "~/backend";
import { Repository } from "./common";
import { useWorkoutClient } from "~/composable/useWorkoutClient";

export interface UserRepository {
  getUserData(userId: string): Promise<ITokenPayload | null>;
}

async function getUserData(userId: string): Promise<ITokenPayload | null> {
  const client = useWorkoutClient();
  const userResponse = await client
    .from("users")
    .select("id,name,role,configurations")
    .eq("id", userId);

  if (userResponse.error) {
    return null;
  }

  const [user] = userResponse.data;

  return user as ITokenPayload;
}

export const userRepository: Repository<UserRepository> = {
  getUserData,
};

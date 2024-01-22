import type { UserConfigurations } from "~/utils";

export interface UserResponse {
  data: User;
}

export interface User {
  role: number;
  name: string;
  id: string;
  configurations: UserConfigurations;
}

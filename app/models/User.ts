import type { UserConfigurations } from '~/utils';

export interface UserResponse {
  data: User;
}

export interface User {
  role: string;
  name: string;
  id: string;
  configurations: UserConfigurations;
}

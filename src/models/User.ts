export interface IUserResponse {
  data: IUser;
}

export interface IUser {
  role: number;
  name: string;
  id: string;
  token: string;
}

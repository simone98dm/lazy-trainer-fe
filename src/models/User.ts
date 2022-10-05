export interface IUserResponse {
  data: IUser;
}

export interface IUser {
  role: number;
  name: string;
  id: string;
  token: string;
}

export interface ITokenPayload {
  id: string;
  name: string;
  role: number;
  hits: number;
}

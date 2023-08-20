export interface IUserResponse {
  data: IUser;
}

export interface IUser {
  role: number;
  name: string;
  id: string;
  token: string;
  configurations: {
    audioDisabled: boolean;
    easyMode: boolean;
    darkMode: boolean;
  };
}

export interface ITokenPayload {
  id: string;
  name: string;
  role: number;
  configurations: string;
}

interface IUserResponse {
  data: IUser;
}

interface IUser {
  role: number;
  name: string;
  id: string;
  token: string;
}

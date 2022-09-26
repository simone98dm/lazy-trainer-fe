import { ISession } from "./Session";

export interface IPlan {
  name: string;
  id: string;
  trainerId?: string;
  sessions: ISession[];
}

import { Session } from "./Session";

export interface Plan {
  name: string;
  id: string;
  trainerId?: string;
  sessions: Session[];
}

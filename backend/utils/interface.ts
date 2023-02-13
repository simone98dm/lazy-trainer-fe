export interface ISession {
  dayOfWeek: number;
  id: string;
  planId?: string;
  activities: IActivity[];
}

export interface IActivity {
  id: string;
  description: string;
  name: string;
  time: number;
  reps: number;
  videoUrl?: string;
  warmup: boolean;
  order?: number;
  requestChange: boolean;
}

export interface ITokenPayload {
  id: string;
  name: string;
  role: number;
}

export interface IPlan {
  name: string;
  id: string;
  trainerId?: string;
  sessions: ISession[];
}

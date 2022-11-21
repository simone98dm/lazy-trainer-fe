export type Plan = {
  name: string;
  id: string;
  trainerId: string;
  ownerId: string;
};

export type Activity = {
  id: string;
  description: string;
  name: string;
  time: number;
  reps: number;
  order: number;
  warmup: boolean;
  videoUrl: string;
  requestChange: boolean;
  sessionId: string;
};

export type Session = {
  id: string;
  dayOfWeek: number;
};

export type User = {
  id: string;
  name: string;
  role: number;
  hashPassword: string;
  configurations: string;
};

export type Config = {
  userId: string;
  configurations: string;
};

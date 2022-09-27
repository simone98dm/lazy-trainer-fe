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

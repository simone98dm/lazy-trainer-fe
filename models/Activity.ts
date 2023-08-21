export interface Activity {
  id: string;
  name: string;
  description: string;
  order_index?: number;
  reps: number;
  requestChange: boolean;
  time: number;
  videoUrl?: string;
  warmup: boolean;
}

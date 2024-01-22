export interface Completion {
  userId: string;
  userName?: string;
  stats: {
    completion: string[];
  };
}

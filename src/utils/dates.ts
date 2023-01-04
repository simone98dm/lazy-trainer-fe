export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getDayOfTheWeek(day?: number) {
  const dayName = days[day ?? 0];
  return dayName;
}

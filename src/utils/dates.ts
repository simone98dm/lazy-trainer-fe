export function getDayOfTheWeek(day?: number) {
  if (!day) {
    return "No data found";
  }
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (day > days.length) {
    return null;
  }
  const dayName = days[day];
  return dayName;
}

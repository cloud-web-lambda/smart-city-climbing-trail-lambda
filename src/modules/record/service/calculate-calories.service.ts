export function calculateCalories(startDate: Date, endDate: Date, weightKg: number = 60, met: number = 6): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const durationSeconds = (end.getTime() - start.getTime()) / 1000;
  const durationHours = durationSeconds / 3600;

  const calories = met * weightKg * durationHours;

  return parseFloat(calories.toFixed(2));
}

export interface Drought {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalSeconds: number;
}

export function calculateDrought(titleDate: string, now: Date = new Date()): Drought {
  const hasTime = titleDate.includes("T");
  const start = new Date(hasTime ? titleDate : titleDate + "T00:00:00");
  if (!hasTime) start.setDate(start.getDate() + 1);

  if (now < start) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0, totalSeconds: 0 };
  }

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const diffMs = now.getTime() - start.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return { years, months, days, hours, minutes, seconds, totalDays, totalSeconds };
}

function label(value: number, singular: string, plural: string): string {
  return value === 1 ? singular : plural;
}

export function formatDrought(j: Drought): string {
  if (j.totalSeconds <= 0) return "Recent title — no drought";
  const parts: string[] = [];
  if (j.years) parts.push(`${j.years} ${label(j.years, "year", "years")}`);
  if (j.months > 0 || (j.years && j.months === 0)) parts.push(`${j.months} ${label(j.months, "month", "months")}`);
  if (j.days || parts.length === 0) parts.push(`${j.days} ${label(j.days, "day", "days")}`);
  return parts.join(", ");
}

export function formatDroughtFull(j: Drought): string {
  if (j.totalSeconds <= 0) return "Recent title — no drought";
  const parts: string[] = [];
  if (j.years) parts.push(`${j.years} ${label(j.years, "year", "years")}`);
  if (j.months > 0 || (j.years && j.months === 0)) parts.push(`${j.months} ${label(j.months, "month", "months")}`);
  if (j.days) parts.push(`${j.days} ${label(j.days, "day", "days")}`);
  if (j.minutes !== undefined || j.seconds !== undefined) {
    if (j.minutes) parts.push(`${j.minutes} ${label(j.minutes, "minute", "minutes")}`);
    if (j.seconds !== undefined) {
      if (parts.length === 0) {
        parts.push(`${j.seconds} ${label(j.seconds, "second", "seconds")}`);
      } else {
        parts.push(`and ${j.seconds} ${label(j.seconds, "second", "seconds")}`);
      }
    }
  }
  return parts.join(", ");
}

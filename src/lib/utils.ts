import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateISO: string): string {
  const d = new Date(dateISO + (dateISO.includes("T") ? "" : "T00:00:00"));
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

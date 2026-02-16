import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate years since a given start date
 * @param startDate - The start date (YYYY-MM-DD format)
 * @returns Number of full years since the start date
 */
export function calculateYearsSince(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

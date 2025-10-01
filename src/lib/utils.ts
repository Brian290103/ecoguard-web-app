import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateReportNumber() {
  return `RP_${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeFilename(title: string, fallback: string = 'manuscript') {
  return title
    .replace(/[^\w\s-]/gi, '')
    .trim()
    .replace(/\s+/g, '_')
    .toLowerCase() || fallback;
}

export function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

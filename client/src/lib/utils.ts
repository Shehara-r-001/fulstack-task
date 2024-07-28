import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Position = {
  place: string;
  price: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isInBetween(prev: number, newR: number, current: number) {
  return current <= newR && current > prev;
}

/**
 * use for get rank suffixes and prices
 * @param position
 * @returns
 */
export function getPosition(position: number): Position {
  switch (position) {
    case 1:
      return { place: '1st', price: '100$' };
    case 2:
      return { place: '2nd', price: '60$' };
    case 3:
      return { place: '3rd', price: '40$' };
    default:
      return { place: '', price: '' };
  }
}

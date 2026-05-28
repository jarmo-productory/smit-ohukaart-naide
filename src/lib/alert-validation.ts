import { z } from 'zod';

import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH } from './alerts.types';

export const createAlertSchema = z.object({
  text: z
    .string()
    .trim()
    .min(MIN_TEXT_LENGTH, `Kirjeldus peab olema vähemalt ${MIN_TEXT_LENGTH} tähemärki.`)
    .max(MAX_TEXT_LENGTH, `Kirjeldus võib olla kuni ${MAX_TEXT_LENGTH} tähemärki.`),
  latitude: z.number().finite(),
  longitude: z.number().finite(),
});

export type CreateAlertInput = z.infer<typeof createAlertSchema>;

export function hasMinimumCoordinatePrecision(value: number): boolean {
  if (!Number.isFinite(value)) {
    return false;
  }

  const fraction = value.toFixed(6).split('.')[1] ?? '';
  return fraction.replace(/0+$/, '').length >= 4;
}

export function formatCoordinate(value: number): string {
  return value.toFixed(6);
}

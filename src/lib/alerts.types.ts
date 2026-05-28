export type AlertStatus = 'received';

export interface Alert {
  id: string;
  text: string;
  latitude: number;
  longitude: number;
  receivedAt: string;
  status: AlertStatus;
}

export interface AlertResponse {
  id: string;
  receivedAt: string;
  status: AlertStatus;
}

export interface AlertsListResponse {
  alerts: Array<
    Alert & {
      textPreview: string;
    }
  >;
}

export interface StoredConfirmation {
  id: string;
  receivedAt: string;
}

export const CONFIRMATION_STORAGE_KEY = 'ohukaart-last-confirmation';
export const MIN_TEXT_LENGTH = 10;
export const MAX_TEXT_LENGTH = 2000;
export const TEXT_PREVIEW_LENGTH = 500;
export const GEOLOCATION_TIMEOUT_MS = 10_000;
export const SEND_SLOW_THRESHOLD_MS = 5_000;
export const SEND_TIMEOUT_MS = 30_000;

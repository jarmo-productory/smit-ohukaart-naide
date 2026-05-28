import { GEOLOCATION_TIMEOUT_MS } from './alerts.types';

export interface GeoPosition {
  latitude: number;
  longitude: number;
}

function parseMockGps(): GeoPosition | null {
  const mock = process.env.NEXT_PUBLIC_MOCK_GPS;
  if (!mock) {
    return null;
  }

  const [latitude, longitude] = mock.split(',').map((part) => Number(part.trim()));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return { latitude, longitude };
}

export function getCurrentPosition(): Promise<GeoPosition> {
  if (typeof window !== 'undefined') {
    const testMode = (window as Window & { __OHUKAART_GEO_TEST__?: string }).__OHUKAART_GEO_TEST__;
    if (testMode === 'deny') {
      return Promise.reject(new Error('GEOLOCATION_DENIED'));
    }
    if (testMode === 'timeout') {
      return Promise.reject(new Error('GEOLOCATION_TIMEOUT'));
    }
  }

  const mock = parseMockGps();
  if (mock) {
    return Promise.resolve(mock);
  }

  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return Promise.reject(new Error('GEOLOCATION_UNAVAILABLE'));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error('GEOLOCATION_DENIED'));
          return;
        }
        reject(new Error('GEOLOCATION_TIMEOUT'));
      },
      {
        enableHighAccuracy: true,
        timeout: GEOLOCATION_TIMEOUT_MS,
        maximumAge: 0,
      },
    );
  });
}

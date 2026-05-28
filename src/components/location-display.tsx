'use client';

import dynamic from 'next/dynamic';

import { formatCoordinate } from '@/lib/alert-validation';
import type { GeoPosition } from '@/lib/geolocation';

const MapView = dynamic(() => import('./map-view').then((mod) => mod.MapView), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-300" aria-hidden="true" />,
});

export type GeoErrorCode =
  | 'GEOLOCATION_DENIED'
  | 'GEOLOCATION_TIMEOUT'
  | 'GEOLOCATION_UNAVAILABLE';

export type LocationState =
  | { status: 'loading' }
  | { status: 'ready'; position: GeoPosition }
  | { status: 'error'; code: GeoErrorCode };

interface LocationDisplayProps {
  location: LocationState;
  onRetry: () => void;
}

function locationMessage(code: GeoErrorCode): string {
  switch (code) {
    case 'GEOLOCATION_DENIED':
      return 'Asukoha õigus on keelatud. Luba brauseris asukoht ja proovi uuesti.';
    case 'GEOLOCATION_TIMEOUT':
      return 'Asukoha tuvastamine ebaõnnestus. Proovi uuesti.';
    default:
      return 'Asukoht pole saadaval. Proovi uuesti.';
  }
}

export function LocationDisplay({ location, onRetry }: LocationDisplayProps) {
  if (location.status === 'loading') {
    return (
      <div className="relative min-h-0 flex-1 bg-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="rounded-full bg-white/90 px-3 py-1 text-sm text-slate-700 shadow">
            Tuvastan asukohta…
          </p>
        </div>
      </div>
    );
  }

  if (location.status === 'error') {
    return (
      <div className="relative min-h-0 flex-1 bg-slate-100 px-4 py-6">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-900" data-testid="location-error">
            {locationMessage(location.code)}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-900"
          >
            Proovi uuesti
          </button>
        </div>
      </div>
    );
  }

  const { latitude, longitude } = location.position;

  return (
    <div className="relative min-h-0 flex-1">
      <MapView latitude={latitude} longitude={longitude} />
      <div className="pointer-events-none absolute inset-x-0 bottom-[42%] z-[500] text-center">
        <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow">
          Sinu asukoht
        </span>
      </div>
      <p
        className="absolute inset-x-0 bottom-2 z-[500] px-4 text-center text-xs font-mono text-slate-700"
        data-testid="location-coordinates"
      >
        {formatCoordinate(latitude)}, {formatCoordinate(longitude)}
      </p>
    </div>
  );
}

export function LocationStatusBadge({ location }: { location: LocationState }) {
  if (location.status === 'ready') {
    return (
      <div
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5"
        role="status"
        aria-label="GPS asukoht tuvastatud"
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-ria-success" aria-hidden="true" />
        <span className="text-xs font-medium text-ria-success">Asukoht OK</span>
      </div>
    );
  }

  if (location.status === 'loading') {
    return (
      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
        Otsin asukohta…
      </div>
    );
  }

  return (
    <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
      Asukoht puudub
    </div>
  );
}

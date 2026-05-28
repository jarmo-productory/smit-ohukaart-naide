'use client';

import { useCallback, useEffect, useState } from 'react';

import { DispatcherAlertList } from '@/components/dispatcher-alert-list';
import type { Alert, AlertsListResponse } from '@/lib/alerts.types';

const REFRESH_INTERVAL_MS = 5_000;

export function DispatcherView() {
  const [alerts, setAlerts] = useState<Array<Alert & { textPreview: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAlerts = useCallback(async () => {
    try {
      const response = await fetch('/api/alerts', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Teavituste laadimine ebaõnnestus.');
      }
      const payload = (await response.json()) as AlertsListResponse;
      setAlerts(payload.alerts);
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : 'Teavituste laadimine ebaõnnestus.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAlerts();
    const timer = window.setInterval(() => {
      void loadAlerts();
    }, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [loadAlerts]);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <header className="mb-6 border-b border-slate-200 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ria-blue">Ohukaart</p>
        <h1 className="text-2xl font-semibold text-slate-900">Operatiivvaade (demo)</h1>
        <p className="mt-1 text-sm text-slate-600">
          Uued tekstiteavitused ilmuvad siia automaatselt. MVP stub — mitte päris 112 integratsioon.
        </p>
      </header>

      {isLoading ? (
        <p className="text-sm text-slate-600">Laadin teavitusi…</p>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </div>
      ) : null}

      <DispatcherAlertList alerts={alerts} />
    </div>
  );
}

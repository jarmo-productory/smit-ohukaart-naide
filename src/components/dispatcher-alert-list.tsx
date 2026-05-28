'use client';

import { formatCoordinate } from '@/lib/alert-validation';
import type { Alert, AlertStatus } from '@/lib/alerts.types';

interface DispatcherAlertListProps {
  alerts: Array<Alert & { textPreview: string }>;
}

function formatReceivedAt(iso: string): string {
  return new Intl.DateTimeFormat('et-EE', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(iso));
}

function statusLabel(status: AlertStatus): string {
  if (status === 'received') {
    return 'Vastu võetud';
  }
  return status;
}

export function DispatcherAlertList({ alerts }: DispatcherAlertListProps) {
  if (alerts.length === 0) {
    return (
      <div
        className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"
        data-testid="dispatcher-empty"
      >
        <p className="text-sm text-slate-600">Teavitusi pole veel saabunud.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" data-testid="dispatcher-alert-list">
      {alerts.map((alert) => (
        <li
          key={alert.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          data-testid="dispatcher-alert-item"
          data-alert-id={alert.id}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-mono text-sm font-semibold text-ria-blue">{alert.id}</p>
              <p className="mt-1 text-xs text-slate-500">{formatReceivedAt(alert.receivedAt)}</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-ria-success">
              {statusLabel(alert.status)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-800" data-testid="alert-text-preview">
            {alert.textPreview}
          </p>
          <p className="mt-2 font-mono text-xs text-slate-500" data-testid="alert-coordinates">
            {formatCoordinate(alert.latitude)}, {formatCoordinate(alert.longitude)}
          </p>
        </li>
      ))}
    </ul>
  );
}

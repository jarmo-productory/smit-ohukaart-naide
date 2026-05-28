'use client';

import type { StoredConfirmation } from '@/lib/alerts.types';

interface ConfirmationPanelProps {
  confirmation: StoredConfirmation;
  onBack: () => void;
}

export function ConfirmationPanel({ confirmation, onBack }: ConfirmationPanelProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-white" data-testid="confirmation">
      <header className="shrink-0 border-b border-slate-100 px-4 pb-4 pt-12">
        <h2 className="text-xl font-semibold text-slate-900">Vastu võetud</h2>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-ria-success"
          aria-hidden="true"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 text-lg font-medium text-slate-900">Teavitus on vastu võetud</p>
        <p className="mt-1 text-sm text-slate-600">
          ID: <span className="font-mono font-semibold">{confirmation.id}</span>
        </p>
        <p className="mt-4 text-xs text-slate-500">Asukoht ja tekst edastati operatiivkanalisse.</p>
      </div>
      <div className="px-4 pb-10">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[48px] w-full items-center justify-center rounded-lg border-2 border-slate-300 font-semibold text-slate-700"
        >
          Tagasi kaardile
        </button>
      </div>
    </div>
  );
}

interface SendingOverlayProps {
  slow: boolean;
}

export function SendingOverlay({ slow }: SendingOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/40 px-6 backdrop-blur-sm">
      <div className="w-full max-w-[280px] rounded-2xl bg-white p-6 text-center shadow-xl">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-ria-blue"
          role="status"
          aria-label="Saadan"
        />
        <p className="mt-4 font-medium text-slate-900">{slow ? 'Saadan… see võtab hetke' : 'Saadan…'}</p>
      </div>
    </div>
  );
}

interface SendErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export function SendErrorBanner({ message, onRetry }: SendErrorBannerProps) {
  return (
    <div className="border-t border-red-100 bg-red-50 px-4 py-3" data-testid="send-error">
      <p className="text-sm font-medium text-red-800">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 text-sm font-semibold text-red-900 underline"
      >
        Proovi uuesti
      </button>
    </div>
  );
}

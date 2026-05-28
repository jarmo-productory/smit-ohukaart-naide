'use client';

import { useCallback, useEffect, useState } from 'react';

import { AlertForm, validateAlertText } from '@/components/alert-form';
import {
  ConfirmationPanel,
  SendErrorBanner,
  SendingOverlay,
} from '@/components/confirmation-panel';
import {
  LocationDisplay,
  LocationStatusBadge,
  type GeoErrorCode,
  type LocationState,
} from '@/components/location-display';
import type { AlertResponse, StoredConfirmation } from '@/lib/alerts.types';
import {
  CONFIRMATION_STORAGE_KEY,
  SEND_SLOW_THRESHOLD_MS,
  SEND_TIMEOUT_MS,
} from '@/lib/alerts.types';
import { getCurrentPosition } from '@/lib/geolocation';

type Screen = 'form' | 'confirmation';

export function CitizenAlertFlow() {
  const [screen, setScreen] = useState<Screen>('form');
  const [text, setText] = useState('');
  const [textError, setTextError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationState>({ status: 'loading' });
  const [confirmation, setConfirmation] = useState<StoredConfirmation | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [slowSend, setSlowSend] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const loadLocation = useCallback(async () => {
    setLocation({ status: 'loading' });
    try {
      const position = await getCurrentPosition();
      setLocation({ status: 'ready', position });
    } catch (error) {
      const code =
        error instanceof Error &&
        (error.message === 'GEOLOCATION_DENIED' ||
          error.message === 'GEOLOCATION_TIMEOUT' ||
          error.message === 'GEOLOCATION_UNAVAILABLE')
          ? error.message
          : 'GEOLOCATION_UNAVAILABLE';
      setLocation({
        status: 'error',
        code: code as GeoErrorCode,
      });
    }
  }, []);

  useEffect(() => {
    void loadLocation();
  }, [loadLocation]);

  useEffect(() => {
    const stored = sessionStorage.getItem(CONFIRMATION_STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as StoredConfirmation;
      setConfirmation(parsed);
      setScreen('confirmation');
    } catch {
      sessionStorage.removeItem(CONFIRMATION_STORAGE_KEY);
    }
  }, []);

  const canSend = location.status === 'ready' && !isSending;

  const handleSend = async () => {
    const validationError = validateAlertText(text);
    if (validationError) {
      setTextError(validationError);
      return;
    }

    if (location.status !== 'ready') {
      return;
    }

    setTextError(null);
    setSendError(null);
    setIsSending(true);
    setSlowSend(false);

    const slowTimer = window.setTimeout(() => {
      setSlowSend(true);
    }, SEND_SLOW_THRESHOLD_MS);

    const controller = new AbortController();
    const timeoutTimer = window.setTimeout(() => {
      controller.abort();
    }, SEND_TIMEOUT_MS);

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          latitude: location.position.latitude,
          longitude: location.position.longitude,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? 'Teavituse saatmine ebaõnnestus. Proovi uuesti.');
      }

      const payload = (await response.json()) as AlertResponse;
      const storedConfirmation: StoredConfirmation = {
        id: payload.id,
        receivedAt: payload.receivedAt,
      };

      sessionStorage.setItem(CONFIRMATION_STORAGE_KEY, JSON.stringify(storedConfirmation));
      setConfirmation(storedConfirmation);
      setText('');
      setScreen('confirmation');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setSendError('Teavituse saatmine võttis liiga kaua aega. Proovi uuesti.');
      } else {
        setSendError(
          error instanceof Error
            ? error.message
            : 'Teavituse saatmine ebaõnnestus. Proovi uuesti.',
        );
      }
    } finally {
      window.clearTimeout(slowTimer);
      window.clearTimeout(timeoutTimer);
      setIsSending(false);
      setSlowSend(false);
    }
  };

  const handleBackToForm = () => {
    sessionStorage.removeItem(CONFIRMATION_STORAGE_KEY);
    setConfirmation(null);
    setScreen('form');
    setSendError(null);
    void loadLocation();
  };

  return (
    <div
      className="phone-frame relative flex h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-[2rem] border border-slate-300 bg-white shadow-xl max-[420px]:h-[100dvh] max-[420px]:w-full max-[420px]:rounded-none max-[420px]:border-0 max-[420px]:shadow-none"
      role="application"
      aria-label="Ohukaart ohuteavitus"
    >
      {screen === 'confirmation' && confirmation ? (
        <ConfirmationPanel confirmation={confirmation} onBack={handleBackToForm} />
      ) : (
        <>
          <div className="relative flex min-h-0 flex-1 flex-col">
            <LocationDisplay location={location} onRetry={() => void loadLocation()} />

            <header className="absolute inset-x-0 top-0 z-[500] border-b border-slate-200 bg-white/95 px-4 pb-3 pt-12 shadow-sm backdrop-blur-sm">
              <div className="flex min-h-[48px] items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ria-blue">
                    Ohukaart
                  </p>
                  <h1 className="truncate text-lg font-semibold leading-tight text-slate-900">
                    Ohuteavitus
                  </h1>
                </div>
                <LocationStatusBadge location={location} />
              </div>
            </header>

            <div className="relative z-10 shrink-0 rounded-t-2xl border-t border-slate-700 bg-slate-900 shadow-[0_-4px_24px_rgba(0,0,0,.35)]">
              <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-600" aria-hidden="true" />
              <div className="max-h-[220px] overflow-y-auto px-4 pb-2 pt-3">
                <AlertForm
                  value={text}
                  onChange={(value) => {
                    setText(value);
                    if (textError) {
                      setTextError(null);
                    }
                  }}
                  error={textError}
                  disabled={isSending}
                />
              </div>
            </div>

            <footer className="relative z-10 shrink-0 border-t border-slate-200 bg-white px-4 pb-8 pt-3">
              <button
                type="button"
                data-testid="send-button"
                disabled={!canSend}
                onClick={() => void handleSend()}
                className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-ria-blue text-lg font-semibold text-white active:bg-ria-blue-dark focus:outline-none focus:ring-2 focus:ring-ria-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Saada teavitus
              </button>
            </footer>
          </div>

          {sendError ? <SendErrorBanner message={sendError} onRetry={() => setSendError(null)} /> : null}
          {isSending ? <SendingOverlay slow={slowSend} /> : null}
        </>
      )}
    </div>
  );
}

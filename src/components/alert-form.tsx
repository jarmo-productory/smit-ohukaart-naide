'use client';

import { MIN_TEXT_LENGTH, MAX_TEXT_LENGTH } from '@/lib/alerts.types';

interface AlertFormProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  disabled?: boolean;
}

export function AlertForm({ value, onChange, error, disabled = false }: AlertFormProps) {
  return (
    <div>
      <label htmlFor="alert-text" className="text-xs font-medium uppercase tracking-wide text-slate-400">
        Kirjeldus
      </label>
      <textarea
        id="alert-text"
        data-testid="alert-text"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Kirjelda lühidalt, mis ohtu märkasid…"
        rows={4}
        maxLength={MAX_TEXT_LENGTH}
        className="mt-1 w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-base leading-relaxed text-slate-100 placeholder:text-slate-500 focus:border-ria-blue focus:outline-none focus:ring-2 focus:ring-ria-blue/40 disabled:opacity-60"
      />
      <div className="mt-2 flex items-start justify-between gap-3">
        <p className="text-xs text-slate-500">Vähemalt {MIN_TEXT_LENGTH} tähemärki.</p>
        <p className="text-xs text-slate-500">
          {value.trim().length}/{MAX_TEXT_LENGTH}
        </p>
      </div>
      {error ? (
        <p className="mt-2 text-sm text-red-400" role="alert" data-testid="alert-text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function validateAlertText(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Kirjeldus on kohustuslik.';
  }
  if (trimmed.length < MIN_TEXT_LENGTH) {
    return `Kirjeldus peab olema vähemalt ${MIN_TEXT_LENGTH} tähemärki.`;
  }
  if (trimmed.length > MAX_TEXT_LENGTH) {
    return `Kirjeldus võib olla kuni ${MAX_TEXT_LENGTH} tähemärki.`;
  }
  return null;
}

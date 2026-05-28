interface AlertStoreState {
  alerts: import('./alerts.types').Alert[];
  sequence: number;
}

const globalStore = globalThis as typeof globalThis & {
  __ohukaartAlertStore?: AlertStoreState;
};

function getStore(): AlertStoreState {
  if (!globalStore.__ohukaartAlertStore) {
    globalStore.__ohukaartAlertStore = { alerts: [], sequence: 0 };
  }
  return globalStore.__ohukaartAlertStore;
}

export function generateAlertId(): string {
  const store = getStore();
  store.sequence += 1;
  const year = new Date().getFullYear();
  return `OHU-${year}-${String(store.sequence).padStart(6, '0')}`;
}

export function addAlert(alert: import('./alerts.types').Alert): void {
  getStore().alerts.unshift(alert);
}

export function listAlerts(): import('./alerts.types').Alert[] {
  return [...getStore().alerts];
}

export function textPreview(text: string): string {
  if (text.length <= 500) {
    return text;
  }
  return `${text.slice(0, 500)}…`;
}

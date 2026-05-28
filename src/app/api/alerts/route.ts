import { NextResponse } from 'next/server';

import { addAlert, generateAlertId, listAlerts, textPreview } from '@/lib/alert-store';
import type { Alert, AlertResponse, AlertsListResponse } from '@/lib/alerts.types';
import { createAlertSchema, hasMinimumCoordinatePrecision } from '@/lib/alert-validation';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Vigane JSON.' }, { status: 400 });
  }

  const parsed = createAlertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Vigased andmed.' },
      { status: 400 },
    );
  }

  const { text, latitude, longitude } = parsed.data;

  if (!hasMinimumCoordinatePrecision(latitude) || !hasMinimumCoordinatePrecision(longitude)) {
    return NextResponse.json(
      { error: 'GPS-koordinaatide täpsus peab olema vähemalt 4 komakohta.' },
      { status: 400 },
    );
  }

  const alert: Alert = {
    id: generateAlertId(),
    text,
    latitude,
    longitude,
    receivedAt: new Date().toISOString(),
    status: 'received',
  };

  addAlert(alert);

  const response: AlertResponse = {
    id: alert.id,
    receivedAt: alert.receivedAt,
    status: alert.status,
  };

  return NextResponse.json(response, { status: 201 });
}

export async function GET() {
  const alerts = listAlerts().map((alert) => ({
    ...alert,
    textPreview: textPreview(alert.text),
  }));

  const response: AlertsListResponse = { alerts };
  return NextResponse.json(response);
}

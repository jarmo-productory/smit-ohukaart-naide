import { expect, test } from './test-fixture';

const VALID_TEXT =
  'Kõnnitee servas on suur pragu, ohtlik jalakäijatele. Asukoht on bussipeatuse kõrval.';

function percentile(values: number[], p: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

test.describe('S11, S12 — latentsus', () => {
  test('S11: kinnitus kuvatakse ≤5 s (p95 üle 20 korduse)', async ({ page }) => {
    const durations: number[] = [];

    for (let i = 0; i < 20; i += 1) {
      await page.goto('/');
      await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
      await page.getByTestId('alert-text').fill(`${VALID_TEXT} (${i + 1})`);

      const start = Date.now();
      await page.getByTestId('send-button').click();
      await expect(page.getByTestId('confirmation')).toBeVisible({ timeout: 10_000 });
      durations.push(Date.now() - start);

      await page.getByRole('button', { name: 'Tagasi kaardile' }).click();
    }

    const p95 = percentile(durations, 95);
    expect(p95).toBeLessThanOrEqual(5_000);
  });
});

test.describe('S9 — HTTPS (local)', () => {
  test('S9: API kasutab suhtelist URL-i (HTTPS deploy preview jaoks)', async ({ page }) => {
    let requestUrl = '';
    await page.route('**/api/alerts', async (route) => {
      requestUrl = route.request().url();
      await route.continue();
    });

    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();
    await expect(page.getByTestId('confirmation')).toBeVisible({ timeout: 10_000 });

    expect(requestUrl).toMatch(/\/api\/alerts$/);
    expect(requestUrl.startsWith('http://127.0.0.1') || requestUrl.startsWith('http://localhost')).toBeTruthy();
  });
});

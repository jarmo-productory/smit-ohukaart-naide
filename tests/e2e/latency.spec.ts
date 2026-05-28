import { expect, test } from './test-fixture';

const VALID_TEXT =
  'Kõnnitee servas on suur pragu, ohtlik jalakäijatele. Asukoht on bussipeatuse kõrval.';

function percentile(values: number[], p: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

test.describe('S11, S12 — latentsus', () => {
  test('S11 (R6): kinnitus kuvatakse ≤5 s (p95 üle 20 korduse)', async ({ page }) => {
    test.setTimeout(120_000);
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

  test('S12 (R6): pikka ootamist ei jäeta vaikimisi hangunuks — laadimise olek', async ({ page }) => {
    await page.route('**/api/alerts', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 6_000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'OHU-SLOW-TEST',
          receivedAt: new Date().toISOString(),
          status: 'received',
        }),
      });
    });

    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();

    await expect(page.getByRole('status', { name: 'Saadan' })).toBeVisible();
    await expect(page.getByText('Saadan… see võtab hetke')).toBeVisible({ timeout: 6_500 });
    await expect(page.getByTestId('confirmation')).toBeVisible({ timeout: 10_000 });
  });

  test('S12 (R6): 30 s timeout näitab veateadet ja Proovi uuesti', async ({ page }) => {
    test.setTimeout(45_000);
    await page.route('**/api/alerts', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 35_000));
      await route.continue();
    });

    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();

    const error = page.getByTestId('send-error');
    await expect(error).toBeVisible({ timeout: 35_000 });
    await expect(error).toContainText('liiga kaua aega');
    await expect(page.getByRole('button', { name: 'Proovi uuesti' })).toBeVisible();
    await expect(page.getByTestId('confirmation')).not.toBeVisible();
  });
});

test.describe('S9, S10 — HTTPS', () => {
  test('S9 (R5): API kasutab suhtelist URL-i (HTTPS deploy preview jaoks)', async ({ page }) => {
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

  test.skip('S10 (R5): HTTP fallback puudub Deploy Preview keskkonnas', () => {
    // Käsitsi QA merge gate — vt tasks.md § Deploy Preview QA; URL TBD PR-i tekkimisel.
  });
});

import { expect, test } from './test-fixture';

const VALID_TEXT =
  'Kõnnitee servas on suur pragu, ohtlik jalakäijatele. Asukoht on bussipeatuse kõrval.';

test.describe('S1, S2, S5, S6 — kodaniku saatmine', () => {
  test('S1/S5: kehtiv teavitus saadetakse ja kinnitus kuvatakse', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();

    const confirmation = page.getByTestId('confirmation');
    await expect(confirmation).toBeVisible({ timeout: 10_000 });
    await expect(confirmation).toContainText('Teavitus on vastu võetud');
    await expect(confirmation).toContainText('OHU-');
  });

  test('S2: liiga lühike tekst näitab veateadet', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill('lühike');
    await page.getByTestId('send-button').click();

    await expect(page.getByTestId('alert-text-error')).toBeVisible();
    await expect(page.getByTestId('confirmation')).not.toBeVisible();
  });

  test('S6: API viga ei näita valepositiivset kinnitust', async ({ page }) => {
    await page.route('**/api/alerts', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"Serveri viga"}' }),
    );

    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();

    await expect(page.getByTestId('send-error')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('confirmation')).not.toBeVisible();
  });
});

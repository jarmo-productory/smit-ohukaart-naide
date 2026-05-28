import { expect, test } from './test-fixture';

test.describe('S3, S4 — GPS', () => {
  test('S3: mock GPS kuvatakse enne saatmist', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId('location-coordinates')).toContainText('59.436962');
    await expect(page.getByTestId('location-coordinates')).toContainText('24.753574');
  });

  test('S4: GPS puudumine blokeerib saatmise', async ({ page }) => {
    await page.addInitScript(() => {
      (window as Window & { __OHUKAART_GEO_TEST__?: string }).__OHUKAART_GEO_TEST__ = 'deny';
    });

    await page.goto('/');

    await expect(page.getByTestId('location-error')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId('send-button')).toBeDisabled();
  });
});

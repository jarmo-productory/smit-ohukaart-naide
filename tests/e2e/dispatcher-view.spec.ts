import { expect, test } from './test-fixture';

const VALID_TEXT =
  'Kõnnitee servas on suur pragu, ohtlik jalakäijatele. Asukoht on bussipeatuse kõrval.';

test.describe('S7, S8 — dispetšeri operatiivvaade', () => {
  test('S7: edukalt saadetud teavitus ilmub operatiivvaates', async ({ page, request }) => {
    const postResponse = await request.post('/api/alerts', {
      data: {
        text: VALID_TEXT,
        latitude: 59.436962,
        longitude: 24.753574,
      },
    });
    expect(postResponse.ok()).toBeTruthy();
    const created = (await postResponse.json()) as { id: string };

    await page.goto('/dispatcher');
    const item = page.locator(`[data-alert-id="${created.id}"]`);
    await expect(item).toBeVisible({ timeout: 10_000 });
    await expect(item).toContainText(created.id);
    await expect(item.getByTestId('alert-text-preview')).toContainText('Kõnnitee servas');
    await expect(item.getByTestId('alert-coordinates')).toContainText('59.436962');
    await expect(item).toContainText('Vastu võetud');
  });

  test('S8: ebaõnnestunud saatmine ei ilmu operatiivvaates', async ({ page }) => {
    await page.goto('/dispatcher');
    const beforeCount = await page.getByTestId('dispatcher-alert-item').count();

    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.route('**/api/alerts', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"Serveri viga"}' }),
    );
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();
    await expect(page.getByTestId('send-error')).toBeVisible({ timeout: 10_000 });

    await page.goto('/dispatcher');
    const afterCount = await page.getByTestId('dispatcher-alert-item').count();
    expect(afterCount).toBe(beforeCount);
  });
});

import { expect, test } from './test-fixture';

const VALID_TEXT =
  'Kõnnitee servas on suur pragu, ohtlik jalakäijatele. Asukoht on bussipeatuse kõrval.';

test.describe('S1, S2, S5, S6 — kodaniku saatmine', () => {
  test('S1 (R1): kehtiv teavitus saadetakse serverisse', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);

    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('/api/alerts') && res.request().method() === 'POST',
      ),
      page.getByTestId('send-button').click(),
    ]);

    const payload = response.request().postDataJSON() as {
      text: string;
      latitude: number;
      longitude: number;
    };
    const responseBody = (await response.json()) as { id: string; receivedAt: string };

    await expect(page.getByTestId('confirmation')).toBeVisible({ timeout: 10_000 });

    expect(payload).toMatchObject({
      text: VALID_TEXT,
      latitude: 59.436962,
      longitude: 24.753574,
    });
    expect(responseBody.id).toMatch(/^OHU-/);
    expect(responseBody.receivedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test('S5 (R3): vastuvõtukinnitus sisaldab ID-d ja säilib sessioonis', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();

    const confirmation = page.getByTestId('confirmation');
    await expect(confirmation).toBeVisible({ timeout: 10_000 });
    await expect(confirmation).toContainText('Teavitus on vastu võetud');
    await expect(confirmation).toContainText('OHU-');

    const stored = await page.evaluate(() =>
      sessionStorage.getItem('ohukaart-last-confirmation'),
    );
    expect(stored).toMatch(/OHU-/);
  });

  test('S2 (R1): liiga lühike tekst blokeerib saatmise', async ({ page }) => {
    let postCalled = false;
    await page.route('**/api/alerts', async (route) => {
      if (route.request().method() === 'POST') {
        postCalled = true;
      }
      await route.continue();
    });

    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill('lühike');
    await page.getByTestId('send-button').click();

    const error = page.getByTestId('alert-text-error');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Kirjeldus peab olema vähemalt 10 tähemärki.');
    await expect(page.getByTestId('confirmation')).not.toBeVisible();
    expect(postCalled).toBe(false);
  });

  test('S6 (R3): serveri viga ei näita valepositiivset kinnitust', async ({ page }) => {
    await page.route('**/api/alerts', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"Serveri viga"}' }),
    );

    await page.goto('/');
    await expect(page.getByText('Asukoht OK')).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('alert-text').fill(VALID_TEXT);
    await page.getByTestId('send-button').click();

    await expect(page.getByTestId('send-error')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('confirmation')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Proovi uuesti' })).toBeVisible();
  });
});

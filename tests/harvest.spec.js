import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('Basket Fruits').click();
  await page.getByLabel('Basket Fruits').fill('🍎🍂🍎🍂🍂🍂🍂🍎🍂AAS🍏');
  await page.getByRole('button', { name: 'Clean basket' }).click();
  await expect(page.getByLabel('Basket Fruits')).toHaveValue('🍎🍎🍎🍏');

  await page.getByRole('button', { name: 'Sent to warehouse' }).click();
  await expect(page.getByLabel('Basket Fruits')).toHaveValue('');
});

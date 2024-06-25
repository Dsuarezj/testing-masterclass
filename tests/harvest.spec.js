import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  let fruitsBasket = 'Fruits\' basket';
  await page.getByLabel(fruitsBasket).click();
  await page.getByLabel(fruitsBasket).fill('🍎🍂🍎🍂🍂🍂🍂🍎🍂AAS🍏');
  await page.getByRole('button', { name: 'Clean basket' }).click();
  await expect(page.getByLabel(fruitsBasket)).toHaveValue('🍎🍎🍎🍏');

  await page.getByRole('button', { name: 'Sent to warehouse' }).click();
  await expect(page.getByLabel(fruitsBasket)).toHaveValue('');
});

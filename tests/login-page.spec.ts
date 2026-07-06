import { test, expect } from '@playwright/test';

test('should display login page elements', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

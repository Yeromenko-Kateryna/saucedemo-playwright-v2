import { test, expect } from '@playwright/test';

test('TC-INV-001 - should display inventory page after successful login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
});
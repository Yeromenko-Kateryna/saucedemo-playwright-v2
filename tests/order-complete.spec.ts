import { test, expect } from '@playwright/test';
import { openCheckoutOverview } from './saucedemo-test-helpers';

test('TC-COMPLETE-001 - should display order completion confirmation', async ({ page }) => {
  await openCheckoutOverview(page);
  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    'Thank you for your order!',
  );
  await expect(page.locator('[data-test="complete-text"]')).toHaveText(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
  );
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});

test('TC-COMPLETE-002 - should return to inventory after clicking Back Home', async ({ page }) => {
  await openCheckoutOverview(page);
  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL(/\/checkout-complete\.html$/);

  await page.locator('[data-test="back-to-products"]').click();

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
});

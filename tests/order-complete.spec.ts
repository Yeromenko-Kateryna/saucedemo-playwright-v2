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

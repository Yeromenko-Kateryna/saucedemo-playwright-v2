import { test, expect } from '@playwright/test';
import { openCheckoutOverview } from './saucedemo-test-helpers';

test('TC-CHK2-004 - should complete the order after clicking Finish', async ({ page }) => {
  await openCheckoutOverview(page);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  await expect(page.locator('[data-test="finish"]')).toBeVisible();

  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL(/.*checkout-complete.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    'Thank you for your order!',
  );
  await expect(page.locator('[data-test="error"]')).toHaveCount(0);
});

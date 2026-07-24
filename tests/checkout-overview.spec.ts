import { test, expect } from '@playwright/test';
import { openCheckoutOverview } from './saucedemo-test-helpers';

test('TC-CHK2-001 - should display checkout overview correctly', async ({ page }) => {
  await openCheckoutOverview(page);

  await expect(page).toHaveURL(/.*checkout-step-two.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  await expect(page.locator('[data-test="payment-info-label"]')).toHaveText(
    'Payment Information:',
  );
  await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText(
    'Shipping Information:',
  );
  await expect(page.locator('[data-test="total-info-label"]')).toHaveText('Price Total');
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="error"]')).toHaveCount(0);
});

test('TC-CHK2-002 - should display selected product on checkout overview', async ({ page }) => {
  await openCheckoutOverview(page);

  const overviewItem = page.locator('[data-test="inventory-item"]');
  const productDescription = overviewItem.locator('[data-test="inventory-item-desc"]');

  await expect(overviewItem).toHaveCount(1);
  await expect(overviewItem.locator('[data-test="item-quantity"]')).toHaveText('1');
  await expect(overviewItem.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Backpack',
  );
  await expect(productDescription).toBeVisible();
  await expect(productDescription).not.toHaveText('');
  await expect(overviewItem.locator('[data-test="inventory-item-price"]')).toHaveText(
    '$29.99',
  );
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

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

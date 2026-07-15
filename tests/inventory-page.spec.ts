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

test('TC-INV-002 - should display required product card information', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const firstProductCard = page.locator('[data-test="inventory-item"]').first();

  await expect(firstProductCard.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(firstProductCard.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(firstProductCard.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(firstProductCard.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await expect(firstProductCard.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
});

test('TC-INV-003 - should add one product to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

  await page.locator('[data-test="shopping-cart-link"]').click();

  const cartItem = page.locator('[data-test="inventory-item"]').first();

  await expect(cartItem.locator('[data-test="item-quantity"]')).toHaveText('1');
  await expect(cartItem.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
  await expect(cartItem.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(cartItem.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});

test('TC-INV-004 - should remove one product from the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  const cartItem = page.locator('[data-test="inventory-item"]').first();

  await expect(cartItem.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="item-4-title-link"]')).not.toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
});
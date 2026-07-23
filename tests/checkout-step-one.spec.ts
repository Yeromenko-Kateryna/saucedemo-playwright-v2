import { test, expect } from '@playwright/test';

test('TC-CHK1-001 - should display checkout step one form correctly', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();

  await page.locator('[data-test="checkout"]').click();

  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
  await expect(page.locator('[data-test="checkout-info-container"]')).toBeVisible();
  await expect(page.locator('[data-test="firstName"]')).toBeVisible();
  await expect(page.locator('[data-test="lastName"]')).toBeVisible();
  await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="error"]')).toHaveCount(0);
});

test('TC-CHK1-002 - should show error when first name is missing', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: First Name is required',
  );
  await expect(page.locator('[data-test="firstName"]')).toHaveValue('');
  await expect(page.locator('[data-test="lastName"]')).toHaveValue('Tester');
  await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
});

import { test, expect } from '@playwright/test';
import { openCheckoutStepOneWithBackpack, testData } from './saucedemo-test-helpers';

test('TC-CHK1-001 - should display checkout step one form correctly', async ({ page }) => {
  await openCheckoutStepOneWithBackpack(page);
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
  await openCheckoutStepOneWithBackpack(page);

  await page.locator('[data-test="lastName"]').fill(testData.checkout.lastName);
  await page.locator('[data-test="postalCode"]').fill(testData.checkout.postalCode);
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: First Name is required',
  );
  await expect(page.locator('[data-test="firstName"]')).toHaveValue('');
  await expect(page.locator('[data-test="lastName"]')).toHaveValue(testData.checkout.lastName);
  await expect(page.locator('[data-test="postalCode"]')).toHaveValue(testData.checkout.postalCode);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
});

test('TC-CHK1-003 - should show error when last name is missing', async ({ page }) => {
  await openCheckoutStepOneWithBackpack(page);

  await page.locator('[data-test="firstName"]').fill(testData.checkout.firstName);
  await page.locator('[data-test="postalCode"]').fill(testData.checkout.postalCode);
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: Last Name is required',
  );
  await expect(page.locator('[data-test="firstName"]')).toHaveValue(testData.checkout.firstName);
  await expect(page.locator('[data-test="lastName"]')).toHaveValue('');
  await expect(page.locator('[data-test="postalCode"]')).toHaveValue(testData.checkout.postalCode);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
});

test('TC-CHK1-004 - should show error when postal code is missing', async ({ page }) => {
  await openCheckoutStepOneWithBackpack(page);

  await page.locator('[data-test="firstName"]').fill(testData.checkout.firstName);
  await page.locator('[data-test="lastName"]').fill(testData.checkout.lastName);
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: Postal Code is required',
  );
  await expect(page.locator('[data-test="firstName"]')).toHaveValue(testData.checkout.firstName);
  await expect(page.locator('[data-test="lastName"]')).toHaveValue(testData.checkout.lastName);
  await expect(page.locator('[data-test="postalCode"]')).toHaveValue('');
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
});

test('TC-CHK1-005 - should continue with valid checkout information', async ({ page }) => {
  await openCheckoutStepOneWithBackpack(page);

  await page.locator('[data-test="firstName"]').fill(testData.checkout.firstName);
  await page.locator('[data-test="lastName"]').fill(testData.checkout.lastName);
  await page.locator('[data-test="postalCode"]').fill(testData.checkout.postalCode);
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/.*checkout-step-two.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  await expect(page.locator('[data-test="error"]')).toHaveCount(0);
});

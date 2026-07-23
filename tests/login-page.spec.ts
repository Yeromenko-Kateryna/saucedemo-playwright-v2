import { test, expect } from '@playwright/test';
import { login, testData } from './saucedemo-test-helpers';

test('TC-LOGIN-001 - should display login page elements', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('TC-LOGIN-002 - should login with valid credentials', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('TC-LOGIN-003 - should show error for invalid credentials', async ({ page }) => {
  await login(page, 'invalid_user', 'invalid_password');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
  await expect(page).toHaveURL('/');
});

test('TC-LOGIN-004 - should show error for locked out user', async ({ page }) => {
  await login(page, 'locked_out_user', testData.credentials.password);

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
  await expect(page).toHaveURL('/');
});

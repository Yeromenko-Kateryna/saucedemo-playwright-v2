import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './saucedemo-test-helpers';

test('TC-MENU-001 - should open sidebar menu and display navigation items', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByRole('button', { name: 'Open Menu' }).click();

  const allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
  const aboutLink = page.locator('[data-test="about-sidebar-link"]');
  const logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  const resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
  const closeMenuButton = page.getByRole('button', { name: 'Close Menu' });

  await expect(allItemsLink).toBeVisible();
  await expect(allItemsLink).toHaveText('All Items');
  await expect(aboutLink).toBeVisible();
  await expect(aboutLink).toHaveText('About');
  await expect(logoutLink).toBeVisible();
  await expect(logoutLink).toHaveText('Logout');
  await expect(resetAppStateLink).toBeVisible();
  await expect(resetAppStateLink).toHaveText('Reset App State');
  await expect(closeMenuButton).toBeVisible();
});

test('TC-MENU-002 - should close sidebar menu', async ({ page }) => {
  await loginAsStandardUser(page);

  const openMenuButton = page.getByRole('button', { name: 'Open Menu' });
  const closeMenuButton = page.getByRole('button', { name: 'Close Menu' });

  await openMenuButton.click();

  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
  await expect(closeMenuButton).toBeVisible();

  await closeMenuButton.click();

  await expect(page.locator('[data-test="inventory-sidebar-link"]')).not.toBeVisible();
  await expect(page.locator('[data-test="about-sidebar-link"]')).not.toBeVisible();
  await expect(page.locator('[data-test="logout-sidebar-link"]')).not.toBeVisible();
  await expect(page.locator('[data-test="reset-sidebar-link"]')).not.toBeVisible();
  await expect(openMenuButton).toBeVisible();
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('TC-MENU-003 - should navigate to inventory through All Items', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="item-4-title-link"]').click();

  await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Backpack',
  );

  await page.getByRole('button', { name: 'Open Menu' }).click();

  const allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');

  await expect(allItemsLink).toBeVisible();
  await allItemsLink.click();

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  await expect(allItemsLink).not.toBeVisible();
});

test('TC-MENU-004 - should navigate to Sauce Labs through About', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByRole('button', { name: 'Open Menu' }).click();

  const aboutLink = page.locator('[data-test="about-sidebar-link"]');

  await expect(aboutLink).toBeVisible();
  await aboutLink.click();

  await expect(page).toHaveURL(/^https:\/\/(?:www\.)?saucelabs\.com\/?/);
});

test('TC-MENU-005 - should log out through sidebar menu', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByRole('button', { name: 'Open Menu' }).click();

  const logoutLink = page.locator('[data-test="logout-sidebar-link"]');

  await expect(logoutLink).toBeVisible();
  await logoutLink.click();

  await expect(page).toHaveURL(/^https:\/\/www\.saucedemo\.com\/$/);
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toHaveCount(0);

  await page.reload();

  await expect(page).toHaveURL(/^https:\/\/www\.saucedemo\.com\/$/);
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

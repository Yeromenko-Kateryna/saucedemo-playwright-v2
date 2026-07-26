import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './saucedemo-test-helpers';

test('TC-MENU-001 - should open sidebar menu and display navigation items', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByRole('button', { name: 'Open Menu' }).click();

  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toHaveText('All Items');
  await expect(page.locator('[data-test="about-sidebar-link"]')).toHaveText('About');
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toHaveText('Logout');
  await expect(page.locator('[data-test="reset-sidebar-link"]')).toHaveText('Reset App State');
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

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

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

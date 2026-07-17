import { test, expect } from '@playwright/test';

test('TC-CART-001 - should display one added product on cart page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
  await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
});

test('TC-CART-002 - should remove product from cart page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
});

test('TC-CART-003 - should continue shopping from cart page and preserve cart state', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

  await page.locator('[data-test="continue-shopping"]').click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});

test('TC-CART-004 - should open checkout step one page from cart page', async ({ page }) => {
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
});

test('TC-CART-005 - should display multiple added products on cart page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

  const cartItems = page.locator('[data-test="inventory-item"]');

  await expect(cartItems).toHaveCount(2);

  const backpackCartItem = cartItems.filter({
    hasText: 'Sauce Labs Backpack',
  });

  const bikeLightCartItem = cartItems.filter({
    hasText: 'Sauce Labs Bike Light',
  });

  await expect(backpackCartItem).toHaveCount(1);
  await expect(backpackCartItem.locator('[data-test="item-quantity"]')).toHaveText('1');
  await expect(backpackCartItem.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Backpack',
  );
  await expect(backpackCartItem.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(backpackCartItem.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(backpackCartItem.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

  await expect(bikeLightCartItem).toHaveCount(1);
  await expect(bikeLightCartItem.locator('[data-test="item-quantity"]')).toHaveText('1');
  await expect(bikeLightCartItem.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Bike Light',
  );
  await expect(bikeLightCartItem.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(bikeLightCartItem.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');
  await expect(bikeLightCartItem.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
});

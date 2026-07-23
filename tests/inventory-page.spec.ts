import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './saucedemo-test-helpers';

test('TC-INV-001 - should display inventory page after successful login', async ({ page }) => {
  await loginAsStandardUser(page);

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
});

test('TC-INV-002 - should display required product card information', async ({ page }) => {
  await loginAsStandardUser(page);

  const firstProductCard = page.locator('[data-test="inventory-item"]').first();

  await expect(firstProductCard.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(firstProductCard.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(firstProductCard.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(
    firstProductCard.locator('[data-test="inventory-item-sauce-labs-backpack-img"]'),
  ).toBeVisible();
  await expect(firstProductCard.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
});

test('TC-INV-003 - should add one product to the cart', async ({ page }) => {
  await loginAsStandardUser(page);

  const addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  await addBackpackButton.click();

  await expect(removeBackpackButton).toBeVisible();
  await expect(addBackpackButton).toHaveCount(0);
  await expect(cartBadge).toHaveText('1');
});

test('TC-INV-004 - should remove one product from the inventory page', async ({ page }) => {
  await loginAsStandardUser(page);

  const addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  await addBackpackButton.click();

  await expect(removeBackpackButton).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  await removeBackpackButton.click();

  await expect(addBackpackButton).toBeVisible();
  await expect(removeBackpackButton).toHaveCount(0);
  await expect(cartBadge).toHaveCount(0);
});

test('TC-INV-005 - should add multiple different products to the cart', async ({ page }) => {
  await loginAsStandardUser(page);

  const addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const addBikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  const removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  const removeBikeLightButton = page.locator('[data-test="remove-sauce-labs-bike-light"]');
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  await addBackpackButton.click();

  await expect(removeBackpackButton).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  await addBikeLightButton.click();

  await expect(removeBackpackButton).toBeVisible();
  await expect(removeBikeLightButton).toBeVisible();
  await expect(addBackpackButton).toHaveCount(0);
  await expect(addBikeLightButton).toHaveCount(0);
  await expect(cartBadge).toHaveText('2');
});

test('TC-INV-006 - should open product details page from product name', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="item-4-title-link"]').click();

  await expect(page).toHaveURL(/.*inventory-item.html\?id=4/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});

test('TC-INV-007 - should open product details page from product image', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="item-4-img-link"]').click();

  await expect(page).toHaveURL(/.*inventory-item.html\?id=4/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});

test('TC-INV-008 - should return to inventory page from product details page', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="item-4-title-link"]').click();

  await expect(page).toHaveURL(/.*inventory-item.html\?id=4/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

  await page.locator('[data-test="back-to-products"]').click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
});

test('TC-INV-009 - should sort products by name A to Z', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await page.locator('[data-test="product-sort-container"]').selectOption('az');

  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ]);
});

test('TC-INV-010 - should sort products by name Z to A', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('za');

  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Onesie',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Bike Light',
    'Sauce Labs Backpack',
  ]);
});

test('TC-INV-011 - should sort products by price low to high', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceLocator = page.locator('[data-test="inventory-item-price"]');

  await expect(priceLocator).toHaveCount(6);

  const priceTexts = await priceLocator.allTextContents();

  const prices = priceTexts.map((price) => Number(price.replace(/[^0-9.]/g, '')));
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

test('TC-INV-012 - should sort products by price high to low', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

  const priceLocator = page.locator('[data-test="inventory-item-price"]');

  await expect(priceLocator).toHaveCount(6);

  const priceTexts = await priceLocator.allTextContents();

  const prices = priceTexts.map((price) => Number(price.replace(/[^0-9.]/g, '')));
  const sortedPrices = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sortedPrices);
});

test('TC-INV-013 - should open cart page from inventory page', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
});

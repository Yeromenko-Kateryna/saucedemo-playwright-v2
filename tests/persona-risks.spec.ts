import { test, expect } from '@playwright/test';
import {
  addProduct,
  login,
  openCheckoutStepOne,
  testData,
} from './saucedemo-test-helpers';

test(
  'BUG-CHK2-001 @persona @known-issue - error_user should complete the order after Finish',
  async ({ page }) => {
    test.fail(true, 'BUG-CHK2-001: Finish does not complete the order for error_user');

    await login(
      page,
      testData.credentials.errorUser,
      testData.credentials.password,
    );
    await expect(page).toHaveURL(/\/inventory\.html$/);

    await addProduct(page, 'sauce-labs-backpack');
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await openCheckoutStepOne(page);

    await page.getByTestId('firstName').fill(testData.checkout.firstName);
    await page.getByTestId('postalCode').fill(testData.checkout.postalCode);
    await page.getByTestId('continue').click();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
    await expect(page.getByTestId('finish')).toBeVisible();

    await page.getByTestId('finish').click();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.getByTestId('title')).toHaveText('Checkout: Complete!');
  },
);

test(
  'BUG-INV-001 @persona @known-issue - problem_user should open the selected Product Details page',
  async ({ page }) => {
    test.fail(
      true,
      'BUG-INV-001: problem_user opens a different Product Details page',
    );

    await login(
      page,
      testData.credentials.problemUser,
      testData.credentials.password,
    );
    await expect(page).toHaveURL(/\/inventory\.html$/);

    await page.getByTestId('item-4-title-link').click();

    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    await expect(page.getByTestId('inventory-item-name')).toHaveText(
      'Sauce Labs Backpack',
    );
    await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99');
  },
);

test(
  'BUG-CHK1-001 @persona @known-issue - problem_user should accept Last Name and continue checkout',
  async ({ page }) => {
    test.fail(
      true,
      'BUG-CHK1-001: problem_user cannot enter Last Name and checkout remains blocked',
    );

    await login(
      page,
      testData.credentials.problemUser,
      testData.credentials.password,
    );
    await expect(page).toHaveURL(/\/inventory\.html$/);

    await addProduct(page, 'sauce-labs-backpack');
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await openCheckoutStepOne(page);

    await page.getByTestId('firstName').fill(testData.checkout.firstName);
    await page.getByTestId('lastName').fill(testData.checkout.lastName);
    await page.getByTestId('postalCode').fill(testData.checkout.postalCode);

    await expect(page.getByTestId('lastName')).toHaveValue(
      testData.checkout.lastName,
    );

    await page.getByTestId('continue').click();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
    await expect(page.getByTestId('error')).toHaveCount(0);
  },
);

test(
  'BUG-INV-004 @persona @known-issue - error_user should sort products without an alert',
  async ({ page }) => {
    test.fail(
      true,
      'BUG-INV-004: sorting displays an alert and does not change product order for error_user',
    );

    await login(
      page,
      testData.credentials.errorUser,
      testData.credentials.password,
    );
    await expect(page).toHaveURL(/\/inventory\.html$/);

    const productNames = page.getByTestId('inventory-item-name');
    const initialOrder = await productNames.allTextContents();

    let dialogMessage: string | undefined;

    page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await page
      .getByTestId('product-sort-container')
      .selectOption('za');

    await expect(productNames).toHaveText([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]);

    expect(dialogMessage).toBeUndefined();
    expect(await productNames.allTextContents()).not.toEqual(initialOrder);
  },
);

test(
  'BUG-INV-006 @persona @known-issue - visual_user should display the same price on Inventory and Product Details',
  async ({ page }) => {
    test.fail(
      true,
      'BUG-INV-006: Inventory price is random and does not match Product Details for visual_user',
    );

    await login(
      page,
      testData.credentials.visualUser,
      testData.credentials.password,
    );
    await expect(page).toHaveURL(/\/inventory\.html$/);

    const backpackCard = page
      .getByTestId('inventory-item')
      .filter({ hasText: 'Sauce Labs Backpack' });

    const inventoryPrice = (
      await backpackCard.getByTestId('inventory-item-price').innerText()
    ).trim();

    await backpackCard.getByTestId('inventory-item-name').click();

    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    await expect(page.getByTestId('inventory-item-name')).toHaveText(
      'Sauce Labs Backpack',
    );

    const detailsPrice = (
      await page.getByTestId('inventory-item-price').innerText()
    ).trim();

    expect(inventoryPrice).toBe(detailsPrice);
  },
);

test(
  'BUG-INV-007 @persona @known-issue - visual_user should preserve product image mapping after sorting',
  async ({ page }) => {
    test.fail(
      true,
      'BUG-INV-007: the dog image remains attached to the first Inventory position after sorting',
    );

    await login(
      page,
      testData.credentials.visualUser,
      testData.credentials.password,
    );
    await expect(page).toHaveURL(/\/inventory\.html$/);

    const productCards = page.getByTestId('inventory-item');
    const sortDropdown = page.getByTestId('product-sort-container');

    await sortDropdown.selectOption('az');

    const firstProductBeforeSorting = productCards.first();
    const firstNameBeforeSorting = (
      await firstProductBeforeSorting
        .getByTestId('inventory-item-name')
        .innerText()
    ).trim();
    const firstImageBeforeSorting = await firstProductBeforeSorting
      .locator('img.inventory_item_img')
      .getAttribute('src');

    await sortDropdown.selectOption('za');

    const firstProductAfterSorting = productCards.first();
    const firstNameAfterSorting = (
      await firstProductAfterSorting
        .getByTestId('inventory-item-name')
        .innerText()
    ).trim();
    const firstImageAfterSorting = await firstProductAfterSorting
      .locator('img.inventory_item_img')
      .getAttribute('src');

    expect(firstNameAfterSorting).not.toBe(firstNameBeforeSorting);
    expect(firstImageBeforeSorting).not.toBeNull();
    expect(firstImageAfterSorting).not.toBeNull();

    expect(firstImageAfterSorting).not.toBe(firstImageBeforeSorting);
  },
);

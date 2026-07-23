import { expect, type Page } from '@playwright/test';

export const testData = {
  credentials: {
    standardUser: 'standard_user',
    password: 'secret_sauce',
  },
  checkout: {
    firstName: 'Katia',
    lastName: 'Tester',
    postalCode: '12345',
  },
} as const;

export async function login(
  page: Page,
  username = testData.credentials.standardUser,
  password = testData.credentials.password,
) {
  await page.goto('/');
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-button').click();
}

export async function loginAsStandardUser(page: Page) {
  await login(page);
  await expect(page).toHaveURL(/\/inventory\.html$/);
}

export async function addProduct(page: Page, productSlug: string) {
  await page.getByTestId(`add-to-cart-${productSlug}`).click();
}

export async function openCart(page: Page) {
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/\/cart\.html$/);
}

export async function openCheckoutStepOne(page: Page) {
  await openCart(page);
  await page.getByTestId('checkout').click();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
}

export async function openCheckoutStepOneWithBackpack(page: Page) {
  await loginAsStandardUser(page);
  await addProduct(page, 'sauce-labs-backpack');
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await openCheckoutStepOne(page);
}

export async function openCheckoutOverview(page: Page) {
  await openCheckoutStepOneWithBackpack(page);
  await page.getByTestId('firstName').fill(testData.checkout.firstName);
  await page.getByTestId('lastName').fill(testData.checkout.lastName);
  await page.getByTestId('postalCode').fill(testData.checkout.postalCode);
  await page.getByTestId('continue').click();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
}

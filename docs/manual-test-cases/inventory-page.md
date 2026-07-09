# Inventory Page Test Plan

## Document Purpose

This document describes planned manual checks for the SauceDemo Inventory Page.

The goal is to define what should be checked manually before selecting test cases for Playwright automation.

These checks were created based on manual and technical exploration of the SauceDemo Inventory Page.

This document describes planned checks, not completed execution results. Test execution status should be tracked separately.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Table of Contents

* [1. Scope](#1-scope)
* [2. Test Data](#2-test-data)
* [3. Planned Checks Overview](#3-planned-checks-overview)
* [4. Manual Test Cases](#4-manual-test-cases)

  * [4.1 Smoke and Page Structure](#41-smoke-and-page-structure)
  * [4.2 Cart Actions](#42-cart-actions)
  * [4.3 Product Details Navigation](#43-product-details-navigation)
  * [4.4 Sorting](#44-sorting)
  * [4.5 Cart Navigation](#45-cart-navigation)
* [5. Automation Priority](#5-automation-priority)
* [6. Notes](#6-notes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1. Scope

### In Scope

* Inventory Page visibility after successful login
* Product list visibility
* Product card content and required information
* Add to cart functionality
* Remove from cart functionality
* Cart badge behavior
* Product details navigation
* Sorting dropdown behavior
* Cart navigation

### Out of Scope

* Login validation
* Checkout form
* Checkout overview
* Order completion
* Payment
* User profile editing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 2. Test Data

| Field         | Value                        |
| ------------- | ---------------------------- |
| Username      | `standard_user`              |
| Password      | `secret_sauce`               |
| Base URL      | `https://www.saucedemo.com/` |
| Inventory URL | `/inventory.html`            |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 3. Planned Checks Overview

| Test Case ID | Check Area                                    | Priority | Type                    |
| ------------ | --------------------------------------------- | -------- | ----------------------- |
| TC-INV-001   | Inventory Page visibility after login         | High     | Smoke / Happy path      |
| TC-INV-002   | Product card content and required information | High     | Smoke / UI / Functional |
| TC-INV-003   | Add one product to cart                       | High     | Happy path / Functional |
| TC-INV-004   | Remove product from cart                      | High     | Functional / Regression |
| TC-INV-005   | Add multiple different products to cart       | High     | Functional / Regression |
| TC-INV-006   | Open product details by product name          | Medium   | Functional / Navigation |
| TC-INV-007   | Open product details by product image         | Medium   | Functional / Navigation |
| TC-INV-008   | Return from product details to Inventory Page | Medium   | Functional / Navigation |
| TC-INV-009   | Sort products from A to Z                     | Medium   | Functional / Regression |
| TC-INV-010   | Sort products from Z to A                     | Medium   | Functional / Regression |
| TC-INV-011   | Sort products by price from low to high       | Medium   | Functional / Regression |
| TC-INV-012   | Sort products by price from high to low       | Medium   | Functional / Regression |
| TC-INV-013   | Open cart page from Inventory Page            | High     | Functional / Navigation |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 4. Manual Test Cases

## 4.1 Smoke and Page Structure

────────────────────────────────────────

### TC-INV-001 - Verify that Inventory Page is displayed after successful login

* **Priority:** High
* **Type:** Smoke / Happy path

#### Preconditions

* User is on the SauceDemo login page.
* User has valid credentials:

  * Username: `standard_user`
  * Password: `secret_sauce`

#### Steps

1. Enter a valid username.
2. Enter a valid password.
3. Click the `Login` button.

#### Expected Result

* User is redirected to the Inventory Page.
* Page URL contains `/inventory.html`.
* Page title `Products` is visible.
* Product list is visible.
* Cart icon is visible.
* Sorting dropdown is visible.

### TC-INV-002 - Verify that product cards contain required information

* **Priority:** High
* **Type:** Smoke / UI / Functional

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.

#### Steps

1. Look at the product list.
2. Check the first product card.
3. Verify that the product card contains product name, description, price, image, and action button.

#### Expected Result

* Product name is visible.
* Product description is visible.
* Product price is visible.
* Product image is visible.
* `Add to cart` button is visible.

## 4.2 Cart Actions

────────────────────────────────────────

### TC-INV-003 - Verify that user can add one product to the cart

* **Priority:** High
* **Type:** Happy path / Functional

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Cart is empty.

#### Steps

1. Find one product card.
2. Click the `Add to cart` button for this product.

#### Expected Result

* The product is added to the cart.
* The button changes from `Add to cart` to `Remove`.
* Cart badge is visible.
* Cart badge shows `1`.

### TC-INV-004 - Verify that user can remove product from the cart

* **Priority:** High
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* One product is already added to the cart.

#### Steps

1. Find the product that is already added to the cart.
2. Click the `Remove` button for this product.

#### Expected Result

* The product is removed from the cart.
* The button changes from `Remove` to `Add to cart`.
* Cart badge is no longer visible.

### TC-INV-005 - Verify that user can add multiple different products to the cart

* **Priority:** High
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Cart is empty.

#### Steps

1. Click the `Add to cart` button for the first product.
2. Click the `Add to cart` button for the second product.
3. Check the cart badge.

#### Expected Result

* Both products are added to the cart.
* Both selected product buttons change from `Add to cart` to `Remove`.
* Cart badge is visible.
* Cart badge shows `2`.

## 4.3 Product Details Navigation

────────────────────────────────────────

### TC-INV-006 - Verify that product details page opens after clicking product name

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Product list is visible.

#### Steps

1. Click the name of any product.

#### Expected Result

* User is redirected to the product details page.
* Product name is visible.
* Product description is visible.
* Product price is visible.
* Product image is visible.
* Product action button is visible.

### TC-INV-007 - Verify that product details page opens after clicking product image

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Product list is visible.

#### Steps

1. Click the image of any product.

#### Expected Result

* User is redirected to the product details page.
* Product name is visible.
* Product description is visible.
* Product price is visible.
* Product image is visible.
* Product action button is visible.

### TC-INV-008 - Verify that user can return to Inventory Page from product details page

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* User is on a product details page.

#### Steps

1. Click the `Back to products` button.

#### Expected Result

* User is redirected back to the Inventory Page.
* Page URL contains `/inventory.html`.
* Page title `Products` is visible.
* Product list is visible.

## 4.4 Sorting

────────────────────────────────────────

### TC-INV-009 - Verify that sorting products from A to Z works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Product list is visible.

#### Steps

1. Open the sorting dropdown.
2. Select `Name (A to Z)`.

#### Expected Result

* Products are sorted alphabetically from A to Z by product name.

### TC-INV-010 - Verify that sorting products from Z to A works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Product list is visible.

#### Steps

1. Open the sorting dropdown.
2. Select `Name (Z to A)`.

#### Expected Result

* Products are sorted alphabetically from Z to A by product name.

### TC-INV-011 - Verify that sorting products by price from low to high works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Product list is visible.

#### Steps

1. Open the sorting dropdown.
2. Select `Price (low to high)`.

#### Expected Result

* Products are sorted by price from the lowest price to the highest price.

### TC-INV-012 - Verify that sorting products by price from high to low works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Product list is visible.

#### Steps

1. Open the sorting dropdown.
2. Select `Price (high to low)`.

#### Expected Result

* Products are sorted by price from the highest price to the lowest price.

## 4.5 Cart Navigation

────────────────────────────────────────

### TC-INV-013 - Verify that cart page opens after clicking cart icon

* **Priority:** High
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.

#### Steps

1. Click the cart icon.

#### Expected Result

* User is redirected to the cart page.
* Page URL contains `/cart.html`.
* Cart page title `Your Cart` is visible.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 5. Automation Priority

| Test Case               | Automation Priority | Reason                                                        |
| ----------------------- | ------------------- | ------------------------------------------------------------- |
| TC-INV-001              | High                | Basic smoke coverage after login                              |
| TC-INV-003              | High                | Core e-commerce cart action                                   |
| TC-INV-004              | High                | Validates cart state update                                   |
| TC-INV-005              | Medium              | Useful regression for multiple products                       |
| TC-INV-002              | Medium              | UI structure check                                            |
| TC-INV-013              | Medium              | Important navigation check                                    |
| TC-INV-009 - TC-INV-012 | Later               | Sorting tests can be added after core cart behavior           |
| TC-INV-006 - TC-INV-008 | Later               | Product details navigation can be a separate automation block |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 6. Notes

This document is a test design artifact.

It describes what should be tested, not what has already passed.

Actual execution results should be tracked separately in a test run document or automated test report.

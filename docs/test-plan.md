# SauceDemo Test Plan

## Document Purpose

This document describes planned manual and automated checks for the SauceDemo QA Automation portfolio project.

The goal is to define what should be tested across the main SauceDemo user journey before selecting and implementing test cases for Playwright automation.

This test plan was created incrementally from manual exploration, technical exploration with Playwright Codegen, and implemented UI automation.

This document describes planned checks, not completed execution results. Test execution status should be tracked separately in Playwright reports or manual test execution notes.

---

## Table of Contents

* [1. Project Scope](#1-project-scope)
* [2. Test Data](#2-test-data)
* [3. Planned Checks Overview](#3-planned-checks-overview)
* [4. Automation Strategy](#4-automation-strategy)
* [5. Test Coverage Mapping](#5-test-coverage-mapping)
* [6. Manual Test Cases](#6-manual-test-cases)
  * [6.1 Login Page](#61-login-page)
  * [6.2 Inventory Page](#62-inventory-page)
  * [6.3 Cart Page](#63-cart-page)
  * [6.4 Checkout Step One](#64-checkout-step-one)
  * [6.5 Checkout Overview](#65-checkout-overview)
  * [6.6 Order Complete Page](#66-order-complete-page)
  * [6.7 Sidebar Menu and Navigation](#67-sidebar-menu-and-navigation)
* [7. Automation Priority](#7-automation-priority)
* [8. AI-Assisted QA Opportunities](#8-ai-assisted-qa-opportunities)
* [9. Risks and Assumptions](#9-risks-and-assumptions)
* [10. Current Project Status](#10-current-project-status)
* [11. Notes](#11-notes)

---

## 1. Project Scope

### In Scope

* Login Page validation
* Successful login flow
* Locked out user validation
* Inventory Page visibility
* Product list and product card checks
* Add to cart functionality
* Remove from cart functionality
* Cart badge behavior
* Product details navigation
* Sorting dropdown behavior
* Cart Page behavior
* Checkout Step One form validation
* Checkout Overview validation
* Order completion flow
* Sidebar menu navigation
* Logout flow

### Out of Scope for the Current Automation Scope

The following areas are not included in the current automation scope, but can be considered as future improvements:

* Payment processing
* Real order processing
* Real user account management
* User profile editing
* Backend/API validation
* Database validation
* Visual regression testing
* Performance testing
* Accessibility testing
* Cross-device responsive testing

---

## 2. Test Data

| Field | Value |
| --- | --- |
| Base URL | `https://www.saucedemo.com/` |
| Valid username | `standard_user` |
| Valid password | `secret_sauce` |
| Locked out username | `locked_out_user` |
| Invalid username | `invalid_user` |
| Invalid password | `invalid_password` |
| First name | `Katia` |
| Last name | `Tester` |
| Postal code | `12345` |

---

## 3. Planned Checks Overview

| Area | Test Cases | Priority |
| --- | ---: | --- |
| Login Page | 4 | High |
| Inventory Page | 14 | High / Medium |
| Cart Page | 7 | High / Medium |
| Checkout Step One | 6 | High / Medium |
| Checkout Overview | 5 | High / Medium |
| Order Complete Page | 2 | High / Medium |
| Sidebar Menu and Navigation | 5 | High / Medium / Low |

**Total functional regression test cases:** 43

**Additional exploratory charters:** 5 — one Checkout Step One validation charter and four persona exploration charters.

---

## 4. Automation Strategy

The automation suite will be implemented incrementally with Playwright and TypeScript.

### Automation Goals

* Cover critical user journeys first.
* Keep tests simple, readable, and maintainable.
* Use stable locators, preferably `data-test` attributes or user-facing locators.
* Keep assertions clear and focused on user-visible behavior.
* Avoid unnecessary abstraction at the early stage.
* Add reusable helpers or Page Object Model only when duplication creates a real maintenance cost.
* Run tests locally before each commit.
* Use Playwright reports to review test execution results.

### Current Automation Approach

* Keep test files simple and feature-based.
* Use separate feature-based spec files for Login, Inventory, Cart, Checkout, and Order Complete tests.
* Start with direct Playwright locators.
* Keep shared workflow setup in `tests/saucedemo-test-helpers.ts` when it is reused across multiple test files.
* Add Page Object Model later if the test suite grows enough to justify it.

### Planned Test Structure

* `tests/login-page.spec.ts` - Login Page tests.
* `tests/inventory-page.spec.ts` - Inventory Page and Product Details tests.
* `tests/cart-page.spec.ts` - Cart Page tests.
* `tests/checkout-step-one.spec.ts` - Checkout information form and required-field validation tests.
* `tests/checkout-overview.spec.ts` - Checkout Overview display, product, price-summary, completion, and cancel-navigation tests.
* `tests/order-complete.spec.ts` - Order confirmation content and Back Home navigation tests.
* `tests/persona-risks.spec.ts` - focused persona-specific known-issue tests for `problem_user`, `error_user`, and `visual_user`.
* `tests/saucedemo-test-helpers.ts` - shared test data and reusable workflow helpers.
* `docs/` - test planning and QA documentation.
* `playwright-report/` - locally generated test execution reports, not committed to the repository.

### Future Optional Folders

* `pages/` - page objects.
* `test-data/` - reusable test data.
* `utils/` - shared helper functions.

---

## 5. Test Coverage Mapping

| User Flow | Test Design Coverage | Automation Status |
| --- | --- | --- |
| Login page UI validation | Covered | Completed |
| Successful login | Covered | Completed |
| Invalid login validation | Covered | Completed |
| Locked out user validation | Covered | Completed |
| Inventory page visibility | Covered | Completed |
| Product card validation | Covered | Completed |
| Add product to cart | Covered | Completed |
| Remove product from Inventory Page | Covered | Completed |
| Multiple products added from Inventory Page | Covered | Completed |
| Product details navigation | Covered | Completed |
| Product sorting | Covered | Completed |
| Cart item validation | Covered | Completed |
| Remove product from Cart Page | Covered | Completed |
| Continue Shopping navigation | Covered | Completed |
| Checkout entry navigation | Covered | Completed |
| Multiple products displayed on Cart Page | Covered | Completed |
| Empty cart page validation | Covered | Completed |
| Empty-cart checkout prevention | Covered | Completed as known defect |
| Checkout Step One form display | Covered | Completed |
| Checkout Step One validation, continuation, and cancel navigation | Covered | Completed |
| Checkout overview display | Covered | Completed |
| Checkout overview product details | Covered | Completed |
| Checkout overview price details | Covered | Completed |
| Checkout overview cancel navigation | Covered | Completed |
| Complete order flow | Covered | Completed |
| Order completion confirmation | Covered | Completed |
| Back Home navigation | Covered | Completed |
| Sidebar menu navigation | Covered | Partially completed |
| Logout flow | Covered | Planned |

---

## 6. Manual Test Cases

## 6.1 Login Page

### TC-LOGIN-001 - Verify that login page elements are displayed

* **Priority:** High
* **Type:** Smoke / UI

#### Preconditions

* User opens SauceDemo base URL.

#### Steps

1. Open the SauceDemo login page.
2. Check the login form.

#### Expected Result

* Username field is visible.
* Password field is visible.
* Login button is visible.

### TC-LOGIN-002 - Verify successful login with valid credentials

* **Priority:** High
* **Type:** Smoke / Happy path

#### Preconditions

* User is on the SauceDemo login page.
* User has valid credentials.

#### Steps

1. Enter `standard_user`.
2. Enter `secret_sauce`.
3. Click the `Login` button.

#### Expected Result

* User is redirected to the Inventory Page.
* Page URL contains `/inventory.html`.
* Page title `Products` is visible.

### TC-LOGIN-003 - Verify error message for invalid credentials

* **Priority:** High
* **Type:** Negative

#### Preconditions

* User is on the SauceDemo login page.

#### Steps

1. Enter invalid username.
2. Enter invalid password.
3. Click the `Login` button.

#### Expected Result

* Error message for invalid credentials is displayed.
* User remains on the Login Page.

### TC-LOGIN-004 - Verify error message for locked out user

* **Priority:** High
* **Type:** Negative / Regression

#### Preconditions

* User is on the SauceDemo login page.

#### Steps

1. Enter `locked_out_user`.
2. Enter `secret_sauce`.
3. Click the `Login` button.

#### Expected Result

* Error message for locked out user is displayed.
* User remains on the Login Page.

## 6.2 Inventory Page

### TC-INV-001 - Verify that Inventory Page is displayed after successful login

* **Priority:** High
* **Type:** Smoke / Happy path

#### Preconditions

* User is on the SauceDemo Login Page.
* User has valid credentials.

#### Steps

1. Login with valid credentials.
2. Check the Inventory Page.

#### Expected Result

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

#### Expected Result

* Product name is visible.
* Product description is visible.
* Product price is visible.
* Product image is visible.
* `Add to cart` button is visible.

### TC-INV-003 - Verify that user can add one product to the cart

* **Priority:** High
* **Type:** Happy path / Functional

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Cart is empty.

#### Steps

1. Click the `Add to cart` button for one product.

#### Expected Result

* Button changes from `Add to cart` to `Remove`.
* Cart badge is visible.
* Cart badge shows `1`.

### TC-INV-004 - Verify that user can remove a product from the Inventory Page

* **Priority:** High
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* One product is already added to the cart.

#### Steps

1. Click the `Remove` button for the added product.

#### Expected Result

* Button changes from `Remove` to `Add to cart`.
* Cart badge is no longer visible.

### TC-INV-005 - Verify that user can add multiple different products to the cart

* **Priority:** High
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* Cart is empty.

#### Steps

1. Add the first product to the cart.
2. Add the second product to the cart.

#### Expected Result

* Both buttons change to `Remove`.
* Cart badge shows `2`.

### TC-INV-006 - Verify that product details page opens after clicking product name

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.

#### Steps

1. Click the name of any product.

#### Expected Result

* Product details page opens.
* Product name, description, price, image, and action button are visible.

### TC-INV-007 - Verify that product details page opens after clicking product image

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.

#### Steps

1. Click the image of any product.

#### Expected Result

* Product details page opens.
* Product name, description, price, image, and action button are visible.

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
* Page title `Products` is visible.
* Product list is visible.

### TC-INV-009 - Verify that sorting products from A to Z works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* Product list is visible.

#### Steps

1. Select `Name (A to Z)` in the sorting dropdown.

#### Expected Result

* Products are sorted alphabetically from A to Z.

### TC-INV-010 - Verify that sorting products from Z to A works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* Product list is visible.

#### Steps

1. Select `Name (Z to A)` in the sorting dropdown.

#### Expected Result

* Products are sorted alphabetically from Z to A.

### TC-INV-011 - Verify that sorting products by price from low to high works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* Product list is visible.

#### Steps

1. Select `Price (low to high)` in the sorting dropdown.

#### Expected Result

* Products are sorted by price from the lowest price to the highest price.

### TC-INV-012 - Verify that sorting products by price from high to low works correctly

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* Product list is visible.

#### Steps

1. Select `Price (high to low)` in the sorting dropdown.

#### Expected Result

* Products are sorted by price from the highest price to the lowest price.

### TC-INV-013 - Verify that cart page opens after clicking cart icon

* **Priority:** High
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.

#### Steps

1. Click the cart icon.

#### Expected Result

* User is redirected to the Cart Page.
* Page URL contains `/cart.html`.
* Page title `Your Cart` is visible.
* Cart list area is visible.
* `Continue Shopping` button is visible.
* `Checkout` button is visible.

### TC-INV-014 - Verify dynamic contract coverage for all available products

* **Priority:** High
* **Type:** Data-driven / Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* The product catalog contains at least one product.

#### Steps

1. Determine the number of product cards currently displayed in the catalog.
2. Verify that at least one product is available.
3. For every currently displayed product:
   * capture its name, description, price, and Product Details link;
   * verify that its name and description are not empty;
   * verify that its price has a valid monetary format and a value greater than zero;
   * verify that its image is visible;
   * click `Add to cart`;
   * verify that the product action changes to `Remove`;
   * verify that the cart badge reflects the added product;
   * click `Remove`;
   * verify that the product action returns to `Add to cart`;
   * open Product Details;
   * verify that name, description, and price match the Inventory Page card;
   * return to the Inventory Page.
4. Confirm that every product discovered during the test was checked.

#### Expected Result

* The catalog contains at least one product.
* Every currently available product satisfies the common product-card contract.
* Add and Remove actions work for every available product.
* Product Details data matches the corresponding Inventory Page card.
* The test does not depend on a fixed product count or predefined list of product names.
* Products added to the catalog later are automatically included in the same contract verification.

#### Automation Strategy

* Discover products dynamically from the Inventory Page.
* Do not hardcode the current number of products.
* Do not hardcode a list of product names or product IDs.
* Use card-scoped locators to prevent data from different products being mixed.
* Preserve the existing Backpack tests as deterministic smoke coverage.
* Do not execute the complete checkout flow separately for every product.

## 6.3 Cart Page

### TC-CART-001 - Verify that added product is displayed in the cart

* **Priority:** High
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* One product is added to the cart.

#### Steps

1. Open the Cart Page.
2. Check the cart item.

#### Expected Result

* Cart Page URL contains `/cart.html`.
* Page title `Your Cart` is visible.
* Cart badge still shows `1`.
* Exactly one cart item is displayed.
* Product quantity is `1`.
* Product name, description, and price are visible.
* `Remove` button is visible for the product.
* `Continue Shopping` button is visible.
* `Checkout` button is visible.

### TC-CART-002 - Verify that user can remove product from the cart

* **Priority:** High
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* One product is added to the cart.
* User is on the Cart Page.

#### Steps

1. Click the `Remove` button for the product.

#### Expected Result

* Product is removed from the cart.
* No cart items are displayed.
* Cart badge is no longer visible.
* User remains on the Cart Page.
* Page title `Your Cart` remains visible.
* Cart list area remains visible.
* `Continue Shopping` button remains visible.
* `Checkout` button remains visible.

### TC-CART-003 - Verify that Continue Shopping returns user to Inventory Page

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* One product is added to the cart.
* User is on the Cart Page.

#### Steps

1. Click the `Continue Shopping` button.

#### Expected Result

* User is redirected to the Inventory Page.
* Page URL contains `/inventory.html`.
* Page title `Products` is visible.
* Cart badge still shows `1`.
* The added product remains in the cart.
* The product action button remains changed to `Remove`.

### TC-CART-004 - Verify that Checkout button opens Checkout Step One

* **Priority:** High
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* One product is added to the cart.
* User is on the Cart Page.

#### Steps

1. Click the `Checkout` button.

#### Expected Result

* User is redirected to Checkout Step One.
* Page URL contains `/checkout-step-one.html`.
* Page title `Checkout: Your Information` is visible.
* First name, last name, and postal code fields are visible.
* `Continue` and `Cancel` buttons are visible.
* Cart badge still shows `1`.

### TC-CART-005 - Verify that multiple added products are displayed in the cart

* **Priority:** Medium
* **Type:** Functional / Regression

#### Preconditions

* User is logged in as `standard_user`.
* Two different products are added to the cart.

#### Steps

1. Open the Cart Page.
2. Check the cart item list.

#### Expected Result

* Both added products are visible in the cart.
* Each product has quantity `1`.
* Product names are visible.
* Product descriptions are visible.
* Product prices are visible.
* A `Remove` button is visible for each product.
* Cart badge shows `2`.
* `Continue Shopping` button is visible.
* `Checkout` button is visible.

### TC-CART-006 - Verify that empty Cart Page is displayed correctly

* **Priority:** Medium
* **Type:** Smoke / UI / Edge case

#### Preconditions

* User is logged in as `standard_user`.
* Cart is empty.

#### Steps

1. Open the Cart Page from the Inventory Page.
2. Check the empty Cart Page layout.

#### Expected Result

* User is redirected to the Cart Page.
* Page URL contains `/cart.html`.
* Page title `Your Cart` is visible.
* Cart list area is visible.
* No cart items are displayed.
* Cart badge is not displayed.
* `Continue Shopping` button is visible.
* `Checkout` button is visible.

### TC-CART-007 - Verify that checkout cannot be completed with an empty cart

* **Priority:** High
* **Type:** Negative / Business Rule / End-to-end
* **Related bug:** BUG-CART-001

#### Preconditions

* User is logged in as `standard_user`.
* Cart contains no products.
* Cart badge is not displayed.
* User is on the Cart Page.

#### Steps

1. Confirm that no cart items are displayed.
2. Click the `Checkout` button.
3. If Checkout Step One opens, enter valid checkout information.
4. Click `Continue`.
5. If Checkout Overview opens, review the product list and totals.
6. Click `Finish`, if the button is available.

#### Expected Result

* The application prevents checkout of an empty cart.
* User cannot successfully complete an order containing no products.
* The Order Complete Page is not displayed.
* A clear validation message is displayed, or the relevant checkout action is disabled.

#### Actual Result

* Checkout Step One opens with an empty cart.
* User can continue to Checkout Overview.
* No products are displayed on Checkout Overview.
* Item total is `$0`.
* Tax is `$0.00`.
* Total is `$0.00`.
* The `Finish` button is enabled.
* User can complete the order.
* The Order Complete Page displays `Thank you for your order!`.

#### Manual Execution Status

* **Status:** Failed
* **Defect:** BUG-CART-001

## 6.4 Checkout Step One

### TC-CHK1-001 - Verify that Checkout Step One form is displayed

* **Priority:** High
* **Type:** Smoke / UI

#### Preconditions

* User is logged in as `standard_user`.
* User is on Checkout Step One.

#### Steps

1. Check the checkout information form.

#### Expected Result

* First name field is visible.
* Last name field is visible.
* Postal code field is visible.
* `Continue` button is visible.
* `Cancel` button is visible.

### TC-CHK1-002 - Verify error message when first name is missing

* **Priority:** High
* **Type:** Negative / Validation

#### Preconditions

* User is on Checkout Step One.

#### Steps

1. Leave first name empty.
2. Fill last name.
3. Fill postal code.
4. Click `Continue`.

#### Expected Result

* Error message for missing first name is displayed.
* User remains on Checkout Step One.

### TC-CHK1-003 - Verify error message when last name is missing

* **Priority:** High
* **Type:** Negative / Validation

#### Preconditions

* User is on Checkout Step One.

#### Steps

1. Fill first name.
2. Leave last name empty.
3. Fill postal code.
4. Click `Continue`.

#### Expected Result

* Error message for missing last name is displayed.
* User remains on Checkout Step One.

### TC-CHK1-004 - Verify error message when postal code is missing

* **Priority:** High
* **Type:** Negative / Validation

#### Preconditions

* User is on Checkout Step One.

#### Steps

1. Fill first name.
2. Fill last name.
3. Leave postal code empty.
4. Click `Continue`.

#### Expected Result

* Error message for missing postal code is displayed.
* User remains on Checkout Step One.

### TC-CHK1-005 - Verify that user can continue with valid checkout information

* **Priority:** High
* **Type:** Happy path / Functional

#### Preconditions

* User is on Checkout Step One.

#### Steps

1. Fill first name.
2. Fill last name.
3. Fill postal code.
4. Click `Continue`.

#### Expected Result

* User is redirected to Checkout Overview.
* Page URL contains `/checkout-step-two.html`.
* Page title `Checkout: Overview` is visible.

### TC-CHK1-006 - Verify that Cancel button returns user to Cart Page

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is on Checkout Step One.

#### Steps

1. Click the `Cancel` button.

#### Expected Result

* User is redirected to the Cart Page.
* Page title `Your Cart` is visible.

### TC-CHK1-007 - Explore checkout input validation boundaries

* **Priority:** Medium
* **Type:** Exploratory / Validation / Boundary
* **Related defect:** `BUG-COMPLETE-001`

#### Preconditions

* User is logged in as `standard_user`.
* Cart contains at least one product.
* User is on Checkout Step One.

#### Exploratory Charter

Investigate how the checkout information form handles non-standard, malformed, international, and boundary input values.

Focus areas:

* whitespace-only values;
* punctuation-only values;
* Unicode and Cyrillic text;
* numeric values in name fields;
* alphabetic values in the Zip/Postal Code field;
* mixed-character values;
* very long values;
* behavior after continuing to Checkout Overview;
* preservation of submitted values in the generated order PDF.

#### Test Data Explored

| First Name | Last Name | Zip/Postal Code | Result |
| --- | --- | --- | --- |
| Three spaces | Three spaces | Three spaces | Accepted; user continued to Checkout Overview |
| `---` | `---` | `---` | Accepted; user continued to Checkout Overview |
| Cyrillic text | Cyrillic text | Cyrillic text | Accepted; user continued to Checkout Overview |
| Numeric value | Numeric value | Alphabetic value | Accepted; user continued to Checkout Overview |
| Very long Cyrillic text | Very long Cyrillic text | Very long Cyrillic text | Accepted; checkout completed successfully |

#### Actual Result

* The form rejects fully empty required fields.
* The form accepts values containing only whitespace.
* The form accepts punctuation-only values.
* The form accepts Unicode and Cyrillic text.
* The form accepts numeric values in the name fields.
* The form accepts alphabetic values in the Zip/Postal Code field.
* The form accepts very long input values.
* All explored values were accepted and allowed navigation to Checkout Overview.
* The very long Unicode-input scenario was completed through Order Complete and PDF generation.
* Checkout Overview does not display the submitted customer information.
* Generated order PDFs display ASCII checkout data correctly.
* Generated order PDFs corrupt Cyrillic and other Unicode checkout data.

#### Findings

* Required-field validation is based on the presence of input rather than meaningful or normalized values.
* No trimming, format validation, or practical maximum-length restriction was observed.
* Unicode input is accepted by the web form but is not preserved correctly in the generated PDF.
* The Unicode PDF issue is tracked as `BUG-COMPLETE-001`.

#### Expected Result

Because SauceDemo does not publish a formal checkout-input specification, the following are recorded as product-quality expectations rather than confirmed business rules:

* whitespace-only values should not satisfy required-field validation;
* submitted values should be normalized where appropriate;
* excessively long input should be constrained or handled safely;
* Unicode data accepted by the form should remain readable in all downstream outputs;
* generated receipts should accurately preserve user-provided data.

#### Automation Decision

* Do not automate every explored value as a separate end-to-end test.
* Add focused automated coverage for:
  * whitespace-only required fields;
  * Unicode PDF preservation, if PDF generation can be tested reliably;
  * maximum-length handling only if a product requirement is defined.
* Keep broader malformed-input combinations as exploratory coverage.

## 6.5 Checkout Overview

### TC-CHK2-001 - Verify that Checkout Overview is displayed

* **Priority:** High
* **Type:** Smoke / UI

#### Preconditions

* User has added one product to the cart.
* User has entered valid checkout information.

#### Steps

1. Open Checkout Overview.

#### Expected Result

* Page title `Checkout: Overview` is visible.
* Payment information is visible.
* Shipping information is visible.
* Price total section is visible.

### TC-CHK2-002 - Verify that selected product is displayed on Checkout Overview

* **Priority:** High
* **Type:** Functional / Regression

#### Preconditions

* User has added one product to the cart.
* User is on Checkout Overview.

#### Steps

1. Check the item list on Checkout Overview.

#### Expected Result

* Exactly one selected product is displayed.
* Selected product name, description, price, and quantity are visible.
* Cart badge preserves the value `1`.

### TC-CHK2-003 - Verify price summary calculations

* **Priority:** Medium
* **Type:** UI / Functional / Calculation

#### Preconditions

* User is on Checkout Overview.
* `Sauce Labs Backpack` is displayed with a price of `$29.99`.
* Product quantity is `1`.

#### Steps

1. Check the `Item total` value.
2. Check the `Tax` value.
3. Check the `Total` value.
4. Compare the item total with the displayed product price.
5. Verify that the total equals the item total plus tax.

#### Expected Result

* Item total displays `$29.99`.
* Item total equals the price of the selected product.
* Tax displays `$2.40`.
* Total displays `$32.39`.
* Total equals item total plus tax: `$29.99 + $2.40 = $32.39`.

### TC-CHK2-004 - Verify that Finish button completes the order

* **Priority:** High
* **Type:** Happy path / End-to-end

#### Preconditions

* User is on Checkout Overview.

#### Steps

1. Click the `Finish` button.

#### Expected Result

* User is redirected to the Order Complete Page.
* Page title `Checkout: Complete!` is visible.

### TC-CHK2-005 - Verify that Cancel button returns user to Inventory Page

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is on Checkout Overview.

#### Steps

1. Click the `Cancel` button.

#### Expected Result

* User is redirected to the Inventory Page.
* Page title `Products` is visible.

## 6.6 Order Complete Page

### TC-COMPLETE-001 - Verify that order completion message is displayed

* **Priority:** High
* **Type:** Smoke / End-to-end

#### Preconditions

* User has completed checkout.

#### Steps

1. Check the Order Complete Page.

#### Expected Result

* Page title `Checkout: Complete!` is visible.
* Success message is visible.
* `Back Home` button is visible.

### TC-COMPLETE-002 - Verify that Back Home button returns user to Inventory Page

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is on the Order Complete Page.

#### Steps

1. Click the `Back Home` button.

#### Expected Result

* User is redirected to the Inventory Page.
* Page title `Products` is visible.

## 6.7 Sidebar Menu and Navigation

### TC-MENU-001 - Verify that sidebar menu opens

* **Priority:** Medium
* **Type:** UI / Navigation

#### Preconditions

* User is logged in as `standard_user`.

#### Steps

1. Click the menu button.

#### Expected Result

* Sidebar menu is opened.
* Menu items are visible.

### TC-MENU-002 - Verify that sidebar menu can be closed

* **Priority:** Medium
* **Type:** UI / Navigation

#### Preconditions

* Sidebar menu is opened.

#### Steps

1. Click the close button.

#### Expected Result

* Sidebar menu is closed.

### TC-MENU-003 - Verify that All Items menu item opens Inventory Page

* **Priority:** Medium
* **Type:** Functional / Navigation

#### Preconditions

* User is logged in as `standard_user`.
* Sidebar menu is opened.

#### Steps

1. Click `All Items`.

#### Expected Result

* User is redirected to the Inventory Page.
* Page title `Products` is visible.

### TC-MENU-004 - Verify that About menu item opens Sauce Labs page

* **Priority:** Low
* **Type:** Navigation

#### Preconditions

* User is logged in as `standard_user`.
* Sidebar menu is opened.

#### Steps

1. Click `About`.

#### Expected Result

* User is redirected to the Sauce Labs website.

### TC-MENU-005 - Verify that Logout menu item logs user out

* **Priority:** High
* **Type:** Functional / Security

#### Preconditions

* User is logged in as `standard_user`.
* Sidebar menu is opened.

#### Steps

1. Click `Logout`.

#### Expected Result

* User is redirected to the Login Page.
* Username field is visible.
* Password field is visible.
* Login button is visible.

## 6.7 Persona Exploration

### TC-PERSONA-001 - Explore critical user flows as problem_user

* **Priority:** High
* **Type:** Exploratory / Persona / Functional / Data Integrity
* **User:** `problem_user`

#### Preconditions

* SauceDemo is available.
* User can log in with `problem_user`.
* Password is `secret_sauce`.

#### Exploratory Charter

Compare the behavior of `problem_user` with the functional behavior already established for `standard_user`.

Focus areas:

* login;
* Inventory Page product data and images;
* Add and Remove actions;
* cart-state consistency;
* Product Details routing and data consistency;
* sorting;
* Cart Page;
* Checkout Step One;
* ability to complete checkout.

#### Actual Result

* Login succeeded.
* Inventory Page opened successfully.
* All six product cards displayed the same incorrect dog image.
* Product names, descriptions, and prices on the Inventory Page remained different.
* None of the six product cards opened its corresponding Product Details page.

#### Product Details Routing Results

| Selected product on Inventory Page | Opened URL | Actual Product Details content |
| --- | --- | --- |
| Sauce Labs Backpack | `/inventory-item.html?id=5` | Sauce Labs Fleece Jacket |
| Sauce Labs Bike Light | `/inventory-item.html?id=1` | Sauce Labs Bolt T-Shirt |
| Sauce Labs Bolt T-Shirt | `/inventory-item.html?id=2` | Sauce Labs Onesie |
| Sauce Labs Fleece Jacket | `/inventory-item.html?id=6` | `ITEM NOT FOUND`, unrelated description, invalid price `$√-1`, and dog image |
| Sauce Labs Onesie | `/inventory-item.html?id=3` | Test.allTheThings() T-Shirt (Red) |
| Test.allTheThings() T-Shirt (Red) | `/inventory-item.html?id=4` | Sauce Labs Backpack |

#### Cart Action Results

* Add and Remove behavior was inconsistent.
* Some products could be added from the Inventory Page.
* Some `Add to cart` buttons did not respond.
* Some `Remove` buttons did not respond.
* Products that could not be removed from the Inventory Page could still be removed from the Cart Page.
* Product Details did not always reflect the current cart state.
* A product could already be present in the cart while Product Details still displayed `Add to cart`.
* Cart badge and Inventory Page button state could become inconsistent.

#### Sorting Results

* The product sort control was visible.
* Switching between sorting options did not work as expected.
* The displayed product order did not reliably change.
* Sorting behavior differed from the working behavior established for `standard_user`.

#### Checkout Results

* Checkout Step One opened successfully.
* First Name accepted input.
* Zip/Postal Code accepted input.
* Last Name received focus and displayed a cursor.
* Typed characters were not preserved in the Last Name field.
* Clicking `Continue` displayed:

  `Error: Last Name is required`

* Checkout could not proceed to Checkout Overview.
* The Last Name defect blocked order completion.

#### Findings

* `problem_user` contains multiple independent defects rather than one general persona issue.
* Product images are incorrectly mapped on the Inventory Page.
* Product Details navigation is incorrect for every available product.
* One Product Details route returns corrupted fallback data.
* Add and Remove actions are inconsistent.
* Cart state is not reliably synchronized between Inventory and Product Details.
* Sorting does not function correctly.
* Checkout is blocked because Last Name cannot be entered.

#### Risk Assessment

* **Product identity risk:** user selects one product but receives details for another.
* **Cart integrity risk:** displayed controls do not reliably represent cart state.
* **Checkout blocker:** user cannot complete an order.
* **Visual trust risk:** all products display the same unrelated image.
* **Regression risk:** multiple core flows differ from `standard_user`.

#### Automation Decision

Automate only stable, high-value persona scenarios:

* all Inventory Page product images are incorrect;
* Product Details routing does not preserve selected product identity;
* Last Name input blocks checkout;
* sorting does not change the product order;
* selected Add/Remove behavior where the failure is reproducible.

Do not run the complete `standard_user` regression suite again for `problem_user`.

### TC-PERSONA-002 - Explore navigation performance as performance_glitch_user

* **Priority:** Medium
* **Type:** Exploratory / Persona / Performance
* **User:** `performance_glitch_user`

#### Preconditions

* SauceDemo is available.
* User can log in with `performance_glitch_user`.
* Password is `secret_sauce`.

#### Exploratory Charter

Compare navigation response times for `performance_glitch_user` with the normal behavior established for `standard_user`.

Focus areas:

* login;
* Inventory Page readiness;
* Product Details navigation;
* return navigation;
* product sorting;
* Add and Remove actions;
* Cart Page;
* Checkout navigation;
* order completion;
* return to Inventory Page.

#### Actual Result

* Login credentials were accepted.
* The URL changed to `/inventory.html` quickly, but the Inventory Page required approximately 10 seconds to become visually ready.
* Opening Product Details was fast.
* Add and Remove actions were fast.
* Returning from Product Details through `Back to products` required approximately 10 seconds.
* Product sorting worked, but applying a different sorting option required approximately 10 seconds.
* Opening the Cart Page was fast.
* Returning through `Continue Shopping` required approximately 10 seconds.
* Opening Checkout Step One was fast.
* Continuing to Checkout Overview was fast.
* Completing the order through `Finish` was fast.
* Returning through `Back Home` required approximately 10 seconds.
* `Cancel` navigation from Checkout Step One required approximately 10 seconds.
* `Cancel` navigation from Checkout Overview required approximately 10 seconds.
* Sidebar Menu opened quickly, and `All Items`, `About`, `Logout`, and `Reset App State` responded quickly.
* Returning from the external About page back to the Inventory Page required approximately 10 seconds.
* During slow transitions, the browser URL changed before the destination page became visually ready.
* No functional errors or blocked checkout flow were observed.
* The complete checkout flow remained functional, including the already known ability to complete an empty-cart checkout.
* No new persona-specific checkout validation defect was identified.

#### Transition Results

| Action | Observed behavior |
| --- | --- |
| Login → Inventory | Approximately 10-second visual delay |
| Inventory → Product Details | Fast |
| Product Details → Inventory | Approximately 10-second delay |
| Apply sorting | Works after approximately 10 seconds |
| Add / Remove product | Fast |
| Inventory → Cart | Fast |
| Cart → Continue Shopping | Approximately 10-second delay |
| Cart → Checkout Step One | Fast |
| Checkout Step One → Continue | Fast |
| Checkout Step One → Cancel | Approximately 10-second delay |
| Checkout Overview → Finish | Fast |
| Checkout Overview → Cancel | Approximately 10-second delay |
| Order Complete → Back Home | Approximately 10-second delay |
| Open Sidebar Menu | Fast |
| Sidebar → All Items | Fast |
| Sidebar → About | Fast |
| Return from About → Inventory | Approximately 10-second delay |
| Sidebar → Logout | Fast |
| Sidebar → Reset App State | Fast |

#### Findings

* Performance degradation is selective rather than global.
* Slow behavior primarily affects transitions that return or navigate to the Inventory Page.
* The destination URL may appear before the target page is visually ready.
* Core cart and checkout actions remain functional.
* The order can be completed successfully.
* Existing shared behaviors were also observed but are not treated as new persona-specific findings:
  * empty-cart checkout remains possible and is already tracked as `BUG-CART-001`;
  * weak checkout input validation is already covered by `TC-CHK1-007`;
  * code-like catalog text is shared with `standard_user` and is treated as demo content rather than a defect.

#### Risk Assessment

* **Usability risk:** users may believe navigation is frozen.
* **Interaction risk:** users may click controls repeatedly while waiting.
* **Automation risk:** tests with short fixed timeouts may fail even though the destination URL has already changed.
* **Performance risk:** repeated delays significantly increase the time required to browse and complete secondary navigation flows.

#### Automation Decision

* Do not duplicate the full functional regression suite.
* Add one focused performance-oriented persona test for a stable slow transition.
* Prefer measuring page readiness after navigation rather than URL change alone.
* Use a documented generous upper threshold to avoid flaky timing assertions.
* Keep detailed transition comparison as exploratory coverage.

### TC-PERSONA-003 - Explore functional failures as error_user

* **Priority:** High
* **Type:** Exploratory / Persona / Functional
* **User:** `error_user`

#### Preconditions

* SauceDemo is available.
* User can log in with `error_user`.
* Password is `secret_sauce`.

#### Exploratory Charter

Explore functional failures specific to `error_user` across the main shopping flow.

Focus areas:

* Inventory Page;
* product sorting;
* Add and Remove actions;
* Product Details;
* cart state;
* Reset App State;
* Cart Page;
* Checkout Step One;
* Checkout Overview;
* order completion;
* Sidebar Menu.

#### Actual Result

* Login credentials were accepted.
* Inventory Page opened successfully.
* Sidebar Menu opened and its navigation items worked.
* Selecting any available sorting option displayed the browser alert:
  `Sorting is broken! This error has been reported to Backtrace.`
* Product order did not change after the sorting attempt.
* Add and Remove actions on Inventory Page behaved inconsistently:
  * some products could be added;
  * some `Add to cart` controls did not respond;
  * some `Remove` controls did not respond;
  * the same actions sometimes worked during another attempt.
* Removing products from the Cart Page worked correctly.
* `Continue Shopping` returned to the Inventory Page successfully.
* `Checkout` opened Checkout Step One successfully.
* `Reset App State` cleared the cart state, but previously added products could still display `Remove` on the Inventory Page.
* This created a mismatch between the empty cart and the product button state.
* All six Product Details pages opened with the correct product name, price, and image.
* Product descriptions were missing from Product Details for all six products.
* `Back to products` returned to the Inventory Page.
* The First Name field accepted input.
* The Postal Code field accepted input.
* The Last Name field received focus but did not preserve typed characters.
* Submitting a completely empty form displayed `Error: First Name is required`.
* After First Name and Postal Code were entered, the application continued to Checkout Overview even though Last Name remained empty.
* Checkout Overview displayed the selected products, quantities, prices, payment information, shipping information, subtotal, tax, and total.
* `Cancel` navigation worked.
* The `Finish` button was visible and appeared enabled.
* Repeated clicks on `Finish` produced no visible response.
* No alert appeared after clicking `Finish`.
* The URL remained `/checkout-step-two.html`.
* The Order Complete page did not open.
* The order could not be completed.

#### Functional Results

| Area | Action | Observed behavior |
| --- | --- | --- |
| Login | Log in as `error_user` | Successful |
| Sidebar Menu | Open and use menu items | Worked |
| Sorting | Select any sorting option | Browser alert displayed; sorting not applied |
| Inventory | Add product | Inconsistent; worked only for some attempts or products |
| Inventory | Remove product | Inconsistent; sometimes did not respond |
| Cart | Remove product | Worked |
| Cart | Continue Shopping | Worked |
| Cart | Checkout | Worked |
| Reset App State | Clear application state | Cart cleared, but stale `Remove` buttons could remain |
| Product Details | Open any of six products | Correct product opened |
| Product Details | Validate description | Description missing for all six products |
| Checkout Step One | Enter First Name | Worked |
| Checkout Step One | Enter Last Name | Field did not preserve input |
| Checkout Step One | Enter Postal Code | Worked |
| Checkout Step One | Submit fully empty form | `Error: First Name is required` |
| Checkout Step One | Continue with empty Last Name | Checkout Overview opened |
| Checkout Overview | Validate order information | Displayed correctly |
| Checkout Overview | Cancel | Worked |
| Checkout Overview | Finish | No response; order not completed |

#### Findings

* Sorting is completely unavailable for `error_user`.
* Product descriptions are consistently missing from Product Details.
* Last Name input is broken.
* Checkout validation does not prevent continuation with an empty Last Name.
* The final order-completion action is blocked because `Finish` does not respond.
* Reset App State can leave the Inventory Page visually inconsistent with the actual cart.
* Inventory Add and Remove behavior is intermittent and requires a focused reproducibility check before being recorded as a separate confirmed defect.
* Cart Page removal remains functional.
* The code-like Backpack description and Red T-Shirt product name are shared with `standard_user` and are treated as demo content rather than persona-specific defects.

#### Risk Assessment

* **Functional risk:** users cannot sort products.
* **Information risk:** Product Details omit required product information.
* **Data-quality risk:** checkout accepts incomplete customer information.
* **State-management risk:** the Inventory Page may display stale cart controls after Reset App State.
* **Transaction risk:** users can reach Checkout Overview but cannot complete the order.
* **Automation risk:** browser alerts and non-responsive controls require explicit handling and stable assertions.

#### Automation Decision

* Do not duplicate the full `standard_user` regression suite.
* Add focused persona tests for stable, high-value failures.
* Prioritize:
  * sorting alert and unchanged order;
  * missing Product Details description;
  * Last Name input failure;
  * continuation with an empty Last Name;
  * non-responsive Finish button;
  * stale Inventory state after Reset App State.
* Keep inconsistent Inventory Add and Remove behavior as an exploratory finding until a deterministic reproduction path is established.

### TC-PERSONA-004 - Explore visual and pricing defects as visual_user

* **Priority:** High
* **Type:** Exploratory / Persona / Visual / Functional
* **User:** `visual_user`

#### Preconditions

* SauceDemo is available.
* User can log in with `visual_user`.
* Password is `secret_sauce`.

#### Exploratory Charter

Explore visual, layout, pricing, image, calculation-display, and state-consistency defects specific to `visual_user` across the main shopping flow.

Focus areas:

* Inventory Page layout;
* product images;
* product prices;
* product sorting;
* product card alignment;
* Add and Remove controls;
* Product Details;
* Cart Page;
* Checkout Step One;
* Checkout Overview;
* Order Complete;
* Sidebar Menu;
* header controls;
* Reset App State.

#### Actual Result

* Login credentials were accepted.
* Inventory Page opened successfully.
* Product sorting worked and changed the product order.
* Product prices on the Inventory Page were random and changed repeatedly.
* Prices changed after:
  * returning to the Inventory Page;
  * reloading the page;
  * applying another sorting option.
* The same product displayed different Inventory Page prices during separate observations.
* Some Inventory Page prices used an inconsistent currency format, including values with only one decimal digit.
* All six products were affected by the random pricing behavior.
* Product Details displayed the normal static product price.
* Cart Page displayed the normal static product price.
* Checkout Overview displayed the normal static product price.
* When all products were added, Checkout Overview intermittently displayed an unrounded floating-point value for `Item total`.
* One observed value was `$121.94999999999999`.
* `Tax` and `Total` remained displayed with two decimal places.
* The precision defect was not reproduced on every attempt.
* For Sauce Labs Backpack:
  * Inventory Page displayed changing random values;
  * Product Details displayed `$29.99`;
  * Cart Page displayed `$29.99`;
  * Checkout Overview displayed `$29.99`;
  * Item total was `$29.99`;
  * Tax was `$2.40`;
  * Total was `$32.39`.
* The Inventory Page price therefore did not match the price used in Product Details, Cart, and Checkout.
* The first product position on the Inventory Page displayed a dog-with-ball image.
* After sorting changed the first product, the dog image moved to the new first product.
* The dog image was therefore associated with the first visual position rather than a specific product.
* Product Details displayed the correct image for the opened product.
* Product card content alignment was inconsistent.
* Some product names were shifted horizontally compared with other cards.
* Prices and action buttons were not aligned consistently across product cards.
* At least one `Add to cart` button extended outside the expected product-card content area.
* The cart icon was positioned incorrectly in the header.
* The cart icon appeared near the sorting row or lower than its normal header position.
* The incorrect cart-icon position remained visible across:
  * Inventory Page;
  * Product Details;
  * Cart Page;
  * Checkout Step One;
  * Checkout Overview;
  * Order Complete.
* The Sidebar Menu icon was visually skewed.
* Its horizontal lines appeared tilted to the right instead of forming a normal hamburger icon.
* Sidebar Menu functionality remained available.
* Cart Page layout was inconsistent:
  * the `Checkout` button appeared at the top-right area of the page;
  * `Continue Shopping` remained lower on the left;
  * the two primary actions were visually separated.
* Checkout Step One layout was inconsistent:
  * `Cancel` and `Continue` were positioned far apart near the lower edges of the page;
  * the controls appeared detached from the form.
* Checkout Overview layout was inconsistent:
  * `Cancel` and `Finish` were positioned far apart near the lower edges of the page;
  * the controls appeared detached from the order information.
* Order Complete remained functional.
* Products could be added to the cart.
* The cart badge updated.
* Cart contents were preserved across the shopping flow.
* Checkout could be completed successfully.
* `Reset App State` cleared the actual cart but could leave stale `Remove` controls on the Inventory Page.
* The Reset App State behavior matched the already documented shared defect `BUG-CART-003`.

#### Visual and Functional Results

| Area | Action | Observed behavior |
| --- | --- | --- |
| Login | Log in as `visual_user` | Successful |
| Inventory | View product prices | Random prices displayed |
| Inventory | Reload or revisit page | Product prices changed |
| Inventory | Apply sorting | Sorting worked, prices changed |
| Inventory | Validate currency format | Some prices used inconsistent decimal formatting |
| Product Details | Open product | Normal static price displayed |
| Cart | View added product | Normal static price displayed |
| Checkout Overview | View added product | Normal static price displayed |
| Checkout Overview | Add all products and inspect Item total | Intermittently displayed an unrounded floating-point value |
| Inventory | Observe first product image | Dog image displayed |
| Inventory | Change sorting | Dog image moved to the new first product |
| Product Details | Validate product image | Correct image displayed |
| Inventory | Validate card layout | Alignment varied between cards |
| Inventory | Validate action buttons | At least one button exceeded the expected card area |
| Header | Observe cart icon | Positioned incorrectly |
| Header | Observe Sidebar Menu icon | Lines appeared skewed to the right |
| Sidebar Menu | Open menu | Functional |
| Cart | Validate page actions | Checkout and Continue Shopping were visually separated |
| Checkout Step One | Validate controls | Cancel and Continue were positioned far apart |
| Checkout Overview | Validate controls | Cancel and Finish were positioned far apart |
| Checkout | Complete order | Successful |
| Reset App State | Clear cart | Shared stale-button defect reproduced |

#### Findings

* Inventory Page prices are random and unstable.
* Inventory Page prices do not match the prices used in Product Details, Cart, or Checkout.
* Pricing inconsistency affects all available products.
* Currency formatting is inconsistent for some generated Inventory Page values.
* Checkout Overview can intermittently expose floating-point precision in `Item total`.
* The dog image is attached to the first product position rather than to a specific product.
* Correct product images appear on Product Details.
* Product card layout and control alignment are inconsistent.
* The cart icon is misplaced across multiple pages.
* The Sidebar Menu icon is visually skewed.
* Cart and checkout controls are positioned inconsistently.
* Core shopping and order-completion functionality remains available.
* Reset App State behavior is already tracked as the shared `BUG-CART-003`.

#### Risk Assessment

* **Pricing risk:** users see a different price before opening or purchasing a product.
* **Trust risk:** constantly changing prices make the catalog appear unreliable.
* **Commercial risk:** displayed catalog prices do not represent the actual transaction price.
* **Calculation-display risk:** unrounded floating-point values make financial totals appear unreliable.
* **Visual risk:** incorrect images may cause users to associate the wrong image with a product.
* **Usability risk:** misplaced header controls and action buttons reduce interface clarity.
* **Accessibility risk:** inconsistent alignment and detached controls make visual navigation harder.
* **Automation risk:** dynamic random prices and position-based images can cause unstable assertions.
* **Regression risk:** visual defects affect multiple pages and shared layout components.

#### Automation Decision

* Do not duplicate the complete `standard_user` regression suite.
* Add focused persona tests for stable, high-value defects.
* Prioritize:
  * Inventory price stability;
  * Inventory price consistency with Product Details;
  * Inventory price consistency with Cart and Checkout Overview;
  * currency-format validation;
  * Checkout Overview monetary rounding with all products;
  * first-position dog-image behavior after sorting;
  * correct Product Details image;
  * cart-icon positioning;
  * Sidebar Menu icon appearance;
  * product-card boundary and alignment checks.
* Use visual regression screenshots only for stable viewport sizes.
* Keep broad page-layout review as exploratory coverage.
* Reuse `BUG-CART-003` for Reset App State instead of creating a duplicate persona-specific defect.

---

## 7. Automation Priority

### Completed Automation Scope

**Current automated coverage:** 49 automated test scenarios. This includes 43 functional regression scenarios derived from the planned test cases and 6 focused persona-risk scenarios implemented as known expected failures. The latest complete local cross-browser run executed 147 tests: 49 scenarios across Chromium, Firefox, and WebKit.

| Test Case | Area | Reason |
| --- | --- | --- |
| TC-LOGIN-001 - TC-LOGIN-004 | Login Page | Core authentication smoke and negative coverage |
| TC-INV-001 - TC-INV-014 | Inventory Page | Product listing, cart actions, product details, sorting, cart navigation, and dynamic contract coverage for all currently available products |
| TC-CART-001 - TC-CART-006 | Cart Page | Cart item validation, removal, navigation, checkout entry, multiple products, and empty cart validation |
| TC-CART-007 | Cart / Checkout | Empty-cart checkout prevention, automated as a known expected failure for `BUG-CART-001` |
| TC-CHK1-001 - TC-CHK1-006 | Checkout Step One | Initial form display, required-field validation, successful continuation, and cancel navigation |
| TC-CHK2-001 | Checkout Overview | Basic overview page display, informational section labels, navigation controls, and cart badge |
| TC-CHK2-002 | Checkout Overview | Selected product name, quantity, description, price, and preserved cart badge |
| TC-CHK2-003 | Checkout Overview | Product price, item subtotal, tax, total, and arithmetic consistency |
| TC-CHK2-004 | Checkout Overview | Successful order completion through the Finish action |
| TC-CHK2-005 | Checkout Overview | Cancel navigation to Inventory Page with preserved cart state |
| TC-COMPLETE-001 | Order Complete Page | Completion title, success heading, confirmation message, and Back Home control |
| TC-COMPLETE-002 | Order Complete Page | Back Home navigation to Inventory Page |
| TC-MENU-001 | Sidebar Menu | Sidebar opening and visibility of all expected navigation items |
| TC-MENU-002 | Sidebar Menu | Sidebar closing, hidden menu items, and preserved Inventory Page state |
| TC-MENU-003 | Sidebar Menu | All Items navigation from Product Details to Inventory Page |
| TC-MENU-004 | Sidebar Menu | External About navigation to the `saucelabs.com` domain |
| TC-MENU-005 | Sidebar Menu | Logout, Login Page validation, and persistence of the logged-out state after reload |
| BUG-INV-001 | Persona Risk / `problem_user` | Verifies that the selected product opens the matching Product Details page |
| BUG-CHK1-001 | Persona Risk / `problem_user` | Verifies that Last Name accepts input and checkout can continue |
| BUG-INV-004 | Persona Risk / `error_user` | Verifies that sorting works without an alert and changes product order |
| BUG-CHK2-001 | Persona Risk / `error_user` | Verifies that Finish completes the order |
| BUG-INV-006 | Persona Risk / `visual_user` | Verifies Inventory and Product Details price consistency |
| BUG-INV-007 | Persona Risk / `visual_user` | Verifies that product images remain mapped correctly after sorting |

### Next Automation Scope

All currently planned test cases are automated.

### Later Automation Scope

Future automation work should focus on new test cases, framework improvements, CI reporting, and maintenance rather than completing the current planned scope.

---

## 8. AI-Assisted QA Opportunities

AI can be used in this project to support QA activities, while final test decisions remain human-reviewed.

Potential AI use cases:

* Generate draft test cases from user flows.
* Review test cases for missing negative scenarios.
* Summarize Playwright test execution reports.
* Classify failed tests by possible cause: product bug, test issue, or environment issue.
* Suggest regression areas based on changed functionality.
* Generate readable bug report drafts from failed test output.

AI outputs should be validated manually before being added to the test suite, documentation, or bug reports.

---

## 9. Risks and Assumptions

### Assumptions

* SauceDemo test data remains stable.
* SauceDemo is used as a demo application and does not require real backend validation.
* Tests are focused on UI behavior from the end-user perspective.
* Existing demo credentials remain available.
* Automated checks will be run in a controlled local or CI environment.

### Risks

* Demo application behavior may change without notice.
* UI text, routes, or attributes may change and affect automated tests.
* Tests may become flaky if they rely on unstable locators or timing.
* External navigation checks, such as the About page, may depend on third-party website availability.

---

## 10. Current Project Status

| Area | Status |
| --- | --- |
| Environment setup | Completed |
| Playwright project initialization | Completed |
| Git repository setup | Completed |
| GitHub repository setup | Completed |
| Login Page automation | Completed |
| Inventory Page test planning | Completed |
| Project-wide test planning | Completed |
| Inventory Page automation | Completed |
| Cart Page automation | Completed |
| Checkout Step One automation | Completed |
| Checkout Overview automation | Completed |
| Order Complete automation | Completed |
| Menu navigation automation | Completed |
| Persona risk automation | Completed |

---

## 11. Notes

This document is a planning and test design artifact.

It describes the checks planned for the SauceDemo QA Automation portfolio project.

Not every planned manual test case must be automated immediately.

Automation should be implemented incrementally, starting with high-priority smoke, happy path, and core regression scenarios.

Automated tests may include supporting assertions beyond the minimum expected result, but those assertions must remain within the scope of the matching test case ID.

Execution results should be tracked separately through Playwright reports or manual test execution notes.

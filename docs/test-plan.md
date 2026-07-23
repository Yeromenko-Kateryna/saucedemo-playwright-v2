# SauceDemo Test Plan

## Document Purpose

This document describes planned manual and automated checks for the SauceDemo QA Automation portfolio project.

The goal is to define what should be tested across the main SauceDemo user journey before selecting and implementing test cases for Playwright automation.

This test plan was created based on manual exploration, technical exploration with Playwright Codegen, and completed Login Page, Inventory Page, and Cart Page automation.

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
| First name | `Kateryna` |
| Last name | `Yeromenko` |
| Postal code | `38640` |

---

## 3. Planned Checks Overview

| Area | Test Cases | Priority |
| --- | ---: | --- |
| Login Page | 4 | High |
| Inventory Page | 13 | High / Medium |
| Cart Page | 6 | High / Medium |
| Checkout Step One | 6 | High / Medium |
| Checkout Overview | 5 | High / Medium |
| Order Complete Page | 2 | High / Medium |
| Sidebar Menu and Navigation | 5 | High / Medium / Low |

**Total planned test cases:** 41

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

### Initial Automation Approach

* Keep test files simple and feature-based.
* Use separate spec files for Login Page, Inventory Page, and Cart Page tests.
* Start with direct Playwright locators.
* Extract repeated login steps when duplication creates a real maintenance cost.
* Add Page Object Model later if the test suite grows enough to justify it.

### Planned Test Structure

* `tests/login-page.spec.ts` - Login Page tests.
* `tests/inventory-page.spec.ts` - Inventory Page and Product Details tests.
* `tests/cart-page.spec.ts` - Cart Page tests.
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
| Checkout Step One form display | Covered | Completed |
| Checkout information form | Covered | Planned |
| Checkout overview validation | Covered | Planned |
| Complete order flow | Covered | Planned |
| Sidebar menu navigation | Covered | Planned |
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
* Cart item is visible.
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

* Selected product name is visible.
* Product price is visible.
* Product quantity is visible.

### TC-CHK2-003 - Verify that price summary is displayed

* **Priority:** Medium
* **Type:** UI / Functional

#### Preconditions

* User is on Checkout Overview.

#### Steps

1. Check the price summary section.

#### Expected Result

* Item total is visible.
* Tax is visible.
* Total price is visible.

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

---

## 7. Automation Priority

### Completed Automation Scope

| Test Case | Area | Reason |
| --- | --- | --- |
| TC-LOGIN-001 - TC-LOGIN-004 | Login Page | Core authentication smoke and negative coverage |
| TC-INV-001 - TC-INV-013 | Inventory Page | Product listing, cart actions, product details, sorting, and cart navigation |
| TC-CART-001 - TC-CART-006 | Cart Page | Cart item validation, removal, navigation, checkout entry, multiple products, and empty cart validation |
| TC-CHK1-001 - TC-CHK1-003 | Checkout Step One | Initial form display and required-field validation for missing First Name and Last Name |

### Next Automation Scope

| Test Case | Reason |
| --- | --- |
| TC-CHK1-005 | Required for checkout happy path |
| TC-CHK2-004 | Completes main purchase flow |
| TC-COMPLETE-001 | Confirms successful order completion |

### Later Automation Scope

| Test Case | Reason |
| --- | --- |
| TC-CHK1-004 | Missing Postal Code validation |
| TC-CHK1-006 | Checkout cancel navigation |
| TC-CHK2-001 - TC-CHK2-003 | Checkout overview checks |
| TC-CHK2-005 | Checkout overview cancel navigation |
| TC-COMPLETE-002 | Back Home navigation |
| TC-MENU-001 - TC-MENU-005 | Sidebar menu behavior |

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
| Checkout automation | In Progress |
| Menu navigation automation | Planned |

---

## 11. Notes

This document is a planning and test design artifact.

It describes the checks planned for the SauceDemo QA Automation portfolio project.

Not every planned manual test case must be automated immediately.

Automation should be implemented incrementally, starting with high-priority smoke, happy path, and core regression scenarios.

Automated tests may include supporting assertions beyond the minimum expected result, but those assertions must remain within the scope of the matching test case ID.

Execution results should be tracked separately through Playwright reports or manual test execution notes.

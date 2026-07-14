# Test Execution Summary

## Document Purpose

This document tracks selected manual and automated test execution results for the SauceDemo QA Automation portfolio project.

The goal is to separate planned test cases from actual execution results.

---

## Manual Test Run - Inventory Page

### TC-INV-001 - Verify that Inventory Page is displayed after successful login

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User entered valid username and password.
- Login was successful.
- User was redirected to the Inventory Page.
- Page loaded quickly.
- Product list was visible.
- Cart icon was visible.
- Sorting dropdown was visible.
- Product cards were visible.
- Product names, descriptions, prices, images, and `Add to cart` buttons were visible.

#### Observations

- Some product names and descriptions contain code-like text, for example:
  - `carry.allTheThings()`
  - `Test.allTheThings() T-Shirt (Red)`
- This looks like demo/test content in SauceDemo and is not a blocking issue for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-002 - Verify that product cards contain required information

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- Product name `Sauce Labs Backpack` was visible.
- Product description was visible.
- Product price was visible.
- Product image was visible.
- `Add to cart` button was visible.

#### Observations

- Product name is clickable and opens the product details page.
- Product image is clickable and opens the product details page.
- Product description is not clickable.
- Product price is not clickable.
- Product description contains code-like demo text: `carry.allTheThings()`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-003 - Verify that user can add one product to the cart

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User clicked `Add to cart` for `Sauce Labs Backpack`.
- Cart badge showed `1`.
- `Add to cart` button changed to `Remove`.
- User opened the cart.
- `Sauce Labs Backpack` was visible in the cart.
- Product quantity was shown as `1`.
- Product description was visible.
- Product price was visible.
- `Remove` button was visible.

#### Observations

- Cart page displays product quantity instead of product image.
- The number `1` on the cart item represents quantity, not a missing image.
- Product description still contains code-like demo text: `carry.allTheThings()`.
- User can add another different product to the cart, and the cart badge updates to `2`.
- The same product cannot be added multiple times from the Inventory Page because the button changes from `Add to cart` to `Remove`.
- `Checkout` button is visible on the cart page.
- `Continue Shopping` button is visible on the cart page.

#### Possible Bugs

- None found for this test case.
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

---

### TC-INV-004 - Verify that user can remove product from the cart

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User added `Sauce Labs Backpack` to the cart.
- Cart badge showed `1`.
- User opened the cart.
- `Sauce Labs Backpack` was visible in the cart.
- User clicked `Remove`.
- `Sauce Labs Backpack` disappeared from the cart.
- Cart badge disappeared.
- Cart page no longer showed the removed product.

#### Observations

- Removing a product from the cart worked correctly.
- Cart state was updated immediately after clicking `Remove`.
- Cart badge disappeared after the last product was removed.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-005 - Verify that user can add multiple different products to the cart

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User added `Sauce Labs Backpack` to the cart.
- Cart badge showed `1`.
- User added `Sauce Labs Bike Light` to the cart.
- Cart badge showed `2`.
- Both product buttons changed to `Remove`.
- User opened the cart.
- `Sauce Labs Backpack` was visible in the cart.
- `Sauce Labs Bike Light` was visible in the cart.
- Both products had quantity `1`.
- Product prices were visible.

#### Observations

- Adding multiple different products worked correctly.
- Cart badge updated from `1` to `2`.
- Both added products were displayed correctly on the Cart Page.
- Each added product had quantity `1`.
- Product prices were visible for both products.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-006 - Verify that product details page opens from product name

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User found product `Sauce Labs Backpack` on the Inventory Page.
- User clicked product name `Sauce Labs Backpack`.
- Product details page opened.
- Product name `Sauce Labs Backpack` was visible.
- Product description was visible.
- Product price `$29.99` was visible.
- Product image was visible.
- `Add to cart` button was visible.
- `Back to products` button was visible.

#### Observations

- Product details page opened correctly after clicking the product name.
- Product details matched the selected product.
- Product description contains code-like demo text: `carry.allTheThings()`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-007 - Verify that product details page opens from product image

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User found product `Sauce Labs Backpack` on the Inventory Page.
- User clicked the product image for `Sauce Labs Backpack`.
- Product details page opened.
- Product name `Sauce Labs Backpack` was visible.
- Product description was visible.
- Product price `$29.99` was visible.
- Product image was visible.
- `Add to cart` button was visible.
- `Back to products` button was visible.

#### Observations

- Product details page opened correctly after clicking the product image.
- Product details matched the selected product.
- Product description contains code-like demo text: `carry.allTheThings()`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-008 - Verify that Back to products button returns user to Inventory Page

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User found product `Sauce Labs Backpack` on the Inventory Page.
- User clicked product name `Sauce Labs Backpack`.
- Product Details Page opened.
- User clicked `Back to products`.
- Inventory Page opened again.
- Page title `Products` was visible.
- Product list was visible.
- `Sauce Labs Backpack` was visible again on the Inventory Page.

#### Observations

- `Back to products` button returned the user to the Inventory Page correctly.
- Product list was displayed after returning from the Product Details Page.
- Some product names and descriptions contain code-like demo text, for example `carry.allTheThings()` and `Test.allTheThings() T-Shirt (Red)`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-009 - Verify sorting products by Name A to Z

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User opened the sorting dropdown.
- User selected `Name (Z to A)` first to change the default product order.
- Product order changed.
- User opened the sorting dropdown again.
- User selected `Name (A to Z)`.
- Products were displayed in alphabetical order:
  1. `Sauce Labs Backpack`
  2. `Sauce Labs Bike Light`
  3. `Sauce Labs Bolt T-Shirt`
  4. `Sauce Labs Fleece Jacket`
  5. `Sauce Labs Onesie`
  6. `Test.allTheThings() T-Shirt (Red)`

#### Observations

- Sorting dropdown worked correctly.
- Product order changed after selecting a different sorting option.
- `Name (A to Z)` displayed products in alphabetical ascending order.
- No products disappeared after sorting.
- Product names, images, prices, and `Add to cart` buttons remained visible.
- Some product names contain code-like demo text, for example `Test.allTheThings() T-Shirt (Red)`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-010 - Verify sorting products by Name Z to A

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User opened the sorting dropdown.
- User selected `Name (Z to A)`.
- Product order changed.
- Products were displayed in descending alphabetical order:
  1. `Test.allTheThings() T-Shirt (Red)`
  2. `Sauce Labs Onesie`
  3. `Sauce Labs Fleece Jacket`
  4. `Sauce Labs Bolt T-Shirt`
  5. `Sauce Labs Bike Light`
  6. `Sauce Labs Backpack`

#### Observations

- Sorting dropdown worked correctly.
- `Name (Z to A)` displayed products in descending alphabetical order.
- No products disappeared after sorting.
- Product names, images, prices, and `Add to cart` buttons remained visible.
- Some product names contain code-like demo text, for example `Test.allTheThings() T-Shirt (Red)`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-011 - Verify sorting products by Price low to high

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User opened the sorting dropdown.
- User selected `Price (low to high)`.
- Product order changed.
- Products were displayed from lowest price to highest price:
  1. `Sauce Labs Onesie` - `$7.99`
  2. `Sauce Labs Bike Light` - `$9.99`
  3. `Sauce Labs Bolt T-Shirt` - `$15.99`
  4. `Test.allTheThings() T-Shirt (Red)` - `$15.99`
  5. `Sauce Labs Backpack` - `$29.99`
  6. `Sauce Labs Fleece Jacket` - `$49.99`

#### Observations

- Sorting dropdown worked correctly.
- `Price (low to high)` displayed products from the lowest price to the highest price.
- Two products had the same price: `$15.99`.
- Products with the same price were displayed next to each other.
- No products disappeared after sorting.
- Product names, images, prices, and `Add to cart` buttons remained visible.
- Some product names contain code-like demo text, for example `Test.allTheThings() T-Shirt (Red)`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-012 - Verify sorting products by Price high to low

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User opened the sorting dropdown.
- User selected `Price (high to low)`.
- Product order changed.
- Products were displayed from highest price to lowest price:
  1. `Sauce Labs Fleece Jacket` - `$49.99`
  2. `Sauce Labs Backpack` - `$29.99`
  3. `Sauce Labs Bolt T-Shirt` - `$15.99`
  4. `Test.allTheThings() T-Shirt (Red)` - `$15.99`
  5. `Sauce Labs Bike Light` - `$9.99`
  6. `Sauce Labs Onesie` - `$7.99`

#### Observations

- Sorting dropdown worked correctly.
- `Price (high to low)` displayed products from the highest price to the lowest price.
- Two products had the same price: `$15.99`.
- Products with the same price were displayed next to each other.
- No products disappeared after sorting.
- Product names, images, prices, and `Add to cart` buttons remained visible.
- Some product names contain code-like demo text, for example `Test.allTheThings() T-Shirt (Red)`.
- This looks like SauceDemo demo/test content and is not blocking for this test case.

#### Possible Bugs

- None found for this test case.

---

### TC-INV-013 - Verify cart navigation from Inventory Page

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User clicked the cart icon in the top-right corner.
- Cart Page was opened.
- URL contained `/cart.html`.
- Page title `Your Cart` was displayed.
- Cart list area was visible.
- `Continue Shopping` button was visible.
- `Checkout` button was visible.

#### Observations

- Cart Page opened successfully from the Inventory Page.
- Cart was empty by default because no products were added before opening the cart.
- `Continue Shopping` button returned the user back to the Inventory Page.
- `Checkout` button allowed the user to continue to the checkout flow even when the cart was empty.
- Empty-cart checkout behavior should be reviewed separately in Cart or Checkout test cases.
- This behavior is not blocking for this test case because `TC-INV-013` only verifies cart navigation from the Inventory Page.

#### Possible Bugs

- None found for this test case.

---

### TC-CART-001 - Verify Cart Page with one added product

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User added `Sauce Labs Backpack` to the cart.
- Cart badge displayed `1`.
- User clicked the cart icon.
- Cart Page was opened.
- URL contained `/cart.html`.
- Page title `Your Cart` was displayed.
- Cart contained one product: `Sauce Labs Backpack`.
- Product quantity was `1`.
- Product name was displayed.
- Product description was displayed.
- Product price `$29.99` was displayed.
- `Remove` button was visible.
- `Continue Shopping` button was visible.
- `Checkout` button was visible.

#### Observations

- Cart Page displayed the added product correctly.
- Product quantity, name, description, price, and Remove button matched the selected product.
- Cart badge still displayed `1` on the Cart Page.
- Cart Page navigation controls were visible.
- Product image is not displayed on the Cart Page, which appears to be expected SauceDemo behavior.

#### Possible Bugs

- None found for this test case.

---

### TC-CART-002 - Verify removing product from Cart Page

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User added `Sauce Labs Backpack` to the cart.
- Cart badge displayed `1`.
- User clicked the cart icon.
- Cart Page was opened.
- Cart Page displayed `Sauce Labs Backpack`.
- User clicked the `Remove` button for `Sauce Labs Backpack`.
- `Sauce Labs Backpack` was removed from the cart.
- Cart badge disappeared.
- Cart Page remained opened.
- Page title `Your Cart` was displayed.
- Cart list area remained visible.
- `Continue Shopping` button was visible.
- `Checkout` button was visible.

#### Observations

- Product was removed from the Cart Page successfully.
- Cart badge disappeared after removing the only product.
- Cart Page remained opened after product removal.
- Cart Page controls remained visible.
- `Checkout` button remained visible even when the cart became empty.
- Empty-cart checkout behavior should be reviewed separately in Cart or Checkout test cases.

#### Possible Bugs

- None found for this test case.

---

### TC-CART-003 - Verify Continue Shopping button from Cart Page

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User added `Sauce Labs Backpack` to the cart.
- Cart badge displayed `1`.
- User clicked the cart icon.
- Cart Page was opened.
- User clicked `Continue Shopping`.
- Inventory Page was opened again.
- URL contained `/inventory.html`.
- Page title `Products` was displayed.
- Product list was visible.
- Cart badge still displayed `1`.
- `Sauce Labs Backpack` remained added to the cart.
- `Remove` button was displayed for `Sauce Labs Backpack`.

#### Observations

- `Continue Shopping` button returned the user from Cart Page to Inventory Page successfully.
- Cart state was preserved after returning to Inventory Page.
- Cart badge still displayed `1`.
- `Sauce Labs Backpack` remained in the added state.
- The product button still displayed `Remove`.

#### Possible Bugs

- None found for this test case.

---

### TC-CART-004 - Verify Checkout button from Cart Page

- **Execution type:** Manual
- **Status:** Passed
- **Automation decision:** Automated

#### Actual Result

- User logged in as `standard_user`.
- User opened the Inventory Page.
- User added `Sauce Labs Backpack` to the cart.
- Cart badge displayed `1`.
- User clicked the cart icon.
- Cart Page was opened.
- `Checkout` button was visible.
- User clicked `Checkout`.
- Checkout Step One Page was opened.
- URL contained `/checkout-step-one.html`.
- Page title `Checkout: Your Information` was displayed.
- First Name field was visible.
- Last Name field was visible.
- Postal Code field was visible.
- `Continue` button was visible.
- `Cancel` button was visible.

#### Observations

- Checkout button redirected the user from Cart Page to Checkout Step One Page successfully.
- Checkout form fields were displayed correctly.
- Cart badge still displayed `1` on Checkout Step One Page.
- Clicking `Continue` without filling required fields showed validation error `Error: First Name is required`.
- Empty-field validation should be covered separately in Checkout Step One test cases.
- This validation behavior is not blocking for `TC-CART-004`.

#### Possible Bugs

- None found for this test case.

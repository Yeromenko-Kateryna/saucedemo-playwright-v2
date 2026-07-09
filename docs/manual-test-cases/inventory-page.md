# Inventory Page Manual Test Cases

## TC-INV-001 - Verify that Inventory Page is displayed after successful login

**Priority:** High
**Type:** Smoke / Happy path

### Preconditions

* User is on the SauceDemo login page.
* User has valid credentials:

  * Username: `standard_user`
  * Password: `secret_sauce`

### Steps

1. Enter a valid username.
2. Enter a valid password.
3. Click the `Login` button.

### Expected Result

* User is redirected to the Inventory Page.
* Page URL contains `/inventory.html`.
* Page title `Products` is visible.
* Product list is visible.
* Cart icon is visible.
* Sorting dropdown is visible.

---

## TC-INV-002 - Verify that product cards contain required information

**Priority:** High
**Type:** Smoke / UI / Functional

### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.

### Steps

1. Look at the product list.
2. Check the first product card.
3. Verify that the product card contains product name, description, price, image, and `Add to cart` button.

### Expected Result

* Product name is visible.
* Product description is visible.
* Product price is visible.
* Product image is visible.
* `Add to cart` button is visible.

---

## TC-INV-003 - Verify that user can add one product to the cart

**Priority:** High
**Type:** Happy path / Functional

### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* Cart is empty.

### Steps

1. Find one product card.
2. Click the `Add to cart` button for this product.

### Expected Result

* The product is added to the cart.
* The button changes from `Add to cart` to `Remove`.
* Cart badge is visible.
* Cart badge shows `1`.

---

## TC-INV-004 - Verify that user can remove product from the cart

**Priority:** High
**Type:** Functional / Regression

### Preconditions

* User is logged in as `standard_user`.
* User is on the Inventory Page.
* One product is already added to the cart.

### Steps

1. Find the product that is already added to the cart.
2. Click the `Remove` button for this product.

### Expected Result

* The product is removed from the cart.
* The button changes from `Remove` to `Add to cart`.
* Cart badge is no longer visible.

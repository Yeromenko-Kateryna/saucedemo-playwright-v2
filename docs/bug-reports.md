# Bug Reports

## Purpose

This document records confirmed product defects discovered during manual exploratory testing of the SauceDemo application.

Each bug report includes:

- reproduction steps;
- actual and expected results;
- severity and priority assessment;
- business impact;
- reproducibility;
- supporting evidence;
- related manual and automated test cases.

Bug reports are based on observed application behavior. When an explicit product requirement is unavailable, the assumed business rule is stated clearly.

---

## BUG-CART-001 - User can complete checkout with an empty cart

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Business Rule Validation
- **Area:** Cart / Checkout
- **Reproducibility:** 100%
- **Related test case:** TC-CART-007
- **Environment:** SauceDemo web application
- **User:** `standard_user`

### Preconditions

- User is logged in as `standard_user`.
- Cart contains no products.
- Cart badge is not displayed.

### Steps to Reproduce

1. Open the Cart Page.
2. Confirm that no cart items are displayed.
3. Click the `Checkout` button.
4. Enter valid values into the First Name, Last Name, and Zip/Postal Code fields.
5. Click `Continue`.
6. Review Checkout Overview.
7. Click `Finish`.

### Actual Result

- The active `Checkout` button is displayed on the empty Cart Page.
- User can open Checkout Step One with no products in the cart.
- User can submit valid checkout information.
- User can open Checkout Overview with no products.
- Checkout Overview displays:
  - `Item total: $0`;
  - `Tax: $0.00`;
  - `Total: $0.00`.
- The `Finish` button remains enabled.
- User can complete the empty order.
- The Order Complete Page displays:
  - `Checkout: Complete!`;
  - `Thank you for your order!`.

### Expected Result

The application must not allow checkout completion when the cart contains no products.

At least one of the following controls should prevent the invalid flow:

- the `Checkout` button should be disabled or hidden when the cart is empty;
- clicking `Checkout` should display a clear validation message and keep the user on the Cart Page;
- the `Continue` or `Finish` action should reject an order containing no products.

The Order Complete Page must not be displayed for an empty order.

### Business Impact

The application accepts an invalid order that:

- contains no products;
- has a total value of `$0.00`;
- is presented to the user as successfully completed.

In a production e-commerce system, this could create invalid order records, trigger unnecessary downstream processing, distort order analytics, or expose missing server-side validation.

### Requirement Basis

No explicit SauceDemo requirement describing empty-cart checkout behavior is available in the project documentation.

The expected result is based on the standard e-commerce business rule that a valid order must contain at least one product.

This should also be treated as a requirement clarification point for the product owner.

### Evidence

1. [Empty Cart Page with active Checkout button](evidence/BUG-CART-001/01-empty-cart-checkout-enabled.png)
2. [Checkout Step One opened with an empty cart](evidence/BUG-CART-001/02-empty-cart-checkout-information.png)
3. [Checkout Overview with no products and total `$0.00`](evidence/BUG-CART-001/03-empty-cart-checkout-overview.png)
4. [Order Complete Page displayed after empty checkout](evidence/BUG-CART-001/04-empty-order-completed.png)

### Notes

- The issue was discovered during exploratory testing.
- The complete empty-cart checkout flow was reproduced successfully.
- No validation message was displayed at any stage.
- The defect affects the core checkout business process.

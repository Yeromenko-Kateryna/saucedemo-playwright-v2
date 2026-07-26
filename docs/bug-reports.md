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

---

## BUG-COMPLETE-001 - Generated order PDF corrupts Unicode checkout data

- **Status:** Open
- **Severity:** Medium
- **Priority:** Medium
- **Type:** Encoding / Data Presentation
- **Area:** Order Complete / PDF Generation
- **Reproducibility:** 100%
- **Related test case:** Not yet created; discovered during exploratory testing
- **Environment:** SauceDemo web application
- **User:** `standard_user`

### Preconditions

- User is logged in as `standard_user`.
- Cart contains at least one product.
- User is able to complete the checkout flow.

### Steps to Reproduce

1. Open the Cart Page.
2. Click `Checkout`.
3. Enter Cyrillic or other non-ASCII text into the First Name and Last Name fields.
4. Enter a value into the Zip/Postal Code field.
5. Click `Continue`.
6. Complete the order by clicking `Finish`.
7. Click `Generate PDF order`.
8. Open the generated PDF.
9. Review the `SHIP TO` section.

### Actual Result

- The checkout flow accepts the Unicode input.
- The order is completed successfully.
- The entered checkout information is included in the generated PDF.
- Cyrillic characters in the `SHIP TO` section are replaced with unreadable or corrupted characters.
- Long corrupted values may also overflow the intended layout area.
- Product names, prices, tax, total, and other Latin text remain readable.

### Expected Result

- The generated PDF preserves Unicode checkout information correctly.
- Cyrillic and other supported characters remain readable.
- Long values wrap or are constrained without overlapping other PDF content.
- The generated receipt accurately represents the information entered by the user.

### Control Check

The same flow was repeated with ASCII checkout data:

- First Name: `Katia`
- Last Name: `Tester`
- Zip/Postal Code: `12345`

The generated PDF displayed these values correctly:

- `Katia Tester`
- `12345`

This confirms that the issue is specifically related to Unicode character handling rather than general PDF generation.

### Impact

- Users whose names contain Cyrillic or other unsupported Unicode characters receive an incorrect order receipt.
- Shipping or customer information in the PDF cannot be reliably read.
- The generated document does not accurately preserve user-provided data.
- This can reduce trust in the receipt and create ambiguity in order records.

### Evidence

1. [Generated PDF with corrupted long Cyrillic input](evidence/BUG-COMPLETE-001/01-corrupted-cyrillic-long-input.pdf)
2. [Generated PDF with corrupted mixed Unicode input](evidence/BUG-COMPLETE-001/02-corrupted-mixed-unicode-input.pdf)
3. [Generated PDF with correctly displayed ASCII control data](evidence/BUG-COMPLETE-001/03-correct-ascii-control.pdf)

### Notes

- The issue was discovered during Checkout Input Validation exploratory testing.
- Checkout Step One does not reject Unicode or long input.
- Checkout Overview does not display the entered customer information, so the corruption becomes visible only after generating the PDF.
- The defect was reproduced with multiple Unicode and mixed-character values.

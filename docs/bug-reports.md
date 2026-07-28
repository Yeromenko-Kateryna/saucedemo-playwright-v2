# Bug Reports

## Purpose

This document records evidence-backed product defects and persona-specific observations discovered during manual exploratory testing of the SauceDemo application.

Each record includes:

- reproduction steps;
- actual and expected results;
- severity and priority assessment;
- business impact;
- reproducibility;
- supporting evidence where it was captured;
- related manual and automated test cases.

## Scope Note

`BUG-CART-001` and `BUG-COMPLETE-001` are evidence-backed defects observed with the standard user flow. The remaining records document observed behavior for named non-standard personas or cross-persona scenarios. They demonstrate exploratory testing and risk analysis, but should not be interpreted as confirmed production defects without product requirements or product-owner confirmation.

Bug reports are based on observed application behavior. When an explicit product requirement is unavailable, the assumed business rule is stated clearly.

---

## Confirmed Evidence-Backed Defects

### BUG-CART-001 - User can complete checkout with an empty cart

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Business Rule Validation
- **Area:** Cart / Checkout
- **Reproducibility:** 100%
- **Related test case:** TC-CART-007
- **Automated check:** `tests/cart-page.spec.ts`
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

### BUG-COMPLETE-001 - Generated order PDF corrupts Unicode checkout data

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

---

## Persona-Specific Defect Observations

### BUG-INV-001 - Product Details opens a different product for problem_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Data Integrity / Navigation
- **Area:** Inventory / Product Details
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-001`
- **Automated check:** `tests/persona-risks.spec.ts`
- **Environment:** SauceDemo web application
- **User:** `problem_user`

### Preconditions

- User is logged in as `problem_user`.
- User is on the Inventory Page.
- All six products are displayed.

### Steps to Reproduce

1. Review the name of a product on the Inventory Page.
2. Click the product name to open Product Details.
3. Compare the selected product with:
   - the resulting URL;
   - Product Details name;
   - description;
   - price;
   - image.
4. Return to the Inventory Page.
5. Repeat the same steps for every available product.

### Actual Result

None of the six Inventory Page products opens its corresponding Product Details content.

| Selected product on Inventory Page | Opened URL                  | Actual Product Details content                                               |
| ---------------------------------- | --------------------------- | ---------------------------------------------------------------------------- |
| Sauce Labs Backpack                | `/inventory-item.html?id=5` | Sauce Labs Fleece Jacket                                                     |
| Sauce Labs Bike Light              | `/inventory-item.html?id=1` | Sauce Labs Bolt T-Shirt                                                      |
| Sauce Labs Bolt T-Shirt            | `/inventory-item.html?id=2` | Sauce Labs Onesie                                                            |
| Sauce Labs Fleece Jacket           | `/inventory-item.html?id=6` | `ITEM NOT FOUND`, unrelated description, invalid price `$√-1`, and dog image |
| Sauce Labs Onesie                  | `/inventory-item.html?id=3` | Test.allTheThings() T-Shirt (Red)                                            |
| Test.allTheThings() T-Shirt (Red)  | `/inventory-item.html?id=4` | Sauce Labs Backpack                                                          |

Additional observations:

- Five product links open valid data belonging to a different product.
- One product link opens corrupted fallback data.
- The opened URL does not correspond to the product selected by the user.
- Product identity is not preserved between Inventory and Product Details.

### Expected Result

- Clicking a product name opens Product Details for that same product.
- The URL identifies the selected product.
- Product name, description, price, and image match the selected Inventory Page card.
- No valid product link displays `ITEM NOT FOUND` or invalid fallback data.

### Impact

- User cannot reliably inspect the product they selected.
- Product names, descriptions, prices, and images may belong to a different product.
- The issue can cause incorrect purchasing decisions.
- Product identity and catalog data integrity are compromised.
- Every available product is affected for `problem_user`.

### Notes

- The issue was discovered during persona exploratory testing.
- The behavior was reproduced for all six available products.
- The corresponding Product Details flow works correctly for `standard_user`.
- This issue should be automated as a focused persona risk scenario rather than by repeating the complete standard-user regression suite.

---

### BUG-CHK1-001 - Last Name field does not accept input for problem_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Input / Checkout Blocker
- **Area:** Checkout Step One
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-001`
- **Automated check:** `tests/persona-risks.spec.ts`
- **Environment:** SauceDemo web application
- **User:** `problem_user`

### Preconditions

- User is logged in as `problem_user`.
- Cart contains at least one product.
- User is on Checkout Step One.

### Steps to Reproduce

1. Click the First Name field.
2. Enter any valid value.
3. Click the Last Name field.
4. Type any characters.
5. Click the Zip/Postal Code field.
6. Enter any valid value.
7. Click `Continue`.

### Actual Result

- First Name accepts and preserves typed characters.
- Zip/Postal Code accepts and preserves typed characters.
- Last Name receives focus and displays a text cursor.
- Characters typed into Last Name are not preserved.
- Last Name remains empty.
- Clicking `Continue` displays:

  `Error: Last Name is required`

- User remains on Checkout Step One.
- Checkout cannot proceed to Checkout Overview.

### Expected Result

- Last Name accepts and preserves typed characters.
- User can submit valid checkout information.
- User is redirected to Checkout Overview.
- Checkout is not blocked by a non-functional input field.

### Impact

- `problem_user` cannot complete checkout.
- The issue blocks the core purchase flow.
- User input appears possible because the field receives focus, but the entered value is silently discarded.
- The defect creates a misleading and frustrating user experience.

### Notes

- The issue was discovered during persona exploratory testing.
- The behavior was reproduced repeatedly.
- First Name and Zip/Postal Code continue to work.
- The corresponding checkout form works correctly for `standard_user`.
- This issue is suitable for focused automation as a known expected failure.

---

### BUG-INV-002 - All inventory products display the same incorrect image for problem_user

- **Status:** Open
- **Severity:** Medium
- **Priority:** Medium
- **Type:** Visual / Data Mapping
- **Area:** Inventory Page
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-001`
- **Environment:** SauceDemo web application
- **User:** `problem_user`

### Preconditions

- User is logged in as `problem_user`.
- User is on the Inventory Page.
- All six product cards are displayed.

### Steps to Reproduce

1. Review the image displayed on each product card.
2. Compare the images between all available products.
3. Compare each image with the corresponding product name and description.

### Actual Result

- All six product cards display the same image of a dog holding a ball.
- The image is unrelated to the actual products.
- Different products with different names, descriptions, and prices display the same image.
- The visual identity of each product is lost.

### Expected Result

- Every product card displays the image corresponding to that product.
- Product images differ where the catalog contains different products.
- The image matches the product name and description.
- Unrelated placeholder or incorrect images are not displayed.

### Impact

- Users cannot visually distinguish products.
- Product presentation is misleading.
- The catalog appears corrupted or untrustworthy.
- The issue affects every available product for `problem_user`.

### Notes

- The issue was discovered during persona exploratory testing.
- The same dog image was reproduced on all six Inventory Page product cards.
- Product names, descriptions, and prices remained different.
- The corresponding product images display correctly for `standard_user`.
- This issue is suitable for focused visual or DOM-based automation.

---

### BUG-INV-003 - Product sorting does not change for problem_user

- **Status:** Open
- **Severity:** Medium
- **Priority:** Medium
- **Type:** Functional / Sorting
- **Area:** Inventory Page
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-001`
- **Environment:** SauceDemo web application
- **User:** `problem_user`

### Preconditions

- User is logged in as `problem_user`.
- User is on the Inventory Page.
- The product sorting dropdown is visible.

### Steps to Reproduce

1. Open the product sorting dropdown.
2. Select any option other than `Name (A to Z)`, for example:
   - `Name (Z to A)`;
   - `Price (low to high)`;
   - `Price (high to low)`.
3. Observe the selected value in the dropdown.
4. Observe the order of products in the catalog.

### Actual Result

- The sorting dropdown opens.
- Clicking another sorting option does not apply the selection.
- The displayed value remains `Name (A to Z)`.
- Product order does not change.
- The user cannot switch to another sorting mode.

### Expected Result

- The selected sorting option is applied.
- The dropdown displays the selected value.
- Product order changes according to the selected sorting rule.
- User can switch between all available sorting modes.

### Impact

- `problem_user` cannot sort products by name or price.
- Product discovery and comparison are limited.
- The Inventory Page does not respond to a visible user control.
- The behavior differs from the working sorting flow for `standard_user`.

### Notes

- The issue was discovered during persona exploratory testing.
- The behavior was reproduced repeatedly.
- The sorting control remains visible but does not apply any alternative option.
- Sorting works correctly for `standard_user`.
- This issue is suitable for focused automation as a known expected failure.

---

### BUG-CART-002 - Inventory and Product Details cart actions do not respond for problem_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Cart State
- **Area:** Inventory / Product Details / Cart
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-001`
- **Environment:** SauceDemo web application
- **User:** `problem_user`

### Preconditions

- User is logged in as `problem_user`.
- User is on the Inventory Page.
- Cart is empty.

### Steps to Reproduce

1. Locate `Sauce Labs Backpack` on the Inventory Page.
2. Click `Add to cart`.
3. Verify that:
   - the button changes to `Remove`;
   - cart badge displays `1`;
   - the product appears in the Cart Page.
4. Return to the Inventory Page.
5. Click `Remove` for `Sauce Labs Backpack`.
6. Observe the button and cart badge.
7. Open the Cart Page.
8. Click `Remove` for the Backpack in the Cart Page.
9. Return to the Inventory Page.
10. Open Product Details through the Backpack product link.
11. Click `Add to cart` on Product Details.

### Actual Result

- `Add to cart` on the Inventory Page initially works.
- The button changes to `Remove`.
- Cart badge displays `1`.
- `Sauce Labs Backpack` appears in the Cart Page.
- Clicking `Remove` on the Inventory Page does not remove the product.
- The button remains `Remove`.
- Cart badge remains `1`.
- The product remains in the cart.
- Clicking `Remove` in the Cart Page works correctly.
- The product is removed from the cart.
- The Backpack link opens Product Details for another product because of `BUG-INV-001`.
- Clicking `Add to cart` on the opened Product Details Page does not add the displayed product.

### Expected Result

- `Remove` on the Inventory Page removes the selected product.
- The button changes back to `Add to cart`.
- Cart badge is updated or removed.
- The Cart Page no longer contains the removed product.
- `Add to cart` on Product Details adds the displayed product.
- Cart actions behave consistently across Inventory, Product Details, and Cart Page.

### Impact

- User cannot reliably manage cart contents from the Inventory Page.
- User must open the Cart Page to remove products.
- Product Details cart actions do not work.
- Cart controls display actionable states but do not perform the corresponding operation.
- Cart state becomes inconsistent across application pages.

### Related Defects

- `BUG-INV-001` — Product Details opens a different product for `problem_user`.

### Notes

- The issue was reproduced with `Sauce Labs Backpack`.
- Removal from the Cart Page works correctly.
- Inventory Page removal and Product Details addition do not work.
- Additional products showed similar inconsistent Add/Remove behavior during exploratory testing.
- Automation should use one stable product scenario rather than duplicating the test for every product.

---

### BUG-INV-004 - Sorting displays an error alert and does not change product order for error_user

- **Status:** Open
- **Severity:** Medium
- **Priority:** High
- **Type:** Functional
- **Area:** Inventory Page / Sorting
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-003`
- **Automated check:** `tests/persona-risks.spec.ts`
- **User:** `error_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `error_user`.
- Inventory Page is open.

### Steps to Reproduce

1. Open the product sorting dropdown.
2. Select `Name (A to Z)`.
3. Observe the result.
4. Repeat the test with:
   - `Name (Z to A)`;
   - `Price (low to high)`;
   - `Price (high to low)`.

### Expected Result

- The selected sorting option is applied.
- Product order changes according to the selected option.
- No error alert is displayed.

### Actual Result

- Each available sorting option displays the browser alert:

  `Sorting is broken! This error has been reported to Backtrace.`

- Product order does not change.
- Sorting remains unavailable for `error_user`.

### Impact

- The user cannot reorder the product catalog.
- Product comparison by name or price is unavailable.
- The alert interrupts the shopping flow.
- Automated sorting tests require explicit alert handling and cannot validate the expected product order.

### Notes

- The defect was reproduced with all four available sorting options.
- The behavior is specific to `error_user`.
- Sorting works for `standard_user`.

---

### BUG-INV-005 - Product description is missing on Product Details for error_user

- **Status:** Open
- **Severity:** Medium
- **Priority:** High
- **Type:** Functional / Content
- **Area:** Product Details
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-003`
- **User:** `error_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `error_user`.
- Inventory Page is open.

### Steps to Reproduce

1. Open any product from the Inventory Page.
2. Observe the Product Details page.
3. Return to the Inventory Page.
4. Repeat the check for all six available products.

### Expected Result

- Product Details displays:
  - product name;
  - product description;
  - product price;
  - product image;
  - cart action control.

### Actual Result

- Product name is displayed.
- Product price is displayed.
- Product image is displayed.
- The cart action control is displayed.
- Product description is missing.
- The defect occurs for all six available products.

### Impact

- Users cannot read complete product information before adding an item to the cart.
- Product comparison and purchase decisions are affected.
- Product Details does not provide the same description available on the Inventory Page.
- Automated Product Details validation fails for the description element.

### Notes

- The defect was reproduced for all six products.
- Product routing, name, price, and image were correct during exploration.
- The behavior is specific to `error_user`.
- Product descriptions are displayed correctly for `standard_user`.

---

### BUG-CHK1-002 - Last Name field does not accept input for error_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Form Input
- **Area:** Checkout Step One
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-003`
- **User:** `error_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `error_user`.
- At least one product is present in the cart.
- Checkout Step One is open.

### Steps to Reproduce

1. Click the Last Name field.
2. Type any alphabetic value.
3. Observe the field value.
4. Type numeric or special characters.
5. Observe the field value again.

### Expected Result

- The Last Name field accepts and preserves entered characters.
- The entered value remains visible until it is changed or cleared by the user.

### Actual Result

- The Last Name field receives focus.
- The text cursor is visible.
- Typed characters are not preserved.
- The field remains empty regardless of the entered value.

### Impact

- The user cannot provide a Last Name through the form.
- Valid customer information cannot be submitted normally.
- Checkout behavior depends on defective validation logic instead of valid user input.
- Automated form completion cannot populate all required customer fields.

### Notes

- First Name accepts input.
- Postal Code accepts input.
- The defect was reproduced with multiple attempted Last Name values.
- A separate defect tracks continuation to Checkout Overview with the empty Last Name.
- Similar input failure was observed for `problem_user`, but the downstream validation behavior differs.

---

### BUG-CHK1-003 - Checkout continues with an empty Last Name for error_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Validation
- **Area:** Checkout Step One
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-003`
- **User:** `error_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `error_user`.
- At least one product is present in the cart.
- Checkout Step One is open.

### Steps to Reproduce

1. Enter a valid value in the First Name field.
2. Leave the Last Name field empty.
3. Enter a valid value in the Postal Code field.
4. Click `Continue`.

### Expected Result

- Checkout remains on Checkout Step One.
- Validation displays `Error: Last Name is required`.
- Checkout Overview does not open.

### Actual Result

- No Last Name validation error is displayed.
- Checkout proceeds to Checkout Overview.
- The URL changes to `/checkout-step-two.html`.
- Incomplete customer information is accepted.

### Impact

- Required customer data is not validated correctly.
- Incomplete checkout data can progress into the order review stage.
- Form behavior is inconsistent with the required-field validation contract.
- Automated negative validation tests fail for the Last Name field.

### Notes

- Submitting a completely empty form still displays `Error: First Name is required`.
- First Name and Postal Code accept input.
- `BUG-CHK1-002` tracks the separate issue where the Last Name field does not accept input.
- For `problem_user`, the Last Name input is also broken, but checkout remains blocked by `Error: Last Name is required`.

---

### BUG-CHK2-001 - Finish button does not complete the order for error_user

- **Status:** Open
- **Severity:** Critical
- **Priority:** High
- **Type:** Functional / Transaction
- **Area:** Checkout Overview
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-003`
- **Automated check:** `tests/persona-risks.spec.ts`
- **User:** `error_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `error_user`.
- At least one product is present in the cart.
- Checkout Overview is open.

### Steps to Reproduce

1. Complete the checkout flow until Checkout Overview.
2. Verify that the `Finish` button is visible.
3. Click `Finish`.
4. Click `Finish` several more times.
5. Observe the page, URL, and any alerts.

### Expected Result

- The order is completed.
- The application navigates to the Order Complete page.
- The URL changes to `/checkout-complete.html`.
- A successful order confirmation is displayed.

### Actual Result

- The `Finish` button is visible and appears enabled.
- Clicking `Finish` produces no visible response.
- Repeated clicks do not change the behavior.
- No alert is displayed.
- The URL remains `/checkout-step-two.html`.
- The Order Complete page does not open.
- The order is not completed.

### Impact

- The main purchase transaction cannot be completed.
- Users can reach the final checkout stage but cannot place the order.
- The defect blocks the primary business flow for `error_user`.
- End-to-end checkout automation fails at the final action.

### Notes

- `Cancel` from Checkout Overview works correctly.
- Checkout Overview displays products, prices, subtotal, tax, and total.
- The failure is isolated to the `Finish` action.
- The defect was reproduced with repeated clicks.
- Order completion works for `standard_user`.

---

## Cross-Persona Observations

### BUG-CART-003 - Reset App State clears the cart but leaves stale Remove buttons on Inventory Page

- **Status:** Open
- **Severity:** Medium
- **Priority:** High
- **Type:** Functional / State Management
- **Area:** Inventory Page / Cart State / Sidebar Menu
- **Reproducibility:** 100%
- **Related test cases:** `TC-PERSONA-001`, `TC-PERSONA-002`, `TC-PERSONA-003`
- **Affected users:** `standard_user`, `problem_user`, `performance_glitch_user`, `error_user`

### Preconditions

- SauceDemo is available.
- A supported user is logged in.
- Inventory Page is open.
- At least one product has been added to the cart.

### Steps to Reproduce

1. Verify that the cart badge is displayed.
2. Verify that an added product displays `Remove`.
3. Open the Sidebar Menu.
4. Click `Reset App State`.
5. Observe the cart badge.
6. Open the Cart Page and verify its contents.
7. Return to the Inventory Page and observe the product action buttons.

### Expected Result

- The cart is cleared.
- The cart badge is removed.
- No products remain in the cart.
- Every previously added product immediately displays `Add to cart`.
- Inventory controls remain synchronized with the actual cart state.

### Actual Result

- The cart is cleared.
- The cart badge is removed.
- The Cart Page contains no products.
- Previously added products can continue to display `Remove` on the Inventory Page.
- Inventory controls remain stale and do not match the empty cart state.
- Opening the empty Cart Page and returning to Inventory refreshes the stale controls.
- Clicking a stale `Remove` control also changes it back to `Add to cart`.

### Impact

- The Inventory Page shows an incorrect product state.
- Users may believe products are still present in the cart.
- Cart state and Inventory UI become temporarily inconsistent.
- Users must perform another navigation or interaction to refresh the controls.
- Automated cart-state validation fails immediately after Reset App State.

### Notes

- The defect was reproduced for `standard_user`, `problem_user`, `performance_glitch_user`, and `error_user`.
- The behavior is not specific to a single persona.
- Removing products directly from the Cart Page works correctly.
- `Reset App State` should update both the stored cart state and all visible Inventory controls immediately.

---

## Persona-Specific Defect Observations: visual_user

### BUG-INV-006 - Inventory prices are random and do not match transaction prices for visual_user

- **Status:** Open
- **Severity:** Critical
- **Priority:** High
- **Type:** Functional / Pricing / Data Consistency
- **Area:** Inventory Page / Product Details / Cart / Checkout
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-004`
- **Automated check:** `tests/persona-risks.spec.ts`
- **User:** `visual_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `visual_user`.
- Inventory Page is open.

### Steps to Reproduce

1. Record the displayed Inventory Page price for any product.
2. Reload the Inventory Page or apply another sorting option.
3. Record the price for the same product again.
4. Open that product’s Product Details page.
5. Record the Product Details price.
6. Add the product to the cart.
7. Record the Cart Page price.
8. Continue to Checkout Overview.
9. Record the product price used in the order summary.

### Expected Result

- Each product displays a stable price.
- The Inventory Page price remains unchanged after reload, revisit, or sorting.
- The same price is displayed on:
  - Inventory Page;
  - Product Details;
  - Cart Page;
  - Checkout Overview.
- The displayed catalog price matches the transaction price.

### Actual Result

- Product prices on the Inventory Page are random.
- Prices change after:
  - page reload;
  - return to Inventory Page;
  - product sorting.
- The same product displays different Inventory Page prices during separate observations.
- All six available products are affected.
- Product Details, Cart Page, and Checkout Overview display the normal static product price.
- The Inventory Page price therefore does not match the price used for the transaction.

### Example

For Sauce Labs Backpack:

- Inventory Page displayed multiple changing random prices.
- Product Details displayed `$29.99`.
- Cart Page displayed `$29.99`.
- Checkout Overview displayed `$29.99`.
- Item total displayed `$29.99`.
- Tax displayed `$2.40`.
- Total displayed `$32.39`.

### Impact

- Users see misleading catalog prices.
- Users cannot rely on the price displayed before opening a product.
- The displayed price changes during normal navigation.
- The price shown during product selection differs from the actual transaction price.
- This creates a serious trust and commercial risk.
- Price-based sorting and price comparison become unreliable.
- Automated pricing assertions fail because Inventory values are unstable.

### Notes

- The defect affects all six products.
- Product Details, Cart, and Checkout use stable prices.
- The defect is isolated to the Inventory Page price display.
- Some generated Inventory prices also use inconsistent decimal formatting.
- The behavior is specific to `visual_user`.

---

### BUG-INV-007 - First Inventory position displays the wrong dog image for visual_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Visual / Functional / Data Mapping
- **Area:** Inventory Page / Product Images / Sorting
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-004`
- **Automated check:** `tests/persona-risks.spec.ts`
- **User:** `visual_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `visual_user`.
- Inventory Page is open.

### Steps to Reproduce

1. Observe the image displayed for the first product.
2. Record the product name in the first position.
3. Change the sorting option so that another product becomes first.
4. Observe the image displayed for the new first product.
5. Open the first product’s Product Details page.
6. Compare the Inventory image with the Product Details image.

### Expected Result

- Each product displays its own corresponding image.
- Sorting changes product order without changing the image-to-product mapping.
- The Inventory image matches the Product Details image for the same product.

### Actual Result

- The first Inventory position displays a dog-with-ball image.
- After sorting, the dog image moves to whichever product becomes first.
- The image is therefore associated with the first visual position rather than with a specific product.
- Product Details displays the correct image for the selected product.

### Impact

- Users see an incorrect image for the first product.
- The wrong image can be associated with different products after sorting.
- Product identification and comparison are unreliable.
- Visual assertions based on product-image mapping fail.
- Sorting exposes the incorrect position-based image behavior.

### Notes

- The defect was reproduced with multiple sorting options.
- The dog image is not tied to Sauce Labs Backpack or another specific product.
- The remaining Inventory product images appeared normal during exploration.
- Product Details image mapping remained correct.
- The behavior is specific to `visual_user`.

---

### BUG-UI-001 - Cart icon is misplaced across multiple pages for visual_user

- **Status:** Open
- **Severity:** Medium
- **Priority:** High
- **Type:** Visual / Layout
- **Area:** Shared Header / Navigation
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-004`
- **User:** `visual_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `visual_user`.

### Steps to Reproduce

1. Open the Inventory Page.
2. Observe the cart icon position.
3. Open a Product Details page.
4. Observe the cart icon position.
5. Continue through:
   - Cart Page;
   - Checkout Step One;
   - Checkout Overview;
   - Order Complete.
6. Compare the cart icon position with its normal header position for `standard_user`.

### Expected Result

- The cart icon is positioned consistently in the header.
- The icon remains aligned with the shared top navigation area.
- The icon does not overlap or align with page-specific content.

### Actual Result

- The cart icon is shifted downward and to the right.
- On the Inventory Page, it appears near the sorting row instead of its normal header position.
- The incorrect position remains visible on:
  - Inventory Page;
  - Product Details;
  - Cart Page;
  - Checkout Step One;
  - Checkout Overview;
  - Order Complete.
- The cart badge still updates and the control remains functional.

### Impact

- Shared navigation appears visually broken.
- The cart control is difficult to locate consistently.
- The misplaced icon reduces visual hierarchy and interface clarity.
- The same layout defect affects multiple pages.
- Visual regression tests for the shared header fail.

### Notes

- Cart functionality remains available.
- The defect affects the shared header layout rather than cart behavior.
- The behavior is specific to `visual_user`.
- The cart icon is positioned correctly for `standard_user`.

---

### BUG-UI-002 - Sidebar Menu icon is visually skewed for visual_user

- **Status:** Open
- **Severity:** Low
- **Priority:** Medium
- **Type:** Visual / Layout
- **Area:** Shared Header / Sidebar Menu Control
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-004`
- **User:** `visual_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `visual_user`.
- Any authenticated application page is open.

### Steps to Reproduce

1. Observe the Sidebar Menu icon in the upper-left area of the header.
2. Compare the three icon lines with the normal hamburger icon displayed for `standard_user`.
3. Open and close the Sidebar Menu.
4. Observe the icon again.

### Expected Result

- The Sidebar Menu icon displays three horizontal, parallel lines.
- The icon is aligned correctly within the header.
- Opening or closing the menu does not distort the icon.

### Actual Result

- The three menu-icon lines are visually tilted to the right.
- The control appears skewed instead of displaying a normal horizontal hamburger icon.
- The visual defect remains present before and after opening the Sidebar Menu.
- Sidebar Menu functionality remains available.

### Impact

- The shared navigation control appears visually malformed.
- The distorted icon reduces interface consistency and polish.
- Visual regression tests for the header fail.
- Users may interpret the control as broken even though it remains functional.

### Notes

- Sidebar Menu navigation works correctly.
- The defect affects the icon appearance, not the menu behavior.
- The behavior is specific to `visual_user`.
- The Sidebar Menu icon is displayed correctly for `standard_user`.

---

### BUG-CHK2-002 - Item total intermittently exposes floating-point precision for visual_user

- **Status:** Open
- **Severity:** Medium
- **Priority:** High
- **Type:** Functional / Calculation Display / Data Formatting
- **Area:** Checkout Overview
- **Reproducibility:** Intermittent
- **Related test case:** `TC-PERSONA-004`
- **User:** `visual_user`

### Preconditions

- SauceDemo is available.
- User is logged in as `visual_user`.
- Multiple products are available in the cart.
- Checkout Overview is open.

### Steps to Reproduce

1. Add all available products to the cart.
2. Proceed to Checkout Step One.
3. Enter valid customer data.
4. Click `Continue`.
5. Observe the `Item total` value on Checkout Overview.
6. Repeat the flow if the issue does not appear.

### Expected Result

- `Item total` is calculated correctly.
- The monetary value is rounded and displayed with exactly two decimal places.
- Floating-point implementation details are not exposed in the user interface.

### Actual Result

- `Item total` intermittently displays an unrounded floating-point value.
- One observed value was:

  `$121.94999999999999`

- `Tax` and `Total` remained displayed with two decimal places.
- The issue was not reproduced on every attempt.

### Impact

- Financial information appears technically incorrect.
- Users may distrust the order calculation.
- Monetary formatting is inconsistent within the same order summary.
- Automated assertions expecting a two-decimal currency format can fail intermittently.
- The defect may indicate missing rounding before rendering calculated values.

### Notes

- The issue was observed after adding all available products.
- The defect is intermittent.
- The underlying arithmetic may still be correct, but the displayed `Item total` is not formatted correctly.
- This defect is separate from random Inventory Page prices tracked in `BUG-INV-006`.
- The behavior was observed for `visual_user`.

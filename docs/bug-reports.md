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

---

## BUG-INV-001 - Product Details opens a different product for problem_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Data Integrity / Navigation
- **Area:** Inventory / Product Details
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-001`
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

| Selected product on Inventory Page | Opened URL | Actual Product Details content |
| --- | --- | --- |
| Sauce Labs Backpack | `/inventory-item.html?id=5` | Sauce Labs Fleece Jacket |
| Sauce Labs Bike Light | `/inventory-item.html?id=1` | Sauce Labs Bolt T-Shirt |
| Sauce Labs Bolt T-Shirt | `/inventory-item.html?id=2` | Sauce Labs Onesie |
| Sauce Labs Fleece Jacket | `/inventory-item.html?id=6` | `ITEM NOT FOUND`, unrelated description, invalid price `$√-1`, and dog image |
| Sauce Labs Onesie | `/inventory-item.html?id=3` | Test.allTheThings() T-Shirt (Red) |
| Test.allTheThings() T-Shirt (Red) | `/inventory-item.html?id=4` | Sauce Labs Backpack |

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

## BUG-CHK1-001 - Last Name field does not accept input for problem_user

- **Status:** Open
- **Severity:** High
- **Priority:** High
- **Type:** Functional / Input / Checkout Blocker
- **Area:** Checkout Step One
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-001`
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

## BUG-INV-002 - All inventory products display the same incorrect image for problem_user

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

## BUG-INV-003 - Product sorting does not change for problem_user

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

## BUG-CART-002 - Inventory and Product Details cart actions do not respond for problem_user

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

## BUG-INV-004 - Sorting displays an error alert and does not change product order for error_user

- **Status:** Open
- **Severity:** Medium
- **Priority:** High
- **Type:** Functional
- **Area:** Inventory Page / Sorting
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-003`
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

## BUG-INV-005 - Product description is missing on Product Details for error_user

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

## BUG-CHK1-002 - Last Name field does not accept input for error_user

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

## BUG-CHK1-003 - Checkout continues with an empty Last Name for error_user

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

## BUG-CHK2-001 - Finish button does not complete the order for error_user

- **Status:** Open
- **Severity:** Critical
- **Priority:** High
- **Type:** Functional / Transaction
- **Area:** Checkout Overview
- **Reproducibility:** 100%
- **Related test case:** `TC-PERSONA-003`
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

## BUG-CART-003 - Reset App State clears the cart but leaves stale Remove buttons on Inventory Page

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

# SauceDemo Playwright QA Automation Portfolio

[SauceDemo](https://www.saucedemo.com/) is a demo e-commerce application used in this project as the application under test.

This repository contains end-to-end UI automation for SauceDemo using Playwright and TypeScript.

The project demonstrates practical QA Automation skills: test design, stable locator strategy, cross-browser execution, reusable test helpers, exploratory testing, evidence-backed bug reporting, and continuous integration with GitHub Actions.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Prettier
- Playwright HTML Reports
- Chromium, Firefox, and WebKit
- Manual exploratory testing
- Risk-based test design

---

## Test Automation Architecture

The project uses a feature-based test structure.

```text
tests/
├── login-page.spec.ts
├── inventory-page.spec.ts
├── cart-page.spec.ts
├── checkout-step-one.spec.ts
├── checkout-overview.spec.ts
├── order-complete.spec.ts
├── sidebar-menu.spec.ts
├── persona-risks.spec.ts
└── saucedemo-test-helpers.ts
```

The suite starts with direct Playwright locators and introduces reusable helpers only for repeated workflows such as login and checkout setup.

This keeps the code readable and maintainable while avoiding unnecessary Page Object Model abstraction for a portfolio-sized project.

---

## Features

- Covers the complete SauceDemo customer journey from login to order completion
- Uses stable `data-test` selectors and accessible user-facing locators
- Runs tests in Chromium, Firefox, and WebKit
- Includes functional regression tests and persona-risk diagnostics
- Uses reusable helpers for login and checkout setup
- Provides local TypeScript type checking and Prettier formatting checks
- Generates Playwright HTML reports
- Runs automated checks through GitHub Actions
- Documents test design, locator decisions, execution results, and bugs

---

## Test Coverage

The functional regression suite covers the main SauceDemo e-commerce flow.

### Login Page

- Login Page element validation
- Login with valid credentials
- Invalid credentials validation
- Locked-out user validation

### Inventory Page

- Inventory Page visibility after successful login
- Product card information validation
- Adding one product to the cart
- Removing one product from the Inventory Page
- Adding multiple products to the cart
- Opening Product Details from the product name
- Opening Product Details from the product image
- Returning to Inventory from Product Details
- Sorting products by name from A to Z
- Sorting products by name from Z to A
- Sorting products by price from low to high
- Sorting products by price from high to low
- Opening Cart Page from Inventory Page
- Dynamic validation for all available products

### Cart Page

- Cart Page visibility with one added product
- Removing a product from Cart Page
- Continue Shopping flow with cart state preservation
- Opening Checkout Step One from Cart Page
- Multiple products displayed on Cart Page
- Empty Cart Page validation
- Checkout prevention with an empty cart

### Checkout Step One

- Checkout form visibility
- Required first name validation
- Required last name validation
- Required postal code validation
- Continuing with valid checkout information
- Returning to Cart Page after checkout cancellation

Additional manual exploratory coverage includes whitespace-only, Unicode, malformed, and long checkout input values.

### Checkout Overview

- Checkout Overview Page visibility
- Selected product validation
- Item total, tax, and total price validation
- Completing an order after clicking `Finish`
- Returning to Inventory after checkout cancellation

### Order Complete Page

- Order completion confirmation
- Cart reset and return to Inventory after clicking `Back Home`

### Sidebar Menu and Logout

- Opening Sidebar Menu and validating navigation items
- Closing Sidebar Menu
- Navigation through `All Items`
- Sauce Labs link validation through `About`
- Logout through Sidebar Menu

### Exploratory Findings

- Reset App State exploratory findings
- Persona-specific behavior exploration for `problem_user`, `error_user`, and `visual_user`

### Coverage Summary

| Area | Automated Scenarios |
|---|---:|
| Login Page | 4 |
| Inventory Page | 14 |
| Cart Page | 7 |
| Checkout Step One | 6 |
| Checkout Overview | 5 |
| Order Complete Page | 2 |
| Sidebar Menu and Logout | 5 |
| **Functional Regression Total** | **43** |

The project also includes six focused persona-risk diagnostic scenarios.

```text
43 functional regression scenarios
6 persona-risk scenarios
49 automated scenarios total
147 executions across Chromium, Firefox, and WebKit
```

---

## Locator Strategy

The test suite uses stable and readable selectors.

- Prefer SauceDemo `data-test` attributes.
- Use user-facing locators for accessible controls where appropriate.
- Scope repeated product locators to a specific product card.
- Avoid brittle CSS selectors, position-based selectors, and Codegen noise.
- Keep assertions focused on visible user behavior.

Examples:

```ts
page.getByTestId('login-button');
page.getByRole('button', { name: 'Open Menu' });
productCard.getByRole('button', { name: 'Add to cart' });
```

Detailed locator rationale is available in [Locator Notes](docs/locator-notes.md).

---

## Persona-Risk Diagnostics

In addition to functional regression coverage, the project includes targeted checks for reproducible known behavior risks in SauceDemo persona accounts.

Covered personas include:

- `problem_user`
- `error_user`
- `visual_user`

These tests are intentionally marked with:

```ts
test.fail()
```

The expected-failure marker is applied only after login, navigation, and relevant preconditions have been validated. This prevents unrelated setup or locator failures from being incorrectly classified as known product defects.

An unexpected pass is visible in the test run and may indicate that a known issue has been fixed.

The persona scenarios are diagnostic checks for documented product behavior. They are not treated as general regression failures.

Known findings and evidence are documented in [Bug Reports](docs/bug-reports.md).

---

## Latest Test Run

```text
Running 147 tests using 3 workers
147 passed (1.3m)
```

Execution scope:

- 49 automated scenarios
- Chromium
- Firefox
- WebKit
- 147 total cross-browser executions

---

## Run Tests Locally

Install dependencies:

```bash
npm ci
npx playwright install
```

Run the functional regression suite:

```bash
npm test
```

Run only persona-risk diagnostics:

```bash
npm run test:personas
```

Run all tests:

```bash
npm run test:all
```

Run TypeScript type checking:

```bash
npm run typecheck
```

Check formatting:

```bash
npm run format:check
```

Open the latest Playwright HTML report:

```bash
npm run report
```

On Linux or CI environments, install browser system dependencies with:

```bash
npx playwright install --with-deps
```

---

## Continuous Integration

GitHub Actions runs automated checks on every push and pull request.

The workflow performs:

1. Dependency installation with `npm ci`
2. Playwright browser installation
3. TypeScript type checking
4. Functional regression execution
5. Persona-risk diagnostic execution
6. Playwright HTML report upload as a workflow artifact

The CI workflow is available in:

```text
.github/workflows/playwright-regression.yml
```

---

## QA Documentation

### [Test Plan](docs/test-plan.md)

Project scope, test strategy, manual test design, automation mapping, assumptions, and risks.

### [Test Execution Summary](docs/test-execution-summary.md)

Selected execution results, automation status, and known issue scope.

### [Locator Notes](docs/locator-notes.md)

Locator decisions and examples of stable Playwright selector usage.

### [Bug Reports](docs/bug-reports.md)

Evidence-backed defects and persona-specific exploratory findings.

---

## Quality Practices Demonstrated

- Risk-based test prioritization
- Functional regression coverage for a complete e-commerce flow
- Cross-browser test execution
- Reusable test setup without over-engineering
- Stable locator selection
- Clear and user-focused assertions
- Expected-failure handling for known issues
- Manual and automated test traceability
- Evidence-based bug documentation
- CI integration and HTML reporting
- TypeScript and formatting checks

---

## What I Learned

- How to design and automate end-to-end UI test scenarios with Playwright and TypeScript
- How to select stable locators for reliable UI automation
- How to structure tests by product feature
- How to reuse setup logic without reducing test readability
- How to run tests in Chromium, Firefox, and WebKit
- How to separate functional regression tests from known-risk diagnostic checks
- How to use `test.fail()` responsibly for reproducible known issues
- How to document manual test design and automation coverage
- How to create evidence-backed bug reports
- How to configure GitHub Actions for automated test execution

---

## Project Status

Completed portfolio project.

The current implementation includes:

- 43 functional regression scenarios
- 6 persona-risk diagnostic scenarios
- 49 automated scenarios in total
- Chromium, Firefox, and WebKit coverage
- GitHub Actions CI workflow
- Playwright HTML reports
- QA test plan
- Test execution summary
- Locator notes
- Bug reports

---

## Author

Kateryna Yeromenko  
Junior QA Automation Engineer

GitHub: [Yeromenko-Kateryna](https://github.com/Yeromenko-Kateryna)

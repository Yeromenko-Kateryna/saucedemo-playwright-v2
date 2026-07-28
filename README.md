# SauceDemo Playwright QA Automation Portfolio

SauceDemo Playwright QA Automation Portfolio is an end-to-end UI test automation project for the SauceDemo demo e-commerce application.

The project demonstrates practical QA Automation skills: test design, stable locator strategy, cross-browser execution, reusable test helpers, documented exploratory testing, evidence-backed bug reporting, and CI execution with GitHub Actions.

This project was built as a portfolio project for a Junior QA Automation Engineer role.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Prettier
- Playwright HTML Reports
- Cross-browser testing: Chromium, Firefox, WebKit
- Manual exploratory testing
- Risk-based test design

---

## Test Automation Architecture

The project uses a simple feature-based test structure.

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

This keeps the code readable while avoiding unnecessary Page Object Model abstraction for a portfolio-sized project.

---

## Features

- Covers the main SauceDemo e-commerce flow from login to order completion
- Uses stable `data-test` selectors and accessible user-facing locators
- Runs tests in Chromium, Firefox, and WebKit
- Includes functional regression tests and persona-risk diagnostics
- Uses reusable helpers for login and checkout setup
- Includes TypeScript type checking and Prettier formatting checks
- Generates Playwright HTML reports
- Runs automated checks in GitHub Actions
- Documents test design, locator decisions, execution results, and bugs

---

## Test Coverage

The automated regression suite covers the main SauceDemo customer journey.

### Login Page

- Valid login
- Invalid credentials
- Locked-out user
- Empty credentials validation

### Inventory Page

- Inventory Page visibility after login
- Product card validation
- Product image visibility
- Product sorting
- Adding one product to cart
- Removing a product from Inventory Page
- Adding multiple products
- Cart badge updates
- Opening Cart Page
- Product details navigation

### Cart Page

- Cart Page visibility
- Added product details
- Cart badge validation
- Continue Shopping flow
- Removing products from Cart Page
- Multiple products in cart
- Checkout button visibility

### Checkout Step One

- Required first name validation
- Required last name validation
- Required postal code validation
- Successful checkout data submission
- Invalid input behavior exploration
- Navigation back to the cart

### Checkout Overview

- Product details validation
- Item total validation
- Tax validation
- Total price validation
- Finish order flow

### Order Complete Page

- Order confirmation page visibility
- Cart reset after order completion

### Sidebar Menu and Logout

- Sidebar menu visibility
- All Items navigation
- About link validation
- Reset App State behavior
- Logout flow

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
page.locator('[data-test="login-button"]')
page.getByRole('button', { name: 'Checkout' })
productCard.getByRole('button', { name: 'Add to cart' })
```

Detailed locator rationale is available in:

```text
docs/locator-notes.md
```

---

## Persona-Risk Diagnostics

In addition to regular regression coverage, the project includes targeted checks for known behavior risks in SauceDemo persona accounts.

Covered personas include:

- `problem_user`
- `error_user`
- `visual_user`

These tests are intentionally marked with:

```ts
test.fail()
```

The expected-failure marker is applied only after the test setup succeeds.

This means that an unexpected pass is visible in the test run and may indicate that a known issue has been fixed.

The persona scenarios are not treated as general regression failures. They are diagnostic checks for documented product behavior.

Known findings and evidence are documented in:

```text
docs/bug-reports.md
```

---

## Run Tests Locally

Install dependencies:

```bash
npm ci
npx playwright install
```

Run the standard functional regression suite:

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

Run type checking:

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

The repository includes supporting QA documentation.

### Test Plan

```text
docs/test-plan.md
```

Contains project scope, test strategy, manual test design, automation mapping, assumptions, and risks.

### Test Execution Summary

```text
docs/test-execution-summary.md
```

Contains selected execution results, automation status, and known issue scope.

### Locator Notes

```text
docs/locator-notes.md
```

Contains locator decisions and examples of stable Playwright selector usage.

### Bug Reports

```text
docs/bug-reports.md
```

Contains evidence-backed defects and persona-specific exploratory findings.

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
- How to avoid unnecessary abstraction in a small automation project
- How to reuse setup logic without reducing test readability
- How to run tests in Chromium, Firefox, and WebKit
- How to document manual test design and automation coverage
- How to separate functional regression tests from known-risk diagnostic checks
- How to use `test.fail()` responsibly for reproducible known issues
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
Aspiring QA Automation Engineer

GitHub: https://github.com/Yeromenko-Kateryna

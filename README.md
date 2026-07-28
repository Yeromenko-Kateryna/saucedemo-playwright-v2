# SauceDemo Playwright QA Automation Portfolio

[![Playwright Checks](https://github.com/Yeromenko-Kateryna/saucedemo-playwright-v2/actions/workflows/playwright-regression.yml/badge.svg)](https://github.com/Yeromenko-Kateryna/saucedemo-playwright-v2/actions/workflows/playwright-regression.yml)
[![Playwright](https://img.shields.io/badge/testing-Playwright-45ba4b)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Portfolio UI automation project for the [SauceDemo](https://www.saucedemo.com/) e-commerce application.

The project demonstrates manual-first test design, risk-based automation, cross-browser execution, known-issue diagnostics, QA documentation, defect reporting, and GitHub Actions CI.

## At A Glance

| Metric | Coverage |
|---|---:|
| Functional regression scenarios | 43 |
| Persona-risk diagnostic scenarios | 6 |
| Automated scenario definitions | 49 |
| Browser executions per full run | 147 |
| Browsers | Chromium, Firefox, WebKit |

The full suite runs with three local workers to keep the public demo application stable. CI uses one worker and retries failed tests twice.

## Test Coverage

| Area | Scenarios |
|---|---:|
| Login | 4 |
| Inventory and Product Details | 14 |
| Cart | 7 |
| Checkout Step One | 6 |
| Checkout Overview | 5 |
| Order Complete | 2 |
| Sidebar Menu and Navigation | 5 |
| **Functional regression total** | **43** |

The regression suite covers login, product discovery, sorting, cart state, checkout validation, price calculation, order completion, navigation, and logout.

`TC-INV-014` dynamically validates the shared contract for every currently available product instead of depending on a fixed catalog size.

## Persona-Risk Diagnostics

Six focused checks cover deterministic behavior for `problem_user`, `error_user`, and `visual_user`.

| ID | User | Expected behavior under test |
|---|---|---|
| `BUG-CHK2-001` | `error_user` | Finish completes the order |
| `BUG-INV-001` | `problem_user` | Product Details preserves the selected product |
| `BUG-CHK1-001` | `problem_user` | Last Name accepts input and checkout continues |
| `BUG-INV-004` | `error_user` | Sorting works without an alert |
| `BUG-INV-006` | `visual_user` | Inventory and Product Details prices match |
| `BUG-INV-007` | `visual_user` | Product images remain mapped correctly after sorting |

These checks use Playwright `test.fail()` only after setup and preconditions pass. An unexpected pass fails the diagnostic test and signals a potential product fix.

## Test Design

- Manual exploration and risk analysis happen before automation.
- Stable `data-test` hooks are preferred.
- Accessible role locators are used for shared controls.
- Repeated locators are scoped to the relevant product card or cart item.
- Feature-level specs keep assertions close to business behavior.
- Small workflow helpers remove duplication without premature Page Object Model abstraction.

```text
tests/
  login-page.spec.ts
  inventory-page.spec.ts
  cart-page.spec.ts
  checkout-step-one.spec.ts
  checkout-overview.spec.ts
  order-complete.spec.ts
  sidebar-menu.spec.ts
  persona-risks.spec.ts
  saucedemo-test-helpers.ts

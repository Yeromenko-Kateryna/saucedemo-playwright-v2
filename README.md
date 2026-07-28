# SauceDemo Playwright QA Automation Portfolio

[![Playwright Checks](https://github.com/Yeromenko-Kateryna/saucedemo-playwright-v2/actions/workflows/playwright-regression.yml/badge.svg)](https://github.com/Yeromenko-Kateryna/saucedemo-playwright-v2/actions/workflows/playwright-regression.yml)

Playwright and TypeScript UI automation for [SauceDemo](https://www.saucedemo.com/). The project demonstrates risk-based test design, stable locator selection, cross-browser execution, documented exploratory testing, and evidence-backed defect reporting.

## Coverage

- 43 functional regression scenarios: login, inventory, cart, checkout, order completion, sidebar navigation, and logout.
- 6 focused persona-risk scenarios for reproducible known issues in `problem_user`, `error_user`, and `visual_user`.
- Chromium, Firefox, and WebKit coverage.
- Latest complete local run: **147 passed in 1.3 minutes** on 2026-07-28.

The persona scenarios use Playwright `test.fail()` intentionally. They are diagnostic checks for documented known issues: an unexpected pass fails the run and signals a potential fix.

## Run Tests

```powershell
npm ci
npx playwright install
npm test
npm run test:personas
npm run test:all
npm run typecheck
npm run format:check
npm run report
```

`npm test` runs the standard regression suite. `npm run test:personas` runs only focused persona checks, while `npm run test:all` runs both suites.

On Linux and in CI, install browser system dependencies with `npx playwright install --with-deps`.

## Locator Strategy

- Prefer SauceDemo's stable `data-test` hooks.
- Use role locators for shared accessible controls such as the sidebar buttons.
- Scope repeated product locators to a product card before asserting its content or action.
- Avoid brittle long CSS selectors and Codegen interaction noise.

## Continuous Integration

GitHub Actions runs type checking, regression tests, and the focused persona-risk suite on every push and pull request. Each job uploads a separate Playwright HTML report artifact.

## Project Structure

```text
tests/  Playwright specifications and shared workflow helpers
docs/   Test plan, execution summary, locator rationale, bug reports, and evidence
```

## Documentation

- [Test plan](docs/test-plan.md)
- [Test execution summary](docs/test-execution-summary.md)
- [Locator notes](docs/locator-notes.md)
- [Bug reports](docs/bug-reports.md)

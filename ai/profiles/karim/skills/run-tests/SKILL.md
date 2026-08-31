---
name: run-tests
description: Run the right Cypress component tests for a specific component or for all components
user-invocable: true
---

# Run Component Tests

Run Cypress component tests for a specific component or for all components.

## Usage

- `/run-tests` — run all component tests
- `/run-tests vl-button` — run tests for a specific component
- `/run-tests atom/button` — run tests by path

## 1. Determine what to test

If a component name or path is provided, find the test file:
- Search for `*.component.cy.ts` files matching the component name
- The test file is co-located with the component at `libs/components/src/{type}/{name}/vl-{name}.component.cy.ts`

If no component is specified, run all tests.

## 2. Run the tests

**Specific component:**

```bash
npm run libs:component-tests:run -- --spec "../../libs/components/src/{type}/{name}/vl-{name}.component.cy.ts"
```

**All components:**

```bash
npm run libs:component-tests:run
```

**Watch mode (interactive):**

```bash
npm run libs:component-tests:watch
```

## 3. Report results

- If tests pass: report success with the number of tests passed
- If tests fail: show the failing test names and error messages, then help debug

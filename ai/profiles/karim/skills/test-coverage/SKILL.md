---
name: test-coverage
description: Ensure new features have tests and bug fixes have regression tests. Invoked automatically by Claude when implementing features or fixing bugs.
user-invocable: false
---

# Test Coverage Enforcement

Rules for when tests are required. For test conventions (style, naming, a11y helpers) see the Testing section in `AGENTS.md`. For running tests, use `/run-tests`.

## When implementing a new feature

1. Check whether component tests exist at `libs/components/src/{type}/{name}/vl-{name}.component.cy.ts`
2. Add tests for the new functionality: the new property/attribute, the new event, the new slot, and the user interactions it enables
3. Update existing tests if the feature changes existing behaviour
4. Add a Storybook E2E test if new stories were added, at `apps/storybook-e2e/src/e2e/components/{type}/{name}/`
5. Run the tests to verify they pass

## When fixing a bug

1. Write the regression test **first** — it must fail without the fix and pass with it. Describe the bug scenario clearly (e.g. `should not crash when value is empty`)
2. Add it to the component's existing test file
3. Run the tests to verify the fix works and nothing else broke

## Test patterns to follow

Read the existing test file for the component being modified and match:
- The describe/it structure
- The mount or visit pattern used
- The assertion style (shadow DOM queries, attribute checks, …)
- English test descriptions starting with "should"

## Reminders

- Never skip tests because "it's a small change"
- Never claim a fix works without a test proving it
- If the component has no tests yet, create the test file following the patterns from a similar component

# Flux Web Components v2 - AI Agent Context

This file provides context and guidelines for AI agents working on the Flux Web Components v2 project.

## Project Overview

Flux Web Components is a library of reusable web components built with Lit, following the Web Components standard. This is version 2 of the project.

**Key Technologies:**
- **Framework**: Lit (Web Components)
- **Language**: TypeScript
- **Testing**: Cypress (component tests)
- **Documentation**: Storybook
- **Styling**: CSS via `@domg/govflanders-style` design tokens
- **npm scope**: `@domg-wc` (common, styles, components, map)

## Engineering Mindset

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

## Component Architecture

### Component Types

1. **Atom Components** (`atom/`)
   - Simple, atomic components (buttons, icons, links, titles)
   - Minimal dependencies
   - Highly reusable

2. **Block Components** (`block/`)
   - Complex, composed components (accordion, modal, data-table, pager, side-navigation)
   - May contain multiple atom components
   - Business logic and state management

3. **Form Components** (`form/`)
   - Form-specific elements (input-field, select, checkbox, datepicker, upload, textarea)
   - Built on `FormControl` base class (extends `FormControlMixin(BaseLitElement)`)
   - Uses HTML5 Constraint Validation API

4. **Compliance Components** (`compliance/`)
   - Legal and regulatory components (header, footer, cookie-consent, cookie-statement, privacy, accessibility)
   - Some use `next/` subdirectory for newer versions (e.g., `compliance/next/header/`)

### Component Patterns

Components extend base classes from `@domg-wc/common`, **not** `LitElement` directly:

- **BaseLitElement** — see `libs/components/src/atom/button/vl-button.component.ts`
- **BaseHTMLElement** (HTML template strings) — see `libs/components/src/compliance/cookie-consent/vl-cookie-consent.component.ts`
- **FormControl** (form components) — see `libs/components/src/form/input-field/vl-input-field.component.ts`
- **Defaults pattern** — see `libs/components/src/atom/button/vl-button.defaults.ts`

Always use `@webComponent()` from `@domg-wc/common` (not `@customElement()` from Lit) — it contains important custom registration logic specific to our library.

Use Lit decorators (`@property`, `@state`, `@query`, `@queryAll`) where possible for cleaner code.

All custom events use `vl-` prefix (e.g., `vl-change`, `vl-input`, `vl-click`, `vl-toggle`), dispatched with `bubbles: true, composed: true`.

## Coding Conventions

### Naming Conventions

- **Components**: `vl-component-name` (kebab-case, prefixed with `vl-`)
- **Classes**: `VlComponentName` or `VlComponentNameComponent` (PascalCase)
- **Files**: `vl-component-name.component.ts`
- **Defaults**: `vl-component-name.defaults.ts`
- **Tests**: `vl-component-name.component.cy.ts`
- **Stories**: `vl-component-name.stories.ts` (co-located in `stories/` subdirectory)
- **Story args**: `vl-component-name.stories-arg.ts` (singular, not `stories-args`)
- **Story docs**: `vl-component-name.stories-doc.mdx`
- **Branches**: `feature-v2/FLUX-XXX-description` (FLUX ticket number)

### CSS and Styling

- All components use Shadow DOM encapsulation
- Import styles from `@domg/govflanders-style` packages
- Always use CSS custom properties (design tokens), never raw color values or hardcoded spacing
- Most components support a `custom-css` attribute for external style tweaks

## Testing Guidelines

### Cypress Component Tests

Every component should have Cypress component tests following these guidelines:

**Test File Naming:**
- Component tests: `vl-component-name.component.cy.ts`

**Test Guidelines:**
- Use **English** descriptions
- Start with "should" (e.g., "should set steps", "should render correctly")
- Use data from stories/fixtures where possible
- Place fixtures in `storybook-e2e/src/fixtures` for reusability
- Test visually rendered HTML, not internal method calls
- Structure tests pragmatically with `describe()` and `it()` blocks

**A11y Testing:**
- Use `cy.injectAxe()` to inject the axe-core accessibility engine
- Use `cy.checkA11y('vl-component-name')` to run WCAG checks

**Keyboard Testing:**
- Use `cy.press(Cypress.Keyboard.Keys.TAB)` to simulate keyboard interactions
- Test keyboard navigation and focus management

**Referentie tests:** zie `libs/components/src/atom/button/vl-button.component.cy.ts`

**Running Tests:**
```bash
# Component tests with UI
npm run libs:component-tests:watch

# All component tests
npm run libs:component-tests:run

# Specific test
npm run libs:component-tests:run -- --spec "../../libs/components/src/[type]/vl-name/vl-name.component.cy.ts"

# Storybook E2E tests
npm run apps:storybook:dev  # Terminal 1
npm run apps:storybook-e2e:watch  # Terminal 2
```

## Accessibility (WCAG 2.2)

The project targets **WCAG 2.2 AA** compliance.

**Key requirements:**
- Minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text/UI components
- Never use color alone to convey information
- All form controls must have a label (via `<vl-form-label for="...">` or the component's `label` attribute)
- Error messages must be specific and actionable:
  - **Not:** "E-mail adres is niet juist."
  - **Yes:** "Vul een geldig e-mailadres in. Bijvoorbeeld: omgeving@vlaanderen.be"
- Use `placeholder` only for example values, never as labels
- Set `autocomplete` attribute appropriately (use `off` when no relevant suggestions)

## Form Validation

Form components use the HTML5 Constraint Validation API with `ValidityState`:
- Supported constraints: `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `customError`
- Error messages via `vl-form-message` component
- Form containers use class `vl-form`, action groups use `vl-action-group`
- Use `parseFormData()` helper for collecting form data

## Storybook Stories

Each component needs Storybook documentation split into **3 files**, co-located with the component source in a `stories/` subdirectory:

### File Structure

Stories live at: `libs/components/src/[type]/[component]/stories/`

1. **`[component].stories.ts`** - Story definitions and templates
2. **`[component].stories-arg.ts`** - Args and ArgTypes (singular `arg`, not `args`)
3. **`[component].stories-doc.mdx`** - Documentation page

### Template Guidelines

- Use `story()` helper from `@resources/utils-storybook` to filter default args
- Sort args alphabetically (unless logical order preferred)
- Boolean attributes use `?` prefix (e.g., `?disabled=${disabled}`)
- Properties prefixed with `.` (e.g., `.steps=${steps}`)
- Events prefixed with `@` (e.g., `@vl-click-step=${handler}`)
- Slots use `unsafeHTML` directive (e.g., `${unsafeHTML(defaultSlot)}`)

**Story Naming:** `[Component]+[Variant]` (e.g., `ButtonPrimary`, `ButtonDisabled`)

**ArgTypes Categories:**
- `CATEGORIES.ATTRIBUTES` - HTML attributes
- `CATEGORIES.PROPERTIES` - JavaScript properties
- `CATEGORIES.SLOTS` - Content slots
- `CATEGORIES.EVENTS` - Custom events

### Reference

See `libs/components/src/atom/button/stories/` for a complete example:
- `vl-button.stories.ts` — story definitions and templates
- `vl-button.stories-arg.ts` — args and argTypes
- `vl-button.stories-doc.mdx` — documentation page

### Storybook Meta Data

When creating a new component, update the corresponding meta-data JSON:

`apps/storybook/.storybook/flux-meta-data/json/components-{type}.meta-data.json`

Files per type:
- `components-atom.meta-data.json`
- `components-block.meta-data.json`
- `components-form.meta-data.json`
- `components-compliance.meta-data.json`

Add an entry with the component name, docs reference, and condition fields. See an existing entry as example.

### Storybook Verification

**IMPORTANT: Always verify changes in Storybook before committing:**

1. Start Storybook locally:
   ```bash
   npm run apps:storybook:dev
   ```

2. Navigate to your component (http://localhost:8080)

3. **Check the following:**
   - Component renders correctly in all stories
   - Controls work as expected (modify args in UI)
   - Documentation is complete and accurate
   - Code examples display correctly
   - No console errors or warnings
   - Responsive behavior (if applicable)

4. Test story configurations in the browser before finalizing

**Common Issues:**
- Missing imports in story files
- Incorrect arg types causing control issues
- Template not using `story()` helper (shows default args in source)
- Slots not using `unsafeHTML` (HTML gets escaped)
- Properties not prefixed with `.` (passed as attributes instead)

## Planning & Scratchpad Files

When creating implementation plans, technical notes, or scratchpad documents:

- **Save plans to `.claude/plans/`** — e.g. `.claude/plans/2026-03-19-FLUX-123-badge-component.md`
- This directory is **gitignored** — plans are local-only, never committed
- Use descriptive filenames: `YYYY-MM-DD-{short-description}.md`

## Git Workflow

### Branch Naming

- Feature branches: `feature-v2/FLUX-XXX-short-description`
- Base branch: `develop-v2`
- Main branch: `main` (protected)

### Branch Safety (STRIKT)

- **Claude pusht nooit in deze repo** — staande afspraak. Geen `git push` in welke vorm dan ook; pushen doet de gebruiker zelf.
- **Branch-tracking, 2 regels:**
  - Nieuwe branch met **andere naam** dan de branch/ref waarvan we vertrekken: `--no-track` (geen upstream). Bv. `git checkout --no-track -b feature-v2/FLUX-xxx origin/develop-v2`.
  - **Bestaande** branch uitchecken: tracking moet er net wél zijn (niet wegnemen).

### Commit Messages

Commit messages describe **only the code changes** — no attribution, no trailers, no metadata about who or what made the changes.

**Format:** `feat/fix: FLUX-XXX - component name / theme - description in Dutch`

- The FLUX ticket number can usually be derived from the branch name
- Only use `feat:` (new features/enhancements) or `fix:` (bug fixes) — other types like `chore:` are exclusively used by the build system

**Examples:**
- `feat: FLUX-576 - vl-alert - multiline attribuut toegevoegd`
- `fix: FLUX-592 - vl-spotlight, vl-infotext, vl-doormat - extern icoon inline na titel geplaatst`
- `feat: FLUX-547 - vl-upload - validatie verbeteringen`
- `fix: FLUX-585 - flaky testen stabiel gemaakt`
- Typically 1 ticket = 1 feature branch = 1 squashed commit
- If a branch contains distinct FLUX tickets or fixes, separate commits per ticket are allowed
- Ensure each commit follows the conventional commit format
- Component name should be included (e.g., `vl-upload`, `vl-side-navigation-next`)
- For accessibility improvements, use "WCAG verbeteringen" in description

### Pull Requests

- Target: `develop-v2` branch
- Include FLUX ticket number in title
- Link to JIRA ticket in description
- Ensure tests pass
- Request review from team

## Common Tasks

### Creating a New Component

See the "New Component Scaffolding" playbook in `SKILLS.md` for the full step-by-step procedure.

### Updating an Existing Component

1. Read the component file first
2. Check existing tests
3. Make changes following existing patterns
4. Update tests if needed
5. Run tests to verify
6. Update Storybook story if API changed

### Debugging

- Use `console.log()` for quick debugging
- Use Cypress test for interactive debugging
- Check Storybook for visual verification
- Use browser DevTools for Shadow DOM inspection

## AI Agent Guidelines

When working on this project:

1. **Study a sibling component first** - Before creating or modifying a component, always read an existing component of the same type (atom, block, form, compliance) to match its exact patterns
2. **Test your changes** - Run Cypress component tests after every change; never assume a change works without running the test
3. **Update tests** - When changing component behavior, update the corresponding `.component.cy.ts` file; when fixing bugs, write a regression test first
4. **Verify in Storybook** - ALWAYS check visual changes in Storybook (`npm run apps:storybook:dev`)
   - Verify component renders correctly
   - Test all story variants
   - Check controls work as expected
   - Ensure no console errors
5. **Follow naming conventions** - Use the established naming patterns (see Coding Conventions above)
6. **Use TypeScript properly** - Explicit types, no `any`, use `PropertyDeclarations` for reactive properties
7. **Respect Shadow DOM** - Components use Shadow DOM encapsulation; query shadow roots in tests, use CSS custom properties for styling
8. **CSS: always use Flux foundation custom properties** - Never use raw color values, hardcoded spacing, or font definitions
9. **Write proper commit messages** - Follow the conventional commit format with Dutch descriptions

## Resources

- Lit Documentation: https://lit.dev/
- Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components
- Cypress Component Testing: https://docs.cypress.io/guides/component-testing/overview
- Storybook: https://storybook.js.org/

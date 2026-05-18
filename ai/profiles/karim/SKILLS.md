# Flux Web Components v2 - Skill Playbooks (Agent-Agnostic)

This file contains shared, agent-agnostic playbooks for tasks that are commonly repeated across project skills.

Skills live in `.claude/skills/` and are discovered automatically by Claude Code.
`CLAUDE.md` references both `AGENTS.md` and this file so skill authors/agents can rely on these playbooks without duplicating instructions.

## New Component Scaffolding

Create all required files for a new Flux web component.

### Arguments

The user must provide:
- **Component name** (e.g., `vl-badge`) — kebab-case, `vl-` prefixed
- **Component type** — one of: `atom`, `block`, `form`, `compliance`

### Steps

#### 1. Determine names

From the component name (e.g., `vl-badge`):
- **Tag**: `vl-badge`
- **Class**: `VlBadgeComponent`
- **Directory**: `libs/components/src/{type}/badge/`
- **Defaults const**: `badgeDefaults`
- **Story id**: `components-{type}-badge`
- **Story title**: `Components - {Type}/badge`

#### 2. Look at an existing component of the same type

Before generating any files, read an existing component of the same type to understand the exact patterns used. For example:
- `atom`: read `libs/components/src/atom/button/` files
- `block`: read `libs/components/src/block/accordion/` files
- `form`: read `libs/components/src/form/checkbox/` files
- `compliance`: read `libs/components/src/compliance/privacy/` files

Match the exact import style, class structure, and patterns from the existing component.

#### 3. Create files

Create these files, following the patterns from step 2:

##### 3.1 Defaults file: `{dir}/vl-{name}.defaults.ts`

```typescript
export const {name}Defaults = {
    // Add typed default properties here
} as const;
```

##### 3.2 Component file: `{dir}/vl-{name}.component.ts`

- Extend `BaseLitElement` from `@domg-wc/common`
- Use `@webComponent('vl-{name}')` decorator
- Use `static get properties(): PropertyDeclarations` for reactive properties
- Import defaults from the defaults file
- Add `declare global { interface HTMLElementTagNameMap }` at bottom
- **Slots**: document all `<slot>` elements with clear names; use named slots (e.g., `<slot name="actions">`) for optional content areas and the default slot for primary content

##### 3.3 Component test: `{dir}/vl-{name}.component.cy.ts`

- Test that the component renders
- Test key properties and interactions
- Follow existing test patterns from the reference component

##### 3.4 Story files: `{dir}/stories/`

**`vl-{name}.stories.ts`**
- Import and register the component with `registerWebComponents()`
- Use `story()` helper from `@resources/utils-storybook`
- Create at least a default story

**`vl-{name}.stories-arg.ts`** (singular `arg`, NOT `args`)
- Spread `...defaultArgs` and component defaults
- Define `ArgTypes` with `...defaultArgTypes` spread
- Use `CATEGORIES` and `TYPES` from `@resources/utils-storybook`
- Use `action()` from `storybook/actions` for events
- **Slots**: document every slot in `argTypes` with `category: CATEGORIES.SLOTS` and `type: { summary: TYPES.HTML }` (see alert example for pattern)
- **Events**: document every custom event with `category: CATEGORIES.EVENTS`

**`vl-{name}.stories-doc.mdx`**
- Start with imports from `@storybook/addon-docs/blocks` (ArgTypes, Canvas)
- Import the stories: `import * as VlNameStories from './vl-{name}.stories';`
- Add the `<FluxComponentMetaData id="components-{type}-{name}" />` component (the id matches the key in the metadata JSON)
- Include sections: Doel, Voorbeeld (with import + HTML + Canvas), Configuratie (with ArgTypes), Varianten
- Documentation text in Dutch

##### 3.5 Storybook E2E test: `apps/storybook-e2e/src/e2e/components/{type}/{name}/vl-{name}.stories.cy.ts`

```typescript
const defaultUrl = 'http://localhost:8080/iframe.html?id={story-id}--{name}-default&viewMode=story';

describe('cypress-e2e - {type} components - vl-{name} - default story', () => {
    it('should render', () => {
        cy.visit(defaultUrl);

        cy.get('vl-{name}').shadow();
    });
});
```

Add a test for each story variant.

#### 4. Register FluxMetadata

Add an entry to the correct metadata JSON file at `apps/storybook/.storybook/flux-meta-data/json/components-{type}.meta-data.json`:

```json
"components-{type}-{name}": {
    "name": "{name}",
    "docs": "components-{type}-{name}--documentatie",
    "condition": {
        "base": "LitElement",
        "generation": "v2",
        "css": "Flux",
        "tests": ["Component", "Storybook"],
        "documentation": "basis",
        "wcagLevel": "TODO",
        "jiraMeta": "geen"
    }
}
```

Possible values (see `flux-meta-data.model.ts`):
- `base`: `CSSResult` | `HTMLElement` | `LitElement` | `MapAction` | `n.v.t.`
- `generation`: `legacy` | `v1` | `v2` | `v3-next`
- `css`: `govflanders` | `Flux` | `n.v.t.`
- `tests`: array of `Jest` | `Component` | `Storybook`
- `documentation`: `geen` | `n.v.t.` | `template` | `minimaal` | `basis` | `uitgebreid`
- `wcagLevel`: `TODO` | `insufficient` | `brons[basis]` | `brons[plus]` | `zilver[basis]` | `zilver[plus]`

#### 5. Register in web-types config

Add the component to the correct web-types config file at `resources/generate-web-types/wt-config-build/components-{type}.wt-config.ts`:

1. Import the argTypes: `import { {name}ArgTypes } from '../../../libs/components/src/{type}/{name}/stories/vl-{name}.stories-arg';`
2. Add to the config array:

```typescript
buildWTConfig(
    'vl-{name}',
    {name}ArgTypes,
    '../../libs/components/src/{type}/{name}/stories/vl-{name}.stories-doc.mdx',
    '/docs/components-{type}-{name}--documentatie'
),
```

#### 6. Export the component

Add the export to `libs/components/src/index.ts`.

#### 7. Verify

Run the component test:

```bash
npm run libs:component-tests:run -- --spec "../../libs/components/src/{type}/{name}/vl-{name}.component.cy.ts"
```

Tell the user to verify Storybook manually:

```bash
npm run apps:storybook:dev
# Then navigate to http://localhost:8080 and check the new component
```

And run the storybook E2E test:

```bash
npm run apps:storybook:dev  # Terminal 1
npm run apps:storybook-e2e:watch  # Terminal 2
```

## Run Component Tests

Run Cypress component tests for a specific component or all components.

### Usage

- `/run-tests` — run all component tests
- `/run-tests vl-button` — run tests for a specific component
- `/run-tests atom/button` — run tests by path

### Steps

#### 1. Determine what to test

If a component name or path is provided, find the test file:
- Search for `*.component.cy.ts` files matching the component name
- The test file is co-located with the component at `libs/components/src/{type}/{name}/vl-{name}.component.cy.ts`

If no component is specified, run all tests.

#### 2. Run the tests

**Specific component:**

```bash
npm run libs:component-tests:run -- --spec "../../libs/components/src/{type}/{name}/vl-{name}.component.cy.ts"
```

**All components:**

```bash
npm run libs:component-tests:run
```

#### 3. Report results

- If tests pass: report success with number of tests passed
- If tests fail: show the failing test names and error messages, then help debug

## Test Coverage Enforcement

This skill is invoked automatically by Claude when implementing features or fixing bugs.

### When implementing a new feature

After implementing a feature, ALWAYS:

1. Check if component tests exist for the modified component at `libs/components/src/{type}/{name}/vl-{name}.component.cy.ts`
2. Add tests for the new functionality:
   - Test the new property/attribute works correctly
   - Test the new event fires correctly
   - Test the new slot renders correctly
   - Test user interactions with the new feature
3. Update existing tests if the feature changes existing behavior
4. Add storybook E2E tests if new stories were added at `apps/storybook-e2e/src/e2e/components/{type}/{name}/`
5. Run the tests to verify they pass:

```bash
npm run libs:component-tests:run -- --spec "../../libs/components/src/{type}/{name}/vl-{name}.component.cy.ts"
```

### When fixing a bug

After fixing a bug, ALWAYS:

1. Write a regression test first that reproduces the bug scenario
   - The test should describe the bug scenario clearly (e.g., `should not crash when value is empty`)
   - The test should fail without the fix and pass with it
2. Add the test to the component's existing test file
3. Run the tests to verify the fix works and nothing else broke

### Test patterns to follow

Read the existing test file for the component being modified. Match:
- The describe/it structure
- The mount or visit pattern used
- The assertion style (shadow DOM queries, attribute checks, etc.)
- English test descriptions starting with "should"

### Reminders

- Never skip tests because "it's a small change"
- Never claim a fix works without a test proving it
- If the component has no tests yet, create the test file following the patterns from a similar component


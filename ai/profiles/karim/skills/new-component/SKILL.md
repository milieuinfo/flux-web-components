---
name: new-component
description: Scaffold a new Flux web component with all required files (defaults, component, component test, storybook stories, storybook E2E test, flux metadata, web-types config)
user-invocable: true
---

# New Component Scaffolding

Create all required files for a new Flux web component.

## Arguments

The user must provide:
- **Component name** (e.g., `vl-badge`) — kebab-case, `vl-` prefixed
- **Component type** — one of: `atom`, `block`, `form`, `compliance`

## 1. Determine names

From the component name (e.g., `vl-badge`):
- **Tag**: `vl-badge`
- **Class**: `VlBadgeComponent`
- **Directory**: `libs/components/src/{type}/badge/`
- **Defaults const**: `badgeDefaults`
- **Story id**: `components-{type}-badge`
- **Story title**: `Components - {Type}/badge`

## 2. Look at an existing component of the same type

Before generating any files, read an existing component of the same type to understand the exact patterns used:
- `atom`: `libs/components/src/atom/button/`
- `block`: `libs/components/src/block/accordion/`
- `form`: `libs/components/src/form/checkbox/`
- `compliance`: `libs/components/src/compliance/privacy/`

Match the exact import style, class structure, and patterns from the existing component.

> **Reactive properties — exception:** these siblings still declare properties via `static get properties()` (legacy — the case in the large majority of components). Do **not** copy that style for new work. Always use the decorator pattern from `libs/components/src/block/next/tabs/vl-tab.component.ts`, regardless of type (no `atom` component uses decorators yet). See §3.2.

## 3. Create files

### 3.1 Defaults file: `{dir}/vl-{name}.defaults.ts`

```typescript
export const {name}Defaults = {
    // Add typed default properties here
} as const;
```

### 3.2 Component file: `{dir}/vl-{name}.component.ts`

- Extend `BaseLitElement` from `@domg-wc/common`
- Use the `@webComponent('vl-{name}')` decorator
- Declare reactive properties with the Lit `@property`/`@state` decorators (`import { property, state } from 'lit/decorators.js'`), not with `static get properties()`. Reference: `libs/components/src/block/next/tabs/vl-tab.component.ts`

  ```typescript
  @property({ type: String, reflect: true, attribute: 'panel' })
  panel = '';

  @property({ type: Boolean, reflect: true, attribute: 'selected' })
  selected = false;
  ```

- Import defaults from the defaults file
- **Slots**: document all `<slot>` elements with clear names; use named slots (e.g., `<slot name="actions">`) for optional content areas and the default slot for primary content
- Add `declare global { interface HTMLElementTagNameMap }` at the bottom

### 3.3 Component test: `{dir}/vl-{name}.component.cy.ts`

- Test that the component renders
- Test key properties and interactions
- Follow the existing test patterns from the reference component; see `AGENTS.md` for the test conventions

### 3.4 Story files: `{dir}/stories/`

**`vl-{name}.stories.ts`**
- Import and register the component with `registerWebComponents()`
- Use the `story()` helper from `@resources/utils-storybook`
- Create at least a default story

**`vl-{name}.stories-arg.ts`** (singular `arg`, NOT `args`)
- Spread `...defaultArgs` and component defaults
- Define `ArgTypes` with a `...defaultArgTypes` spread
- Use `CATEGORIES` and `TYPES` from `@resources/utils-storybook`
- Use `action()` from `storybook/actions` for events
- **Slots**: document every slot in `argTypes` with `category: CATEGORIES.SLOTS` and `type: { summary: TYPES.HTML }`
- **Events**: document every custom event with `category: CATEGORIES.EVENTS`

**`vl-{name}.stories-doc.mdx`**
- Start with imports from `@storybook/addon-docs/blocks` (`ArgTypes`, `Canvas`)
- Import the stories: `import * as VlNameStories from './vl-{name}.stories';`
- Add `<FluxComponentMetaData id="components-{type}-{name}" />` (the id matches the key in the metadata JSON)
- Sections: Doel, Voorbeeld (import + HTML + Canvas), Configuratie (with ArgTypes), Varianten
- Documentation text in Dutch

### 3.5 Storybook E2E test

`apps/storybook-e2e/src/e2e/components/{type}/{name}/vl-{name}.stories.cy.ts`:

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

## 4. Register FluxMetadata

Add an entry to `apps/storybook/.storybook/flux-meta-data/json/components-{type}.meta-data.json`:

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

## 5. Register in web-types config

In `resources/generate-web-types/wt-config-build/components-{type}.wt-config.ts`:

```typescript
import { {name}ArgTypes } from '../../../libs/components/src/{type}/{name}/stories/vl-{name}.stories-arg';

buildWTConfig(
    'vl-{name}',
    {name}ArgTypes,
    '../../libs/components/src/{type}/{name}/stories/vl-{name}.stories-doc.mdx',
    '/docs/components-{type}-{name}--documentatie',
),
```

## 6. Export the component

Add the export to `libs/components/src/{type}/index.ts` (e.g. `atom/index.ts`).

## 7. Verify

```bash
npm run libs:component-tests:run -- --spec "../../libs/components/src/{type}/{name}/vl-{name}.component.cy.ts"
```

Ask the user to verify Storybook manually (`npm run apps:storybook:dev`, http://localhost:8080) and run the Storybook E2E test (`npm run apps:storybook-e2e:watch` in a second terminal).

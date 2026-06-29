---
name: new-component
description: Scaffold een nieuwe Flux web component met alle vereiste files (defaults, component, component test, Storybook stories, Storybook E2E test, Flux metadata, web-types config)
user-invocable: true
---

# Nieuw Component Scaffolden

Vereist argumenten:
- **Component naam** (bv. `vl-badge`) — kebab-case, `vl-` prefix
- **Type** — `atom` | `block` | `form` | `compliance`

## 1. Naamafleidingen

Uit `vl-badge`:
- Tag: `vl-badge`
- Class: `VlBadgeComponent`
- Directory: `libs/components/src/{type}/badge/`
- Defaults const: `badgeDefaults`
- Story id: `components-{type}-badge`
- Story title: `Components - {Type}/badge`

## 2. Lees een sibling-component

Bekijk een bestaand component van hetzelfde type vóór je iets genereert — match exact die imports, klassestructuur en patronen:
- `atom`: `libs/components/src/atom/button/`
- `block`: `libs/components/src/block/accordion/`
- `form`: `libs/components/src/form/checkbox/`
- `compliance`: `libs/components/src/compliance/privacy/`

## 3. Files aanmaken

### 3.1 Defaults: `vl-{name}.defaults.ts`

```typescript
export const {name}Defaults = {
    // Getypeerde default properties
} as const;
```

### 3.2 Component: `vl-{name}.component.ts`

- Extend `BaseLitElement` uit `@domg-wc/common`
- Decorator `@webComponent('vl-{name}')`
- Reactive properties via `static get properties(): PropertyDeclarations`
- Slots documenteren: named slots voor optionele content, default slot voor primary content
- Onderaan: `declare global { interface HTMLElementTagNameMap }`

### 3.3 Component test: `vl-{name}.component.cy.ts`

Volg het sibling-patroon. Zie `CLAUDE.md` voor test-conventies.

### 3.4 Stories in `stories/` subdirectory

- `vl-{name}.stories.ts` — registreer met `registerWebComponents()`, gebruik `story()` helper, minstens een default story
- `vl-{name}.stories-arg.ts` — spread `...defaultArgs` en `...defaultArgTypes`; documenteer **elke** slot (`category: CATEGORIES.SLOTS`, `type: { summary: TYPES.HTML }`) en **elk** custom event (`category: CATEGORIES.EVENTS`); events via `action()` uit `storybook/actions`
- `vl-{name}.stories-doc.mdx` — imports uit `@storybook/addon-docs/blocks` (`ArgTypes`, `Canvas`), `import * as VlNameStories from './vl-{name}.stories'`, voeg `<FluxComponentMetaData id="components-{type}-{name}" />` toe (id matcht metadata-JSON key), secties: Doel, Voorbeeld, Configuratie, Varianten

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

Voeg een test toe per story-variant.

## 4. FluxMetadata registreren

Entry in `apps/storybook/.storybook/flux-meta-data/json/components-{type}.meta-data.json`:

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

Mogelijke waarden (zie `flux-meta-data.model.ts`):
- `base`: `CSSResult` | `HTMLElement` | `LitElement` | `MapAction` | `n.v.t.`
- `generation`: `legacy` | `v1` | `v2` | `v3-next`
- `css`: `govflanders` | `Flux` | `n.v.t.`
- `tests`: array van `Jest` | `Component` | `Storybook`
- `documentation`: `geen` | `n.v.t.` | `template` | `minimaal` | `basis` | `uitgebreid`
- `wcagLevel`: `TODO` | `insufficient` | `brons[basis]` | `brons[plus]` | `zilver[basis]` | `zilver[plus]`

## 5. Web-types config

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

## 6. Exporteren

Voeg export toe in `libs/components/src/{type}/index.ts` (bv. `atom/index.ts`).

## 7. Verifiëren

```bash
npm run libs:component-tests:run -- --spec "../../libs/components/src/{type}/{name}/vl-{name}.component.cy.ts"
```

Vraag de gebruiker om Storybook visueel te checken (`npm run apps:storybook:dev`, http://localhost:8080) en draai de Storybook E2E test (`npm run apps:storybook-e2e:watch` in tweede terminal).

---
name: run-tests
description: Run Cypress component tests voor één component of voor alle componenten
user-invocable: true
---

# Run Component Tests

Run Cypress component tests voor een specifieke component of voor alle componenten.

## Gebruik

- `/run-tests` — draai alle component-tests
- `/run-tests vl-button` — draai tests voor een specifieke component
- `/run-tests atom/button` — draai tests via pad

## Stappen

### 1. Bepaal wat te testen

Als een componentnaam of pad opgegeven is, zoek het testbestand:
- Zoek naar `*.component.cy.ts` bestanden die overeenkomen met de componentnaam
- Het testbestand staat naast de component op `libs/components/src/{type}/{name}/vl-{name}.component.cy.ts`

Als er geen component opgegeven is, draai alle tests.

### 2. Draai de tests

**Specifieke component:**

```bash
npm run libs:component-tests:run -- --spec "../../libs/components/src/{type}/{name}/vl-{name}.component.cy.ts"
```

**Alle componenten:**

```bash
npm run libs:component-tests:run
```

**Watch mode (interactief):**

```bash
npm run libs:component-tests:watch
```

### 3. Rapporteer resultaten

- Bij succes: meld het aantal geslaagde tests
- Bij falen: toon de falende test-namen en foutmeldingen, en help debuggen

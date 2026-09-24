---
name: wcag-audit
description: WCAG 2.2 AA-audit van één Flux component per succescriterium, met bewijs, fixes en voorstel voor de wcag-metadata.
argument-hint: <vl-naam>
---

# WCAG 2.2 AA-audit

Component: `$ARGUMENTS`

## 1. Context

- Lees het component, de flux-css, de stories en de component test.
- Lees de huidige status in `apps/storybook/.storybook/flux-meta-data/json/*.meta-data.json`, veld `wcag`:
  - `TODO`: nog niet geaudit
  - `FLUX-{nr}`: geaudit, met een openstaand ticket. Lees dat ticket en ga na of de punten nog gelden, in plaats van ze als nieuw te melden
  - `reviewed`: eerder goedgekeurd. Audit enkel wat sindsdien wijzigde (`git log -- <map>`)
  - `n.v.t.`: meestal geen audit nodig. Vraag of de gebruiker toch wil verdergaan
- Teamrichtlijnen: `apps/storybook/docs/e_richtlijnen/a_toegankelijkheid-aanpak/`.

## 2. Controleren

Loop alle relevante AA-criteria af. Combineer drie methodes:
- **code**
- **axe**: draai de bestaande component test. Ontbreekt `should be accessible`, dan is dat al een bevinding
- **browser**: de Storybook-story in Chrome (tabben, focus, 200% zoom, 320px breed, computed kleuren van de tokens)

Specifiek voor deze web components:
- ID-referenties (`aria-labelledby`, `aria-describedby`, `for`) werken niet over de shadow boundary heen. Controleer waar label en control zitten.
- Na sluiten van een overlay (side-sheet, modal, popover) keert de focus terug naar de trigger. Een verborgen trigger (`hide-toggle-button`) mag geen focusval veroorzaken.
- Focus-outline via `:focus-visible` en niet verborgen onder sticky elementen (2.4.11).
- Iconen zijn decoratief (`aria-hidden`) of hebben een toegankelijke naam. `.vl-icon` hoort niet op een container.
- Target size minstens 24×24 CSS px (2.5.8), vooral bij icon-only buttons en sluitknoppen.

Wat enkel met een screenreader te bevestigen is, markeer je als **manueel**. Claim het niet.

## 3. Rapport

```
WCAG 2.2 AA-audit {component}, huidige status: {wcag-waarde}

| Criterium | Resultaat | Bewijs |
| 2.1.1 | ❌ faalt | vl-xxx.component.ts:88: Enter opent het paneel, Spatie niet |
| 1.4.3 | ✅ voldoet | tekst --vl-color--text op wit: 12.6:1 |
| 4.1.2 | ⚠️ manueel | aria-expanded wisselt correct; aankondiging in VoiceOver niet geverifieerd |
```

Criteria die voor dit component niet van toepassing zijn, vat je samen op één regel.

## 4. Vervolg voorstellen, niet zelf uitvoeren

- **Fixes**: per ❌ een concrete wijziging plus een component test die het gedrag vastlegt. Commit-beschrijving met "WCAG verbeteringen".
- **Ticket**: voor punten die niet meteen opgelost worden, stel je `/jira-ticket` voor.
- **Metadata** `wcag`:
  - `reviewed` als alles ✅ of n.v.t. is en de gebruiker de manuele punten bevestigde
  - `FLUX-{nr}` als er openstaande punten met een ticket zijn
  - anders ongewijzigd laten

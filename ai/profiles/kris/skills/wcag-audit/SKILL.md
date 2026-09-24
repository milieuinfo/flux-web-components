---
name: wcag-audit
description: WCAG 2.2 AA-audit van één Flux component: code-review, meetrun tegen Storybook (axe, toetsenbord, focus, reflow), rapport en voorstel voor de wcag-metadata.
argument-hint: <vl-naam>
---

# WCAG 2.2 AA-audit

Component: `$ARGUMENTS`

Een audit steunt op bewijs uit drie bronnen: de **code** toont de bedoeling (semantiek, ARIA, toetsen), de **meting** toont wat Chromium ervan maakt (axe, accessibility tree, focus) en **screenshots** tonen wat een ziende gebruiker ziet. Wat enkel met een screenreader te bevestigen is, markeer je als **manueel**. Claim het niet.

**Norm.** WCAG 2.2 AA. EN 301 549 v3.2.1 verwijst nog naar WCAG 2.1 AA, dus markeer wat nieuw is in 2.2 (2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8). Rapporteer 4.1.1 Parsing niet: vervallen in 2.2. Paginacriteria (titel, taal, landmarks, bypass) horen bij de toepassing. Forced colors is geen succescriterium: meld het als aanbeveling.

## 1. Context

- Lees het component, de flux-css, de stories en de component test. Controleer de basisklasse: de Lit-valkuilen gelden niet voor `BaseHTMLElement`.
- Lees de huidige status in `apps/storybook/.storybook/flux-meta-data/json/components-{type}.meta-data.json`, veld `wcag`:
  - `TODO`: nog niet geaudit
  - `FLUX-{nr}`: geaudit, met een openstaand ticket. Lees dat ticket en ga na of de punten nog gelden, in plaats van ze als nieuw te melden
  - `reviewed`: eerder goedgekeurd. Audit enkel wat sindsdien wijzigde (`git log -- <map>`)
  - `n.v.t.`: meestal geen audit nodig. Vraag of de gebruiker toch wil verdergaan
- Teamrichtlijnen: `apps/storybook/docs/e_richtlijnen/a_toegankelijkheid-aanpak/`.
- Bepaal het interactiepatroon en lees die sectie in `references/apg-patronen.md`.

## 2. Code-review en verwachtingen

Loop de bron door met `references/shadow-dom-lit.md` en noteer elke bevinding met `bestand:regel`. Specifiek voor Flux:

- Na sluiten van een overlay (side-sheet, modal, popover) keert de focus terug naar de trigger. Een verborgen trigger (`hide-toggle-button`) mag geen focusval veroorzaken.
- Iconen zijn decoratief (`aria-hidden`) of hebben een toegankelijke naam. `.vl-icon` hoort niet op een container.
- Focusstijl via `:focus-visible`, met tokens en niet verborgen onder sticky elementen.

Schrijf **vóór** de meting op wat je verwacht: rol, naam en states per toestand, de tabvolgorde, de toetsen per widget. Toets de meting daarna aan die verwachting, in plaats van achteraf te verklaren wat de tool teruggeeft.

## 3. Meten

**Component test.** Draai de bestaande test. Ontbreekt `should be accessible` (`cy.checkA11y`), dan is dat al een bevinding.

**Storybook.** `curl -sf http://localhost:8080/index.json > /dev/null && echo draait`. Draait het niet, start dan `pnpm run apps:storybook:dev` op de achtergrond en poll `index.json` tot ongeveer 2 minuten. Heb je Storybook zelf gestart, stop het dan aan het einde.

**Meetrun.** Het script gebruikt `playwright` en `axe-core` uit de repo (dezelfde axe-versie als cypress-axe), en Google Chrome als er geen Playwright-Chromium is. Installeer niets. Story-id's volgen de titel: `Components - Form/input-field` wordt `components-form-input-field--…`.

```bash
S=.claude/skills/wcag-audit/scripts/a11y-audit.mjs
node $S --filter components-{type}-{naam}-- --list
node $S --story <id> --story <id> --out build/a11y-report/vl-{naam}
```

Kies de stories die de semantiek of het uitzicht veranderen (default, disabled, fout, icon-only, toggle, open) in plaats van elke variant; `--filter` zonder `--list` meet alles wat matcht. `build/` is gitignored. `--help` toont de overige opties (`--skip`, `--best-practice`, `--max-tabs`, `--channel`).

Het script schrijft `summary.md` (lees dit eerst), `summary.json` en per story een map met screenshots en de ARIA-snapshot:

| controle | meet | criteria |
|---|---|---|
| `axe` | WCAG-tags, open shadow roots inbegrepen; paginaregels die de Storybook-shell testen staan uit | divers |
| `aria` | Playwright ARIA-snapshot door shadow roots heen | 1.3.1, 4.1.2 |
| `dom` | IDREF's naar een andere root of naar niets; `undefined`/`null` in attributen; lege `aria-*`; dubbele id's per root; radiogroepen met dezelfde `name` over roots | 1.3.1, 4.1.2 |
| `clickables` | elementen met pointer-listeners die niet focusbaar zijn, geen key-listener hebben of enkel op down-events reageren | 2.1.1, 2.5.2 |
| `keyboard` | Tab-wandeling: per stop Chromium-rol, -naam en -states, focus zichtbaar (pixelvergelijking), bedekt, lusdetectie, opeenvolgende radio-stops | 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11, 4.1.2 |
| `reflow` | 320 × 256 CSS px: horizontaal scrollen en de buitenste uitstekende elementen | 1.4.10 |
| `spacing` | tekstafstand-override in document en elke shadow root; nieuw afgesneden tekst | 1.4.12 |
| `forced` | forced-colors-screenshot en focus-zichtbaarheid per stop | aanbeveling |

**Scenario's voor toestanden.** De standaardrun meet enkel de begintoestand. Voor open/dicht, geselecteerd of foutmelding schrijf je een scenariobestand in de uitvoermap en draai je met `--scenarios <json>`. Voorbeelden, getest tegen de Flux-stories: `assets/scenario-voorbeeld.json`.

Staptypes: `click`, `focus`, `hover` (Playwright-selectors; CSS gaat door open shadow roots, `>>` ketent, bv. `vl-datepicker >> button#toggle-calendar`), `press` (`Enter`, `Escape`, `Shift+Tab`, `ArrowDown`), `tab` (aantal; het rapport toont het tabpad), `type`, `wait` (ms) en `capture` (label). Elke capture bewaart axe, ARIA-snapshot, het gefocuste element met rol, naam en states, en een screenshot. Een mislukte stap stopt het scenario. Minimale scenario's per patroon staan in `references/apg-patronen.md`.

## 4. Interpreteren

- **axe-violations** zijn betrouwbaar, maar controleer of het probleem in het component of in de story zit. Een story zonder label is een storyprobleem. Maakt de API het makkelijk om het label te vergeten, dan is een componentaanbeveling op zijn plaats.
- **axe-incomplete** vraagt jouw oordeel. `color-contrast` is in shadow DOM vaak incomplete: bereken de verhouding zelf uit de tokens (4.5:1 tekst, 3:1 grote tekst en niet-tekstuele elementen). `aria-valid-attr-value` als incomplete wijst vaak op een lege waarde uit een Lit-binding: zie de DOM-controle.
- **Tabel "Toetsenbord"**: heeft elke stop de verwachte rol, een naam en de juiste states? Een lege naam is meestal blokkerend. Twee stops met dezelfde naam na elkaar wijzen op een dubbele tabstop (host én intern element). Opeenvolgende radio-stops zijn een afwijking van het APG-patroon (één tabstop per groep), op zich geen WCAG-fout.
- **"focus zichtbaar: nee"** is een sterk signaal. **"ja"** betekent enkel dat er iets verandert: beoordeel de focus-screenshot op duidelijkheid en 3:1 contrast (1.4.11).
- **"bedekt"** vergelijkt het midden van het element met wat erboven ligt. Bevestig met de screenshot voordat je 2.4.11 rapporteert.
- **IDREF naar een andere root** werkt nooit, met één verwachte uitzondering: `vl-form-label` rendert zijn `<label for>` in de eigen shadow root en kopieert daarom zijn `label`-attribuut naar het control, dat het als `aria-label` op de interne input zet. Beoordeel daar de AX-naam, niet de IDREF. Tekst in de slot van `vl-form-label` wordt niet gekopieerd.
- **Native `<dialog>`**: in het tabpad gaat de focus na de laatste stop naar `(geen: body of browser)` en daarna terug naar de eerste. Dat is verwacht gedrag, geen focusval.
- **Pointer zonder toetsenbord** zijn kandidaten: event delegation of een key-listener op een voorouder (bv. `FormControl`, `vl-radio-group`) kan het verklaren. Bevestig in de code.
- **Bekijk altijd** `story.png`, `reflow-320.png`, `spacing-na.png`, `forced-colors.png` en de focus-screenshots met de Read-tool. Controleer in forced colors of randen, iconen, focusring en geselecteerde toestanden zichtbaar blijven.

Geef elke bevinding een **zekerheid**: *gemeten* (tool of screenshot), *afgeleid uit code* of *vermoeden* (manueel bevestigen).

## 5. Rapport

Schrijf `build/a11y-report/vl-{naam}/RAPPORT.md`. Geef in de chat de overzichtstabel, de drie belangrijkste bevindingen en het pad.

```markdown
# WCAG 2.2 AA-audit vl-{naam}, huidige status: {wcag-waarde}

Datum · commit · stories en scenario's · axe {versie}, {browser}

## Overzicht
| Criterium | Resultaat | Bewijs |
|---|---|---|
| 2.1.1 | ❌ faalt | vl-xxx.component.ts:88: Enter opent het paneel, Spatie niet |
| 1.4.3 | ✅ voldoet | --vl-color--text op wit: 12.6:1 |
| 4.1.2 | ⚠️ manueel | aria-expanded wisselt correct; aankondiging in VoiceOver niet geverifieerd |
Niet van toepassing: {criteria op één regel}

## Bevindingen
### B1 - {korte titel}
- **Criterium:** 4.1.2 Naam, rol, waarde (A) · nieuw in 2.2: nee
- **Ernst:** blokkerend | ernstig | matig | gering
- **Zekerheid:** gemeten | afgeleid uit code | vermoeden
- **Locatie:** `vl-xxx.component.ts:142` · story `…`
- **Probleem:** wat misgaat en voor wie
- **Oplossing:** concrete code

## Storyproblemen
## Aanbevelingen (geen succescriterium, bv. forced colors, APG-afwijkingen)
## Manueel te verifiëren
## Niet getest
```

**Ernst.** *Blokkerend*: een taak is voor een groep gebruikers onmogelijk (niet bedienbaar met toetsenbord, control zonder naam, focusval). *Ernstig*: grote hinder of verkeerde informatie (verkeerde rol of state, onzichtbare focus, foutmelding niet gekoppeld). *Matig*: hinder met een omweg. *Gering*: kleine afwijking van het patroon.

**Manueel te verifiëren** is een concreet testscript, geen standaardzin: welke combinatie (NVDA met Firefox of Chrome, VoiceOver met Safari op macOS of iOS), welke handeling, en wat de tester moet horen. Beperk het tot wat de meting niet kan beslissen.

**Niet getest**, benoem altijd: enkel Chromium gemeten (Safari en Firefox verschillen bij `ElementInternals`, `delegatesFocus` en element reflection); de accessibility tree is wat een screenreader ontvangt, niet wat hij uitspreekt; screenshots met `prefers-reduced-motion: reduce`, dus animaties en 2.3.x niet getest; enkel open shadow roots.

## 6. Vervolg voorstellen, niet zelf uitvoeren

- **Fixes**: per ❌ een concrete wijziging plus een component test die het gedrag vastlegt. Commit-beschrijving met "WCAG verbeteringen".
- **Ticket**: voor punten die niet meteen opgelost worden, stel je `/jira-ticket` voor.
- **Metadata** `wcag`:
  - `reviewed` als alles ✅ of n.v.t. is en de gebruiker de manuele punten bevestigde
  - `FLUX-{nr}` als er openstaande punten met een ticket zijn
  - anders ongewijzigd laten

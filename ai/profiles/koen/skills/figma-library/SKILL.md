---
name: figma-library
description: >-
    Werken in de FLUX Figma-library: componenten, varianten, slots of overrides aanpassen, een design bouwen
    met de library, een Code Connect-template schrijven, of een gap melden. Bevat de werkafspraken, de
    bouwregels per component, en de valkuilen van de Plugin-API en de MCP-tools; het gap-register staat in
    gaps.md ernaast.
user-invocable: true
---

# Figma — FLUX Web Componenten

Werkkennis voor wie via de Figma MCP in de FLUX Figma-library werkt. Regels en recepten, geen historiek (die
staat in git). Vul aan wanneer je iets vindt: een nieuwe les is één bullet hier, een nieuwe gap één rij in
[gaps.md](gaps.md).

**Lees [gaps.md](gaps.md)** voor je een gap meldt of oplost: de kans is groot dat hij er al staat, met de
reden waarom hij open is en een werkende omweg.

## Toegang

- **Library:** `FLUX Web Componenten`, fileKey `XgxaEcbNFkGbWW5FkCnEQo`, één pagina per component.
- **Iconen:** uitsluitend `[VL] Icons (team D)` `AalL9dm9XTZRvE8aaOpLDy` (kale namen: `add`). Het
  oudere `[VL] Foundations (team D)` (padnamen: `Icon/Functional/add`) wordt nergens meer gebruikt —
  gebruik het ook niet opnieuw.
- **Icoon-keys:** `search_design_system` vindt geen iconen. Gebruik `.claude/plans/icons-teamd-components.json`
  (naam → `assetKey`, lokaal en niet in git) als die bestaat; anders lees je de keys uit de Icons-library.

## Werkafspraken

- **De codebase is de source of truth.** Wijkt Figma af, meld het. Defaults in Figma volgen de code.
- **Werk standaard in een Figma-branch**; rechtstreeks in de library enkel als de gebruiker dat zegt.
  Verifieer elke wijziging op een testpagina of een tijdelijk frame (`clipsContent = false`, anders
  verdwijnt overloop) en ruim het op voor de merge of het einde van de taak.
- **Vraag per schrijfactie toestemming** tenzij de gebruiker een hele ronde vrijgaf. Ctrl-Z van de
  gebruiker werkt niet op MCP-wijzigingen; terugdraaien kost handwerk.
- **Controleer in een aparte call**, niet in hetzelfde script: overrides in slot-inhoud kunnen na het
  script nog verloren gaan, en een succesmelding bewijst niets. Controleer visueel met `get_screenshot`
  én met metingen (breedtes, overloop tegenover de parent).
- **Wijzig geen default** en voeg geen koppeling toe zonder te vragen wat dat met bestaande instances
  doet: een boolean heeft één default voor alle varianten, en elke bestaande instance krijgt die.

## Bouwen met de library

- **Gebruiksregels per component staan in de component description in Figma.** De Figma MCP geeft ze
  mee met `get_design_context`; lees ze daar en herhaal ze hier niet. Hieronder enkel wat er niet in staat.
  Een nieuwe regel voor een description voeg je toe in flux-mcp (`figma/descriptions/<soort>/<naam>.figma.md`,
  via een PR), niet in Figma: de volgende update overschrijft wat daar met de hand staat.
- **`vl-functional-header`:** knop of zoekveld naast de breadcrumb: `search?` aan en de laag swappen.
- **Richtingen heten `horizontal` / `vertical`**, zoals in code (`vl-fieldset`, `Form/Select`,
  `Form/Multiselect`).
- **`vl-cascader`:** de breadcrumb (boolean `breadcrumb`) is een geneste `vl-breadcrumb`, zoals in code
  sinds FLUX-800 (`<vl-breadcrumb ellipsis>`). Standaard kapt die lange teksten af. Code breekt eerst af
  naar een nieuwe regel: zet daarvoor de `Slot` op wrap (zie de Patronen-voorbeelden Niveau 3 en 5).
- **Sorteerbare tabelkop** (`↳ titelrow.item`, as `Type`): `sortable` is gesorteerd oplopend, `sortable - desc`
  aflopend, `sortable - unsorted` niet gesorteerd. In code komt sorteren enkel van `vl-rich-data-table`: de kop
  is daar altijd onderstreept, en zonder sortering is er geen icoon en geen gereserveerde ruimte. De
  sorteerklassen in `vl-table.css.ts` worden nergens gebruikt.
- **Nooit een component namaken** met losse frames + borders + eigen tekst. Elk UI-patroon dat op een
  component lijkt, ís er bijna altijd een. `search_design_system` geeft enkel de top-matches: varieer met
  synoniemen én korte losse termen, NL én EN (zoek ook op `tile` apart, niet enkel `data tile`). Grep ook de
  repo, want componenten leven niet enkel in `libs/components` (`vl-map` zit in `libs/integrations/src/map/`).
  Pas na een brede zoektocht zonder match een placeholder met laagnaam `PLACEHOLDER … — geen FLUX-component`,
  en meld het. Typische echte placeholders: grafieken.
- **Code ≠ library.** Sommige componenten bestaan in code maar niet in Figma, en omgekeerd. Alleen wat in
  Figma gepubliceerd is, kan je in een design gebruiken; controleer met `get_libraries` en
  `search_design_system`, en meld wat ontbreekt (`vl-map` is in Figma nog niet volwaardig).
- **Laagnamen:** laat de naam van een geplaatste instance gelijk aan de componentnaam.
- **Storybook-patronen** (`apps/storybook/docs/f_patronen/`) krijgen een sectie `Patronen` op de
  componentpagina: echte instances, Storybook-teksten, een label per voorbeeld. Bestaat de sectie al
  (`vl-info-tile`, `vl-cascader`, `vl-functional-header`), vul ze aan.
- **Styling die de library als variant aanbiedt, nooit met de hand nabouwen** — bv. zebra via
  `table-row variant=zebra`, niet via fills op cellen; handwerk verdwijnt bij een library-sync.

## Designs maken (code → design)

- **Pagina's:** `vl-template` is de standaardkeuze; `vl-dashboard` enkel voor grote applicaties die eerder
  een dashboard of desktop-app zijn. Stel gerichte vragen om die keuze te valideren vóór je begint. Bij
  `vl-template` met grote tabellen of een kaart: full-width functional header en full-width content-blokken.
- **Opbouw van de main content:** `vl-section`, en daarbinnen `vl-content-block`. Vul de meegeleverde
  `.vl-section`-slots in; verzin er niets naast.
- **Zijnavigatie** (TOC van de pagina) komt rond de content, binnen de `vl-content-block`, met
  `vl-side-navigation` op een `vl-grid`. In code is dat `vl-side-navigation-layout-next`
  (`content-block heading-root-selector="#..."`), dat de TOC uit de heading-ids genereert. Voorbeeld:
  `libs/integrations/src/page-layout/page-layout-example.component.ts` en Figma-node `563-51452`.
- **Bedenk geen eigen layouts** — geen eigen frames, backgrounds, borders of spacing. Een component weet
  niet in welke parent hij zit: de **parent bepaalt de spacing**, met `.vl-stacked` voor verticaal en
  `.vl-group` voor horizontaal. Gebruik `vl-title` met `no-space-bottom` in een `.vl-stacked`.
- **Bestaat er een variant met native Figma slots**, neem die.
- **Kleur nooit als enig onderscheid.** Voor kaarten, grafieken en gekleurde labels gelden de
  projectrichtlijnen: `apps/storybook/docs/h_opmaak/2_kleurenpalet.mdx` (o.a. kleurenblindheid) en
  `apps/storybook/docs/e_richtlijnen/a_toegankelijkheid-aanpak/1_waarneembaar/1.4-onderscheidbaar.mdx`.
- **Storybook is de bron van best practices** voor design en toegankelijkheid; neem die mee in wat je
  voorstelt, en meld onvolkomenheden in code én in de Figma-componenten.

**UI-patroon → component** (startpunt; verifieer de naam live met `search_design_system`):

| Wat je zoekt | Component |
|---|---|
| Pagina-layout (standaard / dashboard) | `vl-template` / `vl-dashboard` |
| App-/titelbalk bovenaan | `vl-functional-header` |
| Footer | `vl-footer` |
| Knop · link | `vl-button` · `vl-link` |
| Tekst-/zoekinput | `vl-input-field` |
| Filterpaneel (meerdere filters) | `vl-search-filter` |
| Dropdown / (multi)select / segmented keuze | `vl-select-rich` |
| Tabbladen-navigatie | `vl-tabs` (+ `vl-tab`) |
| Statistiek-/KPI-kaart ("card", "tile") | `vl-info-tile` |
| Uitleg-/infoblok (titel + tekst + link) | `vl-infoblock` |
| Korte inline-uitleg | `vl-infotext` |
| Uitgelicht contentblok (met illustratie) | `vl-spotlight` |
| Proza / rich text | `vl-proza-message` |
| Label/waarde-lijst (metadata) | `vl-properties` (boven `vl-description-data`) |
| Kaart / GIS-laag | `vl-map` (+ `vl-map-*`, in `libs/integrations`) |
| Overlay-detailpaneel | `vl-side-sheet` |
| Datatabel (filters/paginatie) | `vl-rich-data` / `vl-rich-data-table` |
| Contactgegevens | `vl-contact-card` |
| Heading / body-tekst | `vl-title` / `vl-text` |
| Popover / tooltip | `vl-popover` / `vl-tooltip` |
| Kolommenraster / groepering | `.vl-grid` / `.vl-group` · `.vl-stacked` |

## Een design in code omzetten

- **Figma is de bron voor het ontwerp, niet voor de structuur.** Match altijd eerst een bestaand
  sibling-component; neem de gegenereerde code nooit letterlijk over.
- **Map Figma-variabelen op bestaande design tokens** (CSS custom properties). Gebruik nooit de raw hex- of
  px-waarden uit Figma als er een token voor bestaat.
- **Vertaal de styling naar `*.css.ts`:** geneste, BEM-geordende selectors met tokens, niet inline of
  hardcoded.

## Instances, slots en overrides

- **Overridebaar:** `layoutSizing*`, `visible`, `characters`, `fontName`, `fills`, alle component
  properties, ook diep genest. **Niet:** `appendChild`/`remove` (behalve in een SLOT), `constraints`,
  `resize()` op geneste nodes.
- **Probeer `layoutSizing` vóór je "vaste maat" concludeert**, en lees de properties van **geneste**
  instances, niet enkel van de root.
- **`Fill` in een `Hug`-parent is circulair.** Een frame blijft dan op zijn laatste breedte; een tekst valt
  terug op zijn natuurlijke breedte. Oplossing: parent `Fixed`, kind `Fill`.
- **Native SLOT vs `[Flux] Slot`-instance.** In een instance kan je enkel bouwen in een native SLOT, of
  een placeholder swappen (`swapComponent`) naar iets dat inhoud draagt (`.vl-stacked`, `.vl-group`).
  `figma.createSlot` bestaat niet en een SLOT klonen levert een FRAME op: slots zijn editorwerk.
- **Een laag van parent wisselen of opnieuw aanmaken** breekt de overrides van álle bestaande instances
  (ze vallen terug op de default). Deprecated varianten beschermen niet; test op een canary.
- **Een nieuwe TEXT-property koppelen aan een bestaande tekstlaag behoudt de overrides** — Figma zet de
  eigen tekst om in de property-waarde.
- **`isExposedInstance = true`** op een geneste instance toont haar properties bovenaan in het paneel.
- **Een waarde toevoegen aan een bestaande variant-as is additief; een nieuwe as dwingt elke afnemer tot
  reconciliatie.** Kies waar mogelijk een boolean of een extra waarde.
- **Een variant klonen:** de kloon landt op de pagina (`set.appendChild`), verliest de property-koppelingen
  op het eigen niveau (terugzetten), en de set groeit niet mee (`set.resize`).
- **Eén override vernieuwt de id's in de boom** — haal nodes na elke mutatie opnieuw op, en check
  "node niet gevonden" tegen een screenshot vóór je verlies meldt.
- **`visible = false` op een slot-kind verwijdert het**; gebruik daar `remove()`.
- **Genest icoon: override of geërfd?** Zoek de node terug in het main component van de buitenste
  geneste instance `T`: via id (`I<T>;a;b` → `Ia;b`), anders via het pad van kind-indexen. Staat daar
  hetzelfde, dan is het geërfd — niet aanraken, het komt mee met de bron. Breekt het pad, dan is het
  slot-inhoud van deze component zelf.
- **Van het canvas verwijderde main components bestaan nog** zolang instances ernaar verwijzen: onvindbaar
  via een scan per pagina, wel bereikbaar en bewerkbaar via `getNodeByIdAsync`.

## Plugin-API

- **Fonts laden vóór elke tekstwijziging**, ook vóór `textAutoResize`: `for (const f of
  t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f)`. Vergelijken met
  `figma.mixed` faalt op tekst in een instance ("Cannot unwrap symbol").
- **`t.characters = …` geeft de hele tekst de opmaak van het eerste teken.** Lees vooraf álle
  range-eigenschappen (fills, fontName, textDecoration, …), zet ze terug en controleer ze allemaal.
- **`textAutoResize` vóór `layoutSizing`**; `HUG` op tekst met `textAutoResize = NONE` valt stil terug op
  `FIXED`.
- **INSTANCE_SWAP en `swapComponent` vragen een lokaal id:** `importComponentByKeyAsync(key)`, per script
  opnieuw. Meer dan ~30 imports per call haalt een timeout.
- **`swapComponent` behoudt node-id en maat**; de kleur-override gaat enkel mee als de binnenste laag
  dezelfde naam heeft (`Shape`). Lees de kleur vooraf en zet ze terug als ze verschilt.
- **`swapComponent` naar een ander soort component neemt de overrides van de root mee** (fill- en
  stroke-style, sizing): een `SelectBase` die een `vl-button` wordt, blijft een wit kader. Zet
  `fillStyleId`, `strokeStyleId` en de sizing terug naar die van het nieuwe main component.
- **Nodes binnen een instance (`I…`-id's) laadt Figma niet vanzelf** over paginagrenzen: laad eerst de
  pagina's (`page.loadAsync()` per pagina; `figma.loadAllPagesAsync` bestaat niet) en verwerk pas daarna.
- **Verborgen nodes:** `query()` slaat ze over. Zet `figma.skipInvisibleInstanceChildren = false`
  bovenaan elk script, anders geven `findOne`/`findAll` `null` voor kinderen van verborgen instances.
  Match variantnamen met een predicaat, niet op string.
- **Een laag verbergen en dan van variant wisselen snoeit de node**; maak liever een verse instance.
- **Een script dat faalt, wordt volledig teruggedraaid.** Een script zonder write-access faalt altijd, ook
  als het enkel leest.
- **Houd de return klein** (ruwweg < 20 KB): een groter resultaat breekt de MCP-respons ("Failed to parse
  SSE message"). Geef geen `componentProperties` van knoppen terug — `preferredValues` is honderden keys.

## MCP en tooling

- **Vóór elke `use_figma`-call** eerst de `figma-use` skill laden en `skillNames: "resource:figma-use"`
  meegeven; voor design-generatie `figma-generate-design`, `figma-generate-library` of `figma-code-connect`.
- **Pagina's ontdekken:** `get_metadata` zonder nodeId geeft één pagina; gebruik
  `use_figma` → `figma.root.children`.
- **`search_design_system`** geeft geen node-id, indexeert geen variables, styles of iconen, en voert
  per call één query uit.
- **Het publish-dialoog is de waarheid**, niet `getPublishStatusAsync()`. Geneste ongepubliceerde
  sub-componenten gaan automatisch mee.
- **`get_screenshot` rendert enkel canvas**, nooit de Figma-interface of Dev Mode.
- **Fonts zijn org-gebonden:** ontbreekt Flanders Art Sans, kijk naar `whoami` en de org-fonts.
- **In deze repo** blokkeert de deny-regel `Bash(cd /*)` commando's die met een absoluut pad beginnen:
  gebruik relatieve paden of `git -C`.

## Code Connect

- Parserless `*.figma.ts`-templates naast de componentcode. De sleutel is `(fileKey, nodeId, label)`;
  er is geen versie-as.
- **Pas de template aan bij elke nieuwe Figma-property of variant-waarde** — de drift-check
  (`pnpm run figma:code-connect:check`) meldt VARIANT-waarden die niet gelezen worden. Valideren:
  `pnpm run figma:code-connect:validate` (contacteert de Figma-API). Beide lezen de token uit `FIGMA_TOKEN`.
- `InstanceHandle.name` is de laagnaam uit de definitie, niet die van de geswapte instance: iconen
  leveren hun naam via `metadata.props.icon`.
- De `vl-alert`-template schrijft bij `naked` nooit `closable` uit, ook al laat code die combinatie toe.
- `figma connect preview` resolvet niet over bestandsgrenzen; controleer geneste iconen in Dev Mode.
- Dev Mode toont "Not started" op een component set en "Connected" op een instance: demonstreer vanuit
  een design.

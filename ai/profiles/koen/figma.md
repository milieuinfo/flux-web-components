# Figma — FLUX Web Componenten

Werkkennis en open gaps voor AI-agents die via de Figma MCP in de FLUX Figma-library werken.
Regels en recepten, geen historiek (die staat in git). Vul aan wanneer je iets vindt: een opgeloste gap
verdwijnt, een nieuwe gap is één tabelrij, een nieuwe les één bullet.

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

- **Pagina's:** `vl-template` (standaard) of `vl-dashboard` (grote dashboard-apps). Main content:
  `.vl-section` → `.vl-content-block` → `.vl-stacked` / `.vl-grid`. De parent bepaalt de spacing.
- **Zijnavigatie** staat rechts van de content, binnen de content-block; op mobiel erboven.
- **Overzichtspagina met tabel:** `vl-rich-data-table`; de instellingen `open` en `pagination` staan op
  het geneste `vl-rich-data`. Bouw geen eigen kolomindeling met een losse `vl-table`.
- **`vl-title`:** in een kolom de instance op `Fill` (lange titels breken af, de lijn van `alt`/`underline`
  loopt over de volle breedte). In een horizontale `.vl-group` de instance **én** `Frame 1` op `Hug` —
  alleen de instance op `Hug` doet niets, ook al toont het paneel "Hug".
- **`vl-functional-header`:** `sub-header` = `default` (terug-link, altijd zichtbaar), `breadcrumb`,
  `tabs` (standaard zonder terug-link) of `none` (`hide-sub-header`). Tabs mét terug-link is een
  patroon: `< Terug?` aan, in code de tabs in slot `sub-title` plus wat custom CSS (Storybook: Patronen /
  Navigatie / Functionele Header / met back en tabs). Knop of zoekveld naast de breadcrumb: `search?` aan
  en de laag swappen.
- **`vl-header` / `vl-footer`:** kies `size` per breekpunt (header L/S, footer L/M/S). Na een wissel naar
  footer `size=S` de hoogte op `Hug` zetten.
- **`vl-modal`:** `cancellable` staat standaard aan, zoals in code; zet hem uit voor een dialoog zonder
  annuleeractie.
- **`vl-alert naked` krijgt nooit een sluitknop**, ook al laat code `naked` + `closable` toe. De
  Code Connect-template schrijft bij naked dan ook nooit `closable` uit.
- **Richtingen heten `horizontal` / `vertical`**, zoals in code (`vl-fieldset`, `Form/Select`,
  `Form/Multiselect`).
- **`vl-cascader`:** de breadcrumb (boolean `breadcrumb`) is een geneste `vl-breadcrumb`, zoals in code
  sinds FLUX-800 (`<vl-breadcrumb ellipsis>`). Standaard kapt die lange teksten af. Code breekt eerst af
  naar een nieuwe regel: zet daarvoor de `Slot` op wrap (zie de Patronen-voorbeelden Niveau 3 en 5).
- **`vl-button`:** een icoon-knop krijgt zijn toegankelijke naam via de property `label`.
- **`vl-checkbox`:** `check`, `state` en `label` staan bovenaan in het paneel (geneste instances zijn
  exposed).
- **`vl-tooltip`:** `Placement=top` = bóven de trigger. De trigger is altijd een focusbare knop; zie het
  voorbeeld op de componentenpagina.
- **Nooit een component namaken** met losse frames. Zoek breed (`search_design_system` met synoniemen,
  NL én EN) en grep de repo, ook `libs/integrations`. Pas daarna een placeholder met laagnaam
  `PLACEHOLDER … — geen FLUX-component`.
- **Laagnamen:** laat de naam van een geplaatste instance gelijk aan de componentnaam.
- **Storybook-patronen** (`apps/storybook/docs/f_patronen/`) krijgen een sectie `Patronen` op de
  componentpagina: echte instances, Storybook-teksten, een label per voorbeeld. Bestaat de sectie al
  (`vl-info-tile`, `vl-cascader`, `vl-functional-header`), vul ze aan.
- **Styling die de library als variant aanbiedt, nooit met de hand nabouwen** — bv. zebra via
  `table-row variant=zebra`, niet via fills op cellen; handwerk verdwijnt bij een library-sync.

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
  (`pnpm run libs:code-connect:check`) meldt VARIANT-waarden die niet gelezen worden. Valideren:
  `pnpm run libs:code-connect:validate` (contacteert de Figma-API). Beide lezen de token uit `FIGMA_TOKEN`.
- `InstanceHandle.name` is de laagnaam uit de definitie, niet die van de geswapte instance: iconen
  leveren hun naam via `metadata.props.icon`.
- `figma connect preview` resolvet niet over bestandsgrenzen; controleer geneste iconen in Dev Mode.
- Dev Mode toont "Not started" op een component set en "Connected" op een instance: demonstreer vanuit
  een design.

## Open gaps

Stand 2026-09-18.

| Component | Gap | Waarom open / omweg |
|---|---|---|
| **Vraagt een native slot — editorwerk** | | |
| `vl-table` | state-varianten van `table-row` (success/warning/error/disabled) hebben geen slot | variantwissel reset alle cellen; markering in een cel (`vl-pill`) |
| `vl-table` | maximaal drie rij-acties (`Table.Cell icon row`) | leading/trailing zijn `Table.Cell`-schakelaars, geen slots |
| `vl-side-sheet` | geen slot | geneste `vl-text` swappen naar `.vl-stacked` |
| `vl-modal` | body is een placeholder; deprecated variant staat ernaast | placeholder swappen naar `.vl-stacked` |
| `vl-step` | geen slot voor acties | — |
| `vl-property` | `data slot` is een placeholder | swappen, bv. naar `vl-link` |
| `vl-cascader` | vijf vaste items | meer items: melden aan de gebruiker |
| `vl-breadcrumb` | verborgen restlaag `places-home` (absoluut, achteraan in de slot); code kent geen home-optie | niet gebruiken; `vl-cascader` zet zijn eigen home-icoon vooraan |
| `.vl-group` | horizontale `--stretch-children` ontbreekt | — |
| `vl-fieldset` | horizontale varianten: slot staat niet in auto-layout, vult de breedte niet | root naar auto-layout omzetten |
| **Vraagt een beslissing** | | |
| `vl-alert` | `naked` stapelt titel en boodschap, code zet ze inline | samenvoegen breekt tekst-overrides |
| `vl-info-tile` | geen open/dicht-toestand | vraagt een nieuwe variant-as |
| `vl-functional-header` | geen `full-width` bij `size=S` | op mobiel functioneel gelijk |
| `vl-select-rich` | label en placeholder gaan verloren bij een variantwissel | tekst zit in geneste componenten, een property bovenaan kan er niet aan |
| `vl-step`, `vl-pill`, `vl-form-message` | variant-assen mengen code-concepten | herstructureren = reconciliatie |
| 🚧-componenten, `vl-dashboard` | work-in-progress zit in productie-designs | promoveren of expliciet WIP |
| `vl-header`, `vl-functional-header`, `vl-dashboard` | instances verwijzen naar vijf van het canvas verwijderde main components (`↳ SelectBase`, twee `login/logged out/2/…`, `dashboard-content`, `content-sample`) | enkel via script te onderhouden; opnieuw koppelen aan levende componenten |
| **Extern of geblokkeerd** | | |
| `vl-alert` | titel in `size=small` is een 16px-override, geen stijl | Foundations mist de 16px-stijl |
| tokens | `color/text/subtle` is vlak, code gebruikt de transparante grijs | remote collectie; lokaal token `--vl-color--text-subtle` als tussenoplossing |
| typografie | Flanders Art Sans heeft geen Light | `vl-content-header` vraagt 300 |
| **Code of Code Connect** | | |
| `vl-functional-header` | `search?` naast de terug-link of tabs; een knop naast de breadcrumb (patroon "met button") | Code Connect mapt enkel `search?` + `breadcrumb` |
| `vl-info-tile` | `highlight` is een effect style | Code Connect kan styles niet lezen |
| `vl-alert` | banner: titel en boodschap in één tekstlaag, scheidingsteken hard in de tekst | bewuste afweging; Code Connect splitst op de eerste ` - ` |
| `vl-pager` | verbergt zich niet bij één pagina | code |
| `vl-table` | zebrakleuren hardgecodeerd | code, kandidaat voor tokens |
| — | herhaalbaar formulierveld bestaat niet | nieuw component, Figma én code |
| `vl-map` | niet volwaardig in Figma | nieuw werk |
| **Bewust zo gelaten** | | |
| `vl-content-header` | nota over `vl-site-header` op de pagina | blijft: dat component moet nog gemaakt worden |

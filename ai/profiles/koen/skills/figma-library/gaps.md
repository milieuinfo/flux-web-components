# Open gaps — FLUX Figma-library

Wat in Figma of in code nog niet klopt, met de reden waarom het open staat. Een opgeloste gap verdwijnt hier;
een nieuwe is één rij. De werkafspraken en recepten staan in [SKILL.md](SKILL.md).

Stand 2026-10-19.

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
| `vl-popover` | geen `content-padding` (code: standaard `1rem`, ook `none`/`small`/`large`); de 10px zit sinds de update in `vl-popover-action-list`, een slot met eigen tekst heeft dus geen padding | padding op de `content`-slot overriden |
| `vl-breadcrumb` | verborgen restlaag `places-home` (absoluut, achteraan in de slot); code kent geen home-optie | niet gebruiken; `vl-cascader` zet zijn eigen home-icoon vooraan |
| `.vl-group` | horizontale `--stretch-children` ontbreekt | — |
| `vl-fieldset` | horizontale varianten: slot staat niet in auto-layout, vult de breedte niet | root naar auto-layout omzetten |
| **Vraagt een beslissing** | | |
| `vl-alert` | `naked` stapelt titel en boodschap, code zet ze inline | samenvoegen breekt tekst-overrides |
| `vl-functional-header` | geen `full-width` bij `size=S` | op mobiel functioneel gelijk |
| `vl-select-rich` | label en placeholder gaan verloren bij een variantwissel | tekst zit in geneste componenten, een property bovenaan kan er niet aan |
| `vl-step`, `vl-pill`, `vl-form-message` | variant-assen mengen code-concepten | herstructureren = reconciliatie |
| `vl-button` | bij `icon-placement=none` gebruikt geen laag de swap `icon`: kies je daar een icoon en zet je daarna de as op `before`/`after`/`only`, dan komt het icoon zonder kleurstijl binnen en toont het `#333332`. De booleans `icon-placement=before`/`after` met `↪︎ icon left`/`right` werken wel | eerst `icon-placement` kiezen, dan het icoon. Fix getest: de verborgen lagen bij `none` aan `icon` koppelen; maar dan worden `↪︎ icon left`/`right` ongebruikt en vallen bestaande keuzes terug op het standaardicoon |
| `vl-side-navigation-next` | geen `compact`, `child-spacing`, `multi-active` | bewust niet gemodelleerd, staat in de statusnote |
| `vl-rich-data-table` | geen `zebra` | de tabel is slot-inhoud: zebra-rijen van `vl-table` (`table-row variant=zebra`) in de slot zetten |
| `vl-map` | geen `scale-position`: de schaallijn staat altijd linksonder in de infobalk | vraagt een variant-as met vier posities |
| `vl-progress-indicator` | de stappen hebben een vaste breedte: op een smalle instance valt het label van de laatste stap buiten het component | instance breed genoeg houden |
| 🚧-componenten, `vl-dashboard` | work-in-progress zit in productie-designs | promoveren of expliciet WIP |
| `vl-header`, `vl-functional-header`, `vl-dashboard` | instances verwijzen naar vijf van het canvas verwijderde main components (`↳ SelectBase`, twee `login/logged out/2/…`, `dashboard-content`, `content-sample`) | enkel via script te onderhouden; opnieuw koppelen aan levende componenten |
| **Extern of geblokkeerd** | | |
| `vl-alert` | titel in `size=small` is een 16px-override, geen stijl | Foundations mist de 16px-stijl |
| tokens | `color/text/subtle` is vlak, code gebruikt de transparante grijs | remote collectie; lokaal token `--vl-color--text-subtle` als tussenoplossing |
| typografie | Flanders Art Sans heeft geen Light | `vl-content-header` vraagt 300 |
| **Code of Code Connect** | | |
| `vl-functional-header` | `search?` naast de terug-link of tabs; een knop naast de breadcrumb (patroon "met button") | Code Connect mapt enkel `search?` + `breadcrumb` |
| `vl-info-tile` | `highlight` en `highlight-left` zijn een effect style | Code Connect kan styles niet lezen |
| `vl-alert` | banner: titel en boodschap in één tekstlaag, scheidingsteken hard in de tekst | bewuste afweging; Code Connect splitst op de eerste ` - ` |
| `vl-pager` | verbergt zich niet bij één pagina | code |
| `vl-table` | zebrakleuren hardgecodeerd | code, kandidaat voor tokens |
| — | herhaalbaar formulierveld bestaat niet | nieuw component, Figma én code |
| `vl-map` | niet volwaardig in Figma | nieuw werk |
| **Bewust zo gelaten** | | |
| `vl-content-header` | nota over `vl-site-header` op de pagina | blijft: dat component moet nog gemaakt worden |
| `vl-spotlight` | het externe icoon (`external` op `spotlight-container`) staat aan de rechterrand van de titelrij, in code direct achter de titel; de titel is in code onderlijnd, in Figma niet | Figma-beperking: de titel op `Hug` zetten laat lange titels niet meer wrappen |
| `vl-alert` | de boolean `icon` staat standaard aan, terwijl code standaard geen icoon toont | bestaande designs behouden hun icoon; uit is in code geen `icon`-attribuut |

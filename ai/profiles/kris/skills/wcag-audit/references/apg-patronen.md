# Interactiepatronen (ARIA Authoring Practices)

Per patroon: de Flux-componenten die het implementeren, structuur en rollen, states, toetsenbord, focus, typische fouten in web components, en de minimale scenario's voor `--scenarios`. Bron: WAI-ARIA Authoring Practices Guide (APG). Een native HTML-element dat het gedrag al levert, gaat altijd voor op een ARIA-nabouw.

## Inhoud
Button en toggle button · Link · Checkbox · Radiogroep · Switch · Disclosure en accordion · Tabs · Dialoog (modaal) · Combobox · Listbox · Menuknop · Tooltip · Meldingen (alert, status, toast) · Slider · Paginering en kruimelpad · Tabel · Voortgang en laden · Formulierveld met fout

## Button en toggle button
- Flux: vl-button (ook `toggle`), vl-link met `button-as-link`.
- `<button>`; naam uit inhoud, of `aria-label` bij icoonknoppen (icoon zelf `aria-hidden="true"`).
- Enter en Spatie activeren.
- Toggle: `aria-pressed="true|false"`. De naam blijft gelijk bij het wisselen van toestand; anders is het geen toggle maar een knop met wisselende naam.
- Fouten: `div` met `@click`; icoonknop zonder naam; `?aria-pressed` (lege waarde).
- Scenario: focus, Spatie, capture (state gewisseld).

## Link
- Flux: vl-link.
- `<a href>` voor navigatie, `<button>` voor acties. Een link die een actie uitvoert, of een knop die navigeert, geeft verkeerde verwachtingen.
- Enter activeert een link, Spatie niet.
- De naam moet het doel beschrijven in context (2.4.4). "Lees meer" alleen als de context het doel duidelijk maakt.

## Checkbox
- Flux: vl-checkbox.
- Native `<input type="checkbox">`. Custom: `role="checkbox"`, `aria-checked="true|false|mixed"`, `tabindex="0"`.
- **Spatie** schakelt; Enter hoort dat niet te doen.
- Groep: `<fieldset>` met `<legend>`, of `role="group"` met `aria-labelledby`.
- Scenario: focus, Spatie, capture.

## Radiogroep
- Flux: vl-radio-group met vl-radio (elke radio in een eigen shadow root).
- `role="radiogroup"` met naam; radio's met `aria-checked`.
- **Eén tabstop** voor de hele groep: de geselecteerde radio, of de eerste als er niets geselecteerd is.
- Pijltjestoetsen verplaatsen focus **én** selecteren; Spatie selecteert de gefocuste radio.
- Fout in web components: elke radio in een eigen shadow root, waardoor de native groepering wegvalt (DOM-controle `splitRadioGroups`; wandeling toont een tabstop per radio).
- Scenario: focus op de groep, ArrowDown, capture (selectie en focus verschoven), Tab, capture (groep verlaten).

## Switch
- Flux: vl-checkbox met `switch`.
- `role="switch"` met `aria-checked="true|false"`, of `<input type="checkbox" role="switch">`.
- Spatie schakelt (Enter optioneel). Het label verandert niet met de toestand.
- Aan/uit mag niet alleen via kleur zichtbaar zijn (1.4.1).

## Disclosure en accordion
- Flux: vl-accordion.
- Een `<button>` met `aria-expanded="true|false"`; `aria-controls` naar de inhoud is optioneel, en werkt alleen binnen dezelfde root.
- Enter en Spatie schakelen.
- Accordion: elke header is een `<button>` in een kop (`<h3>` of `role="heading"` met `aria-level`). Panelen optioneel `role="region"` met `aria-labelledby`, bij voorkeur niet bij veel panelen.
- Scenario: focus op de knop, Enter, capture (expanded=true, inhoud in de snapshot), Enter, capture.

## Tabs
- Flux: vl-tabs, vl-next-tabs.
- `role="tablist"` met naam; `role="tab"` met `aria-selected="true|false"` en `aria-controls`; `role="tabpanel"` met `aria-labelledby` naar de tab.
- Roving tabindex: actieve tab `tabindex="0"`, andere `-1`. Het tabpanel krijgt `tabindex="0"` als het geen focusbare inhoud heeft.
- Links/Rechts (horizontaal) of Omhoog/Omlaag (verticaal) verplaatsen focus; Home en End naar de uitersten. Automatische activatie bij focus is aanbevolen als panelen direct tonen.
- Tab vanuit de tablist gaat naar het panel, niet naar de volgende tab.
- Fout in web components: `vl-tab` en `vl-tab-panel` in aparte roots, waardoor `aria-controls` en `aria-labelledby` breken (DOM-controle `idrefs`).
- Scenario: focus op de actieve tab, ArrowRight, capture (selected verschoven, juist panel), Tab, capture (focus in panel).

## Dialoog (modaal)
- Flux: vl-modal (native `<dialog>`).
- Bij voorkeur native `<dialog>` met `showModal()`. Anders `role="dialog"` met `aria-modal="true"`, naam via `aria-labelledby` naar de titel, optioneel `aria-describedby`.
- Bij openen: focus naar het eerste zinvolle element; bij lange inhoud naar de titel of het begin (`tabindex="-1"`); bij destructieve acties naar de minst destructieve knop.
- Tab en Shift+Tab blijven binnen de dialoog. Escape sluit. Bij sluiten gaat focus terug naar de trigger. De achtergrond is inert.
- `role="alertdialog"` voor dringende bevestigingen.
- Native `<dialog>`: na de laatste stop gaat de focus naar de browser (`(geen: body of browser)` in het tabpad) en dan terug naar de eerste stop. Dat is verwacht gedrag. Een **lus** in de standaardrun is bij een open dialoog verwacht, bij andere componenten een val (2.1.2).
- Scenario: klik of Enter op de trigger, capture (focus in dialoog, naam), `tab` tot voorbij de laatste knop, capture (terug bij de eerste), Escape, capture (focus op trigger).

## Combobox (bewerkbaar, met listbox)
- Flux: vl-select-rich, vl-autocomplete.
- `<input role="combobox">` met `aria-expanded`, `aria-controls` naar de listbox, `aria-autocomplete` (`list`, `both` of `none`), en `aria-activedescendant` naar de actieve optie. DOM-focus blijft in de input.
- `role="listbox"` met `role="option"` en `aria-selected`.
- Toetsen: ArrowDown opent of gaat naar de volgende optie, ArrowUp naar de vorige, Enter kiest, Escape sluit (een tweede Escape mag de invoer wissen), Alt+ArrowDown opent zonder te verplaatsen.
- **Select-only**: element met `role="combobox"` (geen input) en `tabindex="0"`; Enter, Spatie of ArrowDown opent; typeahead op letters.
- Fouten: listbox in een andere root of in `body` (activedescendant en controls breken), `aria-expanded` niet bijgewerkt, opties zonder naam, het aantal resultaten niet aangekondigd bij filteren.
- Scenario: focus, `type` een deel van een optie, capture (expanded, opties), ArrowDown, capture (activedescendant verwijst naar optie), Enter, capture (waarde, gesloten), Escape.

## Listbox
- `role="listbox"` met naam; `role="option"` met `aria-selected`.
- Eén selectie: pijltjes verplaatsen focus en selectie. Meerdere: `aria-multiselectable="true"`, Spatie schakelt.
- Focus via roving tabindex of `aria-activedescendant` (zelfde root).

## Menuknop
- Flux: vl-popover met vl-popover-action-list (`role="menu"`).
- Knop met `aria-haspopup="menu"` (of `true`), `aria-expanded` en `aria-controls`; `role="menu"` met `role="menuitem"`.
- Enter, Spatie of ArrowDown opent en focust het eerste item; pijltjes bewegen; Escape sluit en zet focus terug op de knop; typeahead.
- **Gebruik `role="menu"` niet voor sitenavigatie.** Screenreaders schakelen naar applicatiemodus en links verliezen hun linksemantiek. Navigatie is een disclosure met gewone links.
- Scenario: focus op de knop, Enter, capture (focus op eerste item), Escape, capture (focus op knop).

## Tooltip
- Flux: vl-tooltip, vl-popover.
- `role="tooltip"`; de trigger verwijst ernaar met `aria-describedby` (zelfde root).
- Verschijnt bij hover **én** focus. Escape sluit zonder de focus te verplaatsen. De pointer kan over de tooltip bewegen zonder dat hij verdwijnt, en hij blijft staan tot de gebruiker weggaat (1.4.13).
- Geen interactieve inhoud in een tooltip: gebruik dan een disclosure of dialoog.
- Scenario: focus op de trigger, capture (beschrijving op de trigger), Escape, capture (tooltip weg, focus blijft); daarnaast `hover`, capture.

## Meldingen (alert, status, toast)
- Flux: vl-alert, vl-toaster.
- `role="status"` (beleefd) voor bevestiging en info; `role="alert"` (dringend) voor fouten.
- De region bestaat vóór de update (zie shadow-dom-lit §6).
- Een toast verdwijnt niet te snel (2.2.1) en steelt geen focus; acties zijn met het toetsenbord bereikbaar.

## Slider
- Flux: vl-input-slider.
- Bij voorkeur `<input type="range">`. Custom: `role="slider"` met `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, en `aria-valuetext` als het getal alleen niet volstaat.
- Pijltjes ±1 stap, PageUp/PageDown grotere stap, Home en End naar de uitersten.
- Slepen vraagt een alternatief met één pointer zonder slepen: klik op de rail of +/−-knoppen (2.5.7).

## Paginering en kruimelpad
- Flux: vl-pager, vl-breadcrumb.
- `<nav>` met naam (`aria-label="Paginering"`, `"Kruimelpad"`); huidige pagina met `aria-current="page"`.
- Vorige en volgende als icoonknop hebben een naam; aan de uiteinden uitgeschakeld of weggelaten.
- Doelgrootte van paginanummers (2.5.8).

## Tabel
- Flux: vl-table, vl-rich-data-table.
- Native `<table>` met `<th scope>` en een `<caption>` of naam. Geen `role="grid"` voor statische data.
- Sorteerbare kolom: `aria-sort` op de actieve `<th>` (`ascending` of `descending`), de sorteeractie is een `<button>` in de header.
- Reflow: de tabel mag in een eigen container horizontaal scrollen, die container is dan focusbaar en heeft een naam.

## Voortgang en laden
- Flux: vl-progress-bar, vl-loader.
- `role="progressbar"` met naam; bepaald met `aria-valuenow`, onbepaald zonder.
- `aria-busy="true"` op een region die bijwerkt; meld het einde via een status.

## Formulierveld met fout
- Flux: de FormControl-componenten (vl-input-field, vl-textarea, vl-select, vl-datepicker, ...) met vl-form-label en vl-form-message.
- Label gekoppeld (zie shadow-dom-lit §2); verplicht via `required` of `aria-required="true"`.
- Fout: `aria-invalid="true"`, de tekst gekoppeld via `aria-describedby` (ruimste ondersteuning; `aria-errormessage` mag erbij), de fout in tekst benoemd (3.3.1) met een suggestie waar mogelijk (3.3.3).
- Een foutmelding die verschijnt zonder focusverplaatsing wordt aangekondigd via een live region (4.1.3).
- Scenario: focus, `type` ongeldige invoer, Tab, capture (invalid, beschrijving bevat de fout), terug naar het veld, capture.

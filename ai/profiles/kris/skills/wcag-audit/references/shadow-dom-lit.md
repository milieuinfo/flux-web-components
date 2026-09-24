# Shadow DOM en Lit: valkuilen voor toegankelijkheid

Checklist voor de code-review. Elke sectie: wat misgaat, hoe je het herkent (in code en in de meting), en de fix.

Flux-basisklassen: `BaseLitElement` (Lit, §7 geldt), `BaseHTMLElement` (HTML-templatestrings, geen Lit-bindingen) en `FormControl` (`FormControlMixin(BaseLitElement)` uit `@open-wc/form-control`: form-associated met `ElementInternals` en `delegatesFocus: true`).

## Inhoud
1. IDREF-relaties over shadow-grenzen
2. Labels en formulierelementen
3. Rol en states: host of intern element
4. Focus
5. Slots en de flattened tree
6. Live regions
7. Lit-bindingen
8. Styling: focus, forced colors, doelgrootte, tekstafstand
9. Het a11y-contract in de documentatie en stories

## 1. IDREF-relaties over shadow-grenzen

`aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-owns`, `aria-activedescendant`, `aria-errormessage`, `aria-details` en `<label for>` zoeken het id **alleen in hun eigen tree** (het document of die ene shadow root). Een verwijzing naar een element in een andere root wordt stil genegeerd.

- **Herkennen:** DOM-controle meldt `andere-root`; in de AX-info ontbreekt de naam of beschrijving; bij een combobox verschijnt `activedescendant` niet in de states.
- **Klassiekers:** een `vl-tab` die met `aria-controls` naar een `vl-tab-panel` wijst; een combobox waarvan de listbox in een apart component of in `body` (portal) staat; een hint of foutmelding die de gebruiker als light DOM meegeeft.
- **Fixes, in volgorde van voorkeur:**
  1. Houd elementen die naar elkaar verwijzen in dezelfde shadow root. Render label, hint en foutmelding in het component, met attributen of slots als bron van de tekst.
  2. Zet de tekst rechtstreeks: `aria-label` of `aria-description` op het interne element, gevoed door een attribuut of door de tekst van een slot (lees die bij `slotchange`).
  3. Element reflection (`el.ariaLabelledByElements = [...]`, `ariaDescribedByElements`, `ariaActiveDescendantElement`) kan naar elementen in omliggende scopes verwijzen, niet naar binnen in een andere shadow root. Controleer de actuele browserondersteuning en scopingregels voordat je hierop bouwt.
  4. "Reference Target" (cross-root ARIA) is nog een voorstel. Bouw er niet op.

## 2. Labels en formulierelementen

Een `<label for>` in de light DOM bereikt geen `<input>` in een shadow root, en een native input in een shadow root hoort niet bij een omringend `<form>`.

- **Robuust patroon:** render het label in de shadow root en laat de tekst via een slot binnenkomen. Tekst in een slot telt mee voor de naam via de flattened tree:
  ```js
  html`<label for="input"><slot name="label">${this.label}</slot></label>
       <input id="input" aria-describedby="hint error" aria-invalid=${this.invalid ? 'true' : 'false'}>
       <div id="hint"><slot name="hint"></slot></div>
       <div id="error" role="status">${this.errorMessage}</div>`
  ```
- **Flux:** `vl-form-label for="x"` rendert zijn `<label for>` in de eigen shadow root, dus die IDREF werkt niet. Het component compenseert: bij elke update zet het zijn `label`-attribuut op het control met `id="x"` (gezocht in de omringende `form` of de parent), en het control zet dat als `aria-label` op de interne input. Een klik op het label focust het control via een listener. Gevolgen: tekst in de slot van `vl-form-label` wordt niet gekopieerd (de AX-naam blijft leeg), en de naam is het label zonder annotatie. Controleer de AX-naam per control.
- **Formulierdeelname:** een form-associated custom element (`static formAssociated = true`, `this.internals = this.attachInternals()`, `setFormValue`, `setValidity`). Let op: een extern `<label for="host-id">` labelt dan de **host**, niet de interne input. Maak ofwel de host het focusbare element met rol via `ElementInternals`, ofwel spiegel de naam naar het interne element.
- **`delegatesFocus: true`** zodat klikken op de host of het label de interne input focust:
  `static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };`
- **Radiogroepen:** native radio's vormen alleen een groep binnen **dezelfde tree**. Elke `vl-radio` met een eigen `<input type="radio" name="x">` geeft losse radio's: elke radio wordt een tabstop en pijltjestoetsen werken niet. De DOM-controle meldt dit enkel als de inputs een `name` hebben; de toetsenbordwandeling meldt opeenvolgende radio-stops altijd. `vl-radio-group` vangt de pijltjestoetsen zelf op: controleer dan nog het aantal tabstops. Fix: laat `vl-radio-group` de radio's in één shadow root renderen, of implementeer `role="radiogroup"`/`role="radio"` met roving tabindex (zie APG).
- **Autocomplete (1.3.5):** stuur `autocomplete`, `name`, `inputmode` en `type` door naar de interne input.
- **Plakken en wachtwoordbeheerders (3.3.8):** blokkeer nooit plakken en laat `autocomplete="current-password"`/`"one-time-code"` door.

## 3. Rol en states: host of intern element

Kies één van twee modellen en meng ze niet:

- **(a) Intern native element draagt de semantiek** (`<button>` in de shadow root), de host is generiek. Meestal de beste keuze: gratis toetsenbordgedrag en states.
- **(b) De host draagt de semantiek** via `ElementInternals`: `this.internals.role = 'switch'; this.internals.ariaChecked = 'true';`. Dan moet de host zelf focusbaar zijn (`tabindex="0"` of via `internals`) en alle toetsen afhandelen. Test in Safari: ARIA-ondersteuning via `ElementInternals` is in alle evergreen browsers aanwezig, maar verschilt in details.

Vermijd:

- Attributen die het component zelf op de host zet (`role`, `aria-*`, "sprouting"): ze botsen met wat de afnemer zet en vervuilen de DOM. Gebruik `ElementInternals`.
- Dubbele semantiek: host met `role="button"` plus een interne `<button>` geeft geneste interactieve elementen en vaak dubbele tabstops.
- `aria-hidden="true"` op de host: dat verbergt ook alle inhoud die via slots binnenkomt.

## 4. Focus

- `document.activeElement` is de buitenste host; het echte element vind je via `shadowRoot.activeElement` (het script doet dat recursief).
- Zet geen `tabindex` op de host als de shadow root al een focusbaar element bevat. De toetsenbordwandeling toont dat als twee opeenvolgende stops.
- `focus()` op de host moet het juiste interne element focussen: `delegatesFocus` of een override van `focus()`.
- Focusstijl: `:focus-visible` binnen de shadow root, of `:host(:focus-within)` voor een indicator rond het hele component.
- **Overlays:** gebruik bij voorkeur een native `<dialog>` met `showModal()`: top layer, inerte achtergrond en Escape zonder eigen code. Zet focus bij openen op het eerste zinvolle element (of de titel met `tabindex="-1"` bij lange inhoud) en zet hem bij sluiten terug op de trigger. De Popover API (`popover`, `popovertarget`) dekt niet-modale lagen.
- **Roving tabindex vs. `aria-activedescendant`:** activedescendant werkt alleen als de input en de opties in dezelfde tree zitten (zie §1). Anders: roving tabindex met echte focus op de opties.

## 5. Slots en de flattened tree

- Naamberekening en leesvolgorde volgen de flattened tree: geslotte inhoud telt mee op de plek van de `<slot>`.
- Een component kan het niveau van een geslot `<h2>` niet aanpassen. Bied een `heading-level`-attribuut aan als het component zelf koppen rendert.
- CSS-herschikking (`order`, `flex-direction: row-reverse`, grid-plaatsing) laat visuele en DOM-volgorde uiteenlopen (1.3.2, 2.4.3).
- `display: contents` op elementen met een rol heeft in sommige browsers de semantiek laten verdwijnen. Controleer in de AX-tree.

## 6. Live regions

- Een live region moet al in de DOM staan vóór de inhoud verandert. Een Lit-conditie die het hele element pas rendert (`${this.error ? html`<div role="status">…` : nothing}`) wordt vaak niet aangekondigd. Render de container altijd en wissel alleen de tekst.
- `role="status"` (beleefd) voor bevestigingen en validatie, `role="alert"` (dringend) alleen voor fouten die meteen aandacht vragen.
- Een toast die vanzelf verdwijnt, raakt 2.2.1; acties erin moeten met het toetsenbord bereikbaar zijn zonder dat de toast focus steelt.

## 7. Lit-bindingen

Lit zet `undefined` en `null` in een attribuutbinding om naar een **lege string**, niet naar een verwijderd attribuut:

| code | resultaat | probleem |
|---|---|---|
| `aria-expanded=${this.open}` met `open` undefined | `aria-expanded=""` | ongeldige waarde, geen state |
| `?aria-pressed=${this.on}` | `aria-pressed=""` als `on` true | lege string is **niet** `true`: state gaat verloren |
| `?aria-hidden=${x}` | `aria-hidden=""` | verbergt niets |
| `` aria-label=${`Sluit ${this.label}`} `` met `label` undefined | `aria-label="Sluit undefined"` | wordt letterlijk voorgelezen |
| `aria-label=${this.label}` met `label` undefined | `aria-label=""` | leeg attribuut; geen naam uit deze bron |

Juist:

```js
import { nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

html`<button
  aria-pressed=${this.on ? 'true' : 'false'}
  aria-expanded=${this.open ? 'true' : 'false'}
  aria-label=${ifDefined(this.label || undefined)}
  aria-describedby=${this.hint ? 'hint' : nothing}>`
```

Flux gebruikt vaak `attr=${x || nothing}` (bv. `aria-invalid=${this.isInvalid || nothing}` in `vl-input-field`). Dat is juist waar een ontbrekend attribuut hetzelfde betekent als `false`. Voor states waar `false` betekenis heeft (`aria-expanded`, `aria-pressed`, `aria-checked`, `aria-selected`) is het fout: gebruik `? 'true' : 'false'`. Let ook op state-properties die als `undefined` starten (`private isOpen: boolean | undefined`): vóór de eerste interactie geven ze een lege waarde.

De DOM-controle meldt lege `aria-*` en waarden met `undefined`, `null` of `[object Object]`.

Verder:

- `@click` op een `div` of `span` is bijna altijd fout: gebruik `<button>`. Anders heb je `role`, `tabindex="0"` en Enter/Space-afhandeling nodig (de pointer-controle meldt kandidaten).
- `?disabled` op de host moet ook het interne native element uitschakelen. Overweeg `aria-disabled="true"` wanneer het element vindbaar moet blijven, en blokkeer dan zelf de activatie.
- Reageer op `click` (of pointer-**up**), niet op `mousedown`/`pointerdown`, tenzij het om slepen gaat (2.5.2).

## 8. Styling: focus, forced colors, doelgrootte, tekstafstand

- **Focusindicator** met minstens 3:1 contrast tegen de aangrenzende kleuren (1.4.11) en niet verborgen door sticky elementen (2.4.11).
- **Forced colors:** `box-shadow` en achtergrondkleuren verdwijnen. Een focusring die enkel uit `box-shadow` bestaat, wordt onzichtbaar. Combineer met een transparante outline, die in forced colors een systeemkleur krijgt:
  ```css
  button:focus-visible { outline: 2px solid transparent; outline-offset: 2px; box-shadow: 0 0 0 3px var(--vl-focus-color); }
  @media (forced-colors: active) { .selected { border: 2px solid Highlight; } svg { fill: currentColor; } }
  ```
  Toestanden die alleen via achtergrondkleur zichtbaar zijn (geselecteerde tab, actieve optie) hebben een extra kenmerk nodig: rand, onderlijn, vinkje.
- **Doelgrootte (2.5.8):** minimaal 24 × 24 CSS px, of voldoende tussenruimte. Kijk vooral naar icoonknoppen (sluiten, wissen, paginering).
- **Tekstafstand (1.4.12):** vermijd vaste hoogtes met `overflow: hidden` op tekstcontainers; gebruik `min-height`. Afkapping met ellips die bij extra tekstafstand inhoud verbergt, is een bevinding tenzij de volledige tekst elders beschikbaar is.
- **Reflow (1.4.10):** geen vaste breedtes boven 320 px; tabellen en code mogen binnen hun eigen container horizontaal scrollen.
- **Beweging:** respecteer `prefers-reduced-motion` voor niet-essentiële animaties.

## 9. Het a11y-contract in de documentatie en stories

- Documenteer in `vl-{naam}.stories-doc.mdx` en de argTypes wat de afnemer moet aanleveren: verplicht label (attribuut of slot), tekst voor icoonknoppen, headingniveau, gekoppelde foutmelding.
- Documenteer het toetsenbordgedrag per component. Afnemers en testers hebben het nodig.
- Stories tonen correct gebruik, inclusief labels. Een story zonder label maakt axe-resultaten onbetrouwbaar en leert afnemers het verkeerde patroon.

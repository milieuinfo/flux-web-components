# FLUX-704 — API/functionaliteit-gap-analyse (VDS vs flux)

Per-component vergelijking van de **publieke API en het gedrag** tussen de VDS
web-componenten (`@govflanders/vl-ui-design-system-web-components` **0.6.0**,
gepinde vendored tarball) en onze eigen flux-componenten (`libs/components/src`).

Dit document gaat NIET over styling of design-tokens: die pariteit is al
uitgewerkt en gedocumenteerd in
[`VDS-UPSTREAM-REQUESTS.md`](VDS-UPSTREAM-REQUESTS.md) (hardgecodeerde CSS-waarden
zonder token/part) en [`FLUX-704-DECISION-LOG.md`](FLUX-704-DECISION-LOG.md). Hier
kijken we enkel naar: properties/attributes, events (`dispatchEvent`/`CustomEvent`),
publieke methods, slots, CSS parts en gedrag (validatie, `formAssociated`,
size/variant-modifiers, focus-beheer, ...).

## Doel

In een eerste versie willen we de flux-API zoveel mogelijk **gelijk houden**. Per
functionaliteit classificeren we daarom de status en de bijhorende actie.

**Status:**
- **overlap**: functionaliteit zit in beide (soms met een andere attribuut-naam of
  API-shape, dat staat dan in de cel vermeld).
- **enkel-VDS**: zit wel in VDS, niet bij ons.
- **enkel-flux**: zit wel bij ons, niet in VDS.

**Actie (volle woorden, geen afkortingen):**
- **API gelijk houden**: overlap, de flux-API kan blijven zoals ze is.
- **flux-API uitbreiden**: kandidaat om onze flux-API in een volgende versie uit te
  breiden of te aligneren.
- **upstream-request (VDS)**: functionaliteit die bij ons zit maar niet in VDS, en
  die we upstream als feature-request kunnen voorstellen.
- **toevoegen in derivative**: toe te voegen in de flux-afgeleide (de `flux-*`
  subclass die de VDS-klasse erft). Waar VDS de functionaliteit al in een base-klasse
  heeft, staat er **(gratis via overerving)**: de afgeleide krijgt ze automatisch
  zodra ze van de VDS-klasse erft.

## Kernpatroon (belangrijk voor het lezen van de tabellen)

De meeste `enkel-VDS`-rijen bij de **form-velden** komen uit één structureel verschil
in de overervingsketen, niet uit losse ontbrekende features:

- **VDS form-velden** (`vl-input`, `vl-textarea`, `vl-select`, `vl-datepicker`,
  `vl-radio-group`) erven van `VlFormLayoutElement`. Die keten
  (`VlFormControlElement` naar `VlFormAssociatedElement` naar de `WithFormLayout`-mixin)
  bundelt automatisch: `disabled`/`success`/`error`/`loading`/`readonly`, `name`/
  `required`/`value`(`defaultValue`)/`placeholder`/`input-id`, en de layout-chrome
  `label`/`annotation`/`indicator`/`message`/`size`/`grow`/`metadata-hidden`/
  `label-hidden`, mét bijhorende slots (`label`, `message`, `annotation`, `indicator`)
  en CSS parts (`container`, `label-container`, `label`, `message`, `annotation`,
  `indicator`). `vl-checkbox` erft van `VlFormAssociatedElement` (zonder layout-chrome);
  `vl-fieldset` erft van `WithFormLayout(VlFormControlElement)` (layout-chrome, maar
  niet form-associated).
- **flux form-velden** erven van `FormControl` (`libs/components/src/form/form-control`,
  op basis van `@open-wc/form-control`). Die geeft: `id`/`name`/`label`/`required`/
  `disabled`/`error`/`success`/`blur-validation`, de events `vl-valid` en `vl-reset`,
  en `resetFormControl()`. Belangrijk verschil: **de foutmelding leeft bij flux BUITEN
  de component**, in een los `vl-form-message`-element dat via `for={id}` + `state`
  gekoppeld wordt. VDS rendert de melding daarentegen intern via de `message`-prop/slot.

Gevolg: zodra een `flux-*` component effectief van de VDS-klasse erft, krijgt hij het
hele `VlFormLayoutElement`-pakket **gratis** (vandaar de vele "toevoegen in derivative
(gratis via overerving)"). De echte productbeslissingen zitten in de rijen met een
**andere shape/naam** (bv. `input-id` vs `id`, `grow=fill` vs `block`, enum `size` vs
losse booleans) en in de `enkel-flux`-rijen (waar we kiezen: upstream-request of in de
derivative houden).

---

## vl-button

VDS `VlButton` erft van `VlElementWithAria` (geen form-base, wel `formAssociated=true`
via `ElementInternals`, `delegatesFocus`). flux `VlButtonComponent` erft van
`BaseLitElement`.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `disabled` | ja | ja | overlap | API gelijk houden |
| `loading` | ja | ja | overlap | API gelijk houden |
| `type` (button/submit/reset) | ja | ja | overlap | API gelijk houden |
| link-rendering als `<a>` | ja (`href`) | ja (`cta-link`) | overlap (andere attr-naam) | toevoegen in derivative (map `cta-link` naar `href`) |
| icoon voor/na label | ja (`icon-before`/`icon-after`) | ja (`icon` + `icon-placement`) | overlap (andere shape) | toevoegen in derivative |
| variant primary/secondary/tertiary/ghost | ja (`variant` enum) | ja (booleans `secondary`/`tertiary`/`ghost`) | overlap (andere shape) | toevoegen in derivative (booleans naar enum) |
| size small/medium/large | ja (`size` enum) | deels (`large` bool, geen small/medium) | overlap (andere shape, `small` ontbreekt) | flux-API uitbreiden |
| `danger` styling | ja | nee (enkel `error`) | enkel-VDS | flux-API uitbreiden |
| `error` styling | ja | ja | overlap | API gelijk houden |
| `success` styling | ja | nee | enkel-VDS | flux-API uitbreiden |
| icon-only knop | ja (`icon-button` prop) | ja (leeg slot + `label`) | overlap (andere API) | toevoegen in derivative |
| grow hug/fill | ja (`grow` enum) | deels (`block` ~ fill) | overlap (andere shape) | toevoegen in derivative |
| `wide` / `narrow` | nee | ja | enkel-flux | upstream-request (VDS) of toevoegen in derivative |
| toggle-knop (`toggle`/`on`/`controlled`) | nee | ja | enkel-flux | toevoegen in derivative |
| `download` (op link) | nee | ja | enkel-flux | toevoegen in derivative |
| `external` (target + rel + icoon) | nee | ja | enkel-flux | toevoegen in derivative |
| `input-group` positionering | nee | ja | enkel-flux | toevoegen in derivative |

### Events

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `vl-click` | ja (detail `{ originalEvent }`) | ja (geen detail) | overlap (andere payload) | API gelijk houden (eventueel detail toevoegen) |
| `vl-toggle` | nee | ja (detail `{ on }`) | enkel-flux | toevoegen in derivative |

### Public methods

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `click()` | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| default (label) | ja | ja | overlap | API gelijk houden |
| `icon-before` / `icon-after` | ja | nee | enkel-VDS | toevoegen in derivative |
| `loading-icon` / `loading-text` | ja | nee | enkel-VDS | flux-API uitbreiden |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `part="button"` | ja | ja | overlap | API gelijk houden |
| `part="link"` | nee (link is ook `part=button`) | ja | enkel-flux | toevoegen in derivative |
| `part="icon"` | nee | ja | enkel-flux | toevoegen in derivative |
| `part` danger/success/loading | ja | nee | enkel-VDS | flux-API uitbreiden |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `formAssociated` (native form via `ElementInternals`) | ja | nee (`closest('form').requestSubmit()`) | overlap (VDS' aanpak robuuster) | API gelijk houden |
| `delegatesFocus` | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

---

## vl-input

VDS `vl-input` erft van `VlFormLayoutElement` (zie kernpatroon). flux `vl-input-field`
erft van `FormControl`.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `type` (default text) | ja | ja | overlap | API gelijk houden |
| `value` | ja (attr `value` = `defaultValue` + `value`-getter) | ja | overlap (lichte shape) | API gelijk houden |
| `placeholder` | ja | ja | overlap | API gelijk houden |
| `readonly` | ja | ja | overlap | API gelijk houden |
| `disabled` / `required` / `name` | ja (base) | ja (base) | overlap | API gelijk houden |
| id-koppeling | ja (`input-id`) | ja (`id`) | overlap (andere naam) | API gelijk houden |
| `label` / `error` / `success` | ja (base) | ja (base) | overlap | API gelijk houden |
| `clearable` (wis-knop) | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `loading` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `size` (enum small/medium/large) | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `grow` (enum hug/fill) | ja (base) | nee (flux `block`) | overlap (andere shape) | toevoegen in derivative |
| `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `message` (inline melding) | ja (base) | nee (los `vl-form-message`) | overlap (ander mechanisme) | toevoegen in derivative (gratis via overerving) |
| `metadata-hidden` / `label-hidden` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `block` (full-width) | nee | ja | enkel-flux (VDS `grow=fill` verwant) | API gelijk houden |
| `autocomplete` | nee (via attr-spread) | ja | enkel-flux | API gelijk houden |
| `min-length` / `max-length` / `min` / `max` / `pattern` | nee (native attr via spread) | ja | enkel-flux | API gelijk houden |
| `min-exclusive` / `max-exclusive` / `regex` (validators) | nee | ja | enkel-flux | API gelijk houden |
| `input-group` | nee (VDS gebruikt prefix/suffix-slots) | ja | enkel-flux | API gelijk houden |
| `blur-validation` | nee | ja (base) | enkel-flux | API gelijk houden |

### Events

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `vl-input` (detail `{ value }`, per toetsaanslag) | ja | ja | overlap | API gelijk houden |
| `vl-change` (detail `{ value }`) | ja (bij commit/native change) | ja (bij elke value-wijziging) | overlap (andere trigger-semantiek) | API gelijk houden |
| `vl-valid` (detail) | nee (native validity) | ja (base) | enkel-flux | API gelijk houden |
| `vl-reset` | nee (native `formResetCallback`) | ja (base) | enkel-flux | API gelijk houden |

### Public methods

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `checkValidity()` / `reportValidity()` | ja (base) | via mixin (niet expliciet geexposet) | overlap | API gelijk houden |
| `formResetCallback()` (native reset) | ja (base) | nee (`resetFormControl`) | overlap (andere shape) | toevoegen in derivative (gratis via overerving) |
| getters `value`/`form`/`validity`/`validationMessage`/`willValidate` | ja (base) | deels (`value`) | enkel-VDS (grotendeels) | toevoegen in derivative (gratis via overerving) |
| `resetFormControl()` | nee | ja (base) | enkel-flux | API gelijk houden |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `prefix` / `suffix` (adornments) | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `label` / `message` / `annotation` / `indicator` | ja (base) | nee (los `vl-form-message`) | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `input` | ja | ja | overlap | API gelijk houden |
| `prefix` / `suffix` / `clear-button` | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `container` / `label-container` / `label` / `message` / `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| wis-knop bij `clearable` (leegt value, herfocust, `vl-change`) | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| prefix/suffix-adornments met id in `aria-describedby` | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `formAssociated` via `ElementInternals` | ja (base) | ja (base, `@open-wc/form-control`) | overlap | API gelijk houden |
| native constraint-validatie (minlength/maxlength/min/max/pattern) | ja (via attr-spread) | ja (declared + validators) | overlap (andere shape) | API gelijk houden |
| programmatische validators + blur-validation-cascade | nee | ja | enkel-flux | API gelijk houden |
| foutmelding via los `vl-form-message` (`for`/`state`) | nee | ja | enkel-flux | API gelijk houden |
| Enter dispatcht form-submit | nee | ja (base) | enkel-flux | API gelijk houden |
| input-group positionering (eerste/laatste kind) | nee | ja | enkel-flux | API gelijk houden |

---

## vl-textarea

VDS `vl-textarea` erft van `VlFormLayoutElement`. flux `vl-textarea` erft van
`FormControl`. Behalve de textarea-specifieke rijen hieronder deelt dit component het
volledige `VlFormLayoutElement`-pakket met `vl-input` (zie daar).

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `resize` (enum none/vertical/horizontal/both, default vertical) | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `loading` / `size` / `grow` / `annotation` / `indicator` / `message` / `metadata-hidden` / `label-hidden` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `value` / `placeholder` / `readonly` / `disabled` / `required` / `name` / `label` / `error` / `success` / id-koppeling | ja (base) | ja (base) | overlap | API gelijk houden |
| `character-count` (ingebouwde teller) | nee (biedt `footnote`-slot) | ja | enkel-flux | upstream-request (VDS) |
| `rows` / `cols` | nee | ja | enkel-flux | upstream-request (VDS) |
| `block` | nee | ja | enkel-flux (VDS `grow=fill` verwant) | API gelijk houden |
| `autocomplete` / `min-length` / `max-length` | nee (via spread) | ja | enkel-flux | API gelijk houden |
| `blur-validation` | nee | ja (base) | enkel-flux | API gelijk houden |

### Events

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `vl-change` (detail `{ value }`) | ja (bij elk input-event) | ja | overlap | API gelijk houden |
| `vl-input` (detail `{ value }`) | nee (textarea dispatcht enkel `vl-change`) | ja | enkel-flux | API gelijk houden |
| `vl-valid` / `vl-reset` | nee (native) | ja (base) | enkel-flux | API gelijk houden |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `footnote` (tekst onder textarea, bv. teller) | ja | nee (ingebouwde teller) | enkel-VDS (verwant aan flux `character-count`) | toevoegen in derivative (gratis via overerving) |
| `label` / `message` / `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `footnote` | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `container` / `label-container` / `label` / `message` / `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `resize`-gedrag (CSS-resize per waarde) | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| ingebouwde tekentelling met `aria-live` (laatste 10 tekens) | nee (footnote-slot) | ja | enkel-flux | upstream-request (VDS) |
| Enter dispatcht GEEN form-submit (`submitFormOnEnter=false`) | n.v.t. | ja (expliciet uitgezet) | enkel-flux | API gelijk houden |
| `formAssociated`, foutmelding via los `vl-form-message`, blur-validation | zie `vl-input` | zie `vl-input` | overlap / enkel-flux | API gelijk houden |

---

## vl-select

VDS `vl-select` erft van `VlFormLayoutElement`. flux `vl-select` erft van `FormControl`.
flux heeft daarnaast een aparte rich-variant (`vl-select-rich`, zoekbaar/multi) die
buiten deze scope valt.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `disabled` / `success` / `error` / `readonly` | ja (base) | ja | overlap | API gelijk houden |
| `loading` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `name` / `required` / `value` / `placeholder` | ja (base) | ja | overlap (VDS splitst `defaultValue`-attr + `value`-getter) | API gelijk houden |
| id-koppeling | ja (`input-id`) | ja (`id`) | overlap (andere naam) | flux-API uitbreiden (naam afstemmen) |
| `label` (zichtbaar) | ja (base, zichtbaar label + slot) | ja (enkel `aria-label`) | overlap (VDS toont label, flux niet) | flux-API uitbreiden |
| `annotation` / `indicator` / `size` / `metadata-hidden` / `label-hidden` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `message` | ja (base, inline) | nee (los `vl-form-message`) | overlap (ander mechanisme) | API gelijk houden |
| `grow` (enum hug/fill) | ja (base) | nee (flux `block`) | overlap (ander concept) | flux-API uitbreiden |
| `clearable` (opt-in wisbaar) | ja (default false) | nee (flux `not-deletable`, opt-out) | overlap (omgekeerde default) | flux-API uitbreiden (inverse afstemmen) |
| `options` (programmatisch model) | nee (enkel geslotte `<option>`) | ja | enkel-flux | API gelijk houden |
| `initial-options` (voor reset) | nee | ja | enkel-flux | API gelijk houden |
| `autocomplete` | nee (via undeclared attrs) | ja | overlap | API gelijk houden |
| `multiple` (multi-select) | nee | nee | (geen van beide) | noteren als gap in beide |
| `blur-validation` | nee | ja (base) | enkel-flux | API gelijk houden |

### Events

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `vl-change` (detail `{ value }`) | ja | ja | overlap | API gelijk houden |
| `vl-input` | nee (re-dispatcht native `input`) | ja (detail `{ value }`) | overlap (andere naam) | flux-API uitbreiden (naam afstemmen) |
| `vl-valid` / `vl-reset` | nee | ja (base) | enkel-flux | API gelijk houden |

### Public methods

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `setCustomValidity(message)` | ja | nee (erft mixin-validatie) | enkel-VDS | flux-API uitbreiden |
| `selectedValue` (get/set) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `selectedIndex` (get/set) | ja | nee (options-model) | enkel-VDS | flux-API uitbreiden |
| `options` (getter) | ja (live `HTMLCollection`) | ja (`SelectOption[]`) | overlap (ander type) | API gelijk houden |
| `selectedOptions` (getter) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `checkValidity()` / `reportValidity()` / `formResetCallback()` | ja (base) | via mixin | overlap | API gelijk houden |
| `resetFormControl()` | nee | ja (base) | enkel-flux | API gelijk houden |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| default (`<option>`/`<optgroup>`) | ja | ja | overlap | API gelijk houden |
| `label` / `message` / `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `select` (inner select) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `clear-button` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `container` / `label-container` / `label` / `message` / `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `formAssociated` via `ElementInternals` | ja | ja (`@open-wc/form-control`) | overlap (ander mechanisme) | API gelijk houden |
| geslotte `<option>` synchroniseren (MutationObserver) | ja | ja | overlap | API gelijk houden |
| grouped options (`<optgroup>`) | ja | ja (default-groep "Overig") | overlap | API gelijk houden |
| `data-alt-label` op option (korte label in trigger) | ja | nee | enkel-VDS | flux-API uitbreiden |
| hug-width meten (auto-breedte naar langste optie) | ja (`grow=hug`) | nee | enkel-VDS | flux-API uitbreiden |
| Enter-in-form triggert submit + blur-validation cascade | nee | ja (base) | enkel-flux | API gelijk houden |

---

## vl-datepicker

VDS `vl-datepicker` erft van `VlFormLayoutElement` en gebruikt onderliggend de
Cally-kalender; flux `vl-datepicker` erft van `FormControl` en gebruikt flatpickr +
cleave-masking. Dit is het component met de **grootste API-divergentie**: VDS heeft
een rijke imperatieve API (methods + open/close-events), flux heeft meer input-types
(range/time) en masking.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `disabled` / `success` / `error` / `readonly` | ja (base) | ja | overlap | API gelijk houden |
| `loading` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `name` / `required` | ja (base) | ja (base) | overlap | API gelijk houden |
| `value` | ja (ISO) | ja (ISO; range met `/`-scheider) | overlap (andere range-encoding) | API gelijk houden |
| `placeholder` | ja (base) | ja | overlap | API gelijk houden |
| id-koppeling | ja (`input-id`) | ja (`id`) | overlap (andere naam) | flux-API uitbreiden |
| `label` / `annotation` / `indicator` / `message` / `size` / `grow` / `metadata-hidden` / `label-hidden` | ja (base) | grotendeels nee (enkel `aria-label`, los `vl-form-message`, `block` i.p.v. `grow`) | enkel-VDS / overlap | toevoegen in derivative (gratis via overerving) |
| `min` / `max` (ISO) | ja (`min`/`max`) | ja (`min-date`/`max-date`) | overlap (andere naam) | flux-API uitbreiden (naam afstemmen) |
| `min-time` / `max-time` | nee (date-only) | ja | enkel-flux | API gelijk houden |
| `type` (date/range/time/date-time) | nee (enkel single date) | ja (default date) | enkel-flux | upstream-request (VDS) voor time/range |
| `format` (display-format) | nee (locale-gedreven Intl) | ja (flatpickr-tokens) | overlap (ander mechanisme) | API gelijk houden |
| `locale` (BCP 47, default nl-BE) | ja | nee (hardcoded nl) | enkel-VDS | flux-API uitbreiden |
| `first-day-of-week` | ja | nee (via flatpickr-locale) | enkel-VDS | flux-API uitbreiden |
| `months` (aantal maanden naast elkaar) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `disabledDates` (Date[]) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `outside-days-hidden` / `today-button-hidden` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `am-pm` (12u-notatie) | nee (geen tijd) | ja | enkel-flux | API gelijk houden |
| `pattern` / `disable-mask-validation` / `raw-value` | nee | ja (mask/cleave) | enkel-flux | API gelijk houden |
| `position` (popover-positie) | nee | ja (default auto) | enkel-flux | API gelijk houden |
| `static` (inline kalender) | nee | ja | enkel-flux | API gelijk houden |
| `anchor-positioning` | nee | ja | enkel-flux | API gelijk houden |
| `block` (full-width) | nee (VDS `grow`) | ja | overlap (ander concept) | API gelijk houden |
| `blur-validation` | nee | ja (base) | enkel-flux | API gelijk houden |

### Events

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `vl-change` | ja (detail `{ value: Date, formattedValue }`) | ja (detail `{ value }`, ISO-string) | overlap (andere detail-shape) | flux-API uitbreiden (detail afstemmen) |
| `vl-input` | ja (ruwe tekst) | ja (ISO-value) | overlap (andere detail-inhoud) | API gelijk houden |
| `vl-open` / `vl-close` | ja | nee (intern `isOpen`) | enkel-VDS | flux-API uitbreiden |
| `vl-focus` / `vl-blur` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `vl-valid` / `vl-reset` | nee | ja (base) | enkel-flux | API gelijk houden |

### Public methods

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `open()` / `close()` | ja | nee (intern `toggleCalendar`) | enkel-VDS | flux-API uitbreiden |
| `clear()` | ja | nee (`resetFormControl`) | enkel-VDS | flux-API uitbreiden |
| `goToDate(date)` / `goToToday()` / `goToPreviousMonth()` / `goToNextMonth()` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `setCustomValidity(message)` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `getRawValue()` / `getDates()` | nee | ja | enkel-flux | API gelijk houden |
| `resetFormControl()` | nee | ja (base) | enkel-flux | API gelijk houden |
| `checkValidity()` / `reportValidity()` / `formResetCallback()` | ja (base) | via mixin | overlap | API gelijk houden |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `label` / `message` / `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `error-message` / `suffix` | ja | nee | enkel-VDS | flux-API uitbreiden |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `input` / `toggle-button` / `calendar` / `input-wrapper` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `container` / `label` (+ overige base-parts) | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| onderliggende kalender-lib | ja (Cally) | ja (flatpickr) | overlap (andere lib) | API gelijk houden |
| manuele tekst-invoer + parsing (dd/mm/yyyy, ISO, ...) | ja | ja (cleave-mask + flatpickr) | overlap (ander mechanisme) | API gelijk houden |
| input-masking tijdens typen | nee | ja (cleave.js) | enkel-flux | API gelijk houden |
| min/max range-validatie op manuele invoer | ja (custom validity) | ja (rangeOverflow/underflow) | overlap | API gelijk houden |
| maand/jaar-select in kalenderheader | ja (twee `vl-select`) | nee (flatpickr eigen header) | overlap (ander UI) | API gelijk houden |
| "Vandaag"-shortcut / meerdere maanden | ja | nee | enkel-VDS | flux-API uitbreiden |
| datumrange-selectie / tijd-selectie | nee | ja (`type=range` / `type=time`) | enkel-flux | upstream-request (VDS) |
| sluiten bij buiten-klik / Escape | ja | ja (flatpickr) | overlap | API gelijk houden |
| Enter-in-form submit + blur-validation cascade | nee | ja (base) | enkel-flux | API gelijk houden |
| `formAssociated` via `ElementInternals` | ja | ja (`@open-wc/form-control`) | overlap | API gelijk houden |

---

## vl-checkbox

VDS `vl-checkbox` erft van `VlFormAssociatedElement` (form-associated, `delegatesFocus`,
geen layout-chrome). flux `vl-checkbox` erft van `FormControl`.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `checked` (reflect) | ja | ja | overlap | API gelijk houden |
| `indeterminate` (reflect) | ja | ja (flux zet native enkel als `!checked`) | overlap | API gelijk houden |
| `value` | ja (`defaultValue`, attr `value`) | ja | overlap (andere shape) | API gelijk houden |
| `name` / `required` / `disabled` / `error` / `success` | ja (base) | ja (base) | overlap | API gelijk houden |
| `label` | ja (eigen prop, in shadow gerenderd) | ja (via default-slot, prop enkel `aria-label`) | overlap (ander mechanisme) | API gelijk houden |
| id-koppeling | ja (`input-id`) | ja (`id`, auto) | overlap (andere naam) | API gelijk houden |
| `readonly` | ja (base) | nee | enkel-VDS | flux-API uitbreiden |
| `loading` | ja (base) | nee | enkel-VDS | flux-API uitbreiden |
| `tile` (kaart-layout) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `label-hidden` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `default-checked` (reset-waarde) | ja | nee (intern snapshot) | enkel-VDS | flux-API uitbreiden |
| `grow` (enum hug/fill, default hug) | ja | nee (flux `block`) | overlap (andere shape) | flux-API uitbreiden |
| `switch` (toggle-variant, `role=switch`) | nee | ja | enkel-flux | upstream-request (VDS) |
| `block` | nee | ja (concept = VDS `grow=fill`) | enkel-flux | API gelijk houden |
| `blur-validation` | nee | ja (base) | enkel-flux | upstream-request (VDS) |

### Events

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `vl-change` | ja (detail `{ value, checked }`) | ja (detail `{ checked, value?, currentTarget }`) | overlap (detail verschilt) | API gelijk houden (detail afstemmen) |
| `vl-input` | nee | ja | enkel-flux | upstream-request (VDS) |
| `vl-valid` | nee (native validity) | ja (base) | enkel-flux | upstream-request (VDS) |
| `vl-reset` | nee (`formResetCallback`) | ja (base) | enkel-flux (ander mechanisme) | API gelijk houden |

### Public methods

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| reset | ja (`formResetCallback`) | ja (`resetFormControl`) | overlap (andere naam) | API gelijk houden |
| `checkValidity()` / `reportValidity()` + validity-getters | ja (base) | via mixin | overlap | API gelijk houden |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| label-content | ja (named `label` slot of prop) | ja (default slot) | overlap (ander mechanisme) | API gelijk houden |
| `prefix` / `suffix` / `content` | ja | nee | enkel-VDS | flux-API uitbreiden |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `input` / `checkbox` / `label` / `label-container` / `tile` / `prefix` / `suffix` / `content` | ja | nee | enkel-VDS | flux-API uitbreiden |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `formAssociated` via `ElementInternals` | ja (native) | ja (`@open-wc/form-control`) | overlap | API gelijk houden |
| `indeterminate` synct naar native input | ja (altijd) | ja (enkel als `!checked`) | overlap (subtiel verschil) | API gelijk houden |
| switch/toggle-render-variant | nee | ja (`role=switch`) | enkel-flux | upstream-request (VDS) |
| tile/card-layout | ja | nee | enkel-VDS | flux-API uitbreiden |
| externe melding via los `vl-form-message` | nee | ja | enkel-flux | API gelijk houden |
| blur-validation-cascade | nee | ja | enkel-flux | upstream-request (VDS) |

---

## vl-radio-group

VDS `vl-radio-group` erft van `VlFormLayoutElement` (met een intern `vl-fieldset`).
flux `vl-radio-group` erft van `FormControl`.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `value` (geselecteerde radio) | ja (`String \| null`) | ja (reflect) | overlap | API gelijk houden |
| `name` / `required` / `disabled` / `error` / `success` / `readonly` | ja (base) | ja | overlap | API gelijk houden |
| `label` | ja (base, zichtbaar) | ja (base, visually-hidden legend) | overlap (andere render) | API gelijk houden |
| id-koppeling | ja (`input-id`) | ja (`id`) | overlap (andere naam) | API gelijk houden |
| `loading` / `annotation` / `indicator` / `size` / `metadata-hidden` / `label-hidden` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `message` | ja (base, inline) | nee (los `vl-form-message`) | overlap (ander mechanisme) | API gelijk houden |
| `grow` (enum hug/fill) | ja (base) | nee (flux `block`) | overlap (andere shape) | flux-API uitbreiden |
| `tiles` (kinderen als tiles) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `block` | nee | ja (concept = VDS `grow=fill`) | enkel-flux | API gelijk houden |
| `blur-validation` | nee | ja (base) | enkel-flux | upstream-request (VDS) |

### Events

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `vl-change` op groepsniveau (detail `{ value }`) | ja | nee (her-dispatcht niet op groepsniveau) | enkel-VDS | flux-API uitbreiden |
| native `input` (form-compatibel) | ja | nee | enkel-VDS | flux-API uitbreiden |
| `vl-valid` op groepsniveau | nee (native validity) | ja (base) | enkel-flux | upstream-request (VDS) |
| `vl-reset` | nee (`formResetCallback`) | ja (base) | enkel-flux (ander mechanisme) | API gelijk houden |

### Public methods

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `focus(options)` (routeert naar checked/eerste enabled radio) | ja | nee (native focus, geen slimme routing) | enkel-VDS | flux-API uitbreiden |
| reset | ja (`formResetCallback`) | ja (`resetFormControl`) | overlap (andere naam) | API gelijk houden |
| `checkValidity()` / `reportValidity()` | ja (base) | via mixin | overlap | API gelijk houden |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| default (`vl-radio`-elementen) | ja | ja | overlap | API gelijk houden |
| `label` / `message` / `annotation` / `indicator` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `container` / `radios` | ja | nee | enkel-VDS | flux-API uitbreiden |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| pijltjes-navigatie (met wrap) + Space selecteert | ja | ja | overlap | API gelijk houden |
| onderlinge exclusiviteit (single-select) | ja | ja | overlap | API gelijk houden |
| roving tabindex (expliciet 0/-1 beheer) | ja | nee (leunt op delegatesFocus) | overlap (VDS grondiger) | flux-API uitbreiden |
| state doorzetten naar kinderen met author-override-tracking | ja (respecteert per-radio ingestelde attrs) | ja (`updateRadiosForAttribute`, simpeler) | overlap (VDS grondiger) | flux-API uitbreiden |
| adopteert waarde van reeds-checked child bij slotchange | ja | deels (snapshot + `checkRadioForValue`) | overlap | API gelijk houden |
| `formAssociated` via `ElementInternals` | ja | ja | overlap | API gelijk houden |

### Sub-item: vl-radio

Zowel VDS (`VlRadio extends VlElementWithAria`) als flux (`VlRadioComponent`, apart
geexporteerd) hebben een losse radio. Belangrijkste API-verschillen buiten de
group-context:

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `checked` | ja (intern `@state`, group beheert) | ja (publieke prop, reflect) | overlap (andere shape) | API gelijk houden |
| `value` / `name` / `label` / `disabled` / `error` / `success` (reflect) | ja | ja | overlap | API gelijk houden |
| `tile` | ja | nee | enkel-VDS | flux-API uitbreiden |
| `grow` (enum hug/fill) | ja | nee (`block`) | overlap (andere shape) | flux-API uitbreiden |
| `readonly` | nee | ja | enkel-flux | upstream-request (VDS) |
| eigen events `vl-change`/`vl-input`/`vl-valid` | nee (radio dispatcht enkel blur/focus; group dispatcht change) | ja (radio dispatcht zelf) | overlap (ander event-model) | API gelijk houden (event-verantwoordelijkheid afstemmen) |
| slots `prefix`/`suffix`/`content` + named `label` | ja | nee (enkel default slot) | enkel-VDS | flux-API uitbreiden |
| `role="radio"` + `aria-checked`/`aria-disabled` beheer | ja (custom role) | nee (native `<input type=radio>` in shadow) | overlap (ander a11y-model) | flux-API uitbreiden (of bewust native houden) |

---

## vl-fieldset

VDS `vl-fieldset` erft van `WithFormLayout(VlFormControlElement)`: layout-chrome, maar
NIET form-associated (geen value/name-submissie). **Belangrijk:** flux `vl-fieldset`
erft van `BaseLitElement`, NIET van `FormControl`. Het mist dus de FormControl-laag
volledig (geen `id`/`name`/`required`/`blur-validation`, geen `vl-valid`/`vl-reset`,
geen `resetFormControl()`). Geen van beide fieldsets dispatcht events (sectie Events
weggelaten).

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| groepslabel | ja (`label`-prop + slot `label`) | ja (slot `legend` + `legend-classes`) | overlap (andere shape) | API gelijk houden |
| `disabled` / `error` / `success` / `readonly` / `loading` | ja (base, propageert naar kinderen) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `annotation` / `indicator` / `message` / `size` / `grow` / `metadata-hidden` / `label-hidden` | ja (base) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `validation-propagation-blocked` / `disabled-propagation-blocked` | ja (fieldset-eigen) | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| `border` (tekent kader) | nee | ja | enkel-flux | upstream-request (VDS) |
| `horizontal` (`vl-grid`-layout) | nee | ja | enkel-flux | upstream-request (VDS) |
| `legend-classes` (extra classes op legende) | nee | ja (default `vl-column--4`) | enkel-flux | upstream-request (VDS) |

### Public methods

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `propagateStateToChildren()` / `slottedElements` (getter) | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| default (form-controls) | ja | ja | overlap | API gelijk houden |
| labelslot | ja (`label`) | ja (`legend`) | overlap (andere naam) | flux-API uitbreiden (naam afstemmen) |
| `message` / `annotation` / `indicator` | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `fieldset` / `label-container` / `label` / `content` / `message` / `annotation` / `indicator` | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| state-propagatie naar slotted kinderen (`disabled`/`readonly`/`error`/`success`) | ja | nee | enkel-VDS | toevoegen in derivative (gratis via overerving) |
| klik op legende focust eerste focusbare form-control | nee | ja | enkel-flux | upstream-request (VDS) |
| verborgen native `<legend>` + zichtbare `vl-form-label` als legende | nee | ja | enkel-flux | upstream-request (VDS) |
| console-warn bij lege legende | ja (dev-warn) | ja (dev-warn) | overlap | API gelijk houden |
| base-class | `WithFormLayout(VlFormControlElement)` | `BaseLitElement` (geen FormControl-laag) | overlap-verschil | flux-API uitbreiden |

---

## vl-icon

VDS `vl-icon` erft van `VlElementWithAria` (aria-delegatie). flux `vl-icon` erft van
`BaseLitElement`.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `icon` (identifier) | ja (reflect, gevalideerd tegen enum met dev-warn) | ja (getypeerd, geen runtime-validatie) | overlap (VDS voegt reflect + dev-warn toe) | API gelijk houden |
| icoongrootte | ja (`size` enum small/medium/large) | ja (booleans `small` + `large`) | overlap (andere shape) | flux-API uitbreiden (enum overwegen) |
| `tag` (wrapper-element, default `i`, gevalideerd) | ja | nee (altijd `span`) | enkel-VDS | flux-API uitbreiden |
| `rotated-half` / `rotated-full` (rotatie) | ja | nee | enkel-VDS | flux-API uitbreiden |
| toegankelijk label | ja (native `aria-label` via delegatie, zet `role=img`) | ja (eigen `label`-prop, zet `aria-label` + `role=img`) | overlap (andere naam) | flux-API uitbreiden (naar `aria-label` afstemmen) |
| `right-margin` / `left-margin` | nee | ja | enkel-flux | upstream-request (VDS) |
| `clickable` (DEPRECATED, niet-WCAG) | nee | ja (gedeprecieerd) | enkel-flux | flux-API uitbreiden (uitfaseren, niet naar VDS) |
| `light` (lichte kleurvariant) | nee | ja | enkel-flux | upstream-request (VDS) (leunt tegen styling aan) |

### Slots

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| default (inline SVG custom icoon, schakelt font-glyph uit) | ja | nee (enkel font-glyph) | enkel-VDS | flux-API uitbreiden |

### CSS parts

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `icon` | ja | ja | overlap | API gelijk houden |

### Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| `aria-hidden=true` als geen label/content | ja | ja | overlap | API gelijk houden |
| dev-warn bij ongeldige `icon`-waarde | ja | nee | enkel-VDS | flux-API uitbreiden |
| validatie/whitelisting van wrapper-tag | ja (`validateTag`, fallback `i`) | nee | enkel-VDS | flux-API uitbreiden |
| deprecation-warn op `clickable` | nee | ja | enkel-flux | flux-API uitbreiden (uitfaseren) |

---

## vl-title

**Er bestaat geen VDS `vl-title` web-component.** VDS levert enkel typografie-tokens
(geen component). De VDS-kolom is daarom overal "nee", de status overal `enkel-flux`,
en de actie "n.v.t. (geen VDS-component)". Voor de token/typografie-kant, zie
[`VDS-UPSTREAM-REQUESTS.md`](VDS-UPSTREAM-REQUESTS.md). flux `vl-title` erft van
`BaseLitElement`.

### Properties / attributes

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| heading-niveau (`type` h1..h6, default h1) | nee (geen component) | ja (rendert het heading-element) | enkel-flux | n.v.t. (geen VDS-component) |
| `underline` | nee | ja | enkel-flux | n.v.t. (geen VDS-component) |
| `no-space-bottom` | nee | ja | enkel-flux | n.v.t. (geen VDS-component) |
| `alt` (alt-styling) | nee | ja | enkel-flux | n.v.t. (geen VDS-component) |
| `appearance` (h1..h6, visueel los van semantiek) | nee | ja | enkel-flux | n.v.t. (geen VDS-component) |

### Slots / CSS parts / Gedrag

| functionaliteit | in VDS? | in flux? | status | actie |
|---|---|---|---|---|
| default slot (titeltekst) | nee | ja | enkel-flux | n.v.t. (geen VDS-component) |
| heading-part (`h1`..`h6`) | nee | ja | enkel-flux | n.v.t. (geen VDS-component) |
| semantisch heading-element via `type`, styling los via `appearance` | nee | ja | enkel-flux | n.v.t. (geen VDS-component) |

---

## Samenvatting per actie

De rode draad over de 11 componenten:

- **API gelijk houden (grootste groep):** de kern-form-API (`disabled`, `required`,
  `name`, `value`, `error`/`success`, `label`, `vl-change`/`vl-input`, `formAssociated`)
  overlapt in beide richtingen. Attribuut-namen verschillen soms (`input-id` vs `id`),
  maar de semantiek is gelijk. Dit blijft.
- **toevoegen in derivative (gratis via overerving):** het hele
  `VlFormLayoutElement`-pakket (`loading`, `size`, `grow`, `annotation`, `indicator`,
  `message`, `metadata-hidden`, `label-hidden` + hun slots en parts) is bij flux nu
  afwezig, maar valt gratis binnen zodra de `flux-*` component effectief van de
  VDS-klasse erft. Idem `clearable` (input), `resize`/`footnote` (textarea), tile/
  state-propagatie (fieldset), `click()`/`delegatesFocus` (button).
- **flux-API uitbreiden (product-keuzes):** de rijen met een andere shape/naam die we
  actief moeten aligneren: enum `size` vs losse booleans (button, icon, link), enum
  `grow=fill` vs `block` (alle form-velden), `input-id` vs `id` (select/datepicker),
  en de rijke datepicker-API (`open()`/`close()`/`goToDate()`, `vl-open`/`vl-close`,
  `locale`, `months`, `disabledDates`).
- **upstream-request (VDS):** functionaliteit die bij ons zit en die VDS nog niet
  heeft: `character-count`/`rows`/`cols` (textarea), `switch`-variant (checkbox),
  `type=range`/`type=time` (datepicker), `border`/`horizontal`/`legend-classes`
  (fieldset), `right-margin`/`left-margin`/`light` (icon).
- **Geen VDS-tegenhanger:** `vl-title` (VDS heeft geen title-component, enkel tokens).

### Openstaande onzekerheden (uit de bronanalyse)

- **flux `vl-fieldset`** erft van `BaseLitElement`, niet van `FormControl`. Het mist de
  hele FormControl-laag. Bij overname van de VDS-fieldset verdwijnt dat verschil, maar
  vandaag is de flux-fieldset dus minder "form-bewust" dan de VDS-variant.
- **VDS `value`/`defaultValue`-splitsing** (attr `value` = default, getter `value` =
  live): de exacte getter/setter-namen komen uit de base-klasse
  `VlFormAssociatedElement`, niet uit elk component-bestand apart geverifieerd.
- **flux `vl-datepicker` `raw-value`**: staat in `properties()` maar zonder backing-veld
  of default; mogelijk half-geimplementeerd.
- **VDS `readonly` op radio-group**: geerfd, maar de keydown/click-logica checkt enkel
  `disabled`. Onduidelijk of `readonly` er meer dan visueel is.
- **flux `character-count` vs VDS `footnote`-slot**: als verwant behandeld (automatische
  teller vs generieke slot), maar niet identiek.
- **flux `block` vs VDS `grow=fill`**: als verwant concept behandeld (full-width), niet
  als exacte 1-op-1.

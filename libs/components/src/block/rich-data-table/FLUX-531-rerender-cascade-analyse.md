# FLUX-531 — Analyse: re-render-cascade in `vl-rich-data-table`

**Type:** onderzoeks-/beslisdocument (geen code-wijziging)
**Aanleiding:** JUBEL rapporteert dat één checkbox-klik in een selecteerbare `vl-rich-data-table` de volledige tabel herbouwt; bij grote datasets verschijnt het vinkje pas merkbaar laat.
**Scope (comment Kris Speltincx, 2026-03-12):** oorzaak en oplossing uitzoeken, afwegen of een fix in de bestaande component de moeite is, en de kennis meenemen naar de nieuwe tabel-component — niet zomaar een fix doorvoeren.

## 1. Root cause

De cascade is een samenspel van meerdere lagen. De "Lit-update per cel" uit de ticket-description zit in JUBEL's eigen wrapper, maar de library versterkt het probleem structureel.

### 1.1 Elke nieuwe `data`-array-referentie triggert een volledige body-rebuild

`set data` in `vl-rich-data-table.component.ts:72-85` delegeert eerst naar de base-setter en vergelijkt daarna de vorige met de nieuwe `data.data`-referentie; bij élke nieuwe array roept het `_renderBody()` aan:

```ts
set data(object: RichData) {
    const previousData = this.data ? this.data.data : undefined;
    super.data = object;
    const hasNewData = previousData !== this.data.data;
    if (hasNewData) {
        try {
            this._validate(this.data.data);
            this._renderBody();
        } catch (error) {
            if (this._data) this._data.data = [];
            throw error;
        }
    }
}
```

De base `set data` (`vl-rich-data/vl-rich-data.component.ts:128-137`) vergelijkt enkel het wrapper-object (`this._data !== object`) en draait bij élke nieuwe object-referentie bovendien `__processContent()` — dat werk komt dus bovenop de body-rebuild van de subclass. De vergelijking is in beide lagen puur referentieel — er is geen rij-niveau diffing.

Consumers die selectie immutable bijhouden (JUBEL's `selectedItems.map(...)` → nieuwe data-array) leveren per klik een nieuwe array-referentie aan en triggeren dus telkens een volledige rebuild.

### 1.2 `_renderBody` gooit de hele `<tbody>` weg en herbouwt cel-per-cel

`_renderBody` (`vl-rich-data-table.component.ts:270-282`):

```ts
__tableBody.innerHTML = '';
this.data.data.forEach((rowData) => {
    const rowTemplate = this._template(`<tr></tr>`).firstElementChild;
    this.__richDataFields.map((field) => {
        rowTemplate?.appendChild(field.valueTemplate(rowData));
    });
    __tableBody.appendChild(rowTemplate!);
});
```

`innerHTML = ''` + opnieuw opbouwen is O(rijen × kolommen) DOM-creatie per update. Er is geen node-hergebruik, geen keyed diffing. Dit is de kern van de "delay": de browser herbouwt en herlayout de hele tabel voordat het ene gewijzigde vinkje zichtbaar wordt.

### 1.3 Per cel een template via `new Function(...)`

`__getValueContentElement` (`vl-rich-data-field.component.ts:183-199`) evalueert voor slot-content per cel een template via de Function-constructor:

```ts
const template = ((literal, item) => new Function('item', 'return `' + literal + '`')(item))
    .call(this, literal, data);
```

Bij een volledige rebuild gebeurt dit voor élke cel opnieuw — onnodig duur, en een CSP-risico: dit faalt onder een `unsafe-eval`-restrictie.

### 1.4 Geen native selectie-API → selectie ís een data-mutatie

Er is geen ingebouwde selectie. Zowel consumers als de eigen story-util moeten selectie via `data` modelleren:

- **"Selecteer alles"** (`stories/vl-rich-data-table-selectable.stories-util.ts:30-36`) her-toewijst de volledige `data` met een nieuwe array → volledige rebuild via 1.1/1.2.
- **Individuele checkbox** (`stories/vl-rich-data-table-selectable.stories-util.ts:80-82`) muteert `rowData.selected` **in place** en wijst `data` níet opnieuw toe — precies om de rebuild te omzeilen. Dat het team dit al zo schreef, bevestigt dat het rebuild-probleem bekend was.

### 1.5 Accessibility-neveneffect

`innerHTML = ''` vernietigt de bestaande nodes en dus ook de focus: een gefocuste checkbox verliest focus bij een toggle die een rebuild triggert. Elke eventuele fix moet focus-behoud verifiëren.

## 2. Afweging: fixen vs. meenemen naar nieuwe component

`vl-rich-data-table` is **geen Lit-component** maar een imperatieve `BaseHTMLElement`-afstammeling (via `VlRichData`). Een degelijke fix betekent met de hand een reconciliatie-/diff-mechanisme bouwen dat een framework normaal gratis levert.

Context die de afweging stuurt (deels open, zie §4):
- JUBEL heeft zichzelf al gedeblokkeerd (MR 258: gewone `<table>` i.p.v. `vl-rich-data-table`) → geen acute consumer-druk.
- Er is een initiatief "nieuwe tabel-component" (comment 2026-03-12, nog geen ticket-key bekend). Timing daarvan bepaalt of een tussentijdse fix loont.

### Optie A — Analyse + beslisdocument, geen code (dit document)
- **Effort:** klein (dit document).
- **Risico:** nul regressie.
- **Voor:** exact wat de comment vraagt; geen verspilde effort in een mogelijk te vervangen component.
- **Tegen:** andere consumers houden het trage gedrag tot de nieuwe component er is; "klaar" is een advies, geen meetbare winst.

### Optie B — Backwards-compatible fix: rij-niveau diffing in `_renderBody`
Vervang de `innerHTML = ''`-rebuild door incrementele reconciliatie: hergebruik bestaande `<tr>` per index, vervang alleen rijen waarvan de rowData-referentie wijzigde (cache laatst gerenderde rowData per rij). Publieke API ongewijzigd.
- **Effort:** M. Niet triviaal: `renderer`-cellen dragen listeners/state; node-hergebruik na sortering/paging kan stale state tonen → strikt enkel hergebruiken bij identieke rowData-referentie.
- **Voor:** lost O(n)-rebuild op zonder API-wijziging (semver-veilig); helpt álle consumers; diff-kennis herbruikbaar in nieuwe component.
- **Tegen:** consumers die volledig immutable updaten (élk row-object nieuw, zoals JUBEL's `map(...)` en "selecteer alles") winnen weinig — elke rij heeft dan toch een nieuwe referentie. Investering in mogelijk end-of-life component.

### Optie C — Additieve native selectie-API
Opt-in `selectable`-attribute + `vl-selection-change`-event + `selection`-property; de component rendert zelf de checkbox-kolom en houdt selectie-state bij, zonder dat consumers `data` her-toewijzen.
- **Effort:** L (grootste van de drie).
- **Voor:** pakt de architecturale oorzaak aan — selectie hoort geen data-mutatie te zijn; per klik wordt alleen de aangeklikte checkbox geüpdatet. Volledig additief.
- **Tegen:** grootste investering in een te vervangen component; nieuwe publieke API creëert een migratie-verplichting richting de nieuwe component. Staat haaks op de geest van de comment.

### Aanbeveling
**Optie A.** Conform de comment is dit een analyse-opdracht. Optie B en C blijven gewogen alternatieven; of een ervan alsnog wordt uitgevoerd is een PO/team-beslissing, afhankelijk van de timing van de nieuwe tabel-component en of er naast JUBEL nog consumers met grote/selecteerbare datasets zijn.

## 3. Eisen voor de nieuwe tabel-component

Lessen uit deze root cause, als input voor de analyse van de nieuwe component:

1. **Keyed/diffed rendering.** Geen `innerHTML = ''`-rebuilds. Update per rij/cel op basis van een stabiele key; behoud bestaande DOM-nodes (en daarmee focus) wanneer een rij ongewijzigd is.
2. **First-class selectie-API.** Selectie als eigen state + event, niet als data-mutatie. Eén checkbox-toggle mag enkel die ene checkbox updaten, nooit de hele tabel.
3. **Immutable-update-vriendelijk.** Een nieuwe data-array mag geen volledige O(n) DOM-herbouw forceren; de performante weg mag niet "in place muteren" zijn (zoals nu in de story-util).
4. **Geen function-constructor templates.** Cel-rendering CSP-veilig houden (`unsafe-eval`-proof); declaratieve templating (Lit) i.p.v. `new Function(...)`.
5. **Focus-behoud bij updates.** Toggle/sort/paging mag de focus niet weggooien (WCAG 2.1 AA).
6. **Referentie-semantiek expliciet maken.** Documenteer of consumers immutable dan wel in-place mogen updaten.

## 4. Open vragen (bepalen de uitkomst van de afweging)

- Bestaat er al een ticket/epic voor de nieuwe tabel-component, en wat is de verwachte timing?
- Zijn er naast JUBEL nog teams die `vl-rich-data-table` met grote/selecteerbare datasets gebruiken (urgentie)?
- Is er een performance-target (bv. checkbox-toggle visueel < 100 ms bij 500 rijen) waartegen een eventuele fix gevalideerd moet worden?

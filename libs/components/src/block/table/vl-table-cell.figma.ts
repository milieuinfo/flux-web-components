// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=646-1819
// source=libs/components/src/block/table/vl-table.component.ts
// component=VlTableComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// `table-cell` is geen web component: een tabelcel is gewone HTML (<td> of <th>) binnen het <table> van <vl-table>.
// De Figma-as `variant` combineert vier dingen; enkel het celtype en de statuskleur hebben een code-equivalent:
// - `heading*`: een header-cel → <th>. Het onderscheid tussen een kolomkop (`heading`) en een rijkop
//   (`heading - row`) zit in code niet in de tag of een klasse, maar in de plaatsing (<thead> vs <tbody>);
//   de story "vl-table - joined row titles" zet daar `scope="rowgroup"` bij, wat geen Figma-property is.
// - `grid` en `zebra`: tabelbrede stijlen (attributen `grid` / `zebra` op <vl-table>), geen cel-klasse.
// - `success` / `warning` / `error` / `disabled`: wél cel-klassen (`vl-table--success`, ...), zie
//   vl-table.css.ts (`tbody td.vl-table--...`) en de story "vl-table - row styling".
const variant: { tag?: string; stateClass?: string } =
    instance.getEnum('variant', {
        default: { tag: 'td', stateClass: '' },
        grid: { tag: 'td', stateClass: '' },
        zebra: { tag: 'td', stateClass: '' },
        'zebra - grid': { tag: 'td', stateClass: '' },
        heading: { tag: 'th', stateClass: '' },
        'heading - grid': { tag: 'th', stateClass: '' },
        'zebra - heading': { tag: 'th', stateClass: '' },
        'zebra - heading - grid': { tag: 'th', stateClass: '' },
        'heading - row': { tag: 'th', stateClass: '' },
        'zebra - heading - row': { tag: 'th', stateClass: '' },
        success: { tag: 'td', stateClass: ' class="vl-table--success"' },
        warning: { tag: 'td', stateClass: ' class="vl-table--warning"' },
        error: { tag: 'td', stateClass: ' class="vl-table--error"' },
        disabled: { tag: 'td', stateClass: ' class="vl-table--disabled"' },
    }) ?? {};

// De `table cell`-slot bevat de inhoud van de cel.
const tableCell = instance.getSlot('table cell');

export default {
    example: figma.code`<${variant.tag}${variant.stateClass}>${tableCell}</${variant.tag}>`,
    id: 'vl-table-cell',
    metadata: { nestable: true },
};

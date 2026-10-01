// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=646-1819
// source=libs/components/src/block/table/vl-table.component.ts
// component=VlTableComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// `table-cell` is geen web component: een tabelcel is gewone HTML (<td> of <th>) binnen het <table> van <vl-table>.
// De Figma-as `variant` combineert vier dingen; enkel het celtype en de statuskleur hebben een code-equivalent:
// - `heading*`: een header-cel → <th>. Een kolomkop (`heading`) krijgt `scope="col"`, een rijkop (`heading - row`)
//   `scope="row"`, zodat een schermlezer weet bij welke cellen de kop hoort. De story "vl-table - joined row
//   titles" gebruikt `scope="rowgroup"`; dat is geen Figma-property en moet de developer zelf zetten.
// - `grid` en `zebra`: tabelbrede stijlen (attributen `grid` / `zebra` op <vl-table>), geen cel-klasse.
// - `success` / `warning` / `error` / `disabled`: wél cel-klassen (`vl-table--success`, ...), zie
//   vl-table.css.ts (`tbody td.vl-table--...`) en de story "vl-table - row styling".
// Een bestand met een oudere versie van de library kan de as missen; `getEnum` geeft dan een foutobject terug, zonder
// `tag`. De cel valt dan terug op <td>.
const variantValue: { tag?: string; scope?: string; stateClass?: string } =
    instance.getEnum('variant', {
        default: { tag: 'td', stateClass: '' },
        grid: { tag: 'td', stateClass: '' },
        zebra: { tag: 'td', stateClass: '' },
        'zebra - grid': { tag: 'td', stateClass: '' },
        heading: { tag: 'th', scope: 'col', stateClass: '' },
        'heading - grid': { tag: 'th', scope: 'col', stateClass: '' },
        'zebra - heading': { tag: 'th', scope: 'col', stateClass: '' },
        'zebra - heading - grid': { tag: 'th', scope: 'col', stateClass: '' },
        'heading - row': { tag: 'th', scope: 'row', stateClass: '' },
        'zebra - heading - row': { tag: 'th', scope: 'row', stateClass: '' },
        success: { tag: 'td', stateClass: ' class="vl-table--success"' },
        warning: { tag: 'td', stateClass: ' class="vl-table--warning"' },
        error: { tag: 'td', stateClass: ' class="vl-table--error"' },
        disabled: { tag: 'td', stateClass: ' class="vl-table--disabled"' },
    }) ?? {};
const variant = {
    tag: variantValue.tag ?? 'td',
    scope: variantValue.scope ? ` scope="${variantValue.scope}"` : '',
    stateClass: variantValue.stateClass ?? '',
};

// De `table cell`-slot bevat de inhoud van de cel.
const tableCell = instance.getSlot('table cell');

export default {
    example: figma.code`<${variant.tag}${variant.scope}${variant.stateClass}>${tableCell}</${variant.tag}>`,
    id: 'vl-table-cell',
    metadata: { nestable: true },
};

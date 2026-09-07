// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=646-2477
// source=libs/components/src/block/table/vl-table.component.ts
// component=VlTableComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// `table-row` is geen web component: een tabelrij is gewone HTML (<tr>) binnen het <table> van <vl-table>.
// De Figma-as `variant` mengt drie soorten informatie:
// - `heading` / `heading - grid`: een rij in <thead>. In code is dat geen klasse op de <tr> maar de plaatsing
//   in <thead>; het grid-uitzicht komt van het `grid`-attribuut op <vl-table>.
// - `grid` / `zebra`: tabelbrede stijlen (attributen `grid` / `zebra` op <vl-table>), geen rij-klasse.
// - `success` / `warning` / `error` / `disabled`: wél rij-klassen (`vl-table--success`, `vl-table--warning`,
//   `vl-table--error`, `vl-table--disabled`), zie de story "vl-table - row styling" en vl-table.css.ts.
const variant = instance.getEnum('variant', {
    default: '',
    zebra: '',
    heading: '',
    'heading - grid': '',
    grid: '',
    success: ' class="vl-table--success"',
    warning: ' class="vl-table--warning"',
    error: ' class="vl-table--error"',
    disabled: ' class="vl-table--disabled"',
});

// De `table row`-slot bevat de cellen van de rij (<td> / <th>).
const tableRow = instance.getSlot('table row');

export default {
    example: figma.code`<tr${variant}>
    ${tableRow}
</tr>`,
    id: 'vl-table-row',
    metadata: { nestable: true },
};

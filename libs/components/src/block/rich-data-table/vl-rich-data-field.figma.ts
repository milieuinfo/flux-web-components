// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=171-48885
// source=libs/components/src/block/rich-data-table/vl-rich-data-field.component.ts
// component=VlRichDataField
// unmapped: size
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De kopcel zit in Figma in de titelrij van vl-table, maar sorteren bestaat enkel in vl-rich-data-table: die
// rendert de kop zelf uit de velden. Een sorteerbare kop hoort dus bij een vl-rich-data-field, niet bij een
// handgeschreven <th>. De sorteerklassen in vl-table.css.ts worden nergens gebruikt.
//
// Bewust niet gemapt:
// - `size` (L / S): de kop volgt de tabel, er is geen attribuut per kolom.
// - `sort function`: in Figma kies je daar het pijlicoon; in code volgt het icoon uit de richting.
// - `name` en `selector` (verplicht in code) hebben geen Figma-tegenhanger en blijven leeg.
const sorting: { sortable?: boolean; direction?: string } =
    instance.getEnum('Type', {
        default: {},
        // `sortable` is de gesorteerde kolom, oplopend; zonder richting sorteert de tabel nog op niets.
        sortable: { sortable: true, direction: 'asc' },
        'sortable - desc': { sortable: true, direction: 'desc' },
        'sortable - unsorted': { sortable: true },
    }) ?? {};

// De kolomtitel zit in de tekstlaag "↳ Titel".
const titleLayer = instance.findText('↳ Titel');
const label = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';

export default {
    example: figma.code`<vl-rich-data-field name="..." label="${label}" selector="..."${
        sorting.sortable ? ' sortable' : ''
    }${sorting.direction ? ` sorting-direction="${sorting.direction}"` : ''}></vl-rich-data-field>`,
    id: 'vl-rich-data-field',
    metadata: { nestable: true },
};

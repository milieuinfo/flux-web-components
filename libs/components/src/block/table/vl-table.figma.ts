// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=171-47628
// source=libs/components/src/block/table/vl-table.component.ts
// component=VlTableComponent
// unmapped: size
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `Property` combineert de stijlvariant (grid/matrix/zebra) met de keuze "slots":
// de slots-varianten vullen de rijen via de `table`-slot, de andere tonen vaste voorbeeldtekst.
// In code is dat verschil er niet: de tabelinhoud is altijd het geneste <table>-element.
const property: { grid?: boolean; matrix?: boolean; zebra?: boolean } =
    instance.getEnum('Property', {
        Default: {},
        Grid: { grid: true },
        Matrix: { matrix: true },
        Zebra: { zebra: true },
        slots: {},
        'slots - grid': { grid: true },
        'slots - matrix': { matrix: true },
        'slots - zebra': { zebra: true },
    }) ?? {};

// De Figma-as `size` (M/S) heeft geen code-equivalent: vl-table kent geen size-attribuut.
// De booleans `title row?` (de <thead>), `• leading slot` en `trailing slot •` (extra cellen met
// checkbox/knop) en `Source reference?` (bronvermelding onder de tabel) zijn in code gewone
// HTML-inhoud van de tabel of vallen erbuiten; ze worden niet als attribuut gemapt.
// `hover`, `flux-zebra` en `collapsed-m/s/xs` bestaan enkel in code.
const hasTitle = instance.getBoolean('title?');
const titleLayer = instance.findText('↳ Title/Caption table');
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';
const caption = hasTitle ? `<caption>${title}</caption>` : '';

// De `table`-slot bevat de tabelrijen (enkel gevuld bij de slots-varianten).
const table = instance.getSlot('table');

export default {
    example: figma.code`<vl-table${property.grid ? ' grid' : ''}${property.matrix ? ' matrix' : ''}${property.zebra ? ' zebra' : ''}>
    <table>
        ${caption}
        <tbody>
            ${table}
        </tbody>
    </table>
</vl-table>`,
    id: 'vl-table',
    metadata: { nestable: false },
};

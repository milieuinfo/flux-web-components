// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=560-49139
// source=libs/components/src/block/tooltip/vl-tooltip.component.ts
// component=VlTooltipComponent
// unmapped: Content
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `Placement` komt overeen met het attribuut `placement`; `bottom` is de default in code.
const placement: { placement?: string } =
    instance.getEnum('Placement', {
        bottom: {},
        top: { placement: 'top' },
        left: { placement: 'left' },
        right: { placement: 'right' },
    }) ?? {};

// De Figma-as `Content` (Default/Large) toont enkel een korte of lange voorbeeldtekst
// en heeft geen code-equivalent. `hide-arrow`, `distance`, `strategy`, `type` en `open`
// bestaan enkel in code.
// De tooltiptekst zit in de tekstlaag "↳ Text" en hangt niet aan een component-property.
// `for` (id van het trigger-element) is verplicht in code maar zit niet in Figma; het blijft leeg.
const textLayer = instance.findText('↳ Text');
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<vl-tooltip for=""${placement.placement ? ` placement="${placement.placement}"` : ''}>${text}</vl-tooltip>`,
    id: 'vl-tooltip',
    metadata: { nestable: true },
};

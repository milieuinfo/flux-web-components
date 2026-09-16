// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=148-17396
// source=libs/components/src/form/form-label/vl-form-label.component.ts
// component=VlFormLabelComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `variant` (default/light) komt overeen met het boolean attribuut `light`.
const variant: { light?: boolean } =
    instance.getEnum('variant', {
        default: {},
        light: { light: true },
    }) ?? {};

// In Figma is vl-form-label een wrapper rond een geneste vl-form-message (Property=Label).
// De labeltekst zit in de tekstlaag "↳ Form Label" van die geneste instance.
// De geneste boolean "↳ (verplicht)" is niet bereikbaar als property van dit component en wordt niet gemapt.
const labelLayer = instance.findText('↳ Form Label');
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';

export default {
    example: figma.code`<vl-form-label label="${label}"${variant.light ? ' light' : ''}></vl-form-label>`,
    id: 'vl-form-label',
    metadata: { nestable: true },
};

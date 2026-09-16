// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=16-8749
// source=libs/components/src/form/form-message/vl-form-message.component.ts
// component=VlFormMessageComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `Property` mengt twee code-componenten: `Label` en `Label light` zijn in code een
// vl-form-label (met `light`), de overige waarden zijn een vl-form-message met `variant`.
// `error` is de default-variant in code en wordt niet uitgeschreven; error en success zijn enkel
// zichtbaar met `show`, een annotation is altijd zichtbaar.
// De boolean "↳ (verplicht)" heeft geen code-equivalent op vl-form-message en wordt niet gemapt.
const property: { tag?: string; attributes?: string; textLayer?: string } =
    instance.getEnum('Property', {
        Label: { tag: 'vl-form-label', attributes: '', textLayer: '↳ Form Label' },
        'Label light': { tag: 'vl-form-label', attributes: ' light', textLayer: '↳ Form Label' },
        annotation: { tag: 'vl-form-message', attributes: ' variant="annotation"', textLayer: '↳ Form annotation' },
        error: { tag: 'vl-form-message', attributes: ' show', textLayer: '↳ Form error' },
        success: { tag: 'vl-form-message', attributes: ' variant="success" show', textLayer: '↳ Form error' },
    }) ?? {};

// De tekst zit per variant in een andere tekstlaag en hangt niet aan een component-property.
const textLayer = property.textLayer ? instance.findText(property.textLayer) : undefined;
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<${property.tag}${property.attributes}>${text}</${property.tag}>`,
    id: 'vl-form-message',
    metadata: { nestable: true },
};

// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=17-14277
// source=libs/components/src/form/select-rich/vl-select-rich.component.ts
// component=VlSelectRichComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `variant` codeert twee dimensies: single/multiselect en dicht/open.
// `open` is een puur visuele dropdown-toestand zonder attribuut en wordt niet gemapt.
// De geneste sets Form/Select en Form/Multiselect (met vl-form-label, vl-form-message en
// hun booleans "↳ Show label", "↳ Show error", "↳ Show Annotation") zijn intern aan Figma;
// in code zijn dat aparte componenten naast de vl-select-rich.
const variant: { multiple?: boolean } =
    instance.getEnum('variant', {
        default: {},
        multiselect: { multiple: true },
        open: {},
        'multiselect - open': { multiple: true },
    }) ?? {};

// De getoonde tekst hangt niet aan een component-property: bij de multiselect zit die in de
// tekstlaag "↳ text", bij de single select in de tekstlaag "Label" van de geneste vl-select.
const textLayer = instance.findText(variant.multiple ? '↳ text' : 'Label');
const placeholder = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<vl-select-rich placeholder="${placeholder}"${variant.multiple ? ' multiple' : ''}></vl-select-rich>`,
    id: 'vl-select-rich',
    metadata: { nestable: true },
};

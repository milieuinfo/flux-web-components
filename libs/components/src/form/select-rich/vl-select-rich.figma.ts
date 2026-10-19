// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=17-14277
// source=libs/components/src/form/select-rich/vl-select-rich.component.ts
// component=VlSelectRichComponent
// code-only vl-select-rich: blur-validation, describedby, initial-options, label, name, no-choices-text
// code-only vl-select-rich: no-results-text, not-deletable, options, position, required, result-limit, search
// code-only vl-select-rich: search-placeholder, search-strategy, selected
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
// De as `state` (default | error | success | disabled) komt overeen met de gelijknamige boolean attributen;
// de waarde staat al met een spatie ervoor in de markup.
const stateValue = instance.getEnum('state', {
    default: '',
    error: ' error',
    success: ' success',
    disabled: ' disabled',
});
const state = typeof stateValue === 'string' ? stateValue : '';

const textLayer = instance.findText(variant.multiple ? '↳ text' : 'Label');
const placeholder = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<vl-select-rich placeholder="${placeholder}"${variant.multiple ? ' multiple' : ''}${state}></vl-select-rich>`,
    id: 'vl-select-rich',
    metadata: { nestable: true },
};

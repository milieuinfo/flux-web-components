// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=16-8774
// source=libs/components/src/form/input-field/vl-input-field.component.ts
// component=VlInputFieldComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `state` mengt attributen (error, success, disabled) met puur visuele toestanden.
// `focus` is een interactietoestand zonder attribuut en wordt niet gemapt.
// `empty` toont de tekstlaag als placeholder in plaats van als ingevulde waarde.
const state: { error?: boolean; success?: boolean; disabled?: boolean; empty?: boolean } =
    instance.getEnum('state', {
        Default: {},
        focus: {},
        error: { error: true },
        success: { success: true },
        disabled: { disabled: true },
        empty: { empty: true },
    }) ?? {};

// De ingevulde tekst zit in de tekstlaag "↳ text" en hangt niet aan een component-property.
const textLayer = instance.findText('↳ text');
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<vl-input-field${state.empty ? ` placeholder="${text}"` : ` value="${text}"`}${
        state.error ? ' error' : ''
    }${state.success ? ' success' : ''}${state.disabled ? ' disabled' : ''}></vl-input-field>`,
    id: 'vl-input-field',
    metadata: { nestable: true },
};

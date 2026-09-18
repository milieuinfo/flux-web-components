// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=903-23
// source=libs/components/src/form/textarea/vl-textarea.component.ts
// component=VlTextareaComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `state` mengt attributen (error, success, disabled) met puur visuele toestanden.
// `focus` is een interactietoestand zonder attribuut en wordt niet gemapt.
const state: { error?: boolean; success?: boolean; disabled?: boolean } =
    instance.getEnum('state', {
        Default: {},
        focus: {},
        error: { error: true },
        success: { success: true },
        disabled: { disabled: true },
    }) ?? {};

// In code wordt de teller enkel getoond in combinatie met `max-length`; die waarde zit niet in Figma.
// De tekstlaag "counter" is afgeleid (ingevuld/max) en wordt daarom niet gemapt.
const characterCount = instance.getBoolean('character-count');

// De placeholder zit in de tekstlaag "Typ iets…" en hangt niet aan een component-property.
const placeholderLayer = instance.findText('Typ iets…');
const placeholder =
    placeholderLayer && placeholderLayer.type === 'TEXT' ? escapeHtml(placeholderLayer.textContent) : '';

export default {
    example: figma.code`<vl-textarea placeholder="${placeholder}"${characterCount ? ' character-count' : ''}${
        state.error ? ' error' : ''
    }${state.success ? ' success' : ''}${state.disabled ? ' disabled' : ''}></vl-textarea>`,
    id: 'vl-textarea',
    metadata: { nestable: true },
};

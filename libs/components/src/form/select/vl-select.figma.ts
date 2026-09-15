// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=840-4850
// source=libs/components/src/form/select/vl-select.component.ts
// component=VlSelectComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `state` mengt attributen (Error, Success, Disabled) met puur visuele toestanden.
// `Hover` en `Focus` zijn interactietoestanden zonder attribuut en worden niet gemapt.
const state: { disabled?: boolean; error?: boolean; success?: boolean } =
    instance.getEnum('state', {
        Default: {},
        Hover: {},
        Disabled: { disabled: true },
        Error: { error: true },
        Focus: {},
        Success: { success: true },
    }) ?? {};

// De Figma-boolean `delete` toont de wisknop; in code is dat het omgekeerde attribuut `not-deletable`.
const deletable = instance.getBoolean('delete');

// De getoonde tekst zit in de tekstlaag "Label" en hangt niet aan een component-property.
// De opties zelf (slot of `options`-property) zitten niet in Figma.
const labelLayer = instance.findText('Label');
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';

export default {
    example: figma.code`<vl-select placeholder="${label}"${deletable ? '' : ' not-deletable'}${
        state.error ? ' error' : ''
    }${state.success ? ' success' : ''}${state.disabled ? ' disabled' : ''}></vl-select>`,
    id: 'vl-select',
    metadata: { nestable: true },
};

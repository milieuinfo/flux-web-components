// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=381-738
// source=libs/components/src/form/radio-group/vl-radio-group.component.ts
// component=VlRadioGroupComponent
// unmapped: variant
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De vl-radio's zitten in de Figma-slot "Slot"; elke vl-radio rendert via zijn eigen template.
const slot = instance.getSlot('Slot');

// Het groepslabel zit in de tekstlaag "↳ Form Label" van de geneste vl-form-message (Property=Label).
// In code is dat het `label`-attribuut (visueel verborgen legend van de groep).
const formLabel = instance.findText('↳ Form Label', { traverseInstances: true });
const label = formLabel && formLabel.type === 'TEXT' ? escapeHtml(formLabel.textContent) : '';

// Bewust niet gemapt:
// - `variant` (Horizontal (deprecated) | Vertical (deprecated) | default): vl-radio-group heeft geen
//   horizontaal/verticaal-attribuut; de layout wordt door de omliggende container bepaald.
// - "↳ Show error" (BOOLEAN) + geneste vl-form-message (Property=error): de foutboodschap is in code een
//   aparte vl-form-message, geen attribuut van vl-radio-group.
// - "↳ Show Annotation" (BOOLEAN) + tekstlaag "annotation": geen annotatie-attribuut of -slot in code.

export default {
    example: figma.code`<vl-radio-group${label ? ` label="${label}"` : ''}>${slot}</vl-radio-group>`,
    id: 'vl-radio-group',
    metadata: { nestable: true },
};

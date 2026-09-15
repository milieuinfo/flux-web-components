// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=639-1670
// source=libs/components/src/block/wizard/vl-wizard.component.ts
// component=VlWizard
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Het Figma-component heeft geen properties. De attributen `active-step` (default 1),
// `hide-labels` en `numeric` bestaan enkel in code; de Figma-versie toont dots mét labels,
// wat overeenkomt met de defaults.
// De stappen (progress-indicator-labels) en de pane-inhoud (.vl-stacked) zijn geneste instances
// zonder property en worden niet gemapt; de vl-wizard-pane blijft een invulplaats.
// De titel zit in de tekstlaag "Heading" van de geneste vl-title en gaat naar de `title`-slot.
// Let op: de pane-inhoud bevat ook een vl-title met een tekstlaag "Heading"; de eerste match wint.
const headingLayer = instance.findText('Heading');
const title = headingLayer && headingLayer.type === 'TEXT' ? escapeHtml(headingLayer.textContent) : '';

export default {
    example: figma.code`<vl-wizard>
    <vl-title slot="title" type="h2">${title}</vl-title>
    <vl-wizard-pane name=""></vl-wizard-pane>
</vl-wizard>`,
    id: 'vl-wizard',
    metadata: { nestable: false },
};

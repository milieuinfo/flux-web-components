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
// De titel is de tekstlaag van de eerste geneste vl-title en gaat naar de `title`-slot. De pane-inhoud bevat ook een
// vl-title; de eerste wint. De tekstlaag wordt niet op naam gezocht: haar naam volgt in de library de voorbeeldtekst.
const titleInstance = instance.findInstance('🧩 vl-title', { traverseInstances: true });
const headingLayer =
    titleInstance && titleInstance.type === 'INSTANCE'
        ? titleInstance.findLayers((node) => node.type === 'TEXT')[0]
        : undefined;
const title = headingLayer && headingLayer.type === 'TEXT' ? escapeHtml(headingLayer.textContent) : '';

export default {
    example: figma.code`<vl-wizard>
    <vl-title slot="title" type="h2">${title}</vl-title>
    <vl-wizard-pane name=""></vl-wizard-pane>
</vl-wizard>`,
    id: 'vl-wizard',
    metadata: { nestable: false },
};

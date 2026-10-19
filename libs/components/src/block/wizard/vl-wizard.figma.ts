// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=639-1670
// source=libs/components/src/block/wizard/vl-wizard.component.ts
// component=VlWizard
// code-only vl-wizard: active-step, panes
// code-only vl-wizard-pane: isActive
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Het Figma-component heeft geen eigen properties. `active-step` (default 1) bestaat enkel in code.
// `numeric` en `hide-labels` komen uit de variant van de geneste (exposed) vl-progress-indicator:
// numeric | dots | numeric without labels | dots without labels.
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

const progressIndicator = instance.findInstance('🧩 vl-progress-indicator');
const indicatorVariant =
    progressIndicator && progressIndicator.type === 'INSTANCE'
        ? String(progressIndicator.getPropertyValue('variant'))
        : '';
const numeric = indicatorVariant.startsWith('numeric');
const hideLabels = indicatorVariant.endsWith('without labels');

export default {
    example: figma.code`<vl-wizard${numeric ? ' numeric' : ''}${hideLabels ? ' hide-labels' : ''}>
    <vl-title slot="title" type="h2">${title}</vl-title>
    <vl-wizard-pane name=""></vl-wizard-pane>
</vl-wizard>`,
    id: 'vl-wizard',
    metadata: { nestable: false },
};

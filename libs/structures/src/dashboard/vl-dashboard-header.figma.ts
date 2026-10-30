// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=3605-48816
// source=libs/structures/src/dashboard/vl-dashboard-header.component.ts
// component=VlDashboardHeader
import figma from 'figma';
import { booleanProperty } from '../../../../resources/code-connect/boolean-property';
import { escapeHtml } from '../../../../resources/code-connect/escape-html';
import { vlGroupModifier } from '../../../styles/src/layout/group/vl-group-modifier.figma-util';

const instance = figma.selectedInstance;

type LayerHandle = ReturnType<typeof instance.findLayers>[number] | undefined;

// De icoonnaam komt uit de Code Connect van het icoon zelf, via `metadata.props.icon`. Zie
// `libs/components/src/atom/icon/vl-icon-library.figma.batch.ts`.
function iconNameOf(handle: LayerHandle): string {
    if (!handle || handle.type !== 'INSTANCE') {
        return '';
    }
    const metadata = handle.executeTemplate().metadata;
    const fromTemplate = metadata && metadata.props ? metadata.props.icon : undefined;
    return typeof fromTemplate === 'string' ? fromTemplate : '';
}

const showIcon = booleanProperty(instance, 'page-icon', true);
const showSubtitle = booleanProperty(instance, 'page-subtitle', false);
const showActions = booleanProperty(instance, 'header-actions', true);

// De titel en de subtitel zijn de teksten van de geneste vl-title en vl-text; in code zijn het de attributen
// `page-title` en `page-subtitle`. Het icoon is een geneste instance zonder swap-property, die de boolean `page-icon`
// toont of verbergt. Het wordt niet op laagnaam gezocht: die volgt het gekozen icoon.
const titleLayer = instance.findText('Heading', { traverseInstances: true });
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';

const subtitleLayer = instance.findText('vl-text - annotation', { traverseInstances: true });
const subtitle =
    showSubtitle && subtitleLayer && subtitleLayer.type === 'TEXT' ? escapeHtml(subtitleLayer.textContent) : '';

const icon = showIcon
    ? (instance
          .findLayers((node) => node.type === 'INSTANCE' && !node.name.startsWith('🧩'))
          .map(iconNameOf)
          .find(Boolean) ?? '')
    : '';

// De acties staan in een geneste .vl-group. Het .vl-group-template geeft een <div class="vl-group">, maar de groep
// heeft hier ook `slot="header-actions"` nodig; daarom bouwt dit template de groep zelf op, met dezelfde modifier.
const group = showActions ? instance.findInstance('🧩 .vl-group') : undefined;
const base = group && group.type === 'INSTANCE' ? group.findInstance('🧩 .vl-group (base)') : undefined;
const modifier = base && base.type === 'INSTANCE' ? vlGroupModifier(base) : '';
// De slot zit in een geneste instance. Als geheel weergegeven toont ze ook de lege `[Flux] Slot`-placeholders; daarom
// komen enkel de gekoppelde componenten erin, elk met hun eigen template.
const actionNodes = base && base.type === 'INSTANCE' ? (base.getSlot('Slot')?.connectedInstances ?? []) : [];
const actions = actionNodes.length
    ? actionNodes.reduce((code, node) => figma.code`${code}${node.executeTemplate().example}`, figma.code``)
    : undefined;

const attributes = ` page-title="${title}"${subtitle ? ` page-subtitle="${subtitle}"` : ''}${
    icon ? ` page-icon="${icon}"` : ''
}`;

export default {
    example: actions
        ? figma.code`<vl-dashboard-header${attributes}>
    <div slot="header-actions" class="vl-group${modifier}">${actions}</div>
</vl-dashboard-header>`
        : figma.code`<vl-dashboard-header${attributes}></vl-dashboard-header>`,
    id: 'vl-dashboard-header',
    metadata: { nestable: true },
};

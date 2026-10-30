// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=745-6050
// source=libs/structures/src/dashboard/vl-nav-sub.component.ts
// component=VlNavSub
// code-only vl-nav-sub: active, collapsed, href
import figma from 'figma';
import { booleanProperty } from '../../../../resources/code-connect/boolean-property';
import { escapeHtml } from '../../../../resources/code-connect/escape-html';

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

// Het icoon is een geneste instance zonder swap-property; de boolean `icon` toont of verbergt ze. Het wordt niet op
// laagnaam gezocht: die volgt het gekozen icoon. Het is de eerste instance met een icoonnaam in haar metadata.
// `active`, `collapsed` en `href` hebben geen Figma-property; de ingeklapte navigatie gebruikt geen vl-nav-sub.
const showIcon = booleanProperty(instance, 'icon', true);
const icon = showIcon
    ? (instance
          .findLayers(
              (node) => node.type === 'INSTANCE' && node.name !== '🧩 vl-text' && node.name !== '🧩 vl-nav-link',
          )
          .map(iconNameOf)
          .find(Boolean) ?? '')
    : '';

const labelLayer = instance.findText('vl-text - bold', { traverseInstances: true });
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';

// De links in de Slot zet het template zelf in elkaar uit de metadata van het vl-nav-link-template. vl-dashboard
// neemt `attributes` en `content` van vl-nav-sub op dezelfde manier over, met de slot erbij.
const links = (instance.getSlot('Slot')?.connectedInstances ?? [])
    .filter((node) => node.codeConnectId() === 'vl-nav-link')
    .map((node) => {
        const props = node.executeTemplate().metadata?.props ?? {};
        return `
    <vl-nav-link${props.attributes ?? ''}>${props.content ?? ''}</vl-nav-link>`;
    })
    .join('');

const attributes = ` label="${label}"${icon ? ` icon="${icon}"` : ''}`;
const content = `${links}
`;

export default {
    example: figma.code`<vl-nav-sub${attributes}>${content}</vl-nav-sub>`,
    id: 'vl-nav-sub',
    metadata: { nestable: true, props: { attributes, content } },
};

// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=540-14662
// source=libs/structures/src/dashboard/vl-nav-link.component.ts
// component=VlNavLink
// code-only vl-nav-link: external
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

const active = instance.getEnum('active', { false: false, true: true }) === true;
const collapsed = instance.getEnum('collapsed', { false: false, true: true }) === true;
const hasAction = booleanProperty(instance, 'link-action', false);
const hasBadge = booleanProperty(instance, 'link-badge', false);

// De link zelf en de actieknop zijn twee geneste vl-button-instances met dezelfde laagnaam, in die volgorde. Van de
// link worden enkel de tekst, het icoon en `state=disabled` gelezen; de knopvariant is de stijl van de navigatie.
// De actieknop wordt opnieuw opgebouwd in plaats van via zijn eigen template, omdat hij `slot="link-action"` nodig
// heeft. `external` heeft geen Figma-property.
const [link, action] = instance.findLayers((node) => node.type === 'INSTANCE' && node.name === '🧩 vl-button');

let icon = '';
let text = '';
let disabled = false;
if (link && link.type === 'INSTANCE') {
    icon = iconNameOf(link.getInstanceSwap('icon'));
    // Ingeklapt is de link een icoonknop: de tekst staat dan in de property `label` in plaats van in "↳ ButtonText".
    // In code blijft de tekst de inhoud van de link, ook ingeklapt.
    const textLayer = link.findText('↳ ButtonText');
    const label = link.getString('label');
    const linkText =
        textLayer && textLayer.type === 'TEXT' ? textLayer.textContent : typeof label === 'string' ? label : '';
    text = escapeHtml(linkText);
    disabled = link.getPropertyValue('state') === 'disabled';
}

let actionButton = '';
if (hasAction && action && action.type === 'INSTANCE') {
    const label = action.getString('label');
    actionButton = `
    <vl-button slot="link-action" icon="${iconNameOf(action.getInstanceSwap('icon'))}" label="${
        typeof label === 'string' ? escapeHtml(label) : ''
    }" ghost></vl-button>`;
}

let badge = '';
if (hasBadge) {
    const badgeInstance = instance.findInstance('button-badge');
    const badgeText =
        badgeInstance && badgeInstance.type === 'INSTANCE'
            ? badgeInstance.findLayers((node) => node.type === 'TEXT')[0]
            : undefined;
    badge = `
    <span slot="link-badge">${badgeText && badgeText.type === 'TEXT' ? escapeHtml(badgeText.textContent) : ''}</span>`;
}

// vl-dashboard en vl-nav-sub zetten de link zelf in elkaar, met de juiste slot, uit `attributes` en `content`.
const attributes = ` href="#" icon="${icon}"${active ? ' active' : ''}${collapsed ? ' collapsed' : ''}${
    disabled ? ' disabled' : ''
}`;
const content = `${text}${actionButton}${badge}`;

export default {
    example: figma.code`<vl-nav-link${attributes}>${content}</vl-nav-link>`,
    id: 'vl-nav-link',
    metadata: { nestable: true, props: { attributes, content } },
};

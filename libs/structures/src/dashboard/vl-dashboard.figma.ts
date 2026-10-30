// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=540-16735
// source=libs/structures/src/dashboard/vl-dashboard.component.ts
// component=VlDashboard
// unmapped: mobile, notification
import figma from 'figma';
import { booleanProperty } from '../../../../resources/code-connect/boolean-property';
import { escapeHtml } from '../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// vl-dashboard heeft geen eigen properties: alles zit in de geneste helpers `dashboard-navigation` en
// `dashboard-content`. `mobile` en `notification` van dashboard-content tonen de mobiele weergave; die kiest de code
// zelf.
const navigation = instance.findInstance('dashboard-navigation');
const contentArea = instance.findInstance('dashboard-content');
const nav = navigation && navigation.type === 'INSTANCE' ? navigation : undefined;
const content = contentArea && contentArea.type === 'INSTANCE' ? contentArea : undefined;

const collapsed = nav ? nav.getEnum('collapsed', { false: false, true: true }) === true : false;
const collapsible = nav ? booleanProperty(nav, 'collapsible', true) : true;
const showHeader = nav ? booleanProperty(nav, 'navigation-header', true) : false;

// De kop van de navigatie: de naam is de tekst van de geneste vl-title, het icoon of de afbeelding komt uit de
// metadata van het vl-badge-template. In de ingeklapte variant is de naam verborgen en wordt hij niet uitgeschreven.
let user = '';
if (nav && showHeader) {
    const nameLayer = nav.findText('Heading', { traverseInstances: true });
    const name = nameLayer && nameLayer.type === 'TEXT' ? escapeHtml(nameLayer.textContent) : '';
    const badge = nav.findConnectedInstance('vl-badge');
    const badgeProps = badge && badge.type === 'INSTANCE' ? (badge.executeTemplate().metadata?.props ?? {}) : {};
    user = `${name ? ` user-name="${name}"` : ''}${
        badgeProps.img ? ' user-img=""' : badgeProps.icon ? ` user-icon="${badgeProps.icon}"` : ''
    }`;
}

// Elk kind van de navigatie heeft in code `slot="nav-main"` of `slot="nav-utils"`. Het template van een kind kent zijn
// plaats niet, dus dit template zet de links zelf in elkaar uit de metadata van de templates van vl-nav-link en
// vl-nav-sub. De Figma-slots heten anders in de ingeklapte variant.
const slotted = (slot: string, slotName: string): string =>
    (nav?.getSlot(slotName)?.connectedInstances ?? [])
        .filter((node) => node.codeConnectId() === 'vl-nav-link' || node.codeConnectId() === 'vl-nav-sub')
        .map((node) => {
            const tag = node.codeConnectId();
            const props = node.executeTemplate().metadata?.props ?? {};
            return `
    <${tag} slot="${slot}"${props.attributes ?? ''}>${props.content ?? ''}</${tag}>`;
        })
        .join('');
const navMain = slotted('nav-main', collapsed ? 'panel content collapsed' : 'panel content');
const navUtils = slotted('nav-utils', collapsed ? 'panel utils collapsed' : 'panel utils');

// De inhoud staat in een van twee Figma-slots, naargelang de breedte; in code is dat één `content`-slot.
const fullWidth = content ? booleanProperty(content, 'full-width', false) : false;
// De slot zit in een geneste instance en geeft als geheel geen snippet; daarom komen de gekoppelde componenten erin,
// elk met hun eigen template.
const main = (
    content?.getSlot(fullWidth ? 'content full-width' : 'content max-width 1280')?.connectedInstances ?? []
).reduce(
    (code, node) => figma.code`${code}
        ${node.executeTemplate().example}`,
    figma.code``,
);

const attributes = `${user}${collapsible ? '' : ' not-collapsible'}${collapsed ? ' collapsed' : ''}`;

// De header en de footer zijn in Figma een vaste vl-header-next en vl-footer-next; hun `identifier` komt uit de
// registratie van de toepassing. De skiplink van de header gaat naar de titel van vl-dashboard-header.
export default {
    example: figma.code`<vl-dashboard${attributes}>
    <vl-header-next slot="header" identifier="" skip-to-content-id="vl-dashboard-page-title"></vl-header-next>${navMain}${navUtils}
    <div slot="content">${main}
    </div>
    <vl-footer-next slot="footer" identifier=""></vl-footer-next>
</vl-dashboard>`,
    id: 'vl-dashboard',
    metadata: { nestable: false },
};

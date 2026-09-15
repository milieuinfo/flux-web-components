// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=164-45233
// source=libs/components/src/block/functional-header/vl-functional-header.component.ts
// component=VlFunctionalHeaderComponent
// unmapped: size
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - `size` (L / S): het code-component kent geen formaat-attribuut.
// - `search?`: niet na te bouwen met het huidige component. Figma zet het zoekveld rechts in de
//   sub-header-rij, maar in code vult die rij de `sub-header`-slot, en die vervangt de terug-link
//   en de subtitel. Je kan dus niet tegelijk de standaard sub-header én een zoekveld tonen. De
//   dichtstbijzijnde slot is `top-right`, maar die staat in de titelrij, niet waar Figma hem toont.
// - `link`, `back-link`, `margin-bottom`, `sticky`, `skip-to-content-id`: geen Figma-property.
const actions = instance.getBoolean('actions');

// De Figma-boolean `< Terug?` wordt bewust NIET gelezen: hij is aan geen enkele laag gekoppeld en
// stuurt dus niets aan (geverifieerd 2026-09-09 — enkel `actions` en `search?` hebben een binding).
// Hem toch lezen leverde `hide-back-link` op terwijl Figma de terug-link gewoon toont.
// Of de terug-link zichtbaar is, volgt daarom uit de sub-header: bij `default` staat er een
// vl-link, bij `tabs` zit die in een verborgen frame `< Terug`, en bij `breadcrumb` ontbreekt hij.
const variant: { fullWidth?: boolean } =
    instance.getEnum('variant', {
        default: { fullWidth: false },
        'full-width': { fullWidth: true },
    }) ?? {};
// De sub-header bepaalt wat er onder de titelrij komt: de terug-link met subtitel (default), een breadcrumb
// (in de `sub-title`-slot, zonder terug-link) of tabs (in de `sub-header`-slot). De geneste vl-breadcrumb- en
// vl-tabs-instances worden niet uitgerold: de items vul je zelf in.
const subHeader = instance.getEnum('sub-header', {
    default: 'default',
    breadcrumb: 'breadcrumb',
    tabs: 'tabs',
});

// De titel (naam van de applicatie) zit in de tekstlaag " ↳ naam app" (met voorloopspatie), de subtitel
// (paginatitel) in "↳ pagina titel" en de tekst van de terug-link in "↳ link" van de geneste vl-link.
const titleText = instance.findText(' ↳ naam app');
const titleLabel = titleText && titleText.type === 'TEXT' ? escapeHtml(titleText.textContent) : '';
const subTitleText = instance.findText('↳ pagina titel');
const subTitle = subTitleText && subTitleText.type === 'TEXT' ? escapeHtml(subTitleText.textContent) : '';
const backText = instance.findText('↳ link', { traverseInstances: true });
const back = backText && backText.type === 'TEXT' ? escapeHtml(backText.textContent) : '';

const hideBackLink = subHeader !== 'default';
// "Terug" is de code-default van het `back`-attribuut.
const backAttribute = subHeader === 'default' && back && back !== 'Terug' ? ` back="${back}"` : '';
const subTitleAttribute = subHeader === 'default' && subTitle ? ` sub-title="${subTitle}"` : '';
const actionsSlot = actions ? '\n    <div slot="actions"></div>' : '';
const breadcrumbSlot = subHeader === 'breadcrumb' ? '\n    <vl-breadcrumb slot="sub-title"></vl-breadcrumb>' : '';
const tabsSlot =
    subHeader === 'tabs' ? '\n    <vl-tabs-next slot="sub-header" horizontal-navigation></vl-tabs-next>' : '';

export default {
    example: figma.code`<vl-functional-header title-label="${titleLabel}"${subTitleAttribute}${backAttribute}${
        variant.fullWidth ? ' full-width' : ''
    }${hideBackLink ? ' hide-back-link' : ''}>${actionsSlot}${breadcrumbSlot}${tabsSlot}
</vl-functional-header>`,
    id: 'vl-functional-header',
    metadata: { nestable: false },
};

// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=164-45233
// source=libs/components/src/block/functional-header/vl-functional-header.component.ts
// component=VlFunctionalHeaderComponent
// unmapped: size
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - `size` (L / S): het code-component kent geen formaat-attribuut.
// - `search?` naast de `default`- of `tabs`-sub-header: in code vult die rij de `sub-header`-slot, en die
//   vervangt de terug-link en de subtitel. Naast een breadcrumb kan het wel: zie `searchWithBreadcrumb`.
// - `link`, `back-link`, `margin-bottom`, `sticky`, `skip-to-content-id`: geen Figma-property.
const actions = instance.getBoolean('actions') === true;

// De terug-link volgt uit de sub-header: bij `default` staat hij er altijd, bij `breadcrumb` ontbreekt hij, en bij
// `tabs` stuurt de boolean `< Terug?` hem (default uit). Staat die aan, dan is het het patroon "met back en tabs":
// de tabs gaan in de `sub-title`-slot zodat de terug-link blijft, met wat custom CSS voor de uitlijning (zie
// Storybook, Patronen / Navigatie / Functionele Header / met back en tabs).
const variant: { fullWidth?: boolean } =
    instance.getEnum('variant', {
        default: { fullWidth: false },
        'full-width': { fullWidth: true },
    }) ?? {};
// De sub-header bepaalt wat er onder de titelrij komt: de terug-link met subtitel (default), een breadcrumb
// (in de `sub-title`-slot, zonder terug-link), tabs (in de `sub-header`-slot) of niets (`hide-sub-header`). De
// geneste vl-breadcrumb- en vl-tabs-instances worden niet uitgerold: de items vul je zelf in.
// Een bestand met een oudere versie van de library kan de as missen; `getEnum` geeft dan een foutobject terug en de
// sub-header valt terug op `default`. Om dezelfde reden vergelijken de booleans met `true`.
const subHeaderValue = instance.getEnum('sub-header', {
    default: 'default',
    breadcrumb: 'breadcrumb',
    tabs: 'tabs',
    none: 'none',
});
const subHeader = typeof subHeaderValue === 'string' ? subHeaderValue : 'default';
const hideSubHeader = subHeader === 'none';

// De titel (naam van de applicatie) zit in de tekstlaag "↳ naam app", de subtitel (paginatitel) in "↳ pagina titel" en
// de tekst van de terug-link in "↳ link" van de geneste vl-link. De laagnaam van de titel begint in Figma met een
// niet-brekende spatie; `trim()` vangt die (en een eventuele gewone spatie) op.
const titleText = instance.findLayers((node) => node.type === 'TEXT' && node.name.trim() === '↳ naam app')[0];
const titleLabel = titleText && titleText.type === 'TEXT' ? escapeHtml(titleText.textContent) : '';
const subTitleText = instance.findText('↳ pagina titel');
const subTitle = subTitleText && subTitleText.type === 'TEXT' ? escapeHtml(subTitleText.textContent) : '';
const backText = instance.findText('↳ link', { traverseInstances: true });
const back = backText && backText.type === 'TEXT' ? escapeHtml(backText.textContent) : '';

const backWithTabs = subHeader === 'tabs' && instance.getBoolean('< Terug?') === true;
const showBackLink = subHeader === 'default' || backWithTabs;
// Zonder sub-header is er ook geen terug-link; `hide-sub-header` volstaat dan.
const hideBackLink = !showBackLink && !hideSubHeader;
// "Terug" is de code-default van het `back`-attribuut.
const backAttribute = showBackLink && back && back !== 'Terug' ? ` back="${back}"` : '';
const subTitleAttribute = subHeader === 'default' && subTitle ? ` sub-title="${subTitle}"` : '';
const actionsSlot = actions ? '\n    <div slot="actions"></div>' : '';
// Breadcrumb met zoekveld is het patroon "met search": breadcrumb en zoekformulier samen in een `.vl-group` in de
// `sub-title`-slot, met custom CSS zodat die groep de volle breedte krijgt (zie Storybook, Patronen / Navigatie /
// Functionele Header / met search).
const searchWithBreadcrumb = subHeader === 'breadcrumb' && instance.getBoolean('search?') === true;
const searchCustomCss = searchWithBreadcrumb
    ? ' custom-css=".vl-functional-header__sub-actions, .vl-functional-header__sub__action { width: 100% } ::slotted(.vl-group) { width: 100% }"'
    : '';
const breadcrumbSlot =
    subHeader !== 'breadcrumb'
        ? ''
        : searchWithBreadcrumb
          ? '\n    <div class="vl-group vl-group--space-between" slot="sub-title">' +
            '\n        <vl-breadcrumb></vl-breadcrumb>' +
            '\n        <form role="search" aria-label="Zoeken op deze site">' +
            '\n            <div class="vl-group vl-group--input-group">' +
            '\n                <vl-input-field input-group block type="search" name="zoekterm" label="Zoekterm"></vl-input-field>' +
            '\n                <vl-button input-group icon="search" type="submit" label="Zoeken" tertiary></vl-button>' +
            '\n            </div>' +
            '\n        </form>' +
            '\n    </div>'
          : '\n    <vl-breadcrumb slot="sub-title"></vl-breadcrumb>';
const tabsSlot =
    subHeader !== 'tabs'
        ? ''
        : backWithTabs
          ? '\n    <!-- Patroon "met back en tabs": vraagt custom CSS, zie Storybook. -->' +
            '\n    <vl-tabs-next slot="sub-title" horizontal-navigation></vl-tabs-next>'
          : '\n    <vl-tabs-next slot="sub-header" horizontal-navigation></vl-tabs-next>';

export default {
    example: figma.code`<vl-functional-header title-label="${titleLabel}"${subTitleAttribute}${backAttribute}${
        variant.fullWidth ? ' full-width' : ''
    }${hideSubHeader ? ' hide-sub-header' : ''}${hideBackLink ? ' hide-back-link' : ''}${searchCustomCss}>${actionsSlot}${breadcrumbSlot}${tabsSlot}
</vl-functional-header>`,
    id: 'vl-functional-header',
    metadata: { nestable: false },
};

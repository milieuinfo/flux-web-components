// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=144-13980
// source=libs/components/src/block/next/side-navigation/vl-side-navigation.component.ts
// component=VlSideNavigationComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Keuze: dit item sluit aan bij de parent-template `vl-side-navigation-next` (zie vl-side-navigation.figma.ts in
// deze map). Die rendert het default slot, en dat slot is in code een "custom table of contents": gewone
// <ul>/<li> met <vl-link> erin. Er bestaat geen `vl-side-navigation-item-next`-element. Het klassieke
// `libs/components/src/block/side-navigation/vl-side-navigation-item.component.ts` is wél een echt element, maar
// hoort bij de klassieke vl-side-navigation en zou niet samengaan met de reeds gekozen parent-template.
// Referentie voor de markup: story "vl-side-navigation-next - custom table of contents".
//
// Bewust niet gemapt:
// - `variant` (actief / inactief): de actieve toestand wordt at runtime gezet door de component (klasse `active`
//   + `aria-current="location"`, zie applyActiveStateToCustomTocLinks) en schrijf je niet in de markup.
// - het verschil tussen `sub level = gesloten` en `sub level = open`: ook runtime (de component zet `hidden` op
//   de geneste <ul> en `aria-expanded` op de toggle-knop). In Figma verschilt enkel het icoon (nav-right vs
//   nav-down); in code is dat altijd `arrow-right-fat`, dat via de klasse `showing-children` geroteerd wordt.
// - de href van de link: daar is geen Figma-property voor, dus blijft ze een `#`-placeholder.
instance.getEnum('variant', {
    actief: {},
    inactief: {},
});

// Niveau 1 is een item op het hoogste niveau (met een `nav-item-wrapper`), niveau 2 een item in een geneste <ul>.
// Een bestand met een oudere versie van de library kan de as missen; `getEnum` geeft dan een foutobject terug in
// plaats van `undefined`. De vergelijking met `true` houdt de waarde dan op false.
const isChild =
    instance.getEnum('level', {
        '1': false,
        '2': true,
    }) === true;

// `sub level` geeft aan of het item onderliggende items heeft (en dus een toggle-knop + geneste <ul> krijgt).
const hasChildren =
    instance.getEnum('sub level', {
        gesloten: true,
        open: true,
        geen: false,
    }) === true;

// Het label zit in de tekstlaag "↳ Label name" en hangt niet aan een component-property.
const labelLayer = instance.findText('↳ Label name');
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';

const link = `<vl-link href="#">${label}</vl-link>`;
// De toggle-knop krijgt in code nog een `@click=${toggleCustomTocChildren}` (import uit @domg-wc/components/block/next).
const toggle = hasChildren
    ? '\n        <vl-button ghost icon="arrow-right-fat" class="toggle-button"></vl-button>'
    : '';
const childList = hasChildren ? '\n    <ul></ul>' : '';
const body = isChild
    ? `\n    ${link}`
    : `\n    <div class="nav-item-wrapper">\n        ${link}${toggle}\n    </div>${childList}`;

export default {
    example: figma.code`<li>${body}
</li>`,
    id: 'vl-side-navigation-next-item',
    metadata: { nestable: true },
};

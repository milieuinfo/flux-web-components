// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=69-1488
// source=libs/components/src/block/info-tile/vl-info-tile.component.ts
// component=VlInfoTile
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt: `auto-open`, `clickable`, `clickable-label`, `full-height`, `heading-level`, `highlight`,
// `highlight-left` en de `badge`- en `title-label`-slots hebben geen Figma-property.

// De Figma-boolean `icon` toont enkel dát er een icoon staat; het icoon zelf is een geneste instance
// zonder swap-property. De naam komt daarom uit de Code Connect van het icoon zelf, via
// `metadata.props.icon` (zie `libs/components/src/atom/icon/vl-icon-library.figma.batch.ts`).
// Er zijn twee icoon-lagen, in de kaders "icon" en "icon as badge"; enkel de zichtbare komt in de Code Connect-boom,
// en kaders zelf staan er niet in. Het icoon is de eigen instance met een icoonnaam in zijn metadata. Het wordt niet
// op laagnaam gezocht: een gewisseld icoon draagt in de instance de naam van het nieuwe component (bv.
// "Icon/Maps/area") in plaats van "Icon". Blijft de naam leeg, dan heeft het gekozen icoon geen Code Connect-mapping.
type LayerHandle = ReturnType<typeof instance.findLayers>[number] | undefined;

function iconNameOf(handle: LayerHandle): string {
    if (!handle || handle.type !== 'INSTANCE') {
        return '';
    }
    const metadata = handle.executeTemplate().metadata;
    const fromTemplate = metadata && metadata.props ? metadata.props.icon : undefined;
    return typeof fromTemplate === 'string' ? fromTemplate : '';
}
const variant: { center?: boolean } =
    instance.getEnum('variant', {
        default: { center: false },
        centered: { center: true },
    }) ?? {};
// Een bestand met een oudere versie van de library kan properties missen. De getters geven dan een foutobject terug
// in plaats van `undefined`; daarom de typeof-controles en de vergelijkingen met `true`.
// "small" is de gedocumenteerde default van het code-component en wordt niet uitgeschreven.
const sizeValue = instance.getEnum('size', {
    small: '',
    medium: 'medium',
    large: 'large',
});
const size = typeof sizeValue === 'string' ? sizeValue : '';
const typeValue = instance.getEnum('type', {
    default: '',
    alt: 'alt',
    error: 'error',
    success: 'success',
    warning: 'warning',
});
const type = typeof typeValue === 'string' ? typeValue : '';
const toggleable =
    instance.getEnum('toggleable', {
        false: false,
        true: true,
    }) === true;
const icon = instance.getBoolean('icon') === true;
const iconAsBadge = instance.getBoolean('icon-as-badge') === true;
// `icon-as-badge` toont in Figma óók een icoon, terwijl de boolean `icon` dan op false kan staan.
// In code voegt `icon-as-badge` alleen de badge-styling toe aan het icoon uit het `icon`-attribuut
// (zie `__processIcon`), dus zonder `icon` rendert er niets. Het attribuut hoort er dus bij zodra
// een van beide booleans aan staat.
const showsIcon = icon || iconAsBadge;
const iconName = showsIcon
    ? (instance
          .findLayers((node) => node.type === 'INSTANCE')
          .map(iconNameOf)
          .find((name) => name) ?? '')
    : '';
const footer = instance.getBoolean('footer') === true;
const menuSlot = instance.getBoolean('menu slot') === true;

// Titel, subtitel en content zitten in de tekstlagen "↳ Title", "↳ Subtitle" en "↳ Content".
// De Figma-boolean `content slot` toont een extra slot-placeholder; in code is dat dezelfde `content`-slot.
const titleText = instance.findText('↳ Title');
const title = titleText && titleText.type === 'TEXT' ? escapeHtml(titleText.textContent) : '';
const subtitleText = instance.findText('↳ Subtitle');
const subtitle = subtitleText && subtitleText.type === 'TEXT' ? escapeHtml(subtitleText.textContent) : '';
const contentText = instance.findText('↳ Content');
const content = contentText && contentText.type === 'TEXT' ? escapeHtml(contentText.textContent) : '';

const subtitleSlot = subtitle ? `\n    <span slot="subtitle">${subtitle}</span>` : '';
const menuSlotHint = menuSlot ? '\n    <div slot="menu"></div>' : '';
const footerSlot = footer ? '\n    <div slot="footer"></div>' : '';

export default {
    example: figma.code`<vl-info-tile${size ? ` size="${size}"` : ''}${type ? ` type="${type}"` : ''}${
        variant.center ? ' center' : ''
    }${toggleable ? ' toggleable' : ''}${showsIcon ? ` icon="${iconName}"` : ''}${iconAsBadge ? ' icon-as-badge' : ''}>
    <span slot="title">${title}</span>${subtitleSlot}${menuSlotHint}
    <div slot="content">${content}</div>${footerSlot}
</vl-info-tile>`,
    id: 'vl-info-tile',
    metadata: { nestable: true },
};

// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=182-66884
// source=libs/components/src/atom/link/vl-link.component.ts
// component=VlLinkComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

type LayerHandle = ReturnType<typeof instance.findLayers>[number] | undefined;

// De icoonnaam komt uit de Code Connect van het icoon zelf, via `metadata.props.icon`. Zie
// `libs/components/src/atom/icon/vl-icon-library.figma.batch.ts`.
//
// Leid de naam nooit af uit de laagnaam. Vastgesteld met een diagnostisch template op vl-icon
// (2026-09-08): `name` op een handle levert de laagnaam uit de componentdefinitie, niet die van de
// geswapte instance. De laagnamen hier volgen wél het component ("Icon/Navigation/nav-left"),
// waardoor het template stil altijd het standaardicoon uitschreef, ook bij een ander icoon.
//
// Blijft `icon` leeg, dan heeft het gekozen icoon geen Code Connect-mapping.
function iconNameOf(handle: LayerHandle): string {
    if (!handle || handle.type !== 'INSTANCE') {
        return '';
    }
    const metadata = handle.executeTemplate().metadata;
    const fromTemplate = metadata && metadata.props ? metadata.props.icon : undefined;
    return typeof fromTemplate === 'string' ? fromTemplate : '';
}

const size: { small?: boolean; large?: boolean } =
    instance.getEnum('size', {
        M: {},
        S: { small: true },
        L: { large: true },
    }) ?? {};

const bold =
    instance.getEnum('font style', {
        normal: false,
        bold: true,
    }) === true;

// Een bestand met een oudere versie van de library kent de as `error` nog niet. `getEnum` geeft dan een
// foutobject terug in plaats van `undefined`; de vergelijking met `true` houdt `error` dan op false.
const error =
    instance.getEnum('error', {
        false: false,
        true: true,
    }) === true;

const iconVariant = instance.getEnum('icon', {
    no: 'no',
    left: 'left',
    right: 'right',
    external: 'external',
});

// `external` rendert het externe icoon zelf in code; de swaps "Icon left"/"Icon right" horen bij
// de varianten left/right. In code is icon-placement standaard leeg (geen marge tussen icoon en
// tekst), dus `before` wordt expliciet uitgeschreven om de spatiëring uit Figma te behouden.
let icon = '';
let placement = '';
if (iconVariant === 'left') {
    icon = iconNameOf(instance.getInstanceSwap('Icon left'));
    placement = 'before';
} else if (iconVariant === 'right') {
    icon = iconNameOf(instance.getInstanceSwap('Icon right'));
    placement = 'after';
}
const external = iconVariant === 'external';

// De linktekst zit in de tekstlaag "↳ link" en hangt niet aan een component-property.
const linkText = instance.findText('↳ link');
const label = linkText && linkText.type === 'TEXT' ? escapeHtml(linkText.textContent) : '';

// Niet gemapt (geen Figma-equivalent): href, label, download, button-as-link en type.
export default {
    example: figma.code`<vl-link${bold ? ' bold' : ''}${size.small ? ' small' : ''}${size.large ? ' large' : ''}${
        error ? ' error' : ''
    }${external ? ' external' : ''}${
        placement ? ` icon="${icon}" icon-placement="${placement}"` : ''
    }>${label}</vl-link>`,
    id: 'vl-link',
    metadata: { nestable: true },
};

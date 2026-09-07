// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=620-1116
// source=libs/components/src/atom/icon/vl-icon.component.ts
// component=VlIconComponent
import figma from 'figma';

const instance = figma.selectedInstance;

type LayerHandle = ReturnType<typeof instance.findLayers>[number] | undefined;

// De icoonnaam komt uit de Code Connect van het icoon zelf: elk icoon-component in de libraries
// [VL] Icons (team D) en [VL] Foundations (team D) heeft een eigen template dat zijn naam
// meegeeft via `metadata.props.icon`. Zie `vl-icon-library.figma.batch.ts` in deze map.
//
// Leid de naam nooit af uit de laagnaam. Vastgesteld met een diagnostisch template (2026-09-08):
// `name` op een handle levert de laagnaam uit de componentdefinitie, niet die van de geswapte
// instance. Bij een instance met icon=add gaven `getInstanceSwap('icon')`, `children` en
// `findLayers` alle drie "Icon/Contact/chat" terug, het standaardicoon.
//
// Blijft `icon` leeg, dan heeft het gekozen icoon geen Code Connect-mapping. Dat geldt voor de
// icoon-componenten waarvan de naam niet voorkomt in `vl-icon-list.ts`.
function iconNameOf(handle: LayerHandle): string {
    if (!handle || handle.type !== 'INSTANCE') {
        return '';
    }
    const metadata = handle.executeTemplate().metadata;
    const fromTemplate = metadata && metadata.props ? metadata.props.icon : undefined;
    return typeof fromTemplate === 'string' ? fromTemplate : '';
}

const icon = iconNameOf(instance.getInstanceSwap('icon'));

const size: { small?: boolean; large?: boolean } =
    instance.getEnum('size', {
        default: {},
        small: { small: true },
        large: { large: true },
    }) ?? {};

const light = instance.getEnum('light', {
    false: false,
    true: true,
});

// Niet gemapt (geen Figma-equivalent): right-margin, left-margin, label en het deprecated clickable.
export default {
    example: figma.code`<vl-icon icon="${icon}"${size.small ? ' small' : ''}${size.large ? ' large' : ''}${light ? ' light' : ''}></vl-icon>`,
    id: 'vl-icon',
    metadata: { nestable: true, props: { icon } },
};

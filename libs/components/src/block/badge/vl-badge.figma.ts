// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=3605-57
// source=libs/components/src/block/badge/vl-badge.component.ts
// component=VlBadgeComponent
import figma from 'figma';

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

// subtle is de default in code en wordt niet uitgeschreven.
const backgroundValue = instance.getEnum('background', {
    subtle: '',
    default: 'default',
    primary: 'primary',
    action: 'action',
});
const background = typeof backgroundValue === 'string' ? backgroundValue : '';

// `display=img` toont een afbeelding in plaats van een icoon. De afbeelding en haar tekstalternatief komen uit de
// data; het template zet enkel de attributen klaar.
const img = instance.getEnum('display', { icon: false, img: true }) === true;
const icon = img ? '' : iconNameOf(instance.getInstanceSwap('icon'));

const attributes = `${img ? ' img="" alt=""' : ` icon="${icon}"`}${background ? ` background="${background}"` : ''}`;

// vl-dashboard leest `icon` en `img` uit de metadata voor `user-icon` en `user-img`.
export default {
    example: figma.code`<vl-badge${attributes}></vl-badge>`,
    id: 'vl-badge',
    metadata: { nestable: true, props: { icon, img } },
};

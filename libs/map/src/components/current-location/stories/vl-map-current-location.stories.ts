import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../vl-map-current-location';
import { mapCurrentLocationArgs, mapCurrentLocationArgTypes } from './vl-map-current-location.stories-arg';
import mapCurrentLocationDoc from './vl-map-current-location.stories-doc.mdx';

export default {
    id: 'map-current-location',
    title: 'map/current-location',
    tags: ['autodocs'],
    args: mapCurrentLocationArgs,
    argTypes: mapCurrentLocationArgTypes,
    parameters: {
        docs: {
            page: mapCurrentLocationDoc,
        },
    },
} as Meta<typeof mapCurrentLocationArgs>;

export const MapCurrentLocationDefault = story(
    mapCurrentLocationArgs,
    ({ tooltip, zoom }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-current-location tooltip=${tooltip} zoom=${zoom}></vl-map-current-location>
        </vl-map>
    `
);
MapCurrentLocationDefault.storyName = 'vl-map-current-location - default';

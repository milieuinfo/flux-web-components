import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../legend/vl-map-legend';
import '../vl-map-legend-item';
import { mapLegendItemArgs, mapLegendItemArgTypes } from './vl-map-legend-item.stories-arg';
import mapLegendItemDoc from './vl-map-legend-item.stories-doc.mdx';

export default {
    id: 'map-legend-item',
    title: 'Map/legend-item',
    tags: ['autodocs'],
    args: mapLegendItemArgs,
    argTypes: mapLegendItemArgTypes,
    parameters: {
        docs: {
            page: mapLegendItemDoc,
        },
    },
} as Meta<typeof mapLegendItemArgs>;

const MapLegendItemTemplate = story(
    mapLegendItemArgs,
    ({ layer, iconText, iconSlot, labelSlot }) =>
        html` <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-action-controls>
                <vl-map-measure-control></vl-map-measure-control>
            </vl-map-action-controls>
            <vl-map-features-layer
                data-vl-name="Shapes"
                features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[153055,203908]},"properties":{"styleId":"style-1"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[141000,200908]},"properties":{"styleId":"style-2"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[147055,197908],[157055,197908],[157055,187908],[147055,187908],[147055,197908]]]},"properties":{"styleId":"style-3"}}]}'
                projection-code="EPSG:31370"
            >
                <vl-map-layer-circle-style
                    id="style-1"
                    data-vl-name="Openbaar onderzoek"
                    data-vl-color="#ffe615"
                    data-vl-size="5"
                    data-vl-border-color="#000"
                    data-vl-border-size="1"
                ></vl-map-layer-circle-style>
                <vl-map-layer-circle-style
                    id="style-2"
                    data-vl-name="Beslissing"
                    data-vl-color="red"
                    data-vl-size="5"
                    data-vl-border-color="#000"
                    data-vl-border-size="1"
                ></vl-map-layer-circle-style>
                <vl-map-layer-style
                    id="style-3"
                    data-vl-name="Wateroppervlaktes"
                    data-vl-color="rgba(255,0,0,0.5)"
                    data-vl-border-color="rgba(255,255,100,1)"
                    data-vl-border-size="2"
                    data-vl-text-feature-attribute-name="label"
                    data-vl-text-background-color="rgba(0,0,255,0.2)"
                    data-vl-text-border-color="rgba(0,255,0,1)"
                    data-vl-text-border-size="3"
                    data-vl-text-color="rgba(20,50,100,1)"
                    data-vl-text-offset-x="10"
                    data-vl-text-offset-y="-10"
                    data-vl-text-size="13px"
                ></vl-map-layer-style>
            </vl-map-features-layer>
            <vl-map-legend>
                <vl-map-legend-item data-vl-layer=${layer} data-vl-icon-text=${iconText}>
                    ${unsafeHTML(labelSlot)} ${unsafeHTML(iconSlot)}
                </vl-map-legend-item>
            </vl-map-legend>
        </vl-map>`
);

export const MapLegendItemIconLabel = MapLegendItemTemplate.bind({});
MapLegendItemIconLabel.storyName = 'vl-map-legend-item - default';
MapLegendItemIconLabel.args = {
    layer: 'Openbaar onderzoek',
    iconSlot: `<span slot="icon"
                    ><div
                        style="
                    height: 0.8em;
                    width: 0.8em;
                    border: 1px solid #000;
                    background-color:purple;"
                    ></div>
                </span>`,
    labelSlot: `<span slot="label">Custom label</span>`,
};
MapLegendItemIconLabel.parameters = {
    controls: {
        exclude: ['data-vl-icon-text'],
    },
};

export const MapLegendItemIcon = MapLegendItemTemplate.bind({});
MapLegendItemIcon.storyName = 'vl-map-legend-item - icon';
MapLegendItemIcon.args = {
    layer: 'Wateroppervlaktes',
    iconSlot: `<span slot="icon"
                    ><div
                        style="
                    height: 0.8em;
                    width: 0.8em;
                    border: 1px solid #000;
                    background-color:purple;"
                    ></div>
                </span>`,
};
MapLegendItemIcon.parameters = {
    controls: {
        exclude: ['data-vl-icon-text'],
    },
};

export const MapLegendItemLabel = MapLegendItemTemplate.bind({});
MapLegendItemLabel.storyName = 'vl-map-legend-item - icon';
MapLegendItemLabel.args = {
    layer: 'Wateroppervlaktes',
    labelSlot: `<span slot="label">Custom label</span>`,
};
MapLegendItemLabel.parameters = {
    controls: {
        exclude: ['data-vl-icon-text'],
    },
};

export const MapLegendItemIconText = MapLegendItemTemplate.bind({});
MapLegendItemIconText.storyName = 'vl-map-legend-item - icon text';
MapLegendItemIconText.args = {
    layer: 'Wateroppervlaktes',
    iconText: 'W',
};

export const MapLegendItemDefault = MapLegendItemTemplate.bind({});
MapLegendItemDefault.storyName = 'vl-map-legend-item - default icon en label';
MapLegendItemDefault.args = {
    layer: 'Wateroppervlaktes',
};
MapLegendItemDefault.parameters = {
    controls: {
        exclude: ['data-vl-icon-text'],
    },
};

import { story } from '@resources/utils-storybook';
import { html } from 'lit';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import '../vl-map-legend';
import { mapLegendArgs } from './vl-map-legend.stories-arg';

export default story(
    mapLegendArgs,
    ({ bottom, left, placement, right, top, layoutVertical }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-tiled-wms-layer
                layers="grondwater:beschermingszones_2014"
                name="Beschermingszones"
                url="https://www.dov.vlaanderen.be/geoserver/wms"
            ></vl-map-tiled-wms-layer>
            <vl-map-legend
                placement=${placement}
                layout-vertical=${layoutVertical}
                bottom=${bottom}
                top=${top}
                right=${right}
                left=${left}
            ></vl-map-legend>
        </vl-map>
    `
);

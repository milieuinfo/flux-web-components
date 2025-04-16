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
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-wfs-layer
                data-vl-name="Oppervlaktewaterlichamen"
                data-vl-url="https://geoserver.vmm.be/geoserver/vmm/wfs"
                data-vl-layers="owl_l"
                data-vl-max-resolution="8"
            >
                <vl-map-layer-circle-style
                    data-vl-color="#ffe615"
                    data-vl-size="5"
                    data-vl-border-color="#000"
                    data-vl-border-size="1"
                ></vl-map-layer-circle-style>
            </vl-map-wfs-layer>
            <vl-map-legend
                data-vl-placement=${placement}
                data-vl-layout-vertical=${layoutVertical}
                bottom=${bottom}
                top=${top}
                right=${right}
                left=${left}
            ></vl-map-legend>
        </vl-map>
    `
);

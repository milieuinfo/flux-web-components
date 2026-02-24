import { Meta } from '@storybook/web-components-vite';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-legend';
import MLFLMS from './vl-map-legend-features-layer-multiple-styles.sub-story';
import MLFL from './vl-map-legend-features-layer.sub-story';
import MLMFL from './vl-map-legend-multiple-features-layer.sub-story';
import MLWFSL from './vl-map-legend-wfs-layer.sub-story';
import MLWMSL from './vl-map-legend-wms-layer.sub-story';
import MLWMSWFSL from './vl-map-legend-wms-wfs-layer.sub-story';
import MLCI from './vl-map-legend-custom-items.sub-story';
import MLLV from './vl-map-legend-layout-vertical.sub-story';
import MLP from './vl-map-legend-pattern.sub-story';
import { mapLegendArgs, mapLegendArgTypes } from './vl-map-legend.stories-arg';
import mapLegendDoc from './vl-map-legend.stories-doc.mdx';

export default {
    id: 'map-legend',
    title: 'map/legend',
    tags: ['autodocs'],
    args: mapLegendArgs,
    argTypes: mapLegendArgTypes,
    parameters: {
        docs: {
            page: mapLegendDoc,
        },
    },
} as Meta<typeof mapLegendArgs>;

export const MapLegendFeaturesLayer = MLFL;
MapLegendFeaturesLayer.storyName = 'vl-map-legend - features-layer';

export const MapLegendFeaturesLayerMultipleStyles = MLFLMS;
MapLegendFeaturesLayerMultipleStyles.storyName = 'vl-map-legend - features-layer multiple styles';

export const MapLegendMultipleFeaturesLayers = MLMFL;
MapLegendMultipleFeaturesLayers.storyName = 'vl-map-legend - multiple features-layers';

export const MapLegendWfsLayer = MLWFSL;
MapLegendWfsLayer.storyName = 'vl-map-legend - wfs-layer';

export const MapLegendWmsLayer = MLWMSL;
MapLegendWmsLayer.storyName = 'vl-map-legend - wms-layer';

export const MapLegendWmsWfsLayer = MLWMSWFSL;
MapLegendWmsWfsLayer.storyName = 'vl-map-legend - wms - wfs -layer';

export const MapLegendCustomItems = MLCI;
MapLegendCustomItems.storyName = 'vl-map-legend - custom items';

export const MapLegendLayoutVertical = MLLV;
MapLegendLayoutVertical.storyName = 'vl-map-legend - layout vertical';

export const MapLegendPattern = MLP;
MapLegendPattern.storyName = 'vl-map-legend - pattern';

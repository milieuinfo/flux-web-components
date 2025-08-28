import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import '../../../../../../vl-map';
import '../../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-select-actions';
import { mapSelectActionsArgs, mapSelectActionsArgTypes } from './vl-map-select-actions.stories-arg';
import { component as clusteringComponent } from './vl-map-select-actions.stories-clustering';
import { component as customStyleComponent } from './vl-map-select-actions.stories-custom-style';
import { component as defaultComponent } from './vl-map-select-actions.stories-default';
import mapSelectActionsDoc from './vl-map-select-actions.stories-doc.mdx';

export default {
    id: 'map-action-layer-action-select-action-select-actions',
    title: 'map/action/layer-action/select-action/select-actions',
    tags: ['autodocs'],
    args: mapSelectActionsArgs,
    argTypes: mapSelectActionsArgTypes,
    parameters: {
        docs: {
            page: mapSelectActionsDoc,
        },
    },
} as Meta<typeof mapSelectActionsArgs>;

export const MapSelectActionsDefault = story(mapSelectActionsArgs, ({ active, defaultActive }) => {
    return defaultComponent(active, defaultActive);
});
MapSelectActionsDefault.storyName = 'vl-map-select-actions - default';
MapSelectActionsDefault.args = {
    active: true,
};

export const MapSelectActionsCustomStyle = story(mapSelectActionsArgs, ({ active, defaultActive }) => {
    return customStyleComponent(active, defaultActive);
});
MapSelectActionsCustomStyle.storyName = 'vl-map-select-actions - custom style';
MapSelectActionsCustomStyle.args = {
    active: true,
};

export const MapSelectActionsClustering = story(mapSelectActionsArgs, ({ active, defaultActive }) => {
    return clusteringComponent(active, defaultActive);
});
MapSelectActionsClustering.storyName = 'vl-map-select-actions - clustering';
MapSelectActionsClustering.args = {
    active: true,
};

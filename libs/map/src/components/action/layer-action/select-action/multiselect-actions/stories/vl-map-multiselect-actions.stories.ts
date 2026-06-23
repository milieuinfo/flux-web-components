import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import '../../../../../../vl-map';
import '../../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../../../../layer-switcher/vl-map-layer-switcher';
import '../../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../../../../side-sheet/vl-map-side-sheet';
import '../../select-actions/vl-map-select-actions';
import '../vl-map-multiselect-actions';
import { mapMultiselectActionsArgs, mapMultiselectActionsArgTypes } from './vl-map-multiselect-actions.stories-arg';
import { component as defaultComponent } from './vl-map-multiselect-actions.stories-default';
import { component as multilayerVisibilityComponent } from './vl-map-multiselect-actions.stories-util';
import mapMultiselectActionsDoc from './vl-map-multiselect-actions.stories-doc.mdx';

export default {
    id: 'map-action-layer-action-select-action-multiselect-actions',
    title: 'map/action/layer-action/select-action/multiselect-actions',
    tags: ['autodocs'],
    args: mapMultiselectActionsArgs,
    argTypes: mapMultiselectActionsArgTypes,
    parameters: {
        docs: {
            page: mapMultiselectActionsDoc,
        },
    },
} as Meta<typeof mapMultiselectActionsArgs>;

export const MapMultiselectActionsDefault = story(mapMultiselectActionsArgs, ({ active, defaultActive }) => {
    return defaultComponent(active, defaultActive);
});
MapMultiselectActionsDefault.storyName = 'vl-map-multiselect-actions - default';
MapMultiselectActionsDefault.args = {
    active: true,
};

export const MapMultiselectActionsMultilayerVisibility = story(
    mapMultiselectActionsArgs,
    ({ active, defaultActive }) => {
        return multilayerVisibilityComponent(active, defaultActive);
    }
);
MapMultiselectActionsMultilayerVisibility.storyName = 'vl-map-multiselect-actions - multilayer visibility';
MapMultiselectActionsMultilayerVisibility.args = {
    active: true,
    defaultActive: true,
};

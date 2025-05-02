import { defaultArgTypes } from '@domg-wc/common-storybook';
import { mapClickActionArgTypes } from '../../../libs/map/src/components/action/click-action/stories/vl-map-click-action.stories-arg';
import { mapDrawActionStyleArgTypes } from '../../../libs/map/src/components/action/draw-action/draw-action-style/stories/vl-map-draw-action-style.stories-arg';
import { mapDrawActionArgTypes } from '../../../libs/map/src/components/action/draw-action/stories/vl-map-draw-action.stories-arg';
import { mapModifyActionArgTypes } from '../../../libs/map/src/components/action/layer-action/modify-action/stories/vl-map-modify-action.stories-arg';
import { mapMultiselectActionsArgTypes } from '../../../libs/map/src/components/action/layer-action/select-action/multiselect-actions/stories/vl-map-multiselect-actions.stories-arg';
import { mapSelectActionsArgTypes } from '../../../libs/map/src/components/action/layer-action/select-action/select-actions/stories/vl-map-select-actions.stories-arg';
import { mapSelectActionArgTypes } from '../../../libs/map/src/components/action/layer-action/select-action/stories/vl-map-select-action.stories-arg';
import { mapActionArgTypes } from '../../../libs/map/src/components/action/stories/vl-map-action.stories-arg';
import { mapBaselayerArgTypes } from '../../../libs/map/src/components/baselayer/stories/vl-map-baselayer.stories-arg';
import { mapActionControlArgTypes } from '../../../libs/map/src/components/controls/action-control/stories/vl-map-action-control.stories-arg';
import { mapCurrentLocationArgTypes } from '../../../libs/map/src/components/current-location/stories/vl-map-current-location.stories-arg';
import { mapLayerStyleArgTypes } from '../../../libs/map/src/components/layer-style/stories/vl-map-layer-style.stories-arg';
import { mapLayerCircleStyleArgTypes } from '../../../libs/map/src/components/layer-style/vl-map-layer-circle-style/stories/vl-map-layer-circle-style.stories-arg';
import { mapLayerSwitcherArgTypes } from '../../../libs/map/src/components/layer-switcher/stories/vl-map-layer-switcher.stories-arg';
import { mapFeaturesLayerArgTypes } from '../../../libs/map/src/components/layer/vector-layer/vl-map-features-layer/stories/vl-map-features-layer.stories-arg';
import { mapWfsLayerArgTypes } from '../../../libs/map/src/components/layer/vector-layer/vl-map-wfs-layer/stories/vl-map-wfs-layer.stories-arg';
import { mapWmsLayerArgTypes } from '../../../libs/map/src/components/layer/wms-layer/stories/vl-map-wms-layer.stories-arg';
import { mapWmsStyleArgTypes } from '../../../libs/map/src/components/layer/wms-layer/vl-map-wms-style/stories/vl-map-wms-style.stories-arg';
import { mapWmtsLayerArgTypes } from '../../../libs/map/src/components/layer/wmts-layer/stories/vl-map-wmts-layer.stories-arg';
import { mapLegendItemArgTypes } from '../../../libs/map/src/components/legend-item/stories/vl-map-legend-item.stories-arg';
import { mapLegendArgTypes } from '../../../libs/map/src/components/legend/stories/vl-map-legend.stories-arg';
import { selectLocationArgTypes as selectLocationNextArgTypes } from '../../../libs/map/src/components/next/select-location/stories/vl-select-location.stories-arg';
import { mapSearchArgTypes } from '../../../libs/map/src/components/search/stories/vl-map-search.stories-arg';
import { selectLocationArgTypes } from '../../../libs/map/src/components/select-location/stories/vl-select-location.stories-arg';
import { mapSideSheetMenuItemArgTypes } from '../../../libs/map/src/components/side-sheet/stories/vl-map-side-sheet-menu-item.stories-arg';
import { mapSideSheetArgTypes } from '../../../libs/map/src/components/side-sheet/stories/vl-map-side-sheet.stories-arg';
import { mapArgTypes } from '../../../libs/map/src/stories/vl-map.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigMap: WTConfigArray = [
    buildWTConfig(
        'vl-map-click-action',
        mapClickActionArgTypes,
        '../../libs/map/src/components/action/click-action/stories/vl-map-click-action.stories-doc.mdx',
        '/docs/map-action-click-action--documentatie'
    ),
    buildWTConfig('vl-map-click-action-pindrop', null, null, null),
    buildWTConfig(
        'vl-map-draw-action-style',
        mapDrawActionStyleArgTypes,
        '../../libs/map/src/components/action/draw-action/draw-action-style/stories/vl-map-draw-action-style.stories-doc.mdx',
        '/docs/map-action-draw-action-draw-action-style--documentatie'
    ),
    buildWTConfig(
        'vl-map-draw-line-action',
        mapDrawActionArgTypes,
        '../../libs/map/src/components/action/draw-action/draw-line-action/stories/vl-map-draw-line-action.stories-doc.mdx',
        '/docs/map-action-draw-action-draw-action-style--documentatie'
    ),
    buildWTConfig(
        'vl-map-draw-point-action',
        mapDrawActionArgTypes,
        '../../libs/map/src/components/action/draw-action/draw-point-action/stories/vl-map-draw-point-action.stories-doc.mdx',
        '/docs/map-action-draw-action-draw-point-action--documentatie'
    ),
    buildWTConfig(
        'vl-map-draw-polygon-action',
        mapDrawActionArgTypes,
        '../../libs/map/src/components/action/draw-action/draw-polygon-action/stories/vl-map-draw-polygon-action.stories-doc.mdx',
        '/docs/map-action-draw-action-draw-polygon-action--documentatie'
    ),
    buildWTConfig(
        'vl-map-measure-action',
        mapDrawActionArgTypes,
        '../../libs/map/src/components/action/draw-action/measure-action/stories/vl-map-measure-action.stories-doc.mdx',
        '/docs/map-action-draw-action-measure-action--documentatie'
    ),
    buildWTConfig('vl-map-layer-action', null, null, null),
    buildWTConfig(
        'vl-map-delete-action',
        mapActionArgTypes,
        '../../libs/map/src/components/action/layer-action/delete-action/stories/vl-map-delete-action.stories-doc.mdx',
        '/docs/map-action-layer-action-delete-action--documentatie'
    ),
    buildWTConfig(
        'vl-map-modify-action',
        mapModifyActionArgTypes,
        '../../libs/map/src/components/action/layer-action/modify-action/stories/vl-map-modify-action.stories-doc.mdx',
        '/docs/map-action-layer-action-modify-action--documentatie'
    ),
    buildWTConfig(
        'vl-map-select-action',
        mapSelectActionArgTypes,
        '../../libs/map/src/components/action/layer-action/select-action/stories/vl-map-select-action.stories-doc.mdx',
        '/docs/map-action-layer-action-select-action--documentatie'
    ),
    buildWTConfig(
        'vl-map-multiselect-actions',
        mapMultiselectActionsArgTypes,
        '../../libs/map/src/components/action/layer-action/select-action/multiselect-actions/stories/vl-map-multiselect-actions.stories-doc.mdx',
        '/docs/map-action-layer-action-select-action-multiselect-actions--documentatie'
    ),
    buildWTConfig(
        'vl-map-select-actions',
        mapSelectActionsArgTypes,
        '../../libs/map/src/components/action/layer-action/select-action/select-actions/stories/vl-map-select-actions.stories-doc.mdx',
        '/docs/map-action-layer-action-select-action-select-actions--documentatie'
    ),
    buildWTConfig(
        'vl-map-baselayer',
        mapBaselayerArgTypes,
        '../../libs/map/src/components/baselayer/stories/vl-map-baselayer.stories-doc.mdx',
        '/docs/map-baselayer--documentatie'
    ),
    buildWTConfig(
        'vl-map-baselayer-grb',
        mapBaselayerArgTypes,
        '../../libs/map/src/components/baselayer/vl-map-base-layer-grb/stories/vl-map-baselayer-grb.stories-doc.mdx',
        '/docs/map-baselayer-baselayer-grb--documentatie'
    ),
    buildWTConfig(
        'vl-map-baselayer-grb-gray',
        mapBaselayerArgTypes,
        '../../libs/map/src/components/baselayer/vl-map-base-layer-grb-gray/stories/vl-map-baselayer-grb-gray.stories-doc.mdx',
        '/docs/map-baselayer-baselayer-grb-gray--documentatie'
    ),
    buildWTConfig(
        'vl-map-baselayer-grb-ortho',
        mapBaselayerArgTypes,
        '../../libs/map/src/components/baselayer/vl-map-base-layer-grb-ortho/stories/vl-map-baselayer-grb-ortho.stories-doc.mdx',
        '/docs/map-baselayer-baselayer-grb-ortho--documentatie'
    ),
    buildWTConfig(
        'vl-map-action-controls',
        defaultArgTypes(),
        '../../libs/map/src/components/controls/stories/vl-map-action-controls.stories-doc.mdx',
        '/docs/map-controls-action-controls--documentatie'
    ),
    buildWTConfig(
        'vl-map-action-control',
        mapActionControlArgTypes,
        '../../libs/map/src/components/controls/action-control/stories/vl-map-action-control.stories-doc.mdx',
        '/docs/map-controls-action-control--documentatie'
    ),
    buildWTConfig(
        'vl-map-measure-control',
        defaultArgTypes(),
        '../../libs/map/src/components/controls/measure-control/stories/vl-map-measure-control.stories-doc.mdx',
        '/docs/map-controls-measure-control--documentatie'
    ),
    buildWTConfig(
        'vl-map-current-location',
        mapCurrentLocationArgTypes,
        '../../libs/map/src/components/current-location/stories/vl-map-current-location.stories-doc.mdx',
        '/docs/map-current-location--documentatie'
    ),
    buildWTConfig(
        'vl-map-features-layer',
        mapFeaturesLayerArgTypes,
        '../../libs/map/src/components/layer/vector-layer/vl-map-features-layer/stories/vl-map-features-layer.stories-doc.mdx',
        '/docs/map-layer-vector-layer-features-layer--documentatie'
    ),
    buildWTConfig(
        'vl-map-wfs-layer',
        mapWfsLayerArgTypes,
        '../../libs/map/src/components/layer/vector-layer/vl-map-wfs-layer/stories/vl-map-wfs-layer.stories-doc.mdx',
        '/docs/map-layer-vector-layer-wfs-layer--documentatie'
    ),
    buildWTConfig(
        'vl-map-image-wms-layer',
        mapWmsLayerArgTypes,
        '../../libs/map/src/components/layer/wms-layer/vl-map-image-wms-layer/stories/vl-map-image-wms-layer.stories-doc.mdx',
        '/docs/map-layer-wms-layer-image-wms-layer--documentatie'
    ),
    buildWTConfig(
        'vl-map-tiled-wms-layer',
        mapWmsLayerArgTypes,
        '../../libs/map/src/components/layer/wms-layer/vl-map-tiled-wms-layer/stories/vl-map-tiled-wms-layer.stories-doc.mdx',
        '/docs/map-layer-wms-layer-tiled-wms-layer--documentatie'
    ),
    buildWTConfig(
        'vl-map-xyz-wms-layer',
        mapWmsLayerArgTypes,
        '../../libs/map/src/components/layer/wms-layer/vl-map-xyz-wms-layer/stories/vl-map-xyz-wms-layer.stories-doc.mdx',
        '/docs/map-layer-wms-layer-xyz-wms-layer--documentatie'
    ),
    buildWTConfig(
        'vl-map-wms-style',
        mapWmsStyleArgTypes,
        '../../libs/map/src/components/layer/wms-layer/vl-map-wms-style/stories/vl-map-wms-style.stories-doc.mdx',
        '/docs/map-layer-wms-layer-wms-style--documentatie'
    ),
    buildWTConfig(
        'vl-map-wmts-layer',
        mapWmtsLayerArgTypes,
        '../../libs/map/src/components/layer/wmts-layer/stories/vl-map-wmts-layer.stories-doc.mdx',
        '/docs/map-layer-wmts-layer--documentatie'
    ),
    buildWTConfig(
        'vl-map-layer-style',
        mapLayerStyleArgTypes,
        '../../libs/map/src/components/layer-style/stories/vl-map-layer-style.stories-doc.mdx',
        '/docs/map-layer-style--documentatie'
    ),
    buildWTConfig(
        'vl-map-layer-circle-style',
        mapLayerCircleStyleArgTypes,
        '../../libs/map/src/components/layer-style/vl-map-layer-circle-style/stories/vl-map-layer-circle-style.stories-doc.mdx',
        '/docs/map-layer-style-layer-circle-style--documentatie'
    ),
    buildWTConfig(
        'vl-map-layer-switcher',
        mapLayerSwitcherArgTypes,
        '../../libs/map/src/components/layer-switcher/stories/vl-map-layer-switcher.stories-doc.mdx',
        '/docs/map-layer-switcher--documentatie'
    ),
    buildWTConfig(
        'vl-map-legend',
        mapLegendArgTypes,
        '../../libs/map/src/components/legend/stories/vl-map-legend.stories-doc.mdx',
        '/docs/map-legend--documentatie'
    ),
    buildWTConfig(
        'vl-map-legend-item',
        mapLegendItemArgTypes,
        '../../libs/map/src/components/legend-item/stories/vl-map-legend-item.stories-doc.mdx',
        '/docs/map-legend-item--documentatie'
    ),
    buildWTConfig(
        'vl-map-loading-indicator',
        defaultArgTypes(),
        '../../libs/map/src/components/loading-indicator/stories/vl-map-loading-indicator.stories-doc.mdx',
        '/docs/map-loading-indicator--documentatie'
    ),
    buildWTConfig(
        'vl-map-overview-map',
        defaultArgTypes(),
        '../../libs/map/src/components/overview-map/stories/vl-map-overview-map.stories-doc.mdx',
        '/docs/map-overview-map--documentatie'
    ),
    buildWTConfig(
        'vl-map-search',
        mapSearchArgTypes,
        '../../libs/map/src/components/search/stories/vl-map-search.stories-doc.mdx',
        '/docs/map-search--documentatie'
    ),
    buildWTConfig(
        'vl-select-location',
        selectLocationArgTypes,
        '../../libs/map/src/components/select-location/stories/vl-select-location.stories-doc.mdx',
        '/docs/map-select-location--documentatie'
    ),
    buildWTConfig(
        'vl-select-location-next',
        selectLocationNextArgTypes,
        '../../libs/map/src/components/next/select-location/stories/vl-select-location.stories-doc.mdx',
        '/docs/map-select-location-next--documentatie'
    ),
    buildWTConfig(
        'vl-map-side-sheet',
        mapSideSheetArgTypes,
        '../../libs/map/src/components/side-sheet/stories/vl-map-side-sheet.stories-doc.mdx',
        '/docs/map-side-sheet-side-sheet--documentatie'
    ),
    buildWTConfig('vl-map-side-sheet-menu', null, null, '/docs/map-side-sheet-side-sheet-menu-item--documentatie'),
    buildWTConfig(
        'vl-map-side-sheet-menu-item',
        mapSideSheetMenuItemArgTypes,
        null,
        '/docs/map-side-sheet-side-sheet-menu-item--documentatie'
    ),
    buildWTConfig(
        'vl-map',
        mapArgTypes,
        '../../libs/map/src/stories/vl-map.stories-doc.mdx',
        '/docs/map-map--documentatie'
    ),
];

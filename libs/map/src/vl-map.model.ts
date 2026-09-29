import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlClusterSource from 'ol/source/Cluster';
import { FilterFunction as OlFilterFunction } from 'ol/interaction/Select';
import { StyleLike as OlStyleLike } from 'ol/style/Style';

export const EVENT = {
    ACTIVE_ACTION_CHANGED: 'vl-active-action-changed',
    LAYER_VISIBLE_CHANGED: 'vl-layer-visible-changed',
};

export const CONTROL_TYPE = {
    ACTION: 'action',
};

export const SCALE_POSITION = {
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
} as const;

export const IDENTIFIER = {
    MEASURE: 'measure',
};

export type OlVectorLayerType = OlVectorLayer<OlVectorSource | OlClusterSource>;

export interface ActionOptions {
    filter?: OlFilterFunction;
    style?: OlStyleLike;
    hoverStyle?: OlStyleLike;
    cluster?: boolean;
    // TODO: remove all any's
    snapping?: any;
    measure?: any;
    maxPoints?: any;
    geometryFunction?: any;
    layer?: any;
    source?: any;
    type?: any;
}

export interface MapActionPayload {
    layer?: OlVectorLayerType;
    callback?: (...args: any[]) => void;
    options?: ActionOptions;
}

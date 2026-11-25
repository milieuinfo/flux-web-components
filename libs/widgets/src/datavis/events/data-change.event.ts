import type { DataState } from '../models/chart.model';

export const DATA_CHANGE_EVENT = 'vl-data-change';

export type VlDataChangeEventDetail = DataState;

export function createDataChangeEvent(dataState: DataState): CustomEvent<VlDataChangeEventDetail> {
    return new CustomEvent(DATA_CHANGE_EVENT, { detail: dataState, bubbles: true, composed: true });
}

declare global {
    interface HTMLElementEventMap {
        [DATA_CHANGE_EVENT]: CustomEvent<VlDataChangeEventDetail>;
    }
}

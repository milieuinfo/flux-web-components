import type { Period } from '../source/period';

export const PERIOD_CHANGE_EVENT = 'vl-period-change';

export type VlPeriodChangeEventDetail = Period;

export function createPeriodChangeEvent(period: Period): CustomEvent<VlPeriodChangeEventDetail> {
    return new CustomEvent(PERIOD_CHANGE_EVENT, { detail: period, bubbles: true, composed: true });
}

declare global {
    interface HTMLElementEventMap {
        [PERIOD_CHANGE_EVENT]: CustomEvent<VlPeriodChangeEventDetail>;
    }
}

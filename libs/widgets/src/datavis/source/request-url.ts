import type { PeriodRange } from './period';

/** Bij `sample-data`: `from` en `to` als ISO 8601-parameters (gestandardiseerde
 *  tijdsdata) op `src`. */
export function buildRequestUrl(src: string, { from, to }: PeriodRange): string {
    const url = new URL(src, document.baseURI);
    url.searchParams.set('from', from.toISOString());
    url.searchParams.set('to', to.toISOString());
    return url.toString();
}

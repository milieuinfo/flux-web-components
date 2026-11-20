/** De vaste opbouw van `vl-data-figure`, van boven naar onder:
 * onderschrift met controls, filters, visual, uitleggen. */
export type FigureZone = 'controls' | 'filters' | 'explanations';

export function joinFigureZone(part: HTMLElement, zone: FigureZone): void {
    if (part.hasAttribute('slot') || part.parentElement?.localName !== 'vl-data-figure') return;
    part.slot = zone;
}

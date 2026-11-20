import type { Annotations, Shape } from 'plotly.js-basic-dist-min';
import type { ChartModel } from '../models/chart.model';
import { buildValueScale, type ValueScale } from './axis-ranges';
import { countDecimalsInValue, formatValue } from './value-format';

export type ChartReference = { value: number; label: string; isInView: boolean };

const OUT_OF_RANGE_ARROWS = { above: '↑', below: '↓' };

/** De waarde-as met de referentielijnen erop verdeeld. */
export type PlacedReferences = {
    valueScale: ValueScale;
    inRange: ChartReference[];
    outOfRange: ChartReference[];
};

/** De waarde-as groeit tot de referentielijn(en) met `in-view`. */
export function placeReferences(model: ChartModel, references: readonly ChartReference[]): PlacedReferences {
    const inViewValues = references.filter((reference) => reference.isInView).map((reference) => reference.value);
    const valueScale = buildValueScale(model, inViewValues);
    const inRange = references.filter((reference) => isReferenceInRange(reference, valueScale.range));
    const outOfRange = references.filter((reference) => !inRange.includes(reference));
    return { valueScale, inRange, outOfRange };
}

export function findOutOfRangeArrow(reference: ChartReference, valueScale: ValueScale): string {
    return reference.value > valueScale.range[1] ? OUT_OF_RANGE_ARROWS.above : OUT_OF_RANGE_ARROWS.below;
}

/** De notities boven de grafiek als tekst, met hun pijl, bv. "↑ EU-referentieniveau: 100 µT". */
export function describeOutOfRangeReferences(placed: PlacedReferences, unit?: string): string[] {
    return placed.outOfRange.map(
        (reference) => `${findOutOfRangeArrow(reference, placed.valueScale)} ${describeReference(reference, unit)}`,
    );
}

export function describeReference(reference: ChartReference, unit?: string): string {
    const value = formatValue(reference.value, countDecimalsInValue(reference.value), unit);
    return reference.label ? `${reference.label}: ${value}` : value;
}

export function isReferenceInRange(reference: ChartReference, range: readonly [number, number]): boolean {
    return reference.value >= range[0] && reference.value <= range[1];
}

export function buildReferenceShapes(references: readonly ChartReference[], color: string): Partial<Shape>[] {
    return references.map((reference) => ({
        type: 'line',
        layer: 'above',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: reference.value,
        y1: reference.value,
        line: { color, width: 1, dash: 'dash' },
    }));
}

export function buildReferenceLabels(
    references: readonly ChartReference[],
    unit: string | undefined,
    color: string,
    backgroundColor: string,
): Partial<Annotations>[] {
    return references.map((reference) => ({
        xref: 'paper',
        x: 0,
        xanchor: 'left',
        y: reference.value,
        yanchor: 'bottom',
        yshift: 2,
        text: describeReference(reference, unit),
        showarrow: false,
        bgcolor: backgroundColor,
        borderpad: 2,
        font: { color },
    }));
}

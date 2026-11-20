import type { Layout } from 'plotly.js-basic-dist-min';
// Laadt ook de aanvullingen op @types/plotly.js (ticklabelstandoff) als een tsconfig de map niet meeneemt.
import type {} from '../plotly-augment';
import { buildEdgeGridLines, buildPositionRange, buildPositionStep, type ValueScale } from '../layout/axis-ranges';
import { buildAxisTitle } from '../layout/axis-titles';
import { buildReferenceLabels, buildReferenceShapes, type ChartReference } from '../layout/reference-lines';
import { timeAxis, toLocalDateTime } from '../layout/time-format';
import { buildValueFormat, countDecimalsInData } from '../layout/value-format';
import type { ChartModel } from '../models/chart.model';
import type { ChartSpec } from './chart-spec';
import { chartDefaults, type ChartMargin } from './vl-chart.defaults';

export type PlotLayoutInput = {
    model: ChartModel;
    spec: ChartSpec;
    valueScale: ValueScale;
    margin: ChartMargin;
    /** Wat het grafiektype toevoegt, bv. directe labels (VlChart.buildChartLayout). */
    chartLayout: Partial<Layout>;
    /** De referentielijnen binnen het bereik van de waarde-as houden. */
    references: readonly ChartReference[];
    size: { width: number; height: number };
};

/** Stelt de layout die `#draw()` aan `plotly.react` samen.
 * @returns De volledige Plotly-layout: maat, marge, font, beide assen,
 * wat het grafiektype toevoegt en de referentielijnen. */
export function buildPlotLayout({
    model,
    spec,
    valueScale,
    margin,
    chartLayout,
    references,
    size,
}: PlotLayoutInput): Partial<Layout> {
    return {
        width: size.width,
        height: size.height,
        margin: { t: margin.top, r: margin.right, b: margin.bottom, l: margin.left },
        font: { family: spec.fontFamily, size: spec.fontSize, color: spec.textColor },
        hovermode: 'x', // De muis kiest de dichtstbijzijnde x.
        hoverdistance: -1,
        separators: chartDefaults.separators,
        xaxis: buildPositionAxis(model, spec),
        yaxis: buildValueAxis(model, spec, valueScale),
        ...chartLayout,
        annotations: [
            ...(chartLayout.annotations ?? []),
            ...buildReferenceLabels(references, model.meta.y.unit, spec.referenceColor, spec.backgroundColor),
        ],
        shapes: [
            ...buildEdgeGridLines(valueScale.range, spec.gridColor),
            ...(chartLayout.shapes ?? []),
            ...buildReferenceShapes(references, spec.referenceColor),
        ],
    };
}

/** Positie/x-as die returnt naar `buildPlotLayout`. */
function buildPositionAxis(model: ChartModel, spec: ChartSpec): Partial<Layout['xaxis']> {
    const range = buildPositionRange(model);
    const isTime = model.meta.x.type === 'time';
    const step = buildPositionStep(model);
    return {
        ...(isTime ? timeAxis : {}),
        // Gehele posities (bv. jaren) krijgen een gehele stap; `tick0: 0`
        // houdt de ticks op ronde getallen (2020, 2022).
        ...(step ? { tick0: 0, dtick: step } : {}),
        range: isTime && range ? range.map(toLocalDateTime) : range,
        automargin: true,
        showgrid: false,
        showline: false,
        zeroline: false,
        ticks: 'outside',
        ticklen: chartDefaults.tickLength,
        tickcolor: spec.axisColor,
        tickfont: { color: spec.axisColor },
        ticklabelstandoff: chartDefaults.positionTickLabelStandoff,
        title: {
            text: isTime ? undefined : buildAxisTitle(model.meta.x),
            font: { size: spec.fontSize, color: spec.axisColor },
            standoff: chartDefaults.positionTitleStandoff,
        },
    };
}

/** Waarde/y-as die raster en een nullijn weergeeft;
 * getallen worden voluit met duizendtal (1.250, niet 1250 of 1.25k)
 * weergegeven en de stappen tussen de rasterlijnen worden bepaalt door
 * `buildValueScale`. */
function buildValueAxis(model: ChartModel, spec: ChartSpec, { range, step }: ValueScale): Partial<Layout['yaxis']> {
    return {
        range,
        tick0: 0,
        dtick: step,
        automargin: true,
        showline: false,
        gridcolor: spec.gridColor,
        zeroline: true,
        zerolinecolor: spec.axisColor,
        zerolinewidth: chartDefaults.zeroLineWidth,
        exponentformat: 'none',
        separatethousands: true,
        hoverformat: buildValueFormat(countDecimalsInData(model)),
        tickfont: { color: spec.axisColor },
        ticklabelstandoff: chartDefaults.valueTickLabelStandoff,
    };
}

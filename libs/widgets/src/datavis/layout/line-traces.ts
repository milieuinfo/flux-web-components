import type { PlotData } from 'plotly.js-basic-dist-min';
import type { ChartAxis, ChartModel, ChartSeries } from '../models/chart.model';
import { findLastDataPointIndex } from '../models/series';
import { toPlotlyX } from './time-format';

const LINE_WIDTH = 2;
const MARKER_SIZE = 7;

export function buildMarkerSizes(series: ChartSeries, xAxisType: ChartAxis['type']): number[] {
    const { y } = series;
    const hasValue = (index: number) => index >= 0 && index < y.length && !Number.isNaN(y[index]);
    const lastIndex = findLastDataPointIndex(series, xAxisType);
    return Array.from(y, (_, index) => {
        const isLast = index === lastIndex;
        const isAlone = hasValue(index) && !hasValue(index - 1) && !hasValue(index + 1);
        if (isLast || isAlone) return MARKER_SIZE;
        return 0;
    });
}

export function buildLineTraces(
    model: ChartModel,
    colors: readonly string[],
    backgroundColor: string,
): Partial<PlotData>[] {
    return model.series.map((series, index): Partial<PlotData> => {
        const color = colors[index % colors.length];
        return {
            type: 'scatter',
            mode: 'lines+markers',
            name: series.name,
            x: toPlotlyX(model.meta.x, series.x),
            y: Array.from(series.y, (value) => (Number.isNaN(value) ? null : value)),
            connectgaps: false,
            // De positie-as loopt precies van eerste tot laatste x; zonder dit knipt Plotly de buitenste markers half af.
            cliponaxis: false,
            line: { color, width: LINE_WIDTH },
            marker: {
                size: buildMarkerSizes(series, model.meta.x.type),
                color: backgroundColor,
                line: { color, width: LINE_WIDTH },
            },
        };
    });
}

import type { ChartModel, ChartSeries, DataState } from './chart.model';
import { validateChartModel } from './validate-chart-model';

/** Bepaalt wat een grafiek rendert. */
export function classifyDataState(model: ChartModel): Exclude<DataState, { status: 'loading' }> {
    const problems = validateChartModel(model);

    if (problems.length > 0) return { status: 'error', problems };
    if (model.series.length === 0) return { status: 'empty' };
    if (model.series.some(hasGap)) return { status: 'partial', model };

    return { status: 'data', model };
}

function hasGap(series: ChartSeries): boolean {
    return series.y.some((value) => Number.isNaN(value));
}

// data-visualisation

export type { ChartAxis, ChartMeta, ChartModel, ChartSeries, DataState } from './models/chart.model';
export { validateChartModel } from './models/validate-chart-model';
export { classifyDataState } from './models/classify-data-state';
export type { ChartReference } from './layout/reference-lines';
export { DATA_CHANGE_EVENT, type VlDataChangeEventDetail } from './events/data-change.event';
export { PERIOD_CHANGE_EVENT, type VlPeriodChangeEventDetail } from './events/period-change.event';
export { VlChart, VlChartLine, VlChartReference } from './chart';
export {
    PERIOD_DURATIONS,
    sourceContext,
    VlDataPeriod,
    VlDataSource,
    type ChartModelJson,
    type Period,
    type PeriodDuration,
    type PeriodRange,
    type SourceFormat,
    type SourceState,
} from './source';
export {
    figureContext,
    VlDataAbout,
    VlDataControls,
    VlDataDownload,
    VlDataFigure,
    VlDataFullscreen,
    VlDataReadingGuide,
    VlDataTable,
    type DownloadFormat,
    type FigureState,
} from './figure';

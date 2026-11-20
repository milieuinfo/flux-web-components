import { chartLineArgTypes } from '../../../libs/widgets/src/datavis/chart/stories/vl-chart-line.stories-arg';
import { chartReferenceArgTypes } from '../../../libs/widgets/src/datavis/chart/stories/vl-chart-reference.stories-arg';
import { dataAboutArgTypes } from '../../../libs/widgets/src/datavis/figure/stories/vl-data-about.stories-arg';
import { dataControlsArgTypes } from '../../../libs/widgets/src/datavis/figure/stories/vl-data-controls.stories-arg';
import { dataDownloadArgTypes } from '../../../libs/widgets/src/datavis/figure/stories/vl-data-download.stories-arg';
import { dataFigureArgTypes } from '../../../libs/widgets/src/datavis/figure/stories/vl-data-figure.stories-arg';
import { dataFullscreenArgTypes } from '../../../libs/widgets/src/datavis/figure/stories/vl-data-fullscreen.stories-arg';
import { dataPeriodArgTypes } from '../../../libs/widgets/src/datavis/source/stories/vl-data-period.stories-arg';
import { dataReadingGuideArgTypes } from '../../../libs/widgets/src/datavis/figure/stories/vl-data-reading-guide.stories-arg';
import { dataSourceArgTypes } from '../../../libs/widgets/src/datavis/source/stories/vl-data-source.stories-arg';
import { dataTableArgTypes } from '../../../libs/widgets/src/datavis/figure/stories/vl-data-table.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigWidgetsDatavis: WTConfigArray = [
    buildWTConfig(
        'vl-data-source',
        dataSourceArgTypes,
        '../../libs/widgets/src/datavis/source/stories/vl-data-source.stories-doc.mdx',
        '/docs/data-visualisation-data-source--documentatie'
    ),
    buildWTConfig(
        'vl-data-period',
        dataPeriodArgTypes,
        '../../libs/widgets/src/datavis/source/stories/vl-data-period.stories-doc.mdx',
        '/docs/data-visualisation-data-period--documentatie'
    ),
    buildWTConfig(
        'vl-data-figure',
        dataFigureArgTypes,
        '../../libs/widgets/src/datavis/figure/stories/vl-data-figure.stories-doc.mdx',
        '/docs/data-visualisation-data-figure--documentatie'
    ),
    buildWTConfig(
        'vl-data-table',
        dataTableArgTypes,
        '../../libs/widgets/src/datavis/figure/stories/vl-data-table.stories-doc.mdx',
        '/docs/data-visualisation-data-table--documentatie'
    ),
    buildWTConfig(
        'vl-data-controls',
        dataControlsArgTypes,
        '../../libs/widgets/src/datavis/figure/stories/vl-data-controls.stories-doc.mdx',
        '/docs/data-visualisation-data-controls--documentatie'
    ),
    buildWTConfig(
        'vl-data-download',
        dataDownloadArgTypes,
        '../../libs/widgets/src/datavis/figure/stories/vl-data-download.stories-doc.mdx',
        '/docs/data-visualisation-data-download--documentatie'
    ),
    buildWTConfig(
        'vl-data-fullscreen',
        dataFullscreenArgTypes,
        '../../libs/widgets/src/datavis/figure/stories/vl-data-fullscreen.stories-doc.mdx',
        '/docs/data-visualisation-data-fullscreen--documentatie'
    ),
    buildWTConfig(
        'vl-data-reading-guide',
        dataReadingGuideArgTypes,
        '../../libs/widgets/src/datavis/figure/stories/vl-data-reading-guide.stories-doc.mdx',
        '/docs/data-visualisation-data-reading-guide--documentatie'
    ),
    buildWTConfig(
        'vl-data-about',
        dataAboutArgTypes,
        '../../libs/widgets/src/datavis/figure/stories/vl-data-about.stories-doc.mdx',
        '/docs/data-visualisation-data-about--documentatie'
    ),
    buildWTConfig(
        'vl-chart-line',
        chartLineArgTypes,
        '../../libs/widgets/src/datavis/chart/stories/vl-chart-line.stories-doc.mdx',
        '/docs/data-visualisation-chart-line--documentatie'
    ),
    buildWTConfig(
        'vl-chart-reference',
        chartReferenceArgTypes,
        '../../libs/widgets/src/datavis/chart/stories/vl-chart-reference.stories-doc.mdx',
        '/docs/data-visualisation-chart-reference--documentatie'
    ),
];

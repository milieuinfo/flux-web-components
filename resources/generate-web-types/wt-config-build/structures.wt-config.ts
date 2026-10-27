import { dashboardHeaderArgTypes } from '../../../libs/structures/src/dashboard/stories/vl-dashboard-header.stories-arg';
import { dashboardArgTypes } from '../../../libs/structures/src/dashboard/stories/vl-dashboard.stories-arg';
import { navLinkArgTypes } from '../../../libs/structures/src/dashboard/stories/vl-nav-link.stories-arg';
import { navSubArgTypes } from '../../../libs/structures/src/dashboard/stories/vl-nav-sub.stories-arg';
import { pageArgTypes } from '../../../libs/structures/src/page/stories/vl-page.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigStructures: WTConfigArray = [
    buildWTConfig(
        'vl-dashboard',
        dashboardArgTypes,
        '../../libs/structures/src/dashboard/stories/vl-dashboard.stories-doc.mdx',
        '/docs/structures-dashboard--documentatie'
    ),
    buildWTConfig(
        'vl-dashboard-header',
        dashboardHeaderArgTypes,
        '../../libs/structures/src/dashboard/stories/vl-dashboard-header.stories-doc.mdx',
        '/docs/structures-dashboard-dashboard-header--documentatie'
    ),
    buildWTConfig(
        'vl-nav-link',
        navLinkArgTypes,
        '../../libs/structures/src/dashboard/stories/vl-nav-link.stories-doc.mdx',
        '/docs/structures-dashboard-nav-link--documentatie'
    ),
    buildWTConfig(
        'vl-nav-sub',
        navSubArgTypes,
        '../../libs/structures/src/dashboard/stories/vl-nav-sub.stories-doc.mdx',
        '/docs/structures-dashboard-nav-sub--documentatie'
    ),
    buildWTConfig(
        'vl-page',
        pageArgTypes,
        '../../libs/structures/src/page/stories/vl-page.stories-doc.mdx',
        '/docs/structures-page--documentatie'
    ),
];

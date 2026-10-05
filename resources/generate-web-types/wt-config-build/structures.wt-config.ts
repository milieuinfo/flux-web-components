import { pageArgTypes } from '../../../libs/structures/src/page/stories/vl-page.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigStructures: WTConfigArray = [
    buildWTConfig(
        'vl-page',
        pageArgTypes,
        '../../libs/structures/src/page/stories/vl-page.stories-doc.mdx',
        '/docs/structures-page--documentatie'
    ),
];

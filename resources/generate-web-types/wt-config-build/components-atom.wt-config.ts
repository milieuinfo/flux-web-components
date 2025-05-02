import { WTConfigArray } from '../web-types.model';
import { buttonArgTypes } from '../../../libs/components/src/atom/button/stories/vl-button.stories-arg';
import { iconArgTypes } from '../../../libs/components/src/atom/icon/stories/vl-icon.stories-arg';
import { linkArgTypes } from '../../../libs/components/src/atom/link/stories/vl-link.stories-arg';
import { paragraphArgTypes } from '../../../libs/components/src/atom/paragraph/stories/vl-paragraph.stories-arg';
import { textArgTypes } from '../../../libs/components/src/atom/text/stories/vl-text.stories-arg';
import { titleArgTypes } from '../../../libs/components/src/atom/title/stories/vl-title.stories-arg';
import {buildWTConfig} from "./utils.wt-config";

export const buildWTConfigComponentsAtom: WTConfigArray = [
    buildWTConfig(
        'vl-button',
        buttonArgTypes,
        '../../libs/components/src/atom/button/stories/vl-button.stories-doc.mdx',
        '/docs/components-atom-button--documentatie'
    ),
    buildWTConfig(
        'vl-icon',
        iconArgTypes,
        '../../libs/components/src/atom/icon/stories/vl-icon.stories-doc.mdx',
        '/docs/components-atom-icon--documentatie'
    ),
    buildWTConfig(
        'vl-link',
        linkArgTypes,
        '../../libs/components/src/atom/link/stories/vl-link.stories-doc.mdx',
        '/docs/components-atom-link--documentatie'
    ),
    buildWTConfig(
        'vl-paragraph',
        paragraphArgTypes,
        '../../libs/components/src/atom/paragraph/stories/vl-paragraph.stories-doc.mdx',
        '/docs/components-atom-paragraph--documentatie'
    ),
    buildWTConfig(
        'vl-text',
        textArgTypes,
        '../../libs/components/src/atom/text/stories/vl-text.stories-doc.mdx',
        '/docs/components-atom-text-text--documentatie'
    ),
    buildWTConfig(
        'vl-title',
        titleArgTypes,
        '../../libs/components/src/atom/title/stories/vl-title.stories-doc.mdx',
        '/docs/components-atom-title--documentatie'
    ),
];

import { accessibilityArgTypes } from '../../../libs/sections/src/accessibility/stories/vl-accessibility.stories-arg';
import { cookieConsentArgTypes } from '../../../libs/sections/src/cookie-consent/stories/vl-cookie-consent.stories-arg';
import { cookieStatementArgTypes } from '../../../libs/sections/src/cookie-statement/stories/vl-cookie-statement.stories-arg';
import { footerArgTypes } from '../../../libs/sections/src/footer/stories/vl-footer.stories-arg';
import { headerArgTypes } from '../../../libs/sections/src/header/stories/vl-header.stories-arg';
import { footerArgTypes as footerNextArgTypes } from '../../../libs/sections/src/next/footer/stories/vl-footer.stories-arg';
import { headerArgTypes as headerNextArgTypes } from '../../../libs/sections/src/next/header/stories/vl-header.stories-arg';
import { privacyArgTypes } from '../../../libs/sections/src/privacy/stories/vl-privacy.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigSections: WTConfigArray = [
    buildWTConfig(
        'vl-accessibility',
        accessibilityArgTypes,
        '../../libs/sections/src/accessibility/stories/vl-accessibility.stories-doc.mdx',
        '/docs/sections-accessibility--documentatie'
    ),
    buildWTConfig(
        'vl-cookie-consent',
        cookieConsentArgTypes,
        '../../libs/sections/src/cookie-consent/stories/vl-cookie-consent.stories-doc.mdx',
        '/docs/sections-cookie-consent--documentatie'
    ),
    buildWTConfig('vl-cookie-consent-opt-in', null, null, '/docs/sections-cookie-consent--documentatie'),
    buildWTConfig(
        'vl-cookie-statement',
        cookieStatementArgTypes,
        '../../libs/sections/src/cookie-statement/stories/vl-cookie-statement.stories-doc.mdx',
        '/docs/sections-cookie-statement--documentatie'
    ),
    buildWTConfig('vl-authentication-cookie', null, null, '/docs/sections-cookie-statement--documentatie'),
    buildWTConfig('vl-cookie', null, null, '/docs/sections-cookie-statement--documentatie'),
    buildWTConfig('vl-header-authentication-cookie', null, null, '/docs/sections-cookie-statement--documentatie'),
    buildWTConfig('vl-header-cookie', null, null, '/docs/sections-cookie-statement--documentatie'),
    buildWTConfig('vl-jsessionid-cookie', null, null, '/docs/sections-cookie-statement--documentatie'),
    buildWTConfig('vl-sticky-session-cookie', null, null, '/docs/sections-cookie-statement--documentatie'),
    buildWTConfig(
        'vl-footer',
        footerArgTypes,
        '../../libs/sections/src/footer/stories/vl-footer.stories-doc.mdx',
        '/docs/sections-footer--documentatie'
    ),
    buildWTConfig(
        'vl-header',
        headerArgTypes,
        '../../libs/sections/src/header/stories/vl-header.stories-doc.mdx',
        '/docs/sections-header--documentatie'
    ),
    buildWTConfig(
        'vl-header-next',
        headerNextArgTypes,
        '../../libs/sections/src/next/header/stories/vl-header.stories-doc.mdx',
        '/docs/sections-next-header--documentatie'
    ),
    buildWTConfig(
        'vl-footer-next',
        footerNextArgTypes,
        '../../libs/sections/src/next/footer/stories/vl-footer.stories-doc.mdx',
        '/docs/sections-next-footer--documentatie'
    ),
    buildWTConfig(
        'vl-privacy',
        privacyArgTypes,
        '../../libs/sections/src/privacy/stories/vl-privacy.stories-doc.mdx',
        '/docs/sections-privacy--documentatie'
    ),
];

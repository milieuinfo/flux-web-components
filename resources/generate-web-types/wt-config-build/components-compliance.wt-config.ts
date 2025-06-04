import { accessibilityArgTypes } from '../../../libs/components/src/compliance/accessibility/stories/vl-accessibility.stories-arg';
import { cookieConsentArgTypes } from '../../../libs/components/src/compliance/cookie-consent/stories/vl-cookie-consent.stories-arg';
import { cookieStatementArgTypes } from '../../../libs/components/src/compliance/cookie-statement/stories/vl-cookie-statement.stories-arg';
import { footerArgTypes } from '../../../libs/components/src/compliance/footer/stories/vl-footer.stories-arg';
import { headerArgTypes } from '../../../libs/components/src/compliance/header/stories/vl-header.stories-arg';
import { privacyArgTypes } from '../../../libs/components/src/compliance/privacy/stories/vl-privacy.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigComponentsCompliance: WTConfigArray = [
    buildWTConfig(
        'vl-accessibility',
        accessibilityArgTypes,
        '../../libs/components/src/compliance/accessibility/stories/vl-accessibility.stories-doc.mdx',
        '/docs/components-compliance-accessibility--documentatie'
    ),
    buildWTConfig(
        'vl-cookie-consent',
        cookieConsentArgTypes,
        '../../libs/components/src/compliance/cookie-consent/stories/vl-cookie-consent.stories-doc.mdx',
        '/docs/components-compliance-cookie-consent--documentatie'
    ),
    buildWTConfig('vl-cookie-consent-opt-in', null, null, '/docs/components-compliance-cookie-consent--documentatie'),
    buildWTConfig(
        'vl-cookie-statement',
        cookieStatementArgTypes,
        '../../libs/components/src/compliance/cookie-statement/stories/vl-cookie-statement.stories-doc.mdx',
        '/docs/components-compliance-cookie-statement--documentatie'
    ),
    buildWTConfig('vl-authentication-cookie', null, null, '/docs/components-compliance-cookie-statement--documentatie'),
    buildWTConfig('vl-cookie', null, null, '/docs/components-compliance-cookie-statement--documentatie'),
    buildWTConfig(
        'vl-header-authentication-cookie',
        null,
        null,
        '/docs/components-compliance-cookie-statement--documentatie'
    ),
    buildWTConfig('vl-header-cookie', null, null, '/docs/components-compliance-cookie-statement--documentatie'),
    buildWTConfig('vl-jsessionid-cookie', null, null, '/docs/components-compliance-cookie-statement--documentatie'),
    buildWTConfig('vl-sticky-session-cookie', null, null, '/docs/components-compliance-cookie-statement--documentatie'),
    buildWTConfig(
        'vl-footer',
        footerArgTypes,
        '../../libs/components/src/compliance/footer/stories/vl-footer.stories-doc.mdx',
        '/docs/components-compliance-footer--documentatie'
    ),
    buildWTConfig(
        'vl-header',
        headerArgTypes,
        '../../libs/components/src/compliance/header/stories/vl-header.stories-doc.mdx',
        '/docs/components-compliance-header--documentatie'
    ),
    buildWTConfig(
        'vl-privacy',
        privacyArgTypes,
        '../../libs/components/src/compliance/privacy/stories/vl-privacy.stories-doc.mdx',
        '/docs/components-compliance-privacy--documentatie'
    ),
];

import 'construct-style-sheets-polyfill';
import { UigConfig } from '@domg-wc/common';
import { CSSResult } from 'lit';

// @govflanders common styles
import {
    accessibilityStyle,
    alignStyle,
    backgroundStyle,
    baseStyle,
    elementStyle,
    gridStyle,
    layoutStyle,
    resetStyle,
    typographyStyle as commonTypographyStyle,
    visibilityStyle,
} from '@domg/govflanders-style/common';
// @govflanders component styles
import {
    buttonStyle,
    doormatStyle,
    iconStyle,
    infotextStyle,
    inputAddonStyle,
    inputFieldStyle,
    introductionStyle,
    linkListStyle,
    linkStyle,
    pillInputStyle,
    pillStyle,
    popoverStyle,
    typographyStyle as componentTypographyStyle,
} from '@domg/govflanders-style/component';

const commonStyles: CSSResult[] = [
    resetStyle,
    accessibilityStyle,
    alignStyle,
    baseStyle,
    elementStyle,
    gridStyle,
    layoutStyle,
    commonTypographyStyle,
    visibilityStyle,
    backgroundStyle,
];

const componentStyles: CSSResult[] = [
    buttonStyle, // accordion
    doormatStyle,
    iconStyle,
    infotextStyle,
    inputAddonStyle,
    inputFieldStyle, // autocomplete
    introductionStyle, // unknown
    linkStyle,
    linkListStyle,
    pillStyle,
    pillInputStyle,
    popoverStyle, // popover
    componentTypographyStyle, // typography
];

export const allLegacyStyles = [...commonStyles, ...componentStyles] as CSSResult[];

export default allLegacyStyles;

class RegisterLegacyStyles {
    static legacyStylesRegistered = false;

    static registerLegacyStyles() {
        if (UigConfig.getPreferences().autoRegisterStyles && !this.legacyStylesRegistered) {
            document.adoptedStyleSheets = [
                ...document.adoptedStyleSheets,
                ...(allLegacyStyles.map((style) => style.styleSheet) as CSSStyleSheet[]),
            ];
            this.legacyStylesRegistered = true;
            console.log('RegisterLegacyStyles: legacy styles toegevoegd aan het document');
        }
    }
}

export const legacyGlobalStyles =
    () =>
    // eslint-disable-line @typescript-eslint/ban-types
    (constructor: Function) => {
        RegisterLegacyStyles.registerLegacyStyles();
    };

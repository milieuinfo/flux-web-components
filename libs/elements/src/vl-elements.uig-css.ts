import 'construct-style-sheets-polyfill';
import { UigConfig } from '@domg-wc/common-utilities';
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

export const allElementStyles = [...commonStyles, ...componentStyles] as CSSResult[];

export default allElementStyles;

class RegisterStyles {
    static elementStylesRegistered = false;

    static registerElementsStyles() {
        if (UigConfig.getPreferences().autoRegisterStyles && !this.elementStylesRegistered) {
            document.adoptedStyleSheets = [
                ...document.adoptedStyleSheets,
                ...(allElementStyles.map((style) => style.styleSheet) as CSSStyleSheet[]),
            ];
            this.elementStylesRegistered = true;
            console.log('RegisterStyles: element-styling toegevoegd aan het document');
        }
    }
}

export const elementStyles =
    () =>
    // eslint-disable-line @typescript-eslint/ban-types
    (constructor: Function) => {
        RegisterStyles.registerElementsStyles();
    };

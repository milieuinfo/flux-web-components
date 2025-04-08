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

// @govflanders component styles
import {
    actionGroupStyle,
    buttonStyle,
    dataTableStyle,
    doormatStyle,
    formMessageStyle,
    formStructureStyle,
    iconStyle,
    infotextStyle,
    imageStyle,
    inputAddonStyle,
    inputFieldStyle,
    inputGroupStyle,
    introductionStyle,
    linkStyle,
    linkListStyle,
    pillStyle,
    pillInputStyle,
    selectStyle,
    multiselectStyle,
    popoverStyle,
    propertiesStyle,
    searchFilterStyle,
    searchResultsStyle,
    sideNavigationStyle,
    textareaStyle,
    toasterStyle,
    titlesStyle,
    typographyStyle as componentTypographyStyle,
    videoPlayerStyle,
    tooltipStyle,
} from '@domg/govflanders-style/component';

const componentStyles: CSSResult[] = [
    actionGroupStyle,
    buttonStyle,
    dataTableStyle,
    doormatStyle,
    formMessageStyle,
    formStructureStyle,
    iconStyle,
    infotextStyle,
    imageStyle,
    inputAddonStyle,
    inputFieldStyle,
    inputGroupStyle,
    introductionStyle,
    linkStyle,
    linkListStyle,
    pillStyle,
    pillInputStyle,
    selectStyle,
    multiselectStyle,
    popoverStyle,
    propertiesStyle,
    searchFilterStyle,
    searchResultsStyle,
    sideNavigationStyle,
    textareaStyle,
    toasterStyle,
    titlesStyle,
    componentTypographyStyle,
    videoPlayerStyle,
    // tooltip styling needs to be known outside the shadow root of tooltip itself
    tooltipStyle,
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    (constructor: Function) => {
        RegisterStyles.registerElementsStyles();
    };

import 'construct-style-sheets-polyfill';

// @govflanders common styles
import {
    accessibilityStyle,
    alignStyle,
    backgroundStyle,
    baseStyle,
    elementStyle,
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
} from '@domg/govflanders-style/component';
import { CSSResult } from 'lit';

const legacyCommonStyles: CSSResult[] = [
    accessibilityStyle,
    alignStyle,
    baseStyle,
    elementStyle,
    visibilityStyle,
    backgroundStyle,
];

const legacyComponentStyles: CSSResult[] = [
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
];

export const vlLegacyStyles = [...legacyCommonStyles, ...legacyComponentStyles] as CSSResult[];

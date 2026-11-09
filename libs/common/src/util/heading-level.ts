import { literal, StaticValue } from 'lit/static-html.js';

const HEADING_LEVELS = ['1', '2', '3', '4', '5', '6'] as const;

export type HeadingLevel = (typeof HEADING_LEVELS)[number];

const HEADING_TAGS: Record<HeadingLevel, StaticValue> = {
    '1': literal`h1`,
    '2': literal`h2`,
    '3': literal`h3`,
    '4': literal`h4`,
    '5': literal`h5`,
    '6': literal`h6`,
};

const toHeadingLevel = (level: unknown): HeadingLevel | undefined => {
    const value = String(level);
    return (HEADING_LEVELS as readonly string[]).includes(value) ? (value as HeadingLevel) : undefined;
};

export const isValidHeadingLevel = (level: unknown): boolean => toHeadingLevel(level) !== undefined;

export const headingTag = (level: unknown, fallback: HeadingLevel): StaticValue =>
    HEADING_TAGS[toHeadingLevel(level) ?? fallback];

export const invalidHeadingLevelWarning = (element: Element, level: unknown): string =>
    `${element.localName}: de waarde "${level}" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.`;

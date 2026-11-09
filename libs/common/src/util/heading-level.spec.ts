import { render } from 'lit';
import { html } from 'lit/static-html.js';
import { HeadingLevel, headingTag, invalidHeadingLevelWarning, isValidHeadingLevel } from './heading-level';

const renderHeading = (level: unknown, fallback: HeadingLevel): Element => {
    const container = document.createElement('div');
    const tag = headingTag(level, fallback);
    render(html`<${tag} class="title">titel</${tag}>`, container);
    return container.firstElementChild as Element;
};

describe('jest - common - heading-level', () => {
    it('should accept the levels 1 to 6, as string or as number', () => {
        ['1', '2', '3', '4', '5', '6', 1, 2, 3, 4, 5, 6].forEach((level) =>
            expect(isValidHeadingLevel(level)).toBe(true),
        );
    });

    it('should reject everything else', () => {
        [null, undefined, '', '0', '7', 'h2', ' 2', '2.0', 0, 7, 2.5, NaN, 'script'].forEach((level) =>
            expect(isValidHeadingLevel(level)).toBe(false),
        );
    });

    it('should render the heading of a valid level', () => {
        ['1', '2', '3', '4', '5', '6'].forEach((level) => {
            const heading = renderHeading(level, '3');
            expect(heading.tagName).toBe(`H${level}`);
            expect(heading.className).toBe('title');
            expect(heading.textContent).toBe('titel');
        });
    });

    it('should render the heading of a level given as number', () => {
        expect(renderHeading(2, '3').tagName).toBe('H2');
    });

    it('should render the fallback heading for an invalid level', () => {
        [null, undefined, '', '7', 'h2', 'script'].forEach((level) =>
            expect(renderHeading(level, '3').tagName).toBe('H3'),
        );
    });

    it('should name the element and the invalid value in the warning', () => {
        expect(invalidHeadingLevelWarning(document.createElement('vl-example'), '7')).toBe(
            'vl-example: de waarde "7" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.',
        );
    });
});

import { css, unsafeCSS } from 'lit';
import { GlobalStyles } from './global-styles';

const defaultColor = 'rgba(0, 0, 0, 0)';
const initialColor = 'rgb(0, 255, 0)';
const customColor = 'rgb(0, 0, 255)';
const exceptionalColor = 'rgb(255, 0, 0)';

const initialCSS = css`
    body {
        background-color: ${unsafeCSS(initialColor)};
    }
`;

const customCSS = css`
    body {
        background-color: ${unsafeCSS(customColor)};
    }
`;

const exceptionalCSS = css`
    body {
        background-color: ${unsafeCSS(exceptionalColor)};
    }
`;

const verifyBackgroundColor = (color: string) => {
    expect(document.body.computedStyleMap().get('background-color')?.toString()).to.be.equal(color);
};

const verifyBackgroundColorIsDefault = () => verifyBackgroundColor(defaultColor);
const verifyBackgroundColorIsInitial = () => verifyBackgroundColor(initialColor);
const verifyBackgroundColorIsCustom = () => verifyBackgroundColor(customColor);
const verifyBackgroundColorIsExceptional = () => verifyBackgroundColor(exceptionalColor);

describe('common-utilities global-styles', () => {
    beforeEach(() => {
        GlobalStyles['instance'] = null;
        document.adoptedStyleSheets = [];
        verifyBackgroundColorIsDefault();
    });

    it('should register an initial stylesheet', () => {
        GlobalStyles.getInstance([initialCSS]).register();
        expect(document.adoptedStyleSheets).lengthOf(1);
        verifyBackgroundColorIsInitial();
    });

    it('should register an initial stylesheet and afterwords a custom one', () => {
        GlobalStyles.getInstance([initialCSS]).register();
        expect(document.adoptedStyleSheets).lengthOf(1);
        verifyBackgroundColorIsInitial();
        GlobalStyles.getInstance().addCustomCss([customCSS]);
        expect(document.adoptedStyleSheets).lengthOf(2);
        verifyBackgroundColorIsCustom();
    });

    it('should register 2 stylesheets at once: an initial and a custom', () => {
        GlobalStyles.getInstance([initialCSS]).addCustomCss([customCSS]);
        expect(document.adoptedStyleSheets).lengthOf(0);
        verifyBackgroundColorIsDefault();
        GlobalStyles.getInstance().register();
        expect(document.adoptedStyleSheets).lengthOf(2);
        verifyBackgroundColorIsCustom();
    });

    it('should register 2 stylesheets at once, afterwords it registers an extra one', () => {
        GlobalStyles.getInstance([initialCSS]).addCustomCss([customCSS]);
        expect(document.adoptedStyleSheets).lengthOf(0);
        verifyBackgroundColorIsDefault();
        GlobalStyles.getInstance().register();
        expect(document.adoptedStyleSheets).lengthOf(2);
        verifyBackgroundColorIsCustom();
        GlobalStyles.getInstance().addCustomCss([exceptionalCSS]);
        expect(document.adoptedStyleSheets).lengthOf(3);
        verifyBackgroundColorIsExceptional();
    });
});

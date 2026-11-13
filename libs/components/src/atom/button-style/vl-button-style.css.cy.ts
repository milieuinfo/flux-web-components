import { GlobalStyles } from '@domg-wc/common';
import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlButtonElements, vlButtonStyles } from './vl-button-style.css';
import { buttonVariants, renderAllButtonVariants } from './vl-button-style.util';

const actionColor = 'rgb(0, 85, 204)';
const disabledColor = 'rgb(104, 116, 131)';
const disabledBackgroundColor = 'rgb(203, 210, 217)';
const disabledGhostColor = 'rgb(167, 177, 191)';
const transparent = 'rgba(0, 0, 0, 0)';

const relativeLuminance = (rgbColor: string) => {
    const [red, green, blue] = rgbColor
        .match(/\d+/g)!
        .map((channel) => Number(channel) / 255)
        .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (rgbColor: string, otherRgbColor: string) => {
    const [darkest, lightest] = [relativeLuminance(rgbColor), relativeLuminance(otherRgbColor)].sort((a, b) => a - b);
    return (lightest + 0.05) / (darkest + 0.05);
};

// cy.trigger('mouseover') zet :hover niet; via het Chrome DevTools Protocol beweegt de echte muisaanwijzer.
const realMouseMove = (x: number, y: number) =>
    Cypress.automation('remote:debugger:protocol', {
        command: 'Input.dispatchMouseEvent',
        params: { type: 'mouseMoved', x, y },
    });

const realHover = ($element: JQuery<HTMLElement>) => {
    const element = $element[0];
    const autWindow = element.ownerDocument.defaultView!;
    const frameRect = autWindow.frameElement!.getBoundingClientRect();
    const scale = frameRect.width / autWindow.innerWidth;
    const elementRect = element.getBoundingClientRect();
    return realMouseMove(
        frameRect.left + (elementRect.left + elementRect.width / 2) * scale,
        frameRect.top + (elementRect.top + elementRect.height / 2) * scale,
    );
};

describe('cypress-component - atom components - vl-button-style', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <style>
                ${unsafeCSS(vlButtonStyles('button', '.cy-button'))}
            </style>
            ${renderAllButtonVariants('button', 'cy-button')}
        `);
    });

    buttonVariants.forEach((buttonVariant) => {
        let expectedBackgroundColor: string;
        let expectedBorderColor: string;
        let expectedBorderWidth = 2;
        let expectedMargin = 0;
        let expectedPadding = 10;
        const isGhost = buttonVariant === 'ghost';

        switch (buttonVariant) {
            case 'secondary':
                expectedBackgroundColor = 'rgba(0, 0, 0, 0)';
                expectedBorderColor = 'rgb(0, 85, 204)';
                break;
            case 'tertiary':
                expectedBackgroundColor = 'rgba(0, 0, 0, 0)';
                expectedBorderColor = 'rgb(198, 205, 211)';
                expectedBorderWidth = 1;
                expectedPadding = 11;
                break;
            case 'ghost':
                expectedBackgroundColor = 'rgba(0, 0, 0, 0)';
                expectedBorderColor = 'rgba(0, 0, 0, 0)';
                expectedBorderWidth = 1;
                expectedPadding = 11;
                break;
            case 'error':
                expectedBackgroundColor = 'rgb(210, 55, 60)';
                expectedBorderColor = 'rgb(210, 55, 60)';
                break;
            default:
                expectedBackgroundColor = 'rgb(0, 85, 204)';
                expectedBorderColor = 'rgb(0, 85, 204)';
                break;
        }

        it(`should have the correct default style - variant: ${buttonVariant}`, () => {
            cy.get(`.cy-button.${buttonVariant}.default.idle.icon-none`)
                .shouldHaveComputedStyle({
                    style: 'background-color',
                    value: expectedBackgroundColor,
                })
                .shouldHaveComputedStyle({
                    style: 'border-color',
                    value: expectedBorderColor,
                })
                .shouldHaveComputedStyle({
                    style: 'border-width',
                    value: `${expectedBorderWidth}px`,
                })
                .shouldHaveComputedStyle({
                    style: 'margin',
                    value: `${expectedMargin}px`,
                })
                .shouldHaveComputedStyle({
                    style: 'padding',
                    value: `${expectedPadding}px`,
                });
        });

        it(`should have the correct disabled style - variant: ${buttonVariant}`, () => {
            cy.get(`.cy-button.${buttonVariant}.default.disabled.icon-none`)
                .shouldHaveComputedStyle({
                    style: 'color',
                    value: isGhost ? disabledGhostColor : disabledColor,
                })
                .shouldHaveComputedStyle({
                    style: 'background-color',
                    value: isGhost ? transparent : disabledBackgroundColor,
                });
        });
    });

    it('should show an icon-only disabled ghost button and its icon in the disabled ghost color', () => {
        cy.get('.cy-button.ghost.default.disabled.icon-only')
            .shouldHaveComputedStyle({ style: 'color', value: disabledGhostColor })
            .find('.vl-icon')
            .shouldHaveComputedStyle({ style: 'color', value: disabledGhostColor });
    });

    it('should distinguish a disabled ghost button from an enabled one by lightness, not only by hue', () => {
        cy.get('.cy-button.ghost.default.idle.icon-none').shouldHaveComputedStyle({
            style: 'color',
            value: actionColor,
        });
        cy.get('.cy-button.ghost.default.disabled.icon-none').should(($button) => {
            // WCAG 1.4.1, techniek G183: een toestand die enkel in kleur verschilt, vraagt minstens 3:1 contrast.
            expect(contrastRatio(getComputedStyle($button[0]).color, actionColor)).to.be.at.least(3);
        });
    });
});

describe('cypress-component - atom components - vl-button-style - disabled ghost', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
    });

    // Een aanwijzer die blijft staan, geeft de knop van de volgende test opnieuw :hover.
    afterEach(() => {
        cy.then(() => realMouseMove(0, 0));
    });

    ['ghost disabled', 'ghost error disabled', 'ghost loading disabled'].forEach((classes) => {
        const mountButton = () =>
            cy.mount(html`
                <style>
                    ${unsafeCSS(vlButtonStyles('button', '.cy-button'))}
                </style>
                <button class="cy-button ${classes}">Klik hier</button>
            `);

        it(`should have the disabled ghost color - case: ${classes}`, () => {
            mountButton();

            cy.get('.cy-button').shouldHaveComputedStyle({ style: 'color', value: disabledGhostColor });
        });

        it(`should keep the disabled ghost color on hover - case: ${classes}`, () => {
            mountButton();

            cy.get('.cy-button').then(($button) => realHover($button));

            cy.get('.cy-button')
                .should(($button) => expect($button[0].matches(':hover')).to.be.true)
                .shouldHaveComputedStyle({ style: 'color', value: disabledGhostColor });
        });

        it(`should keep the disabled ghost color on focus - case: ${classes}`, () => {
            mountButton();

            cy.get('.cy-button').focus();

            cy.get('.cy-button')
                .should(($button) => expect($button[0].matches(':focus')).to.be.true)
                .shouldHaveComputedStyle({ style: 'color', value: disabledGhostColor });
        });
    });
});

describe('cypress-component - atom components - vl-button-style - sizes', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
    });
    const baseWidth = 115.812; // gebaseerd op "Klik op mij" tekst

    // expected heights
    const defaultHeight = 35;
    const largeHeight = 56;
    const mobileHeight = 44;

    // expected width increments
    const narrowWidthIncrement = -20;
    const wideWidthIncrement = 80;
    const loadingWidthIncrement = 60;

    // width increment aanpassingen bij bepaalde height varianten
    const largeVariantWidthIncrement = 9;
    const largeVariantIconBeforeWidthIncrement = 3;
    const largeVariantIconAfterWidthIncrement = 3;
    const largeVariantIconOnlyWidthIncrement = -9;
    const mobileVariantLoadingWidthIncrement = -10;

    // Loop through element types
    vlButtonElements.forEach((element) => {
        // Loop through possible heights
        Object.entries({
            default: defaultHeight,
            large: largeHeight,
            mobile: mobileHeight,
        }).forEach(([heightVariant, expectedHeight]) => {
            // Loop through possible widths
            Object.entries({
                default: 0,
                narrow: narrowWidthIncrement,
                wide: wideWidthIncrement,
                loading: loadingWidthIncrement,
            }).forEach(([widthVariant, widthIncrement]) => {
                it(`should have the correct size, case: ${element} element, ${heightVariant} height, ${widthVariant} width`, () => {
                    cy.viewport(heightVariant === 'mobile' ? 500 : 1000, 600);

                    const isLink = element === 'a';

                    cy.mount(html`
                        <style>
                            ${unsafeCSS(vlButtonStyles(element, '.cy-button'))}
                        </style>
                        ${isLink
                            ? html`<a
                                  class="cy-button ${heightVariant} ${widthVariant}"
                                  href=${ifDefined(isLink ? 'https://vlaanderen.be' : undefined)}
                                  >Klik op mij</a
                              >`
                            : html`<button class="cy-button ${heightVariant} ${widthVariant}">Klik op mij</button>`}
                    `);

                    cy.get('.cy-button').then(([buttonElement]) => {
                        const { width, height } = buttonElement.getBoundingClientRect();
                        expect(Math.round(width)).to.equal(
                            Math.round(
                                baseWidth +
                                    widthIncrement +
                                    // Bij "large" komt er ook extra padding bij
                                    (heightVariant === 'large' ? largeVariantWidthIncrement : 0) +
                                    // Bij "large" en iconBefore
                                    (heightVariant === 'large' && widthVariant === 'iconBefore'
                                        ? largeVariantIconBeforeWidthIncrement
                                        : 0) +
                                    // Bij "large" en iconAfter
                                    (heightVariant === 'large' && widthVariant === 'iconAfter'
                                        ? largeVariantIconAfterWidthIncrement
                                        : 0) +
                                    // Bij "large" en iconOnly
                                    (heightVariant === 'large' && widthVariant === 'iconOnly'
                                        ? largeVariantIconOnlyWidthIncrement
                                        : 0) +
                                    // De default "mobile" variant heeft dezelfde padding als "narrow"
                                    (heightVariant === 'mobile' &&
                                    ['default', 'iconBefore', 'iconAfter'].includes(widthVariant)
                                        ? narrowWidthIncrement
                                        : 0) +
                                    // Bij "mobile" en "loading"
                                    (heightVariant === 'mobile' && widthVariant === 'loading'
                                        ? mobileVariantLoadingWidthIncrement
                                        : 0),
                            ),
                        );
                        expect(Math.round(height)).to.equal(
                            // iconOnly heeft geen large variant
                            widthVariant === 'iconOnly' ? defaultHeight : expectedHeight,
                        );
                    });
                });
            });
        });
    });
});

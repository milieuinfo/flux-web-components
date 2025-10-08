import { GlobalStyles } from '@domg-wc/common';
import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlButtonElements, vlButtonStyles } from './vl-button-style.css';
import { buttonVariants, renderAllButtonVariants } from './vl-button-style.util';

describe('styles - vl-button-style', () => {
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
    });
});

describe('styles - vl-button-style - sizes', () => {
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
                                        : 0)
                            )
                        );
                        expect(Math.round(height)).to.equal(
                            // iconOnly heeft geen large variant
                            widthVariant === 'iconOnly' ? defaultHeight : expectedHeight
                        );
                    });
                });
            });
        });
    });
});

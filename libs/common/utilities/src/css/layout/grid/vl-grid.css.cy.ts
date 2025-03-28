import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';

describe('grid styles', () => {
    const gridResponsive = html`
        <style>
            .vl-grid-next {
                --vl-column-min-height: 8vmax;
                --vl-grid-row-gap: 0px;
                --vl-grid-col-gap: 0px;
                padding: 1vmax;

                .vl-column-next {
                    min-height: 8vmax;
                    background-color: mediumspringgreen;
                    border: lightseagreen 2px solid;
                }

                .sb-header {
                    background-color: lightblue;
                }

                .sb-footer {
                    background-color: lightblue;
                }

                .sb-main {
                    grid-row: span 3;
                }
            }
        </style>
        <div class="vl-grid-next">
            <div
                class="vl-column-next sb-header vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-9 cy-cell-1-1"
            ></div>
            <div
                class="vl-column-next sb-header vl-column-next--11 vl-column-next--m-9 vl-column-next--s-6 vl-column-next--xs-3 cy-cell-1-2"
            ></div>
            <div class="sb-main vl-column-next vl-column-next--8 vl-grid-next vl-column-next--m-12 cy-cell-2-1"></div>
            <div class="vl-column-next vl-column-next--4 vl-column-next--m-12 cy-cell-2-2"></div>
            <div class="vl-column-next vl-column-next--2 vl-column-next--m-6 vl-column-next--xs-12 cy-cell-3-1"></div>
            <div class="vl-column-next vl-column-next--2 vl-column-next--m-6 vl-column-next--xs-12 cy-cell-3-2"></div>
            <div
                class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12 cy-cell-4-1"
            ></div>
            <div
                class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12 cy-cell-4-2"
            ></div>
            <div
                class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12 cy-cell-4-3"
            ></div>
            <div
                class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12 cy-cell-4-4"
            ></div>
            <div class="vl-column-next sb-footer vl-column-next--4 cy-cell-5-1"></div>
            <div class="vl-column-next sb-footer vl-column-next--2 cy-cell-5-2"></div>
            <div class="vl-column-next sb-footer vl-column-next--1 cy-cell-5-3"></div>
            <div class="vl-column-next sb-footer vl-column-next--2 cy-cell-5-4"></div>
            <div class="vl-column-next sb-footer vl-column-next--1 cy-cell-5-5"></div>
            <div class="vl-column-next sb-footer vl-column-next--2 cy-cell-5-6"></div>
        </div>
    `;

    it('should be responsive on a large screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 84.5;
        const borderWidth = 2;
        cy.viewport(1100, 800);
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-1-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 11 + borderWidth * 2 * 10}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 8 + borderWidth * 3}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4 + borderWidth * 2 * 3}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-4-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-4-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-4-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4 + borderWidth * 2 * 3}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
    });

    it('should be responsive on a medium screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 60;
        const borderWidth = 2;
        cy.viewport(800, 800);
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3 + borderWidth * 2 * 2}px`,
        });
        cy.get('.cy-cell-1-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 9 + borderWidth * 2 * 8}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 7}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3 + borderWidth * 2 * 2}px`,
        });
        cy.get('.cy-cell-4-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3 + borderWidth * 2 * 2}px`,
        });
        cy.get('.cy-cell-4-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3 + borderWidth * 2 * 2}px`,
        });
        cy.get('.cy-cell-4-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3 + borderWidth * 2 * 2}px`,
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4 + borderWidth * 2 * 3}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
    });

    it('should be responsive on a small screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 50;
        const borderWidth = 2;
        cy.viewport(680, 800);
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-1-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 7}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-4-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-4-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-4-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6 + borderWidth * 2 * 5}px`,
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4 + borderWidth * 2 * 3}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
    });

    it('should be responsive on an extra-small screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 30;
        const borderWidth = 2;
        cy.viewport(440, 800);
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 9 + borderWidth * 2 * 8}px`,
        });
        cy.get('.cy-cell-1-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3 + borderWidth * 2 * 2}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 7}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-4-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-4-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-4-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12 + borderWidth * 2 * 11}px`,
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4 + borderWidth * 2 * 3}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2 + borderWidth * 2}px`,
        });
    });

    const gridOffset = html`
        <style>
            .vl-grid-next.vl-grid-offset {
                --vl-column-min-height: 20px;
                grid-template-rows: 20px;

                .vl-column-next {
                    background-color: mediumspringgreen;
                    border: lightseagreen 2px solid;
                }
            }
        </style>
        <div class="vl-grid-next vl-grid-offset">
            <div
                class="vl-column-next vl-column-next--1 vl-column-next--offset-12 vl-column-next--m-4 vl-column-next--m-offset-9 cy-row-1"
            ></div>
            <div
                class="vl-column-next vl-column-next--2 vl-column-next--offset-11 vl-column-next--m-4 vl-column-next--m-offset-9 cy-row-2"
            ></div>
            <div
                class="vl-column-next vl-column-next--3 vl-column-next--offset-10 vl-column-next--m-4 vl-column-next--m-offset-9 cy-row-3"
            ></div>
            <div class="vl-column-next vl-column-next--4 vl-column-next--offset-9 cy-row-4"></div>
            <div
                class="vl-column-next vl-column-next--5 vl-column-next--offset-8 vl-column-next--m-8 vl-column-next--m-offset-5 cy-row-5"
            ></div>
            <div
                class="vl-column-next vl-column-next--6 vl-column-next--offset-7 vl-column-next--m-8 vl-column-next--m-offset-5 cy-row-6"
            ></div>
            <div
                class="vl-column-next vl-column-next--7 vl-column-next--offset-6 vl-column-next--m-8 vl-column-next--m-offset-5 cy-row-7"
            ></div>
            <div class="vl-column-next vl-column-next--8 vl-column-next--offset-5 cy-row-8"></div>
            <div
                class="vl-column-next vl-column-next--9 vl-column-next--offset-4 vl-column-next--m-offset-1 vl-column-next--m-12 cy-row-9"
            ></div>
            <div
                class="vl-column-next vl-column-next--10 vl-column-next--offset-3 vl-column-next--m-offset-1 vl-column-next--m-12 cy-row-10"
            ></div>
            <div
                class="vl-column-next vl-column-next--11 vl-column-next--offset-2 vl-column-next--m-offset-1 vl-column-next--m-12 cy-row-11"
            ></div>
            <div class="vl-column-next vl-column-next--12 vl-column-next--offset-1 cy-row-12"></div>
        </div>
    `;

    it('should offset on a large screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridOffset);
        cy.viewport(1100, 800);
        for (let x = 0; x < 12; x++) {
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-start',
                value: `${12 - x}`,
            });
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-end',
                value: `span ${x + 1}`,
            });
        }
    });

    it('should offset on a medium screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridOffset);
        const cellWidth = 84.5;
        const borderWidth = 2;
        cy.viewport(1000, 800);
        for (let x = 0; x < 4; x++) {
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-start',
                value: `9`,
            });
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-end',
                value: `span 4`,
            });
        }
        for (let x = 4; x < 8; x++) {
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-start',
                value: `5`,
            });
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-end',
                value: `span 8`,
            });
        }
        for (let x = 8; x < 12; x++) {
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-start',
                value: `1`,
            });
            cy.get(`.cy-row-${x + 1}`).shouldHaveComputedStyle({
                style: 'grid-column-end',
                value: `span 12`,
            });
        }
    });

    const gridJustifyAndAlign = html`
        <style>
            .vl-grid-next {
                --vl-column-min-height: 1vmax;
                grid-template-rows: 30px 30px 30px 30px 60px 60px 60px 30px;

                .vl-column-next {
                    background-color: mediumspringgreen;
                    border: lightseagreen 2px solid;
                }
            }
        </style>
        <div class="vl-grid-next">
            <div
                class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-start cy-cell-1-1"
            >
                &nbsp;justify-self-start&nbsp;
            </div>
            <div
                class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-center cy-cell-2-1"
            >
                &nbsp;justify-self-center&nbsp;
            </div>
            <div
                class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-end cy-cell-3-1"
            >
                &nbsp;justify-self-end&nbsp;
            </div>
            <div
                class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-stretch cy-cell-4-1"
            >
                &nbsp;justify-self-stretch&nbsp;
            </div>
            <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-start cy-cell-5-1">
                &nbsp;align-items-start&nbsp;
            </div>
            <div class="vl-column-next vl-column-next--6 cy-cell-5-2"></div>
            <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-center cy-cell-6-1">
                &nbsp;align-items-center&nbsp;
            </div>
            <div class="vl-column-next vl-column-next--6 cy-cell-6-2"></div>
            <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-end cy-cell-7-1">
                &nbsp;align-items-end&nbsp;
            </div>
            <div class="vl-column-next vl-column-next--6 cy-cell-7-2"></div>
            <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-stretch cy-cell-8-1">
                &nbsp;align-items-stretch&nbsp;
            </div>
            <div class="vl-column-next vl-column-next--6 cy-cell-8-2"></div>
        </div>
    `;

    it('should justify and align', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridJustifyAndAlign);
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'justify-self',
            value: 'start',
        });
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'grid-column-start',
            value: '5',
        });
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'grid-column-end',
            value: 'span 8',
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'justify-self',
            value: 'center',
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'grid-column-start',
            value: '5',
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'grid-column-end',
            value: 'span 8',
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'justify-self',
            value: 'end',
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'grid-column-start',
            value: '5',
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'grid-column-end',
            value: 'span 8',
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'justify-self',
            value: 'stretch',
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'grid-column-start',
            value: '5',
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'grid-column-end',
            value: 'span 8',
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'align-self',
            value: 'start',
        });
        cy.get('.cy-cell-6-1').shouldHaveComputedStyle({
            style: 'align-self',
            value: 'center',
        });
        cy.get('.cy-cell-7-1').shouldHaveComputedStyle({
            style: 'align-self',
            value: 'end',
        });
        cy.get('.cy-cell-8-1').shouldHaveComputedStyle({
            style: 'align-self',
            value: 'stretch',
        });
    });
});

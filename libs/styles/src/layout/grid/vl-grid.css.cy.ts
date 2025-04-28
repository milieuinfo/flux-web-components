import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';

describe('grid styles', () => {
    const gridResponsive = html`
        <style>
            .vl-grid {
                --vl-column-min-height: 8vmax;
                --vl-grid-row-gap: 0px;
                --vl-grid-col-gap: 0px;
                padding: 19px;

                .vl-grid {
                    padding: 11px;
                }

                .vl-column {
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
        <div class="vl-grid">
            <div
                class="vl-column sb-header vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-9 cy-cell-1-1"
            ></div>
            <div
                class="vl-column sb-header vl-column--11 vl-column--m-9 vl-column--s-6 vl-column--xs-3 cy-cell-1-2"
            ></div>
            <div class="sb-main vl-column vl-column--8 vl-grid vl-column--m-12 cy-cell-2-1"></div>
            <div class="vl-column vl-column--4 vl-column--m-12 cy-cell-2-2"></div>
            <div class="vl-column vl-column--2 vl-column--m-6 vl-column--xs-12 cy-cell-3-1"></div>
            <div class="vl-column vl-column--2 vl-column--m-6 vl-column--xs-12 cy-cell-3-2"></div>
            <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12 cy-cell-4-1"></div>
            <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12 cy-cell-4-2"></div>
            <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12 cy-cell-4-3"></div>
            <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12 cy-cell-4-4"></div>
            <div class="vl-column sb-footer vl-column--4 cy-cell-5-1"></div>
            <div class="vl-column sb-footer vl-column--2 cy-cell-5-2"></div>
            <div class="vl-column sb-footer vl-column--1 cy-cell-5-3"></div>
            <div class="vl-column sb-footer vl-column--2 cy-cell-5-4"></div>
            <div class="vl-column sb-footer vl-column--1 cy-cell-5-5"></div>
            <div class="vl-column sb-footer vl-column--2 cy-cell-5-6"></div>
        </div>
    `;

    it('should be responsive on a large screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 88.5;
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
            value: `${cellWidth * 11}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 8}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
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
            value: `${cellWidth * 4}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
    });

    it('should be responsive on a medium screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 63.5;
        cy.viewport(800, 800);
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3}px`,
        });
        cy.get('.cy-cell-1-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 9}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3}px`,
        });
        cy.get('.cy-cell-4-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3}px`,
        });
        cy.get('.cy-cell-4-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3}px`,
        });
        cy.get('.cy-cell-4-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3}px`,
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
    });

    it('should be responsive on a small screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 53.5;
        cy.viewport(680, 800);
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-1-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-4-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-4-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-4-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 6}px`,
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
    });

    it('should be responsive on an extra-small screen', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(gridResponsive);
        const cellWidth = 33.5;
        cy.viewport(440, 800);
        cy.get('.cy-cell-1-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 9}px`,
        });
        cy.get('.cy-cell-1-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 3}px`,
        });
        cy.get('.cy-cell-2-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-2-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-3-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-3-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-4-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-4-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-4-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-4-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 12}px`,
        });
        cy.get('.cy-cell-5-1').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 4}px`,
        });
        cy.get('.cy-cell-5-2').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-3').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-4').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
        cy.get('.cy-cell-5-5').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth}px`,
        });
        cy.get('.cy-cell-5-6').shouldHaveComputedStyle({
            style: 'width',
            value: `${cellWidth * 2}px`,
        });
    });

    const gridOffset = html`
        <style>
            .vl-grid {
                --vl-column-min-height: 20px;
                grid-template-rows: 20px;

                .vl-column {
                    background-color: mediumspringgreen;
                    border: lightseagreen 2px solid;
                }
            }
        </style>
        <div class="vl-grid">
            <div class="vl-column vl-column--1 vl-column--start-12 vl-column--m-4 vl-column--m-start-9 cy-row-1"></div>
            <div class="vl-column vl-column--2 vl-column--start-11 vl-column--m-4 vl-column--m-start-9 cy-row-2"></div>
            <div class="vl-column vl-column--3 vl-column--start-10 vl-column--m-4 vl-column--m-start-9 cy-row-3"></div>
            <div class="vl-column vl-column--4 vl-column--start-9 cy-row-4"></div>
            <div class="vl-column vl-column--5 vl-column--start-8 vl-column--m-8 vl-column--m-start-5 cy-row-5"></div>
            <div class="vl-column vl-column--6 vl-column--start-7 vl-column--m-8 vl-column--m-start-5 cy-row-6"></div>
            <div class="vl-column vl-column--7 vl-column--start-6 vl-column--m-8 vl-column--m-start-5 cy-row-7"></div>
            <div class="vl-column vl-column--8 vl-column--start-5 cy-row-8"></div>
            <div class="vl-column vl-column--9 vl-column--start-4 vl-column--m-start-1 vl-column--m-12 cy-row-9"></div>
            <div
                class="vl-column vl-column--10 vl-column--start-3 vl-column--m-start-1 vl-column--m-12 cy-row-10"
            ></div>
            <div
                class="vl-column vl-column--11 vl-column--start-2 vl-column--m-start-1 vl-column--m-12 cy-row-11"
            ></div>
            <div class="vl-column vl-column--12 vl-column--start-1 cy-row-12"></div>
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
            .vl-grid {
                --vl-column-min-height: 1vmax;
                grid-template-rows: 30px 30px 30px 30px 60px 60px 60px 30px;

                .vl-column {
                    background-color: mediumspringgreen;
                    border: lightseagreen 2px solid;
                }
            }
        </style>
        <div class="vl-grid">
            <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-start cy-cell-1-1">
                &nbsp;justify-self-start&nbsp;
            </div>
            <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-center cy-cell-2-1">
                &nbsp;justify-self-center&nbsp;
            </div>
            <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-end cy-cell-3-1">
                &nbsp;justify-self-end&nbsp;
            </div>
            <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-stretch cy-cell-4-1">
                &nbsp;justify-self-stretch&nbsp;
            </div>
            <div class="vl-column vl-column--6 vl-column--align-self-start cy-cell-5-1">
                &nbsp;align-items-start&nbsp;
            </div>
            <div class="vl-column vl-column--6 cy-cell-5-2"></div>
            <div class="vl-column vl-column--6 vl-column--align-self-center cy-cell-6-1">
                &nbsp;align-items-center&nbsp;
            </div>
            <div class="vl-column vl-column--6 cy-cell-6-2"></div>
            <div class="vl-column vl-column--6 vl-column--align-self-end cy-cell-7-1">&nbsp;align-items-end&nbsp;</div>
            <div class="vl-column vl-column--6 cy-cell-7-2"></div>
            <div class="vl-column vl-column--6 vl-column--align-self-stretch cy-cell-8-1">
                &nbsp;align-items-stretch&nbsp;
            </div>
            <div class="vl-column vl-column--6 cy-cell-8-2"></div>
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

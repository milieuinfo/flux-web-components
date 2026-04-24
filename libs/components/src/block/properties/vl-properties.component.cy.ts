import { registerWebComponents } from '@domg-wc/common';
import { buildData, buildLabel } from '@resources/utils-test';
import { VlPropertiesComponent } from './index';
import { dummy2Props, dummyProps } from './stories/vl-properties.stories-util';
import { propertiesDefaults } from './vl-properties.defaults';
import { html } from 'lit';

registerWebComponents([VlPropertiesComponent]);
type PropertiesDefaultTypes = Partial<typeof propertiesDefaults>;

const defaultPropertiesTemplate = html`
    <vl-properties>
        <label>Woonplaats</label>
        <data>Brussel</data>
        <label>Postcode</label>
        <data>1000</data>
    </vl-properties>
`;

const propertiesHtmlEnrichedTemplate = html`
    <vl-properties>
        <label><span style="color: red">Woonplaats</span></label>
        <data><span style="color: blue">Brussel</span></data>
        <label>Postcode</label>
        <data>1000</data>
    </vl-properties>
`;

const propertiesColumnsTemplate = html`
    <vl-properties>
        <div class="column">
            <label>Woonplaats</label>
            <data>Brussel</data>
        </div>
        <div class="column">
            <label>Postcode</label>
            <data>1000</data>
        </div>
        <div class="column column--full-width">
            <label>Gewest</label>
            <data>Brussel</data>
        </div>
    </vl-properties>
`;

// Column 1 has a 2-line label (via block spans) to force a taller row than column 2.
// Used to verify that CSS Grid cross-column row alignment holds even when label heights differ.
const propertiesColumnsAlignmentTemplate = html`
    <vl-properties>
        <div class="column">
            <label><span style="display:block">Eerste regel</span><span style="display:block">Tweede regel</span></label>
            <data>Waarde 1</data>
            <label>Kort label</label>
            <data>Waarde 2</data>
        </div>
        <div class="column">
            <label>Kort</label>
            <data>Waarde A</data>
            <label>Kort</label>
            <data>Waarde B</data>
        </div>
        <div class="column column--full-width">
            <label>Volledig</label>
            <data>Waarde X</data>
        </div>
    </vl-properties>
`;

const propertiesWithPropsTemplate = ({ props }: PropertiesDefaultTypes = {}) => html`
    <vl-properties .props=${props}>
        <label>Woonplaats</label>
        <data>Brussel</data>
        <label>Postcode</label>
        <data>1000</data>
    </vl-properties>
`;

describe('cypress-component - block components - vl-properties', () => {
    it('should mount', () => {
        cy.mount(defaultPropertiesTemplate);

        cy.get('vl-properties').shadow().find('dl');
    });

    it('should be accessible', () => {
        cy.mount(defaultPropertiesTemplate);
        cy.injectAxe();

        cy.checkA11y('vl-properties');
    });

    it("should contain a shadow DOM with dl, dt's and dd's", () => {
        cy.mount(defaultPropertiesTemplate);

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('div')
                    .eq(0)
                    .within(() => {
                        cy.get('dt').should('contain.text', 'Woonplaats');
                        cy.get('dd').should('contain.text', 'Brussel');
                    });
                cy.get('div')
                    .eq(1)
                    .within(() => {
                        cy.get('dt').should('contain.text', 'Postcode');
                        cy.get('dd').should('contain.text', '1000');
                    });
            });
    });

    it('should update shadow DOM after Light DOM changed', () => {
        cy.mount(defaultPropertiesTemplate);

        cy.runTestFor<VlPropertiesComponent>('vl-properties', (component) => {
            component.append(buildLabel('Gewest'));
            component.append(buildData('Brussels'));
        });

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('div')
                    .eq(2)
                    .within(() => {
                        cy.get('dt').should('contain.text', 'Gewest');
                        cy.get('dd').should('contain.text', 'Brussels');
                    });
            });
    });

    it("should contain a shadow DOM with dt's and dd's with inner html", () => {
        cy.mount(propertiesHtmlEnrichedTemplate);

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('div')
                    .eq(0)
                    .within(() => {
                        cy.get('dt').find('span').should('have.attr', 'style', 'color: red');
                        cy.get('dt').find('span').should('contain.text', 'Woonplaats');
                        cy.get('dd').find('span').should('have.attr', 'style', 'color: blue');
                        cy.get('dd').find('span').should('contain.text', 'Brussel');
                    });
                cy.get('div')
                    .eq(1)
                    .within(() => {
                        cy.get('dt').should('contain.text', 'Postcode');
                        cy.get('dd').should('contain.text', '1000');
                    });
            });
    });

    it('should contain a shadow DOM with columns', () => {
        cy.mount(propertiesColumnsTemplate);

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('> div')
                    .eq(0)
                    .should('have.attr', 'class', 'column')
                    .within(() => {
                        cy.get('div')
                            .eq(0)
                            .should('have.attr', 'class', 'item')
                            .within(() => {
                                cy.get('dt').should('contain.text', 'Woonplaats');
                                cy.get('dd').should('contain.text', 'Brussel');
                            });
                    });
                cy.get('> div')
                    .eq(1)
                    .should('have.attr', 'class', 'column')
                    .within(() => {
                        cy.get('div')
                            .eq(0)
                            .should('have.attr', 'class', 'item')
                            .within(() => {
                                cy.get('dt').should('contain.text', 'Postcode');
                                cy.get('dd').should('contain.text', '1000');
                            });
                    });
                cy.get('> div')
                    .eq(2)
                    .should('have.attr', 'class', 'column column--full-width')
                    .within(() => {
                        cy.get('div')
                            .eq(0)
                            .should('have.attr', 'class', 'item')
                            .within(() => {
                                cy.get('dt').should('contain.text', 'Gewest');
                                cy.get('dd').should('contain.text', 'Brussel');
                            });
                    });
            });
    });

    it("should contain a shadow DOM with dl, dt's and dd's specified through props", () => {
        cy.mount(propertiesWithPropsTemplate({ props: dummyProps }));

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('div')
                    .eq(0)
                    .should('have.attr', 'class', 'column')
                    .within(() => {
                        cy.get('div')
                            .eq(0)
                            .should('have.attr', 'class', 'item')
                            .within(() => {
                                cy.get('dt').should('contain.text', 'Straat');
                                cy.get('dd').eq(0).should('contain.text', 'Appelstraat');
                                cy.get('dd').eq(1).should('contain.text', 'Perenstraat');
                            });
                    });
            });
    });

    it('should align items at the same vertical position across columns', () => {
        cy.mount(propertiesColumnsAlignmentTemplate);

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .then(($dl) => {
                const dl = $dl[0];
                const col1Items = dl.querySelectorAll<HTMLElement>('.column:nth-child(1) .item');
                const col2Items = dl.querySelectorAll<HTMLElement>('.column:nth-child(2) .item');

                expect(col1Items.length).to.equal(2);
                expect(col2Items.length).to.equal(2);

                [...col1Items].forEach((item1, i) => {
                    const top1 = item1.getBoundingClientRect().top;
                    const top2 = col2Items[i].getBoundingClientRect().top;
                    expect(top1, `items at index ${i} should start at the same vertical position`).to.equal(top2);
                });
            });
    });

    it('should place the full-width column below both regular columns', () => {
        cy.mount(propertiesColumnsAlignmentTemplate);

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .then(($dl) => {
                const dl = $dl[0];
                const col1Items = dl.querySelectorAll<HTMLElement>('.column:nth-child(1) .item');
                const fullWidthItems = dl.querySelectorAll<HTMLElement>('.column--full-width .item');

                expect(fullWidthItems.length).to.be.greaterThan(0);

                const lastCol1Bottom = col1Items[col1Items.length - 1].getBoundingClientRect().bottom;
                const fullWidthTop = fullWidthItems[0].getBoundingClientRect().top;

                expect(fullWidthTop).to.be.gte(lastCol1Bottom);
            });
    });

    it('should reflect a props change in the shadow DOM', () => {
        cy.mount(propertiesWithPropsTemplate({ props: dummyProps }));

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('div')
                    .eq(0)
                    .should('have.attr', 'class', 'column')
                    .within(() => {
                        cy.get('div')
                            .eq(0)
                            .should('have.attr', 'class', 'item')
                            .within(() => {
                                cy.get('dt').should('contain.text', 'Straat');
                                cy.get('dd').eq(0).should('contain.text', 'Appelstraat');
                                cy.get('dd').eq(1).should('contain.text', 'Perenstraat');
                            });
                    });
            });

        cy.runTestFor<VlPropertiesComponent>('vl-properties', (component) => {
            component.props = dummy2Props;
        });

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('div')
                    .eq(0)
                    .should('have.attr', 'class', 'column')
                    .within(() => {
                        cy.get('div')
                            .eq(0)
                            .should('have.attr', 'class', 'item')
                            .within(() => {
                                cy.get('dt').should('contain.text', 'Gemeente');
                                cy.get('dd').eq(0).should('contain.text', 'Antwerpen');
                                cy.get('dd').eq(1).should('contain.text', 'Berchem');
                            });
                    });
            });
    });
});

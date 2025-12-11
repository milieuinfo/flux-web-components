import { buildData, buildLabel, registerWebComponents } from '@domg-wc/common-utilities';
import { VlPropertiesComponent } from '@domg-wc/components/next/properties';
import { dummy2Props, dummyProps } from '@domg-wc/components/next/properties/stories/vl-properties.stories-util';
import { propertiesDefaults } from '@domg-wc/components/next/properties/vl-properties.defaults';
import { html } from 'lit';

registerWebComponents([VlPropertiesComponent]);
type PropertiesDefaultTypes = Partial<typeof propertiesDefaults>;

const defaultPropertiesTemplate = html`
    <vl-properties-next>
        <label>Woonplaats</label>
        <data>Brussel</data>
        <label>Postcode</label>
        <data>1000</data>
    </vl-properties-next>
`;

const propertiesHtmlEnrichedTemplate = html`
    <vl-properties-next>
        <label><span style="color: red">Woonplaats</span></label>
        <data><span style="color: blue">Brussel</span></data>
        <label>Postcode</label>
        <data>1000</data>
    </vl-properties-next>
`;

const propertiesColumnsTemplate = html`
    <vl-properties-next>
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
    </vl-properties-next>
`;

const propertiesWithPropsTemplate = ({ props }: PropertiesDefaultTypes = {}) => html`
    <vl-properties-next .props=${props}>
        <label>Woonplaats</label>
        <data>Brussel</data>
        <label>Postcode</label>
        <data>1000</data>
    </vl-properties-next>
`;

describe('component - vl-properties-next', () => {
    it('should mount', () => {
        cy.mount(defaultPropertiesTemplate);

        cy.get('vl-properties-next').shadow().find('dl');
    });

    it('should be accessible', () => {
        cy.mount(defaultPropertiesTemplate);
        cy.injectAxe();

        cy.checkA11y('vl-properties-next');
    });

    it("should contain a Shadow DOM with dl, dt's and dd's", () => {
        cy.mount(defaultPropertiesTemplate);

        cy.get('vl-properties-next')
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

    it('should update Shadow DOM after Light DOM changed', () => {
        cy.mount(defaultPropertiesTemplate);

        cy.runTestFor<VlPropertiesComponent>('vl-properties-next', (component) => {
            component.append(buildLabel('Gewest'));
            component.append(buildData('Brussels'));
        });

        cy.get('vl-properties-next')
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

    it("should contain a Shadow DOM with dt's and dd's with inner html", () => {
        cy.mount(propertiesHtmlEnrichedTemplate);

        cy.get('vl-properties-next')
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

    it('should contain a Shadow DOM with columns', () => {
        cy.mount(propertiesColumnsTemplate);

        cy.get('vl-properties-next')
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

    it("should contain a Shadow DOM with dl, dt's and dd's specified through props", () => {
        cy.mount(propertiesWithPropsTemplate({ props: dummyProps }));

        cy.get('vl-properties-next')
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

    it('should reflect a props change in the Shadow DOM', () => {
        cy.mount(propertiesWithPropsTemplate({ props: dummyProps }));

        cy.get('vl-properties-next')
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

        cy.runTestFor<VlPropertiesComponent>('vl-properties-next', (component) => {
            component.props = dummy2Props;
        });

        cy.get('vl-properties-next')
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

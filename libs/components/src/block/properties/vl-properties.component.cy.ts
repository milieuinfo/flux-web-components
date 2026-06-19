import { registerWebComponents } from '@domg-wc/common';
import { buildHTMLElement } from '@resources/utils-test';
import { html } from 'lit';
import { VlPropertiesComponent } from './index';
import { dummy2Props, dummyProps } from './stories/vl-properties.stories-util';
import { propertiesDefaults } from './vl-properties.defaults';

registerWebComponents([VlPropertiesComponent]);
type PropertiesDefaultTypes = Partial<typeof propertiesDefaults>;

const defaultPropertiesTemplate = html`
    <vl-properties>
        <vl-property>Woonplaats</vl-property>
        <vl-property-data>Brussel</vl-property-data>
        <vl-property>Postcode</vl-property>
        <vl-property-data>1000</vl-property-data>
    </vl-properties>
`;

const propertiesHtmlEnrichedTemplate = html`
    <vl-properties>
        <vl-property><span style="color: red">Woonplaats</span></vl-property>
        <vl-property-data><span style="color: blue">Brussel</span></vl-property-data>
        <vl-property>Postcode</vl-property>
        <vl-property-data>1000</vl-property-data>
    </vl-properties>
`;

const propertiesColumnsTemplate = html`
    <vl-properties>
        <div class="column">
            <vl-property>Woonplaats</vl-property>
            <vl-property-data>Brussel</vl-property-data>
        </div>
        <div class="column">
            <vl-property>Postcode</vl-property>
            <vl-property-data>1000</vl-property-data>
        </div>
        <div class="column column--full-width">
            <vl-property>Gewest</vl-property>
            <vl-property-data>Brussel</vl-property-data>
        </div>
    </vl-properties>
`;

const propertiesWithPropsTemplate = ({ props = [] }: PropertiesDefaultTypes = {}) => html`
    <vl-properties .props=${props}>
        <vl-property>Woonplaats</vl-property>
        <vl-property-data>Brussel</vl-property-data>
        <vl-property>Postcode</vl-property>
        <vl-property-data>1000</vl-property-data>
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
                cy.get('dt').eq(0).should('contain.text', 'Woonplaats');
                cy.get('dd').eq(0).should('contain.text', 'Brussel');
                cy.get('dt').eq(1).should('contain.text', 'Postcode');
                cy.get('dd').eq(1).should('contain.text', '1000');
            });
    });

    it('should update shadow DOM after Light DOM changed', () => {
        cy.mount(defaultPropertiesTemplate);

        cy.runTestFor<VlPropertiesComponent>('vl-properties', (component) => {
            component.append(buildHTMLElement('vl-property', 'Gewest'));
            component.append(buildHTMLElement('vl-property-data', 'Brussels'));
        });

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('dt').eq(2).should('contain.text', 'Gewest');
                cy.get('dd').eq(2).should('contain.text', 'Brussels');
            });
    });

    it('should update shadow DOM when a light DOM text node is mutated in-place', () => {
        cy.mount(html`
            <vl-properties>
                <vl-property>Woonplaats</vl-property>
                <vl-property-data><span>Brussel</span></vl-property-data>
            </vl-properties>
        `);

        cy.get('vl-properties').shadow().find('dd').find('span').should('contain.text', 'Brussel');

        cy.runTestFor<VlPropertiesComponent>('vl-properties', (component) => {
            const textNode = component.querySelector('vl-property-data span')?.firstChild;
            textNode!.textContent = 'Antwerpen';
        });

        cy.get('vl-properties').shadow().find('dd').find('span').should('contain.text', 'Antwerpen');
    });

    it('should update shadow DOM when a light DOM attribute is mutated in-place', () => {
        cy.mount(html`
            <vl-properties>
                <vl-property>Woonplaats</vl-property>
                <vl-property-data><span style="color: blue">Brussel</span></vl-property-data>
            </vl-properties>
        `);

        cy.get('vl-properties').shadow().find('dd').find('span').should('have.attr', 'style', 'color: blue');

        cy.runTestFor<VlPropertiesComponent>('vl-properties', (component) => {
            const span = component.querySelector('vl-property-data span');
            span!.setAttribute('style', 'color: red');
        });

        cy.get('vl-properties').shadow().find('dd').find('span').should('have.attr', 'style', 'color: red');
    });

    it("should contain a shadow DOM with dt's and dd's with inner html", () => {
        cy.mount(propertiesHtmlEnrichedTemplate);

        cy.get('vl-properties')
            .shadow()
            .find('dl')
            .within(() => {
                cy.get('dt').eq(0).find('span').should('have.attr', 'style', 'color: red');
                cy.get('dt').eq(0).find('span').should('contain.text', 'Woonplaats');
                cy.get('dd').eq(0).find('span').should('have.attr', 'style', 'color: blue');
                cy.get('dd').eq(0).find('span').should('contain.text', 'Brussel');
                cy.get('dt').eq(1).should('contain.text', 'Postcode');
                cy.get('dd').eq(1).should('contain.text', '1000');
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
                        cy.get('dt').should('contain.text', 'Woonplaats');
                        cy.get('dd').should('contain.text', 'Brussel');
                    });
                cy.get('> div')
                    .eq(1)
                    .should('have.attr', 'class', 'column')
                    .within(() => {
                        cy.get('dt').should('contain.text', 'Postcode');
                        cy.get('dd').should('contain.text', '1000');
                    });
                cy.get('> div')
                    .eq(2)
                    .should('have.attr', 'class', 'column column--full-width')
                    .within(() => {
                        cy.get('dt').should('contain.text', 'Gewest');
                        cy.get('dd').should('contain.text', 'Brussel');
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
                        cy.get('dt').should('contain.text', 'Straat');
                        cy.get('dd').eq(0).should('contain.text', 'Appelstraat');
                        cy.get('dd').eq(1).should('contain.text', 'Perenstraat');
                    });
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
                        cy.get('dt').should('contain.text', 'Straat');
                        cy.get('dd').eq(0).should('contain.text', 'Appelstraat');
                        cy.get('dd').eq(1).should('contain.text', 'Perenstraat');
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
                        cy.get('dt').should('contain.text', 'Gemeente');
                        cy.get('dd').eq(0).should('contain.text', 'Antwerpen');
                        cy.get('dd').eq(1).should('contain.text', 'Berchem');
                    });
            });
    });

    it('should remove padding-bottom when no-padding-bottom attribute is set', () => {
        cy.mount(html`
            <vl-properties no-padding-bottom>
                <vl-property>Woonplaats</vl-property>
                <vl-property-data>Brussel</vl-property-data>
            </vl-properties>
        `);

        cy.get('vl-properties').shadow().find('dl').should('have.css', 'padding-bottom', '0px');
    });

    it('should have default padding-bottom when no-padding-bottom attribute is not set', () => {
        cy.mount(defaultPropertiesTemplate);

        cy.get('vl-properties').shadow().find('dl').should('have.css', 'padding-bottom', '20px');
    });

    describe('deprecated no-clone attribute', () => {
        beforeEach(() => {
            // private static enkel op compile-time; reset de "warn once"-vlag voor test-isolatie
            (
                VlPropertiesComponent as unknown as { noCloneDeprecationWarningShown: boolean }
            ).noCloneDeprecationWarningShown = false;
        });

        it('should warn once that no-clone is deprecated when it is used', () => {
            cy.spy(console, 'warn').as('warn');

            cy.mount(html`
                <vl-properties no-clone>
                    <vl-property>Woonplaats</vl-property>
                    <vl-property-data>Brussel</vl-property-data>
                </vl-properties>
            `);

            cy.get('@warn').should('have.been.calledOnce');
            cy.get('@warn').should(
                'have.been.calledWith',
                'Het no-clone attribuut van vl-properties is niet meer nodig en deprecated, het wordt verwijderd in v3'
            );
        });

        it('should not warn when no-clone is not used', () => {
            cy.spy(console, 'warn').as('warn');

            cy.mount(defaultPropertiesTemplate);

            cy.get('@warn').should('not.have.been.called');
        });

        it('should still render content when the deprecated no-clone attribute is used', () => {
            cy.mount(html`
                <vl-properties no-clone>
                    <vl-property>Woonplaats</vl-property>
                    <vl-property-data>Brussel</vl-property-data>
                </vl-properties>
            `);

            cy.get('vl-properties').shadow().find('dt').should('contain.text', 'Woonplaats');
            cy.get('vl-properties').shadow().find('dd').should('contain.text', 'Brussel');
        });
    });
});

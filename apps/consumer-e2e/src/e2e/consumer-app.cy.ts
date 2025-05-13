const apps = [
    { name: 'consumer-fat-lib', url: 'http://127.0.0.1:8080' },
    { name: 'consumer-named', url: 'http://localhost:4212' },
    { name: 'consumer-side-effect', url: 'http://localhost:4213' },
];

describe('consumer application', () => {
    it('should be accessible', () => {
        apps.forEach((value) => {
            cy.visitWithA11y(value.url);
            cy.configureAxe({
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            });
            cy.checkA11y('#consumer-components');
            cy.checkA11y('#consumer-map');
        });
    });

    it('components - first step should render correct', () => {
        apps.forEach((value) => {
            cy.visit(value.url);
            cy.get('#consumer-components')
                .find('vl-steps')
                .find('vl-step')
                .first()
                .shadow()
                .find('.vl-step__wrapper')
                .should('have.css', 'background-color', 'rgb(230, 245, 237)');
        });
    });

    it('map - should contain a viewport', () => {
        apps.forEach((value) => {
            cy.visit(value.url);
            cy.get('#consumer-map').find('vl-map').shadow().find('.ol-viewport');
        });
    });

    it('map - should contain a baselayer-grb-gray', () => {
        apps.forEach((value) => {
            cy.visit(value.url);
            cy.get('#consumer-map')
                .find('vl-map')
                .find('vl-map-baselayer-grb-gray')
                .then((element) => {
                    const vlMapBaseLayer = element[0] as any;
                    expect(vlMapBaseLayer.url).to.equal('https://geo.api.vlaanderen.be/GRB/wmts');
                    expect(vlMapBaseLayer.type).to.equal('wmts');
                    expect(vlMapBaseLayer.layer).to.equal('grb_bsk_grijs');
                    expect(vlMapBaseLayer.title).to.equal('GRB basis laag grijs');
                });
        });
    });
});

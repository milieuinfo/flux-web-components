const pillDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-pill--pill-default&viewMode=story';
const pillAllVariantsUrl =
    'http://localhost:8080/iframe.html?id=components-block-pill--pill-all-variants&viewMode=story';
const pillCustomColorsUrl =
    'http://localhost:8080/iframe.html?id=components-block-pill--pill-custom-colors&viewMode=story';

describe('cypress-e2e - block components - vl-pill - default story', () => {
    it('should render', () => {
        cy.visit(pillDefaultUrl);

        cy.get('vl-pill').shadow();
    });
});

describe('cypress-e2e - block components - vl-pill - all variants story', () => {
    it('should render', () => {
        cy.visit(pillAllVariantsUrl);

        ['default', 'success', 'warning', 'error', 'disabled'].map((type) => {
            ['default', 'closable', 'checkable', 'clickable'].map((variant) => {
                ['unchecked', 'checked'].map((checked) => {
                    const typeSelector = type === 'default' ? '' : `[type=${type}]`;
                    const variantSelector = variant !== 'default' ? `[${variant}]` : '';
                    const checkedSelector = variant === 'checkable' && checked === 'checked' ? `[checked]` : '';

                    cy.get(`vl-pill${typeSelector}${variantSelector}${checkedSelector}`).shadow();
                });
            });
        });
    });
});

describe('cypress-e2e - block components - vl-pill - custom colors story', () => {
    it('should render', () => {
        cy.visit(pillCustomColorsUrl);

        [
            'my-pill-primary',
            'my-pill-primary-light',
            'my-pill-primary-niveau2',
            'my-pill-primary-niveau2-light',
            'my-pill-action',
            'my-pill-action-light',
            'my-pill-omg-hoofdkleur',
            'my-pill-omg-steunkleur',
        ].map((customClass) => {
            ['default', 'checkable', 'closable'].map((variant) => {
                const variantSelector = variant !== 'default' ? `[${variant}]` : '';

                cy.get(`vl-pill.${customClass}${variantSelector}`).shadow();
            });
        });
    });
});

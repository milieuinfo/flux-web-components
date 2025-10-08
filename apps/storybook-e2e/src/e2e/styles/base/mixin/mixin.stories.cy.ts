const mixinWaveAnimationUrl =
    'http://localhost:8080/iframe.html?id=styles-base-mixin--wave-animation-mixin-default&viewMode=story';
const mixinFocusOutlineUrl =
    'http://localhost:8080/iframe.html?id=styles-base-mixin--focus-outline-mixin-default&viewMode=story';

describe('cypress-e2e - styles - mixin - wave animation story', () => {
    it('should render', () => {
        cy.visit(mixinWaveAnimationUrl);

        cy.get('.sb-wave-animation-blue').shouldHaveComputedStyle({ style: 'width', value: '10px' });
    });
});

describe('cypress-e2e - styles - mixin - focus outline story', () => {
    it('should render', () => {
        cy.visit(mixinFocusOutlineUrl);

        cy.get('.sb-focus-outline').shouldHaveComputedStyle({
            style: 'outline',
            value: 'rgba(0, 85, 204, 0.65) solid 3px',
        });
    });
});

const mixinNextWaveAnimationUrl =
    'http://localhost:8080/iframe.html?id=styles-next-base-intern-mixin--wave-animation-mixin-default&viewMode=story';
const mixinNextFocusOutlineUrl =
    'http://localhost:8080/iframe.html?id=styles-next-base-intern-mixin--focus-outline-mixin-default&viewMode=story';

describe('story - mixin-next - wave animation', () => {
    it('should render', () => {
        cy.visit(mixinNextWaveAnimationUrl);

        cy.get('.sb-wave-animation-blue').shouldHaveComputedStyle({ style: 'width', value: '10px' });
    });
});

describe('story - mixin-next - focus outline', () => {
    it('should render', () => {
        cy.visit(mixinNextFocusOutlineUrl);

        cy.get('.sb-focus-outline').shouldHaveComputedStyle({
            style: 'outline',
            value: 'rgba(0, 85, 204, 0.65) solid 3px',
        });
    });
});

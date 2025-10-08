const inputSliderUrl =
    'http://localhost:8080/iframe.html?id=components-block-input-slider--input-slider-default&viewMode=story';

const shouldHaveValue = (value: number) => {
    cy.get('vl-input-slider').shadow().find('input[type="range"]').should('have.value', value);
    cy.get('vl-input-slider').shadow().find('input[type="number"]').should('have.value', value);
};

describe('cypress-e2e - block components - vl-input-slider - default story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(inputSliderUrl);

        cy.get('vl-input-slider');
        cy.checkA11y('vl-input-slider');
    });

    it('should have default value', () => {
        cy.visit(inputSliderUrl);

        shouldHaveValue(0);
    });

    it('should set value', () => {
        cy.visit(`${inputSliderUrl}&args=value:50`);

        shouldHaveValue(50);
    });

    it('should have default maximum value', () => {
        cy.visit(inputSliderUrl);

        cy.get('vl-input-slider').shadow().find('input[type="range"]').should('have.attr', 'max', 100);
        cy.get('vl-input-slider').shadow().find('input[type="number"]').should('have.attr', 'max', 100);
    });

    it('should set maximum value', () => {
        cy.visit(`${inputSliderUrl}&args=maxValue:80`);

        cy.get('vl-input-slider').shadow().find('input[type="range"]').should('have.attr', 'max', 80);
        cy.get('vl-input-slider').shadow().find('input[type="number"]').should('have.attr', 'max', 80);
    });

    it('should have default minimum value', () => {
        cy.visit(inputSliderUrl);

        cy.get('vl-input-slider').shadow().find('input[type="range"]').should('have.attr', 'min', 0);
        cy.get('vl-input-slider').shadow().find('input[type="number"]').should('have.attr', 'min', 0);
    });

    it('should set minimum value', () => {
        cy.visit(`${inputSliderUrl}&args=minValue:20`);

        cy.get('vl-input-slider').shadow().find('input[type="range"]').should('have.attr', 'min', 20);
        cy.get('vl-input-slider').shadow().find('input[type="number"]').should('have.attr', 'min', 20);
    });

    it('should set value to maxValue if value > maxValue', () => {
        cy.visit(`${inputSliderUrl}&args=value:120;maxValue:110`);

        shouldHaveValue(110);
        cy.get('vl-input-slider').shadow().find('input[type="number"]').invoke('val', 120).trigger('input');
        shouldHaveValue(110);
    });

    it('should set value to minValue if value < minValue', () => {
        cy.visit(`${inputSliderUrl}&args=value:5;minValue:10`);

        shouldHaveValue(10);
        cy.get('vl-input-slider').shadow().find('input[type="number"]').invoke('val', 5).trigger('input');
        shouldHaveValue(10);
    });

    it('should emit event on change value of range input', () => {
        cy.visit(inputSliderUrl);

        cy.createStubForEvent('vl-input-slider', 'vl-change-value');
        cy.get('vl-input-slider').shadow().find('input[type="range"]').invoke('val', 10).trigger('input');
        cy.get('@vl-change-value').should('have.been.calledOnce');
    });

    it('should emit event on change value of number input', () => {
        cy.visit(inputSliderUrl);

        cy.createStubForEvent('vl-input-slider', 'vl-change-value');
        cy.get('vl-input-slider').shadow().find('input[type="number"]').invoke('val', 10).trigger('input');
        cy.get('@vl-change-value').should('have.been.calledOnce');
    });
});

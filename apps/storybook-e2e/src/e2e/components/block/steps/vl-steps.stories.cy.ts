const stepsDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-default&viewMode=story';
const stepsIconsUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-icons&viewMode=story';
const stepsLineUrl = 'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-line&viewMode=story';
const stepsTimelineUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-timeline&viewMode=story';
const stepsSimpleTimelineUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-simple-timeline&viewMode=story';
const stepsSideNavigationUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-side-navigation&viewMode=story';
const stepsStatesUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-step--steps-states&viewMode=story';
const stepsToggleableUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-step--steps-toggleable&viewMode=story';

describe('cypress-e2e - block components - vl-steps -  story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsDefaultUrl);
        cy.get('vl-steps').shadow();
    });
});

describe('cypress-e2e - block components - vl-steps - icons story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsIconsUrl);
        cy.get('vl-steps').shadow();
    });
});

describe('cypress-e2e - block components - vl-steps - states story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsStatesUrl);
        cy.get('vl-steps').shadow();
    });
});

describe('cypress-e2e - block components - vl-steps - toggleable story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsToggleableUrl);
        cy.get('vl-steps').shadow();
    });
});

describe('cypress-e2e - block components - vl-steps - line story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsLineUrl);
        cy.get('vl-steps').shadow();
    });
});

describe('cypress-e2e - block components - vl-steps - timeline story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsTimelineUrl);
        cy.get('vl-steps').shadow();
    });
});

describe('cypress-e2e - block components - vl-steps - simple-timeline story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsSimpleTimelineUrl);
        cy.get('vl-steps').shadow();
    });
});

describe('cypress-e2e - block components - vl-steps - side-navigation story', () => {
    it('should render', () => {
        cy.visitWithA11y(stepsSideNavigationUrl);
        cy.get('vl-steps').shadow();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav a[href="#vl-steps-vl-step-2"]');
    });
});

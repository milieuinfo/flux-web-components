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
    it('should be accessible', () => {
        cy.visitWithA11y(stepsDefaultUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsDefaultUrl);

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('2');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de tweede subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de tweede stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('3');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de derde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de derde stap content.');
    });
});

describe('cypress-e2e - block components - vl-steps - icons story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsIconsUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsIconsUrl);

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de tweede subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de tweede stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de derde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de derde stap content.');
    });

    it('should contain steps with icons', () => {
        cy.visit(stepsIconsUrl);

        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="search"]');
        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="calendar"]');
        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="clock"]');
    });
});

describe('cypress-e2e - block components - vl-steps - states story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsStatesUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps', {
            // color-contrast rule bewust uitgezet: foutief kleurenpalet van DV.
            rules: {
                'color-contrast': { enabled: false },
            },
        });
    });

    it('should contain steps', () => {
        cy.visit(stepsStatesUrl);

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('2');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de tweede subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de tweede stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('3');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de derde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Deze stap is geannuleerd.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('4');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 4: vierde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de vierde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de vierde stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('5');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 5: vijfde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de vijfde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de vijfde stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('6');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 6: zesde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de zesde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de zesde stap content.');
    });

    it('should contain steps with states', () => {
        cy.visit(stepsStatesUrl);

        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--highlighted');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--disabled');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--success');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--warning');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--error');
    });
});

describe('cypress-e2e - block components - vl-steps - toggleable story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsToggleableUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsToggleableUrl);

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('2');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de tweede subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de tweede stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('3');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de derde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de derde stap content.');
    });

    it('should contain steps with accordions', () => {
        cy.visit(stepsToggleableUrl);

        cy.get('vl-steps')
            .find('vl-step')
            .shadow()
            .find('li.vl-step.vl-step--accordion.js-vl-accordion')
            .find('button.vl-step__header.js-vl-accordion__toggle')
            .should('have.length', 3);

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
    });
});

describe('cypress-e2e - block components - vl-steps - line story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsLineUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsLineUrl);

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('2');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de tweede subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de tweede stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('3');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de derde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de derde stap content.');
    });

    it('should contain steps with lines', () => {
        cy.visit(stepsLineUrl);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--has-line');
    });
});

describe('cypress-e2e - block components - vl-steps - timeline story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsTimelineUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsTimelineUrl);

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-steps').find('vl-step').find('span[slot="sub-icon"]').contains('maa');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title-annotation"]').contains('12u00 - 14u00');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');

        cy.get('vl-steps').find('vl-duration-step').contains('Vrije tijd: 1 uur');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-steps').find('vl-step').find('span[slot="sub-icon"]').contains('maa');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title-annotation"]').contains('15u00 - 17u00');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de tweede subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de tweede stap content.');

        cy.get('vl-steps').find('vl-duration-step').contains('Vrije tijd: 2 uur');

        cy.get('vl-steps').find('vl-step').find('span[slot="icon"]').contains('1');
        cy.get('vl-steps').find('vl-step').find('span[slot="sub-icon"]').contains('maa');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title-annotation"]').contains('19u00 - 21u00');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de derde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de derde stap content.');
    });

    it('should contain steps with a timeline', () => {
        cy.visit(stepsTimelineUrl);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--timeline');
    });
});

describe('cypress-e2e - block components - vl-steps - simple-timeline story', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsSimpleTimelineUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsSimpleTimelineUrl);

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de eerste subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de eerste stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de tweede subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de tweede stap content.');

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="subtitle"]').contains('Dit is de derde subtitel');
        cy.get('vl-steps').find('vl-step').find('span[slot="content"]').contains('Dit is de derde stap content.');
    });

    it('should contain steps with a simple timeline', () => {
        cy.visit(stepsSimpleTimelineUrl);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--timeline-simple');
    });
});

describe('cypress-e2e - block components - vl-steps - side-navigation story', () => {
    it('should show child links on scroll', () => {
        cy.visit(stepsSideNavigationUrl);

        cy.get('vl-steps')
            .find('vl-step')
            .find('#vl-steps-vl-step-2-abstract')
            .scrollIntoView({ duration: 1000 })
            .should('be.visible');

        cy.get('vl-side-navigation')
            .find('vl-side-navigation-toggle[href="#vl-steps-vl-step-2"]')
            .should('have.attr', 'aria-expanded', 'true');
    });
});

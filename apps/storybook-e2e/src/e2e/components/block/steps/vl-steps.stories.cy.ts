const stepsNextUrl = 'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-default&viewMode=story';
const stepsNextIconsUrl = 'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-icons&viewMode=story';
const stepsNextLineUrl = 'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-line&viewMode=story';
const stepsNextTimelineUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-timeline&viewMode=story';
const stepsNextSimpleTimelineUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-simple-timeline&viewMode=story';
const stepsSideNavigationUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-steps--steps-side-navigation&viewMode=story';
const stepsNextStatesUrl = 'http://localhost:8080/iframe.html?id=components-block-steps-step--steps-states&viewMode=story';
const stepsNextToggleableUrl =
    'http://localhost:8080/iframe.html?id=components-block-steps-step--steps-toggleable&viewMode=story';

describe('story vl-steps default', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsNextUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsNextUrl);

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

describe('story vl-steps icons', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsNextIconsUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsNextIconsUrl);

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
        cy.visit(stepsNextIconsUrl);

        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="search"]');
        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="calendar"]');
        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="clock"]');
    });
});

describe('story vl-steps states', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsNextStatesUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps', {
            // color-contrast rule bewust uitgezet: foutief kleurenpalet van DV.
            rules: {
                'color-contrast': { enabled: false },
            },
        });
    });

    it('should contain steps', () => {
        cy.visit(stepsNextStatesUrl);

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
        cy.visit(stepsNextStatesUrl);

        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--highlighted');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--disabled');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--success');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--warning');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--error');
    });
});

describe('story vl-steps toggleable', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsNextToggleableUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsNextToggleableUrl);

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
        cy.visit(stepsNextToggleableUrl);

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

describe('story vl-steps line', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsNextLineUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsNextLineUrl);

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
        cy.visit(stepsNextLineUrl);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--has-line');
    });
});

describe('story vl-steps timeline', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsNextTimelineUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsNextTimelineUrl);

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
        cy.visit(stepsNextTimelineUrl);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--timeline');
    });
});

describe('story vl-steps simple-timeline', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(stepsNextSimpleTimelineUrl);
        cy.get('vl-steps');
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.visit(stepsNextSimpleTimelineUrl);

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
        cy.visit(stepsNextSimpleTimelineUrl);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--timeline-simple');
    });
});

describe('story vl-steps side-navigation', () => {
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

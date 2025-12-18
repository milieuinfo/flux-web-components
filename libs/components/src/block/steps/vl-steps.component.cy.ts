import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlStepsComponent } from './index';
import { VlSideNavigationComponent } from '@domg-wc/components/block';

registerWebComponents([VlStepsComponent, VlSideNavigationComponent]);

describe('cypress-component - block components - vl-steps - default', () => {
    const defaultTemplate = html`
        <vl-steps>
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `;

    it('should be accessible', () => {
        cy.mount(defaultTemplate);

        cy.get('vl-steps');
        cy.injectAxe();
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.mount(defaultTemplate);

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

describe('cypress-component - block components - vl-steps - icons', () => {
    const iconsTemplate = html`
        <vl-steps>
            <vl-step>
                <vl-icon slot="icon" icon="search"></vl-icon>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step>
                <vl-icon slot="icon" icon="calendar"></vl-icon>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step>
                <vl-icon slot="icon" icon="clock"></vl-icon>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `;

    it('should be accessible', () => {
        cy.mount(iconsTemplate);

        cy.get('vl-steps');
        cy.injectAxe();
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.mount(iconsTemplate);

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
        cy.mount(iconsTemplate);

        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="search"]');
        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="calendar"]');
        cy.get('vl-steps').find('vl-step').find('vl-icon[slot="icon"][icon="clock"]');
    });
});

describe('cypress-component - block components - vl-steps - states', () => {
    const statesTemplate = html`
        <vl-steps>
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step type="highlighted">
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step type="disabled">
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Deze stap is geannuleerd.</span>
            </vl-step>
            <vl-step type="success">
                <span slot="icon">4</span>
                <span slot="title">Stap 4: vierde actie</span>
                <span slot="subtitle">Dit is de vierde subtitel.</span>
                <span slot="content">Dit is de vierde stap content.</span>
            </vl-step>
            <vl-step type="warning">
                <span slot="icon">5</span>
                <span slot="title">Stap 5: vijfde actie</span>
                <span slot="subtitle">Dit is de vijfde subtitel.</span>
                <span slot="content">Dit is de vijfde stap content.</span>
            </vl-step>
            <vl-step type="error">
                <span slot="icon">6</span>
                <span slot="title">Stap 6: zesde actie</span>
                <span slot="subtitle">Dit is de zesde subtitel.</span>
                <span slot="content">Dit is de zesde stap content.</span>
            </vl-step>
        </vl-steps>
    `;

    it('should be accessible', () => {
        cy.mount(statesTemplate);

        cy.get('vl-steps');
        cy.injectAxe();
        cy.checkA11y('vl-steps', {
            // color-contrast rule bewust uitgezet: foutief kleurenpalet van DV.
            rules: {
                'color-contrast': { enabled: false },
            },
        });
    });

    it('should contain steps', () => {
        cy.mount(statesTemplate);

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
        cy.mount(statesTemplate);

        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--highlighted');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--disabled');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--success');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--warning');
        cy.get('vl-steps').find('vl-step').shadow().find('li').should('have.class', 'vl-step--error');
    });
});

describe('cypress-component - block components - vl-steps - toggleable', () => {
    const toggleableTemplate = (defaultOpen?:boolean) => html`
        <vl-steps>
            <vl-step toggleable ?default-open=${defaultOpen}>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step toggleable ?default-open=${defaultOpen}>
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step toggleable ?default-open=${defaultOpen}>
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `;

    it('should be accessible', () => {
        cy.mount(toggleableTemplate());

        cy.get('vl-steps');
        cy.injectAxe();
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.mount(toggleableTemplate());

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
        cy.mount(toggleableTemplate());

        cy.get('vl-steps')
            .find('vl-step')
            .shadow()
            .find('li.vl-step.vl-step--accordion.js-vl-accordion')
            .find('button.vl-step__header.js-vl-accordion__toggle')
            .should('have.length', 3);

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');

        // Verify that steps are closed by default when default-open attribute is not present
        cy.get('vl-steps')
            .find('vl-step')
            .shadow()
            .find('li.vl-step.vl-step--accordion.js-vl-accordion.js-vl-accordion--open')
            .should('have.length', 0);
    });

    it('should contain steps with default-open accordions', () => {
        cy.mount(toggleableTemplate(true));

        cy.get('vl-steps')
            .find('vl-step')
            .shadow()
            .find('li.vl-step.vl-step--accordion.js-vl-accordion')
            .find('button.vl-step__header.js-vl-accordion__toggle')
            .should('have.length', 3);

        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 1: eerste actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 2: tweede actie');
        cy.get('vl-steps').find('vl-step').find('span[slot="title"]').contains('Stap 3: derde actie');

        // Verify that steps are open by default when default-open attribute is present
        cy.get('vl-steps')
            .find('vl-step')
            .shadow()
            .find('li.vl-step.vl-step--accordion.js-vl-accordion.js-vl-accordion--open')
            .should('have.length', 3);
    });
});

describe('cypress-component - block components - vl-steps - line', () => {
    const lineTemplate = html`
        <vl-steps line>
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `;

    it('should be accessible', () => {
        cy.mount(lineTemplate);

        cy.get('vl-steps');
        cy.injectAxe();
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.mount(lineTemplate);

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
        cy.mount(lineTemplate);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--has-line');
    });
});

describe('cypress-component - block components - vl-steps - timeline', () => {
    const timelineTemplate = html`
        <vl-steps timeline>
            <vl-step>
                <span slot="icon">1</span>
                <span slot="sub-icon">maa</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="title-annotation">12u00 - 14u00</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-duration-step>Vrije tijd: 1 uur</vl-duration-step>
            <vl-step>
                <span slot="icon">1</span>
                <span slot="sub-icon">maa</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="title-annotation">15u00 - 17u00</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-duration-step>Vrije tijd: 2 uur</vl-duration-step>
            <vl-step>
                <span slot="icon">1</span>
                <span slot="sub-icon">maa</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="title-annotation">19u00 - 21u00</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `;

    it('should be accessible', () => {
        cy.mount(timelineTemplate);

        cy.get('vl-steps');
        cy.injectAxe();
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.mount(timelineTemplate);

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
        cy.mount(timelineTemplate);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--timeline');
    });
});

describe('cypress-component - block components - vl-steps - simple-timeline', () => {
    const simpleTimelineTemplate = html`
        <vl-steps simple-timeline>
            <vl-step>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `;

    it('should be accessible', () => {
        cy.mount(simpleTimelineTemplate);

        cy.get('vl-steps');
        cy.injectAxe();
        cy.checkA11y('vl-steps');
    });

    it('should contain steps', () => {
        cy.mount(simpleTimelineTemplate);

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
        cy.mount(simpleTimelineTemplate);

        cy.get('vl-steps').shadow().find('.vl-steps.vl-steps--timeline-simple');
    });
});

describe('cypress-component - block components - vl-steps - side-navigation', () => {
    const sideNavigationTemplate = html`
        <section class="vl-section" id="steps-side-navigation-example">
            <div class="vl-content-block">
                <div class="vl-grid vl-stacked-small">
                    <div class="vl-column vl-column--8 vl-column--m-9 vl-column--s-12 vl-column--xs-12">
                        <vl-side-navigation-reference>
                            <vl-steps>
                                <vl-step id="vl-steps-vl-step-1">
                                    <span slot="icon">1</span>
                                    <span slot="title">
                                        <div>Stap 1: eerste actie</div>
                                    </span>
                                    <span slot="content">
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel
                                                pretium lectus quam id. Penatibus et magnis dis parturient montes
                                                nascetur ridiculus. Malesuada nunc vel risus commodo viverra maecenas
                                                accumsan lacus. Pretium lectus quam id leo in vitae. Dictum at tempor
                                                commodo ullamcorper a lacus. Facilisis gravida neque convallis a cras.
                                                Ut porttitor leo a diam sollicitudin tempor. Augue ut lectus arcu
                                                bibendum at varius vel pharetra vel. Fames ac turpis egestas maecenas
                                                pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                                Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac
                                                felis donec. Elit pellentesque habitant morbi tristique senectus et
                                                netus et. Tristique et egestas quis ipsum suspendisse ultrices gravida.
                                                Tortor consequat id porta nibh venenatis cras.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel
                                                pretium lectus quam id. Penatibus et magnis dis parturient montes
                                                nascetur ridiculus. Malesuada nunc vel risus commodo viverra maecenas
                                                accumsan lacus. Pretium lectus quam id leo in vitae. Dictum at tempor
                                                commodo ullamcorper a lacus. Facilisis gravida neque convallis a cras.
                                                Ut porttitor leo a diam sollicitudin tempor. Augue ut lectus arcu
                                                bibendum at varius vel pharetra vel. Fames ac turpis egestas maecenas
                                                pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                                Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac
                                                felis donec. Elit pellentesque habitant morbi tristique senectus et
                                                netus et. Tristique et egestas quis ipsum suspendisse ultrices gravida.
                                                Tortor consequat id porta nibh venenatis cras.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel
                                                pretium lectus quam id. Penatibus et magnis dis parturient montes
                                                nascetur ridiculus. Malesuada nunc vel risus commodo viverra maecenas
                                                accumsan lacus. Pretium lectus quam id leo in vitae. Dictum at tempor
                                                commodo ullamcorper a lacus. Facilisis gravida neque convallis a cras.
                                                Ut porttitor leo a diam sollicitudin tempor. Augue ut lectus arcu
                                                bibendum at varius vel pharetra vel. Fames ac turpis egestas maecenas
                                                pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                                Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac
                                                felis donec. Elit pellentesque habitant morbi tristique senectus et
                                                netus et. Tristique et egestas quis ipsum suspendisse ultrices gravida.
                                                Tortor consequat id porta nibh venenatis cras.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel
                                                pretium lectus quam id. Penatibus et magnis dis parturient montes
                                                nascetur ridiculus. Malesuada nunc vel risus commodo viverra maecenas
                                                accumsan lacus. Pretium lectus quam id leo in vitae. Dictum at tempor
                                                commodo ullamcorper a lacus. Facilisis gravida neque convallis a cras.
                                                Ut porttitor leo a diam sollicitudin tempor. Augue ut lectus arcu
                                                bibendum at varius vel pharetra vel. Fames ac turpis egestas maecenas
                                                pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                                Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac
                                                felis donec. Elit pellentesque habitant morbi tristique senectus et
                                                netus et. Tristique et egestas quis ipsum suspendisse ultrices gravida.
                                                Tortor consequat id porta nibh venenatis cras.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel
                                                pretium lectus quam id. Penatibus et magnis dis parturient montes
                                                nascetur ridiculus. Malesuada nunc vel risus commodo viverra maecenas
                                                accumsan lacus. Pretium lectus quam id leo in vitae. Dictum at tempor
                                                commodo ullamcorper a lacus. Facilisis gravida neque convallis a cras.
                                                Ut porttitor leo a diam sollicitudin tempor. Augue ut lectus arcu
                                                bibendum at varius vel pharetra vel. Fames ac turpis egestas maecenas
                                                pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                                Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac
                                                felis donec. Elit pellentesque habitant morbi tristique senectus et
                                                netus et. Tristique et egestas quis ipsum suspendisse ultrices gravida.
                                                Tortor consequat id porta nibh venenatis cras.
                                            </p>
                                        </div>
                                    </span>
                                </vl-step>
                                <span id="vl-steps-vl-step-2"></span>
                                <vl-step>
                                    <span slot="icon">2</span>
                                    <span slot="title">
                                        <div>Stap 2: tweede actie</div>
                                    </span>
                                    <span slot="content">
                                        <div>
                                            <vl-title type="h4" underline id="vl-steps-vl-step-2-abstract"
                                                >Abstract</vl-title
                                            >
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                            <vl-title type="h4" id="vl-steps-vl-step-2-volledig">Volledig</vl-title>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </span>
                                </vl-step>
                                <vl-step id="vl-steps-vl-step-3">
                                    <span slot="icon">3</span>
                                    <span slot="title">
                                        <div>Stap 3: derde actie</div>
                                    </span>
                                    <span slot="content">
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </span>
                                </vl-step>
                            </vl-steps>
                        </vl-side-navigation-reference>
                    </div>
                    <div class="vl-column vl-column--3 vl-column--m-3 vl-column--s-12 vl-column--xs-12 vl-column--start-10 vl-column--s-start-1">
                        <vl-side-navigation aria-label="inhoudsopgave">
                            <vl-side-navigation-h5>Op deze pagina</vl-side-navigation-h5>
                            <vl-side-navigation-content>
                                <vl-side-navigation-group>
                                    <vl-side-navigation-item>
                                        <a href="#vl-steps-vl-step-1"> step 1 </a>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item parent="step-2">
                                        <vl-side-navigation-toggle href="#vl-steps-vl-step-2" child="step-2">
                                            step 2
                                        </vl-side-navigation-toggle>
                                        <ul>
                                            <vl-side-navigation-item>
                                                <a href="#vl-steps-vl-step-2-abstract" parent="step-2">Abstract</a>
                                            </vl-side-navigation-item>
                                            <vl-side-navigation-item>
                                                <a href="#vl-steps-vl-step-2-volledig" parent="step-2">Volledig</a>
                                            </vl-side-navigation-item>
                                        </ul>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item>
                                        <a href="#vl-steps-vl-step-3"> step 3 </a>
                                    </vl-side-navigation-item>
                                </vl-side-navigation-group>
                            </vl-side-navigation-content>
                        </vl-side-navigation>
                    </div>
                </div>
            </div>
        </section>
    `;

    it('should show child links on scroll', () => {
        cy.mount(sideNavigationTemplate);

        cy.viewport('ipad-2');

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

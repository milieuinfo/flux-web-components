import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTooltipComponent } from '../tooltip';
import { VlProgressIndicatorComponent } from './vl-progress-indicator.component';

registerWebComponents([VlProgressIndicatorComponent, VlTooltipComponent]);

type MountDefaultProps = {
    activeStep: number;
    focusOnChange: boolean;
    numeric?: boolean;
    steps: string[];
    showLabels: boolean;
    onClickStep: (event: CustomEvent) => void;
};

const props: MountDefaultProps = {
    activeStep: 1,
    focusOnChange: false,
    numeric: false,
    steps: [],
    showLabels: false,
    onClickStep: (event) => {
        console.log(event);
    },
};

const mountDefault = (props: MountDefaultProps) =>
    cy.mount(html` <vl-progress-indicator
        active-step=${props.activeStep}
        ?show-labels=${props.showLabels}
        ?focus-on-change=${props.focusOnChange}
        ?numeric=${props.numeric}
        .steps=${props.steps}
        @vl-click-step=${(event: CustomEvent) => props.onClickStep(event.detail)}
    >
    </vl-progress-indicator>`);

const VlProgressIndicatorTestUtils = {
    changeActiveStep: function changeActiveStep(stepNumber: number) {
        cy.get('vl-progress-indicator').invoke('attr', 'active-step', stepNumber);
    },

    verifyActiveStepChange: function verifyActiveStepChange(stepNumber: number) {
        this.changeActiveStep(stepNumber);

        cy.get('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__segment')
            .eq(stepNumber - 1)
            .should('have.class', 'vl-progress-indicator__segment--active');
    },
    shouldHaveVisibleTooltipForStep: function shouldHaveVisibleTooltipForStep(stepNumber: number) {
        cy.get('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__segment')
            .eq(stepNumber - 1)
            .find('button.vl-progress-indicator__step')
            .click();
        cy.get('vl-progress-indicator')
            .shadow()
            .find(`vl-tooltip[for="step-${stepNumber}"]`)
            .should('have.attr', 'open');
    },
};

describe('cypress-component - block components - vl-progress-indicator - default', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];

    beforeEach(() => {
        mountDefault({ ...props, steps: steps });
    });

    it('should mount', () => {
        cy.get('vl-progress-indicator').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-progress-indicator');
    });

    it('should render steps correctly', () => {
        cy.get('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__segment')
            .should('have.length', steps.length);

        steps.forEach((step, index) => {
            cy.get('vl-progress-indicator')
                .shadow()
                .find(`.vl-progress-indicator__segment:nth-child(${index + 1}) `)
                .find('vl-tooltip')
                .contains(step);
        });
    });
});

describe('cypress-component - block components - vl-progress-indicator - properties default ', () => {
    it('should have default values for properties', () => {
        mountDefault(props);

        cy.get('vl-progress-indicator').should('have.attr', 'active-step', props.activeStep);
        cy.get('vl-progress-indicator').should('not.have.attr', 'focus-on-change', props.focusOnChange);
        cy.get('vl-progress-indicator').should('not.have.attr', 'numeric');
        cy.get('vl-progress-indicator').should('not.have.attr', 'show-labels');
    });
});

describe('cypress-component - block components - vl-progress-indicator - properties reflect', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];

    it('should have active step class on the correct step when <activeStep> property is set', () => {
        const activeStep = 2;

        mountDefault({ ...props, steps, activeStep });

        cy.get('vl-progress-indicator')
            .shadow()
            .find(`.vl-progress-indicator__segment:nth-child(${activeStep})`)
            .should('have.class', 'vl-progress-indicator__segment--active');
    });

    it('should add the <.vl-progress-indicator--numeric> class when <numeric> property is true', () => {
        mountDefault({ ...props, steps, numeric: true });
        cy.get('vl-progress-indicator').shadow().find('.vl-progress-indicator--numeric').should('exist');
    });

    it('should set the steps when the <steps> property is passed', () => {
        mountDefault({ ...props, steps });
        cy.get('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__segment')
            .should('have.length', steps.length);
    });

    it('should always show the labels when <showLabels> property is true', () => {
        mountDefault({ ...props, steps, showLabels: true });

        cy.get('vl-progress-indicator')
            .shadow()
            .find('.vl-progress-indicator__label')
            .should('have.length', steps.length);
    });

    it('should dynamically update the active step', () => {
        mountDefault({ ...props, steps });

        VlProgressIndicatorTestUtils.verifyActiveStepChange(1);
        VlProgressIndicatorTestUtils.verifyActiveStepChange(2);
        VlProgressIndicatorTestUtils.verifyActiveStepChange(3);
    });

    it('should have visible tooltip for active step', () => {
        mountDefault({ ...props, steps, focusOnChange: true });

        VlProgressIndicatorTestUtils.shouldHaveVisibleTooltipForStep(1);

        VlProgressIndicatorTestUtils.changeActiveStep(2);
        VlProgressIndicatorTestUtils.shouldHaveVisibleTooltipForStep(2);

        VlProgressIndicatorTestUtils.changeActiveStep(3);
        VlProgressIndicatorTestUtils.shouldHaveVisibleTooltipForStep(3);
    });

    it('should emit vl-click-step event when a step is clicked', () => {
        mountDefault({ ...props, steps });

        cy.createStubForEvent('vl-progress-indicator', 'vl-click-step');

        cy.get('vl-progress-indicator').shadow().find('.vl-progress-indicator__segment:nth-child(1) button').click();

        cy.get('@vl-click-step').should('have.been.calledWithMatch', { detail: { step: steps[0], number: 1 } });
    });
});

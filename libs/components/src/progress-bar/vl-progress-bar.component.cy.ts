import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverComponent } from '../popover/vl-popover.component';
import { VlProgressBarComponent } from './vl-progress-bar.component';
import { html } from 'lit';

registerWebComponents([VlProgressBarComponent, VlPopoverComponent]);

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
    cy.mount(html` <vl-progress-bar
        data-vl-active-step=${props.activeStep}
        ?data-vl-show-labels=${props.showLabels}
        ?data-vl-focus-on-change=${props.focusOnChange}
        ?data-vl-numeric=${props.numeric}
        .steps=${props.steps}
        @vl-click-step=${(event: CustomEvent) => props.onClickStep(event.detail)}
    >
    </vl-progress-bar>`);

const VlProgressBarTestUtils = {
    changeActiveStep: function changeActiveStep(stepNumber: number) {
        cy.get('vl-progress-bar').invoke('attr', 'data-vl-active-step', stepNumber);
    },

    verifyActiveStepChange: function verifyActiveStepChange(stepNumber: number) {
        this.changeActiveStep(stepNumber);

        cy.get('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__step')
            .eq(stepNumber - 1)
            .should('have.class', 'vl-progress-bar__step--active');
    },
    shouldHaveVisiblePopoverForStep: function shouldHaveVisiblePopoverForStep(stepNumber: number) {
        cy.get('vl-progress-bar')
            .shadow()
            .find('.vl-progress-bar__step')
            .eq(stepNumber - 1)
            .find('button.vl-progress-bar__bullet')
            .click()
            .find('vl-popover')
            .should('have.attr', 'open');
    },
};

describe('component vl-progress-bar - default', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];

    beforeEach(() => {
        mountDefault({ ...props, steps: steps });
    });

    it('should mount', () => {
        cy.get('vl-progress-bar').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-progress-bar');
    });

    it('should render steps correctly', () => {
        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar__step').should('have.length', steps.length);

        steps.forEach((step, index) => {
            cy.get('vl-progress-bar')
                .shadow()
                .find(`.vl-progress-bar__step:nth-child(${index + 1}) `)
                .find('vl-popover')
                .contains(step);
        });
    });
});

describe('component vl-progress-bar - properties default ', () => {
    it('should have default values for properties', () => {
        mountDefault(props);

        cy.get('vl-progress-bar').should('have.attr', 'data-vl-active-step', props.activeStep);
        cy.get('vl-progress-bar').should('not.have.attr', 'data-vl-focus-on-change', props.focusOnChange);
        cy.get('vl-progress-bar').should('not.have.attr', 'data-vl-numeric');
        cy.get('vl-progress-bar').should('not.have.attr', 'data-vl-show-labels');
    });
});

describe('component vl-progress-bar - properties reflect', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];

    it('should have active step class on the correct step when <activeStep> property is set', () => {
        const activeStep = 2;

        mountDefault({ ...props, steps, activeStep });

        cy.get('vl-progress-bar')
            .shadow()
            .find(`.vl-progress-bar__step:nth-child(${activeStep})`)
            .should('have.class', 'vl-progress-bar__step--active');
    });

    it('should add the <.vl-progress-bar--numeric> class when <numeric> property is true', () => {
        mountDefault({ ...props, steps, numeric: true });
        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar--numeric').should('exist');
    });

    it('should set the steps when the <steps> property is passed', () => {
        mountDefault({ ...props, steps });
        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar__step').should('have.length', steps.length);
    });

    it('should always show the labels when <showLabels> property is true', () => {
        mountDefault({ ...props, steps, showLabels: true });

        steps.forEach((__, index) => {
            cy.get('vl-progress-bar')
                .shadow()
                .find(`.vl-progress-bar__step:nth-child(${index + 1}) .vl-progress-bar__bullet__text`)
                .should('exist');
        });
    });

    it('should dynamically update the active step', () => {
        mountDefault({ ...props, steps });

        VlProgressBarTestUtils.verifyActiveStepChange(1);
        VlProgressBarTestUtils.verifyActiveStepChange(2);
        VlProgressBarTestUtils.verifyActiveStepChange(3);
    });

    it('should have visible popover for active step', () => {
        mountDefault({ ...props, steps, focusOnChange: true });

        VlProgressBarTestUtils.shouldHaveVisiblePopoverForStep(1);

        VlProgressBarTestUtils.changeActiveStep(2);
        VlProgressBarTestUtils.shouldHaveVisiblePopoverForStep(2);

        VlProgressBarTestUtils.changeActiveStep(3);
        VlProgressBarTestUtils.shouldHaveVisiblePopoverForStep(3);
    });

    it('should emit vl-click-step event when a step is clicked', () => {
        mountDefault({ ...props, steps });

        cy.createStubForEvent('vl-progress-bar', 'vl-click-step');

        cy.get('vl-progress-bar').shadow().find('.vl-progress-bar__step:nth-child(2) button').click();

        cy.get('@vl-click-step').should('have.been.calledWithMatch', { detail: { step: steps[1], number: 2 } });
        cy.get('@vl-click-step').should('not.have.been.calledWithMatch', { detail: { step: steps[1], number: 1 } });
    });
});

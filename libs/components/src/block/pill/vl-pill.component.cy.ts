import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlPillComponent } from './vl-pill.component';

registerWebComponents([VlPillComponent]);

const PILL_TYPES = ['success', 'warning', 'error'] as const;

const mount = ({
    checkable,
    checked,
    clickable,
    closable,
    disabled,
    isInMap,
    type,
    content = 'Pill',
    handleClick,
}: {
    checkable?: boolean;
    checked?: boolean;
    clickable?: boolean;
    closable?: boolean;
    disabled?: boolean;
    isInMap?: boolean;
    type?: (typeof PILL_TYPES)[number];
    content?: string;
    handleClick?: () => void;
}) =>
    cy.mount(html`
        <vl-pill
            data-cy="pill"
            checkable=${checkable || nothing}
            clickable=${clickable || nothing}
            closable=${closable || nothing}
            disabled=${disabled || nothing}
            type=${type || nothing}
            checked=${checked || nothing}
            isInMap=${isInMap || nothing}
            @click=${handleClick || nothing}
        >
            ${content}
        </vl-pill>
    `);

describe('cypress-component - block components - vl-pill', () => {
    it('should contain a text', () => {
        const mockContent = 'Optie 1';
        mount({ content: mockContent });
        cy.getDataCy('pill').contains(mockContent);
    });

    PILL_TYPES.forEach((type) =>
        it(`should contain a ${type} pill`, () => {
            mount({ type });
            cy.getDataCy('pill').shadow().find('.vl-pill').should('have.class', `vl-pill--${type}`);
        })
    );

    it('should contain a disabled pill', () => {
        mount({ disabled: true });
        cy.getDataCy('pill').shadow().find('.vl-pill').should('have.class', 'vl-pill--disabled');
    });

    it('should contain a closable pill', () => {
        mount({ closable: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--closable')
            .find('button')
            .should('have.class', 'vl-pill__close');
    });

    it('should contain a checkable pill that by default is unchecked but when clicked, becomes checked', () => {
        mount({ checkable: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--checkable')
            .find('input.vl-pill--checkable__checkbox')
            .should('not.have.attr', 'checked');

        cy.getDataCy('pill').shadow().find('.vl-pill').click({ force: true });

        cy.getDataCy('pill').shadow().find('input.vl-pill--checkable__checkbox').should('have.attr', 'checked');
    });

    it('should contain a checkable pill that is disabled and when clicking, does not enable the checkbox', () => {
        mount({ checkable: true, disabled: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--checkable')
            .find('input.vl-pill--checkable__checkbox')
            .should(($input) => {
                expect($input).to.have.attr('disabled');
                expect($input).to.not.have.attr('checked');
            });

        cy.getDataCy('pill').shadow().find('.vl-pill').click({ force: true });

        cy.getDataCy('pill').shadow().find('input.vl-pill--checkable__checkbox').should('not.have.attr', 'checked');
    });

    it('should contain a checkable pill that is disabled and checked, as it is checked, should show a checkmark', () => {
        mount({ checkable: true, disabled: true, checked: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--checkable')
            .find('input.vl-pill--checkable__checkbox')
            .should(($input) => {
                expect($input).to.have.attr('disabled');
                expect($input).to.have.attr('checked');
            });
    });

    it('should contain a clickable pill', () => {
        const handleClick = cy.stub();
        mount({ clickable: true, handleClick });
        cy.getDataCy('pill')
            .click()
            .then(() => expect(handleClick).to.be.called);
    });

    it('should contain a disabled clickable pill', () => {
        const handleClick = cy.stub();
        mount({ clickable: true, handleClick, disabled: true });
        cy.getDataCy('pill').shadow().find('button').should('be.disabled');
    });
});

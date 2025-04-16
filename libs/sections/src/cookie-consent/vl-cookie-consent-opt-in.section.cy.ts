import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common';
import { VlCookieConsentOptIn } from './vl-cookie-consent-opt-in.section';

registerWebComponents([VlCookieConsentOptIn]);

type MountDefaultProps = {
    label?: string;
    description?: string;
    checked?: boolean;
    mandatory?: boolean;
    disabled?: boolean;
    error?: boolean;
};

const mountDefault = (props: MountDefaultProps) => {
    return cy.mount(
        html`<vl-cookie-consent-opt-in
            label=${props.label}
            description=${props.description}
            checked=${props.checked}
            mandatory=${props.mandatory}
            data-vl-disabled=${props.disabled}
            data-vl-checked=${props.error}
        ></vl-cookie-consent-opt-in>`
    );
};

const props = {
    label: 'Accept Cookies',
    description: 'This is a description',
    checked: true,
    mandatory: true,
    disabled: true,
    error: true,
};

describe('component vl-cookie-consent-opt-in', () => {
    beforeEach(() => {
        mountDefault({ ...props });
    });

    it('should mount', () => {
        cy.get('vl-cookie-consent-opt-in').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-cookie-consent-opt-in');
    });
});

describe('vl-cookie-consent-opt-in - properties reflect', () => {
    it('should correctly reflect the <label> attribute', () => {
        mountDefault({ ...props, label: 'Test Cookies' });

        cy.get('vl-cookie-consent-opt-in')
            .shadow()
            .find('vl-checkbox')
            .should('have.attr', 'label', 'Test Cookies')
            .should('have.text', 'Test Cookies');
    });

    it('should correctly reflect the <description> attribute', () => {
        mountDefault({ ...props, description: 'This is a test description' });
        cy.get('vl-cookie-consent-opt-in')
            .shadow()
            .find('#description')
            .should('have.text', 'This is a test description');
    });

    it('should be checked when the <checked> attribute is set', () => {
        mountDefault({ ...props });
        cy.get('vl-cookie-consent-opt-in').shadow().find('vl-checkbox').should('have.attr', 'checked');
    });

    it('should be disabled and checked when the <disable> attribute is set', () => {
        mountDefault({ ...props });
        cy.get('vl-cookie-consent-opt-in').shadow().find('vl-checkbox').should('have.attr', 'checked');
        cy.get('vl-cookie-consent-opt-in').shadow().find('vl-checkbox').should('have.attr', 'disabled');
    });
});

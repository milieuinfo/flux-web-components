import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { html } from 'lit';
import { VlAlert } from '../alert';
import { VlToasterComponent } from './vl-toaster.component';

registerWebComponents([VlToasterComponent, VlButtonComponent, VlAlert]);

describe('cypress-component - block components - vl-toaster', () => {
    it('should mount', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shadow().find('output.vl-toaster');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);
        cy.injectAxe();

        cy.checkA11y('vl-toaster');
    });

    it('should set top right by default', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').should('not.have.attr', 'placement');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top right', () => {
        cy.mount(html` <vl-toaster placement="top-right"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'top-right');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top left', () => {
        cy.mount(html` <vl-toaster placement="top-left"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'top-left');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom left', () => {
        cy.mount(html` <vl-toaster placement="bottom-left"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'bottom-left');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom right', () => {
        cy.mount(html` <vl-toaster placement="bottom-right"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'bottom-right');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set z-index', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'z-index', value: '10012' });
    });

    it('should have default width', () => {
        cy.mount(html` <vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'width', value: '300px' });
    });

    it('should have custom width', () => {
        cy.mount(html`
            <style>
                aside {
                    --vl-toaster-width: 50rem; /* 500px */
                }
            </style>
            <main>
                <vl-toaster></vl-toaster>
            </main>
            <aside>
                <vl-toaster></vl-toaster>
            </aside>
        `);

        cy.get('main vl-toaster').shouldHaveComputedStyle({ style: 'width', value: '300px' });
        cy.get('aside vl-toaster').shouldHaveComputedStyle({ style: 'width', value: '500px' });
    });

    it('should show a toast', () => {
        cy.mount(html`
            <vl-toaster>
                <vl-alert title="toast">
                    <p>message</p>
                </vl-alert>
            </vl-toaster>
        `);
        cy.get('vl-toaster').find('vl-alert').should('be.visible');
    });

    it('should set fade out', () => {
        cy.mount(html` <vl-toaster fade-out></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            });
            cy.get('vl-toaster').shadow().find('vl-alert').should('be.visible').and('exist');
            cy.wait(5000);
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
        });
    });

    it('should show a dynamically created alert', () => {
        cy.mount(html` <vl-toaster></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            });
            cy.get('vl-toaster').shadow().find('vl-alert').should('be.visible');
        });
    });

    it('should show a toast in the output slot', () => {
        cy.mount(html`
            <vl-toaster>
                <vl-alert title="toast"></vl-alert>
            </vl-toaster>
        `);

        cy.get('vl-toaster').find('vl-alert').should('be.visible');
    });

    it('should show a toast when dynamically adding it to the output slot', () => {
        cy.mount(html`
            <main>
                <vl-alert title="toast"></vl-alert>
                <vl-toaster></vl-toaster>
            </main>
        `);

        cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');

        cy.get('vl-alert')
            .then(($alert) => {
                cy.get('vl-toaster').then(($toaster) => {
                    $toaster[0].show($alert[0]);
                });
            })
            .get('vl-toaster')
            .shadow()
            .find('output')
            .find('vl-alert')
            .should('be.visible');
    });

    it('should show a dynamically created multiline alert', () => {
        const multilineMessage = 'Eerste regel.\nTweede regel.\nDerde regel.';

        cy.mount(html` <vl-toaster></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Info',
                message: multilineMessage,
                type: 'info',
                multiline: true,
            });
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .should('be.visible')
                .and('have.attr', 'multiline');
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .shadow()
                .find('#message.vl-alert__message > p')
                .then(($message) => {
                    expect($message.text()).to.equal(multilineMessage);
                    expect(getComputedStyle($message[0]).whiteSpace).to.equal('pre-line');
                });
        });
    });

    it('should not apply pre-line white-space without multiline attribute', () => {
        cy.mount(html` <vl-toaster></vl-toaster> `);
        cy.get('vl-toaster').then(($toaster) => {
            $toaster[0].showAlert({
                title: 'Info',
                message: 'Gewone boodschap zonder multiline.',
                type: 'info',
            });
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .should('be.visible')
                .and('not.have.attr', 'multiline');
            cy.get('vl-toaster')
                .shadow()
                .find('vl-alert')
                .shadow()
                .find('#message.vl-alert__message > p')
                .then(($message) => {
                    expect(getComputedStyle($message[0]).whiteSpace).to.not.equal('pre-line');
                });
        });
    });

    it('should show alerts defined in a template', () => {
        cy.mount(html`
            <template id="alert-error-template">
                <vl-alert type="error" icon="warning" title="Error">
                    <p>Er is een fout opgetreden.</p>
                </vl-alert>
            </template>
            <vl-toaster id="toaster-template"></vl-toaster>
            <vl-button id="button-error"> Toon foutmelding</vl-button>
        `);

        cy.get('vl-button#button-error').then(($button) => {
            const button = $button[0];
            button.addEventListener('vl-click', () => {
                const toaster = document.querySelector('vl-toaster#toaster-template') as VlToasterComponent;
                // tonen het eerst gevonden kind element van de <template>
                toaster?.show('#alert-error-template');
            });
        });

        cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');

        cy.get('vl-button#button-error').shadow().find('button').click({ force: true });

        cy.get('vl-toaster').shadow().find('vl-alert').should('exist');
    });
});

import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlToasterComponent } from './vl-toaster.component';
import { VlAlert } from '../../alert';

registerWebComponents([VlToasterComponent, VlAlert]);

describe('component - vl-toaster', () => {
    it('should mount', () => {
        cy.mount(html` <vl-toaster-next></vl-toaster-next>`);

        cy.get('vl-toaster-next').shadow().find('output.vl-toaster');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-toaster-next></vl-toaster-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-toaster-next');
    });

    it('should set top right by default', () => {
        cy.mount(html` <vl-toaster-next></vl-toaster-next>`);

        cy.get('vl-toaster-next').should('not.have.attr', 'placement');
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top right', () => {
        cy.mount(html` <vl-toaster-next placement="top-right"></vl-toaster-next>`);

        cy.get('vl-toaster-next').should('have.attr', 'placement', 'top-right');
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top left', () => {
        cy.mount(html` <vl-toaster-next placement="top-left"></vl-toaster-next>`);

        cy.get('vl-toaster-next').should('have.attr', 'placement', 'top-left');
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom left', () => {
        cy.mount(html` <vl-toaster-next placement="bottom-left"></vl-toaster-next>`);

        cy.get('vl-toaster-next').should('have.attr', 'placement', 'bottom-left');
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom right', () => {
        cy.mount(html` <vl-toaster-next placement="bottom-right"></vl-toaster-next>`);

        cy.get('vl-toaster-next').should('have.attr', 'placement', 'bottom-right');
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set z-index', () => {
        cy.mount(html` <vl-toaster-next></vl-toaster-next>`);

        cy.get('vl-toaster-next').shouldHaveComputedStyle({ style: 'z-index', value: '10012' });
    });

    it('should show a toast', () => {
        cy.mount(html`
            <vl-toaster-next>
                <vl-alert data-vl-title="toast">
                    <p>message</p>
                </vl-alert>
            </vl-toaster-next>
        `);
        cy.get('vl-toaster-next').find('vl-alert').should('be.visible');
    });

    it('should set fade out', () => {
        cy.mount(html` <vl-toaster-next fade-out></vl-toaster-next> `);
        cy.get('vl-toaster-next').then(($toaster) => {
            cy.get('vl-toaster-next').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            });
            cy.get('vl-toaster-next').shadow().find('vl-alert').should('be.visible').and('exist');
            cy.wait(5000);
            cy.get('vl-toaster-next').shadow().find('vl-alert').should('not.exist');
        });
    });

    it('should show a dynamically created alert', () => {
        cy.mount(html` <vl-toaster-next></vl-toaster-next> `);
        cy.get('vl-toaster-next').then(($toaster) => {
            cy.get('vl-toaster-next').shadow().find('vl-alert').should('not.exist');
            $toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            });
            cy.get('vl-toaster-next').shadow().find('vl-alert').should('be.visible');
        });
    });

    it('should show a toast in the output slot', () => {
        cy.mount(html`
            <vl-toaster-next>
                <vl-alert data-vl-title="toast"></vl-alert>
            </vl-toaster-next>
        `);

        cy.get('vl-toaster-next').find('vl-alert').should('be.visible');
    });

    it('should show a toast when dynamically adding it to the output slot', () => {
        cy.mount(html`
            <main>
                <vl-alert data-vl-title="toast"></vl-alert>
                <vl-toaster-next></vl-toaster-next>
            </main>
        `);

        cy.get('vl-toaster-next').shadow().find('vl-alert').should('not.exist');

        cy.get('vl-alert')
            .then(($alert) => {
                cy.get('vl-toaster-next').then(($toaster) => {
                    $toaster[0].show($alert[0]);
                });
            })
            .get('vl-toaster-next')
            .shadow()
            .find('output')
            .find('vl-alert')
            .should('be.visible');
    });
});

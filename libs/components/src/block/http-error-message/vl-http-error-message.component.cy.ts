import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlHttpErrorMessage } from './vl-http-error-message.component';

registerWebComponents([VlHttpErrorMessage]);

const mountDefault = ({
    title,
    image,
    imageAlt,
    errorCode,
    textSlot,
    actionsSlot,
}: {
    title?: string;
    image?: string;
    imageAlt?: string;
    errorCode?: string;
    textSlot?: string;
    actionsSlot?: string;
}) =>
    cy.mount(html`
        <vl-http-error-message title=${title} image=${image} image-alt=${imageAlt} error-code=${errorCode}>
            ${unsafeHTML(textSlot)}${unsafeHTML(actionsSlot)}
        </vl-http-error-message>
    `);

describe('component vl-http-error-message - default', () => {
    beforeEach(() => {
        mountDefault({
            title: 'Error title',
            image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
            imageAlt: 'image url alt',
            textSlot: '<p slot="text">Sorry, er liep iets onverwachts mis.</p>',
            actionsSlot: '<div slot="actions"><a href="#">Opnieuw opstarten</a></div>',
        });
    });

    it('should mount', () => {
        cy.get('vl-http-error-message').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-http-error-message');
    });

    it('should contain a title', () => {
        cy.get('vl-http-error-message').shadow().find('h2[id="title"]').contains('Error title');
    });

    it('should contain an image', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('img[id="image-normal"]')
            .should('have.attr', 'src')
            .and('equal', 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg');
    });

    it('should contain text', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('slot[name="text"]')
            .then(($slot) => {
                expect($slot).to.have.length(1);
                cy.wrap(($slot[0] as HTMLSlotElement).assignedNodes()).contains('Sorry, er liep iets onverwachts mis.');
            });
    });

    it('should an action button', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('slot[name="actions"]')
            .then(($slot) => {
                expect($slot).to.have.length(1);
                cy.wrap(($slot[0] as HTMLSlotElement).assignedNodes())
                    .find('a')
                    .contains('Opnieuw opstarten');
            });
    });

    it('should contain debugging info', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('div[id="info"]')
            .then(($info) => {
                cy.wrap($info)
                    .find('tr > td#url')
                    .invoke('text')
                    .then((url) => {
                        const urlPattern = /(http[s]?:\/\/)?([^\s(["<,>]*\.[^\s[",><]*)?(:\d+)?(\/\S*)?/;

                        expect(urlPattern.test(url)).to.be.true;
                    });
                cy.wrap($info)
                    .find('tr > td#time')
                    .invoke('text')
                    .then((time) => {
                        const timePattern =
                            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.\d{3}Z$/;

                        expect(timePattern.test(time)).to.be.true;
                    });
                cy.wrap($info)
                    .find('tr > td#user-agent')
                    .invoke('text')
                    .then((text) => {
                        assert.isNotEmpty(text, 'User-agent info element should contain text');
                    });
            });
    });
});

describe('component vl-http-error-message - alt image', () => {
    beforeEach(() => {
        mountDefault({
            title: 'Error title',
            image: 'notFoundUrl',
            imageAlt: 'image url alt',
            textSlot: '<p slot="text">Sorry, er liep iets onverwachts mis.</p>',
        });
    });

    it('should mount', () => {
        cy.get('vl-http-error-message').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-http-error-message');
    });

    it('should display the alt image text', () => {
        cy.get('vl-http-error-message').shadow().find('img').should('have.attr', 'src').and('equal', 'notFoundUrl');

        cy.get('vl-http-error-message').shadow().find('img').should('have.attr', 'alt').and('equal', 'image url alt');
    });
});

describe('component vl-http-error-message - error-code', () => {
    beforeEach(() => {
        mountDefault({
            errorCode: '404',
        });
    });

    it('should mount', () => {
        cy.get('vl-http-error-message').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-http-error-message');
    });

    it('should contain a title', () => {
        cy.get('vl-http-error-message').shadow().find('h2[id="title"]').contains('Pagina niet gevonden');
    });

    it('should contain an image', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('img[id="image-normal"]')
            .should('have.attr', 'src')
            .and('equal', 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/page-not-found.svg');
    });

    it('should contain text', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('vl-typography#error-text')
            .find('p')
            .should(
                'contain.html',
                '<a href="mailto:help@omgevingvlaanderen.be?subject=HTTP-code 404">Mail dan de helpdesk</a>'
            )
            .and(
                'contain',
                'We vonden de pagina niet terug. Controleer even of u een tikfout heeft gemaakt. Bent u via een link of\n            website op deze pagina gekomen.'
            )
            .and('contain', 'en vermeld\n            daarbij de URL hierboven en de foutcode 404.');
    });

    it('should contain an action button', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('div#error-actions > div > vl-link')
            .contains('Terug naar de startpagina');
    });

    it('should contain debugging info', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('div[id="info"]')
            .then(($info) => {
                cy.wrap($info)
                    .find('tr > td#url')
                    .invoke('text')
                    .then((url) => {
                        const urlPattern = /(http[s]?:\/\/)?([^\s(["<,>]*\.[^\s[",><]*)?(:\d+)?(\/\S*)?/;

                        expect(urlPattern.test(url)).to.be.true;
                    });
                cy.wrap($info)
                    .find('tr > td#time')
                    .invoke('text')
                    .then((time) => {
                        const timePattern =
                            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.\d{3}Z$/;

                        expect(timePattern.test(time)).to.be.true;
                    });
                cy.wrap($info)
                    .find('tr > td#user-agent')
                    .invoke('text')
                    .then((text) => {
                        assert.isNotEmpty(text, 'User-agent info element should contain text');
                    });
            });
    });
});

describe('component vl-http-error-message - error-code - overwritten fields', () => {
    beforeEach(() => {
        mountDefault({
            title: 'Error title',
            image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
            imageAlt: 'image url alt',
            textSlot: '<p slot="text">Sorry, er liep iets onverwachts mis.</p>',
            actionsSlot: '<div slot="actions"><a href="#">Opnieuw opstarten</a></div>',
            errorCode: '404',
        });
    });

    it('should mount', () => {
        cy.get('vl-http-error-message').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-http-error-message');
    });

    it('should contain a title from the attribute', () => {
        cy.get('vl-http-error-message').shadow().find('h2[id="title"]').contains('Error title');
    });

    it('should not contain the title from the error code', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .invoke('text')
            .then((text) => {
                expect(text).to.not.include('Pagina niet gevonden');
            });
    });

    it('should contain the image from the attribute', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('img[id="image-normal"]')
            .should('have.attr', 'src')
            .and('equal', 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg');
    });

    it('should contain text from the slot', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('slot[name="text"]')
            .then(($slot) => {
                expect($slot).to.have.length(1);
                cy.wrap(($slot[0] as HTMLSlotElement).assignedNodes()).contains('Sorry, er liep iets onverwachts mis.');
            });
    });

    it('should not contain text from the error code', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('vl-typography#error-text')
            .should('not.contain', 'We vonden de pagina niet terug.');
    });

    it('should contain the action button from the slot', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('slot[name="actions"]')
            .then(($slot) => {
                expect($slot).to.have.length(1);
                cy.wrap(($slot[0] as HTMLSlotElement).assignedNodes())
                    .find('a')
                    .contains('Opnieuw opstarten');
            });
    });

    it('should not contain the action button from the error code', () => {
        cy.get('vl-http-error-message')
            .shadow()
            .find('div#error-actions')
            .should('not.contain', 'Terug naar de startpagina');
    });
});

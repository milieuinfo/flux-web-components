import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlProzaMessagePreloader } from './vl-proza-message-preloader.component';
import { ProzaRestClient } from './vl-proza-rest-client.util';

registerWebComponents([VlProzaMessagePreloader]);

describe('vl-proza-message-preloader', () => {
    const mockDomain = 'mock-domain';
    
    beforeEach(() => {
        VlProzaMessagePreloader.__cache = {};

        cy.spy(ProzaRestClient, 'getMessages').as('getMessagesSpy');

        cy.window().then((win) => {
            cy.stub(win, 'fetch').callsFake((uri) => {
                expect(uri).to.include(mockDomain);
                return Promise.resolve(
                    new win.Response(
                        JSON.stringify([
                            // { code: 'ERR001', tekst: 'Something went wrong' },
                            // { code: 'ERR002', tekst: 'Invalid input' },
                        ]),
                        {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        }
                    )
                );
            });
        });
    });



    it('should have a static public preload method', () => {
        expect(VlProzaMessagePreloader.preload).to.be.a('function');
        VlProzaMessagePreloader.preload(mockDomain);
        
        cy.get('@getMessagesSpy').should('have.been.calledOnce');
        cy.get('@getMessagesSpy').should('have.been.calledWith', mockDomain, undefined);
    })

    it('should have a public preload method', () => {
        cy.mount(
            html`<div>
                <vl-proza-message-preloader
                    data-vl-domain="${mockDomain}"
                    
                ></vl-proza-message-preloader>
            </div>`
        );

        cy.get('vl-proza-message-preloader').then((el) => {
            const preloader = el[0] as VlProzaMessagePreloader;
            expect(preloader.preload).to.be.a('function');

            preloader.preload();
            cy.get('@getMessagesSpy').should('have.been.calledOnce');
            cy.get('@getMessagesSpy').should('have.been.calledWith', mockDomain, undefined);
        });
    });
});

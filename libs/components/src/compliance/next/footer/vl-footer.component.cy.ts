import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlFooter } from './vl-footer.component';

registerWebComponents([VlFooter]);

type MountDefaultProps = {
    development: boolean;
    identifier: string;
    onReady: (evt: CustomEvent) => void;
};

const mountDefault = (props: MountDefaultProps) => {
    return cy.mount(html`
        <body>
            <vl-footer-next
                ?development=${props.development}
                identifier=${props.identifier}
                @ready=${(evt: CustomEvent) => props.onReady(evt)}
            ></vl-footer-next>
        </body>
    `);
};

const props: MountDefaultProps = {
    development: false,
    identifier: '0337f8dc-3266-4e7a-8f4a-95fd65189e5b',
    onReady: () => console.log('ready'),
};

describe('cypress-component - compliance components - vl-footer-next', () => {
    afterEach(() => {
        cy.get('script#vl-footer-widget').then(([script]) => {
            script.remove();
        });
    });

    describe('default', () => {
        beforeEach(() => {
            mountDefault(props);
        });

        it('should mount', () => {
            cy.get('vl-footer-next');
        });

        it('should be accessible', () => {
            cy.get('vl-footer-next');

            cy.injectAxe();
            cy.checkA11y('vl-footer-next');
        });
    });

    describe('properties default ', () => {
        it('should have default values properties', () => {
            mountDefault(props);

            cy.get('vl-footer-next').should('not.have.attr', 'development', props.development);
            cy.get('vl-footer-next').should('have.attr', 'identifier', props.identifier);
        });
    });

    describe('properties reflect ', () => {
        it('should reflect the <development> attribute', () => {
            mountDefault({ ...props, development: true });

            cy.get('vl-footer-next').should('have.attr', 'development', '');
        });

        it('should reflect the <identifier> attribute', () => {
            mountDefault({ ...props, identifier: 'TEST_IDENTIFIER' });

            cy.get('vl-footer-next').should('have.attr', 'identifier', 'TEST_IDENTIFIER');
        });
    });

    describe('events', () => {
        it('should emit ready event', () => {
            mountDefault({ ...props, development: true });

            window.addEventListener('ready', cy.stub().as('ready'));
            cy.get('@ready').should('have.been.calledOnce');
        });
    });
});

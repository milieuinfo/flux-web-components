import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common';
import { VlFooter } from './vl-footer.section';

registerWebComponents([VlFooter]);

type MountDefaultProps = {
    development: boolean;
    identifier: string;
    onReady: (evt: CustomEvent) => void;
};

const mountDefault = (props: MountDefaultProps) => {
    return cy.mount(html`
        <body>
            <vl-footer
                ?development=${props.development}
                identifier=${props.identifier}
                @ready=${(evt: CustomEvent) => props.onReady(evt)}
            ></vl-footer>
        </body>
    `);
};

const props: MountDefaultProps = {
    development: false,
    identifier: '0337f8dc-3266-4e7a-8f4a-95fd65189e5b',
    onReady: () => console.log('ready'),
};

describe('vl-footer component - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('vl-footer');
    });

    it('should be accessible', () => {
        cy.get('vl-footer');

        cy.injectAxe();
        cy.checkA11y('vl-footer');
    });
});

describe('vl-footer component - properties default ', () => {
    it('should have default values properties', () => {
        mountDefault(props);

        cy.get('vl-footer').should('not.have.attr', 'development', props.development);
        cy.get('vl-footer').should('have.attr', 'identifier', props.identifier);
    });
});

describe('vl-footer component - properties reflect ', () => {
    it('should reflect the <development> attribute', () => {
        mountDefault({ ...props, development: true });

        cy.get('vl-footer').should('have.attr', 'development', '');
    });

    it('should reflect the <identifier> attribute', () => {
        mountDefault({ ...props, identifier: 'TEST_IDENTIFIER' });

        cy.get('vl-footer').should('have.attr', 'identifier', 'TEST_IDENTIFIER');
    });
});

describe('vl-footer component - events', () => {
    it('should emit ready event', () => {
        mountDefault({ ...props, development: true });

        cy.createStubForEvent('vl-footer', 'ready');
        cy.get('@ready').should('have.been.calledOnce');
    });
});

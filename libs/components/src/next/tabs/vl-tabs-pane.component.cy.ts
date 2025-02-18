import { html } from 'lit';
import { VlTabsPaneComponent } from './vl-tabs-pane.component';
import { registerWebComponents } from '@domg-wc/common-utilities';

registerWebComponents([VlTabsPaneComponent]);

type MountDefaultProps = {
    id?: string;
    content?: string;
    title?: string;
};

const props = {
    id: 'trein',
    content:
        'Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    title: 'Trein',
};
const mountDefault = ({ id, title, content }: MountDefaultProps) => {
    return cy.mount(html` <vl-tabs-pane-next id=${id} title=${title} slot="${id}-slot">
        <slot name="${id}-title-slot">${content}</slot>
    </vl-tabs-pane-next>`);
};

describe('component vl-tabs-pane', () => {
    beforeEach(() => {
        mountDefault({ ...props });
    });

    it('should mount', () => {
        cy.get('[data-cy-root]').within(() => {
            cy.get('vl-tabs-pane-next').shadow();
        });
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-tabs-pane-next');
    });
});

describe('component vl-tabs-pane attributes', () => {
    it('should have correct <id> and <title> attributes', () => {
        mountDefault({ ...props, id: 'metro', title: 'Metro' });

        cy.get('vl-tabs-pane-next').should('have.attr', 'id', 'metro');
        cy.get('vl-tabs-pane-next').should('have.attr', 'title', 'Metro');
    });

    it('should update content in slot correctly', () => {
        mountDefault({ ...props, content: 'Updated Content' });
        cy.get('vl-tabs-pane-next').find('slot').should('have.text', 'Updated Content');
        cy.get('vl-tabs-pane-next').find('slot').should('contain', 'Updated Content');
    });
});

import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlSideSheet } from './vl-side-sheet.component';

registerWebComponents([VlSideSheet]);

describe('vl-side-sheet', () => {
    it('should be accessible', () => {
        mountDefault({});
        cy.injectAxe();

        cy.get('vl-side-sheet');
        cy.checkA11y('vl-side-sheet');
    });

    it('should open and close the side-sheet', () => {
        mountDefault({});

        shouldBeClosed();
        shouldClickToggleButton();
        shouldBeOpen();
        shouldClickToggleButton();
        shouldBeClosed();
    });

    it('should open and close the side-sheet using open attribute', () => {
        mountDefault({});

        shouldBeClosed();
        cy.get('vl-side-sheet').invoke('attr', 'data-vl-open', 'true');
        shouldBeOpen();
        cy.get('vl-side-sheet').invoke('removeAttr', 'data-vl-open');
        shouldBeClosed();
    });

    it('should contain the expected data', () => {
        mountDefault({});

        cy.get('vl-side-sheet')
            .shadow()
            .find('slot')
            .within((slot) => {
                const slotContent = (slot[0] as any).assignedNodes();
                expect(slotContent[1].innerHTML).to.contain('Lorem ipsum dolor sit amet,');
            });
    });

    it('should not contain toggle text by default', () => {
        mountDefault({});

        cy.get('vl-side-sheet')
            .shadow()
            .find('vl-button-next')
            .should('not.contain.text');
    });

    it('should contain toggle text if set', () => {
        const toggleText = 'text on toggle button';
        mountDefault({ toggleText });

        cy.get('vl-side-sheet')
            .shadow()
            .find('vl-button-next')
            .contains(toggleText);
    });

    it('should not be absolutely positioned by default', () => {
        mountDefault({});

        cy.get('vl-side-sheet')
            .shouldHaveComputedStyle({ style: 'position', value: 'absolute', not: true })
            .should('not.have.class', 'vl-side-sheet--absolute');
    });

    it('should be absolutely positioned', () => {
        mountDefault({ absolute: true });

        cy.get('vl-side-sheet')
            .shouldHaveComputedStyle({ style: 'position', value: 'absolute' })
            .should('have.class', 'vl-side-sheet--absolute');
    });

    it('should not contain a tooltip by default', () => {
        mountDefault({});

        cy.get('vl-side-sheet').shadow().find('vl-button-next').should('not.have.attr', 'title');
    });

    it('should contain a custom tooltip', () => {
        const tooltipText = 'text on native tooltip';
        mountDefault({ tooltipText: tooltipText });

        cy.get('vl-side-sheet').shadow().find('vl-button-next').should('have.attr', 'title', tooltipText);
    });

    it('should be right by default & change default icon direction when opening or closing', () => {
        mountDefault({});

        cy.get('vl-side-sheet').shouldHaveComputedStyle({ style: 'right', value: '0px' });
        shouldHaveIcon('nav-left');
        shouldClickToggleButton();
        shouldHaveIcon('nav-right');
        shouldClickToggleButton()
        shouldHaveIcon('nav-left');
    });

    it('should be left & change icon direction when opening or closing', () => {
        mountDefault({ left: true });

        cy.get('vl-side-sheet').shouldHaveComputedStyle({ style: 'left', value: '0px' });
        shouldHaveIcon('nav-right');
        shouldClickToggleButton();
        shouldHaveIcon('nav-left');
        shouldClickToggleButton();
        shouldHaveIcon('nav-right');
    });

    it('should have a custom icon & remain the same when opening or closing', () => {
        const customIcon = 'list-add';
        mountDefault({ customIcon });

        shouldHaveIcon(customIcon);
        shouldClickToggleButton();
        shouldHaveIcon(customIcon);
        shouldClickToggleButton();
        shouldHaveIcon(customIcon);
    });

    it('should hide toggle button', () => {
        mountDefault({ hideToggleButton: true });

        cy.get('vl-side-sheet').shadow().find('vl-button-next').should('have.class', 'vl-visually-hidden');
    });

    it('should open and close the side-sheet when toggle button is hidden', () => {
        mountDefault({ hideToggleButton: true });

        shouldBeClosed();
        shouldClickToggleButton();
        shouldBeOpen();
        shouldClickToggleButton();
        shouldBeClosed();
    });

    it('should place icon before the text by default', () => {
        mountDefault({ toggleText: 'toggle-side-sheet' });

        cy.get('vl-side-sheet')
            .shadow()
            .find('vl-button-next')
            .shadow()
            .find('button')
            .children()
            .first()
            .should('have.class', 'vl-icon');
    });

    it('should place icon behind the text ', () => {
        mountDefault({ iconPlacement: 'after', toggleText: 'toggle-side-sheet' });

        cy.get('vl-side-sheet')
            .shadow()
            .find('vl-button-next')
            .shadow()
            .find('button')
            .children()
            .last()
            .should('have.class', 'vl-icon');
    });

    it('should have arrow in correct position when starting in open position', () => {
        mountDefault({ open: true });

        cy.get('vl-side-sheet')
            .shadow()
            .find('vl-button-next')
            .shadow()
            .find('button span')
            .should('have.class', 'vl-icon')
            .and('have.class', 'vl-icon--nav-right');
    });

    it('should have arrow in correct position when starting in open position from left', () => {
        mountDefault({ open: true, left: true });

        cy.get('vl-side-sheet')
            .shadow()
            .find('vl-button-next')
            .shadow()
            .find('button span')
            .should('have.class', 'vl-icon')
            .and('have.class', 'vl-icon--nav-left');
    });
});

const shouldClickToggleButton = () => {
    cy.get('vl-side-sheet').shadow().find('vl-button-next').shadow().find('button').click({ force: true });
};

const shouldBeOpen = () => {
    cy.get('vl-side-sheet').should('have.attr', 'data-vl-open');
    cy.get('vl-side-sheet')
        .shadow()
        .find('div#vl-side-sheet')
        .shouldHaveComputedStyle({ style: 'display', value: 'block' });
};

const shouldBeClosed = () => {
    cy.get('vl-side-sheet').should('not.have.attr', 'data-vl-open');
    cy.get('vl-side-sheet')
        .shadow()
        .find('div#vl-side-sheet')
        .shouldHaveComputedStyle({ style: 'display', value: 'none' });
};

const shouldHaveIcon = (iconName: string) => {
    cy.get('vl-side-sheet')
        .shadow()
        .find('vl-button-next')
        .shadow()
        .find('button span')
        .should('have.class', `vl-icon--${iconName}`);
};

const mountDefault = ({
    enableSwipe,
    absolute,
    left,
    toggleText,
    tooltipText,
    right,
    customIcon,
    hideToggleButton,
    iconPlacement = 'before',
    open,
}: {
    enableSwipe?: boolean;
    absolute?: boolean;
    left?: boolean;
    toggleText?: string;
    tooltipText?: string;
    right?: boolean;
    customIcon?: string;
    hideToggleButton?: boolean;
    open?: boolean;
    iconPlacement?: string;
}) => {
    cy.mount(html`
        <vl-side-sheet
            ?data-vl-enable-swipe=${enableSwipe}
            ?data-vl-absolute=${absolute}
            ?data-vl-left=${left}
            ?data-vl-right=${right}
            data-vl-toggle-text=${toggleText}
            data-vl-tooltip-text=${tooltipText}
            data-vl-custom-icon=${customIcon}
            data-vl-icon-placement=${iconPlacement}
            ?data-vl-hide-toggle-button=${hideToggleButton}
            ?data-vl-open=${open}
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum urna ante. Integer eu sem
                mollis, ornare libero nec, pulvinar augue. Nunc ac rhoncus ipsum. Mauris vitae elementum erat. Donec
                gravida hendrerit magna, quis feugiat felis sodales quis. Sed tempor ornare elit, non aliquam urna
                maximus imperdiet. Suspendisse finibus ullamcorper dictum. Sed vehicula tortor quis dignissim tincidunt.
                Maecenas turpis ante, blandit sed efficitur eu, varius vitae nibh. Vivamus porttitor mi in massa
                elementum sollicitudin. Cras id porta nisi, vel pulvinar neque. Mauris sodales mi sem, sit amet
                fringilla tellus ultrices et. Quisque sed interdum mauris. Suspendisse rutrum maximus ornare. Morbi sed
                vestibulum magna, a tincidunt mi. Aliquam in imperdiet diam.
            </p>
            <p>
                Nulla mattis eget mi at mattis. Donec ut nisi ipsum. Sed placerat, augue vel dapibus blandit, nulla
                purus hendrerit orci, ut maximus ligula quam at sapien. Nunc efficitur augue est, ac laoreet libero
                blandit in. Aliquam non sagittis libero. Fusce posuere magna venenatis, facilisis magna quis, dictum
                risus. In nulla augue, efficitur congue porta sit amet, convallis eu justo. Etiam facilisis maximus
                dolor, a scelerisque sapien fringilla non. Quisque vestibulum mauris erat, vel ultrices massa dictum sit
                amet. Integer nec bibendum arcu, sit amet pretium turpis.
            </p>
            <p>
                Vivamus ligula diam, lobortis eget ultricies vitae, varius id arcu. Sed id mauris sed augue ultricies
                luctus. Donec pulvinar a sapien quis posuere. Suspendisse non varius dui. Nullam eu posuere neque.
                Vivamus eget felis turpis. Curabitur tortor ante, vulputate vel quam ut, posuere mattis ipsum. Maecenas
                vel metus tortor. Quisque id turpis est. Donec est eros, laoreet vel metus id, tempor pulvinar eros. Nam
                sed semper eros. Aenean placerat tellus ex, ac ultricies dui ornare ac. Suspendisse eget semper risus.
                Nullam eleifend leo justo, eu rhoncus erat lacinia quis. Nam finibus nunc sit amet justo interdum
                dignissim.
            </p>
            <p>
                Donec iaculis purus leo. Aliquam pulvinar magna vitae dolor varius auctor. Sed dapibus convallis est,
                non pharetra felis eleifend nec. Donec erat ex, tempus in sem quis, imperdiet gravida justo. Morbi sem
                purus, efficitur eget massa ut, molestie placerat orci. Phasellus sollicitudin convallis augue, ut
                tincidunt nulla faucibus ut. Praesent ullamcorper erat sit amet nisi venenatis eleifend. Vestibulum
                vehicula tristique ipsum, vel placerat tortor maximus eu. Phasellus mauris purus, semper vulputate
                maximus sit amet, faucibus eget risus. Sed in imperdiet dui, vel suscipit nibh. Nunc ac lectus tempus,
                venenatis mauris non, ornare nunc. Cras at nibh nec sem vestibulum facilisis. Curabitur et elit
                hendrerit, ullamcorper nibh vitae, eleifend augue. Aliquam imperdiet eros quis pulvinar suscipit.
            </p>
            <p>
                In dapibus, est eu eleifend vehicula, purus arcu consequat nulla, accumsan viverra mi massa vel metus.
                Vestibulum ut nunc viverra, pellentesque urna et, consectetur metus. Quisque bibendum diam non eros
                porta, non volutpat leo commodo. Morbi odio nulla, tempus non lobortis ac, imperdiet vitae sem. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ac sodales
                eros. In hac habitasse platea dictumst.
            </p>
        </vl-side-sheet>
    `);
};

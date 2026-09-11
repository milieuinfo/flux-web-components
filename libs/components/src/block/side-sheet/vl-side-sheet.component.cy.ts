import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlSideSheet } from './vl-side-sheet.component';

registerWebComponents([VlSideSheet]);

describe('cypress-component - block components - vl-side-sheet', () => {
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

    it('should close on Escape key when open', () => {
        mountDefault({ open: true });

        shouldBeOpen();
        cy.get('vl-side-sheet').shadow().find('vl-button').shadow().find('button').focus().type('{esc}');
        shouldBeClosed();
    });

    it('should open and close the side-sheet using open attribute', () => {
        mountDefault({});

        shouldBeClosed();
        cy.get('vl-side-sheet').invoke('attr', 'open', 'true');
        shouldBeOpen();
        cy.get('vl-side-sheet').invoke('removeAttr', 'open');
        shouldBeClosed();
    });

    it('should respect top attribute as padding-top', () => {
        mountDefault({ top: '80px', open: true });

        cy.get('vl-side-sheet')
            .shadow()
            .find('div#vl-side-sheet')
            .shouldHaveComputedStyle({ style: 'padding-top', value: '80px' });
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

        cy.get('vl-side-sheet').shadow().find('vl-button').should('not.contain.text');
    });

    it('should contain toggle text if set', () => {
        const toggleText = 'text on toggle button';
        mountDefault({ toggleText });

        cy.get('vl-side-sheet').shadow().find('vl-button').contains(toggleText);
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

        cy.get('vl-side-sheet').shadow().find('vl-button').should('not.have.attr', 'title');
    });

    it('should contain a custom tooltip', () => {
        const tooltipText = 'text on native tooltip';
        mountDefault({ tooltipText: tooltipText });

        cy.get('vl-side-sheet').shadow().find('vl-tooltip').should('contain.text', tooltipText);
    });

    it('should be right by default & change default icon direction when opening or closing', () => {
        mountDefault({});

        cy.get('vl-side-sheet').shouldHaveComputedStyle({ style: 'right', value: '0px' });
        shouldHaveIcon('nav-left');
        shouldClickToggleButton();
        shouldHaveIcon('nav-right');
        shouldClickToggleButton();
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

        cy.get('vl-side-sheet').shadow().find('vl-button').should('have.class', 'vl-visually-hidden');
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
            .find('vl-button')
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
            .find('vl-button')
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
            .find('vl-button')
            .shadow()
            .find('button span')
            .should('have.class', 'vl-icon')
            .and('have.class', 'vl-icon--nav-right');
    });

    it('should have arrow in correct position when starting in open position from left', () => {
        mountDefault({ open: true, left: true });

        cy.get('vl-side-sheet')
            .shadow()
            .find('vl-button')
            .shadow()
            .find('button span')
            .should('have.class', 'vl-icon')
            .and('have.class', 'vl-icon--nav-left');
    });
});

describe('cypress-component - block components - vl-side-sheet - focus management', () => {
    it('should keep focus inside the side-sheet when tabbing on a desktop viewport', () => {
        cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        cy.get('#first-action').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#second-action').should('have.focus');
    });

    it('should keep focus inside the side-sheet when tabbing on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        cy.get('#first-action').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#second-action').should('have.focus');
    });

    it('should move focus to the toggle button when tabbing past the last element on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        cy.get('#second-action').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        shouldFocusToggleButton(true);
    });

    it('should move focus outside the side-sheet when tabbing past the last element on a desktop viewport', () => {
        cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        cy.get('#second-action').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#outside-action').should('have.focus');
    });

    it('should move focus to the first element when tabbing from the toggle button on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        focusToggleButton();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#first-action').should('have.focus');
    });

    it('should move focus to the first element when tabbing from the toggle button on a desktop viewport', () => {
        cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        focusToggleButton();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#first-action').should('have.focus');
    });

    it('should move focus to the last element when shift-tabbing from the toggle button on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        focusToggleButton();
        pressShiftTab();

        cy.get('#second-action').should('have.focus');
    });

    it('should move focus to a last element inside a shadow root when shift-tabbing from the toggle button on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        cy.mount(html`
            <vl-side-sheet open>
                <button id="first-action" type="button">eerste actie</button>
                <vl-button id="last-action">laatste actie</vl-button>
                <button type="button" hidden>verborgen actie</button>
            </vl-side-sheet>
        `);
        cy.get('#last-action').shadow().find('button').should('exist');

        focusToggleButton();
        pressShiftTab();

        cy.get('#last-action').shadow().find('button').should('have.focus');
    });

    it('should keep focus on the toggle button when tabbing on a mobile viewport without focusable content', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        cy.mount(html`
            <vl-side-sheet open><p>geen focusbare inhoud</p></vl-side-sheet>
            <button id="outside-action" type="button">actie buiten de side-sheet</button>
        `);
        cy.get('vl-side-sheet').shadow().find('vl-button').shadow().find('button').should('exist');

        focusToggleButton();
        cy.press(Cypress.Keyboard.Keys.TAB);
        shouldFocusToggleButton(true);

        pressShiftTab();
        shouldFocusToggleButton(true);
    });

    it('should move focus to the first element when tabbing past the last element with a hidden toggle button on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true, hideToggleButton: true });

        cy.get('#second-action').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#first-action').should('have.focus');
        shouldFocusToggleButton(false);
    });

    it('should move focus to the last element when shift-tabbing from the first element with a hidden toggle button on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true, hideToggleButton: true });

        cy.get('#first-action').focus();
        pressShiftTab();

        cy.get('#second-action').should('have.focus');
        shouldFocusToggleButton(false);
    });

    it('should not move focus to a hidden toggle button when shift-tabbing from the first element on a desktop viewport', () => {
        cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
        mountWithFocusableContent({ open: true, hideToggleButton: true });

        cy.get('#first-action').focus();
        pressShiftTab();

        cy.get('#first-action').should('not.have.focus');
        shouldFocusToggleButton(false);
    });

    it('should move focus to the first element when tabbing past the last element with a full width side-sheet on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true, fullWidth: true });

        cy.get('#second-action').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('#first-action').should('have.focus');
        shouldFocusToggleButton(false);
    });

    it('should move focus to the last element when shift-tabbing from the first element with a full width side-sheet on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true, fullWidth: true });

        cy.get('#first-action').focus();
        pressShiftTab();

        cy.get('#second-action').should('have.focus');
        shouldFocusToggleButton(false);
    });

    it('should not move focus to an off-screen toggle button when shift-tabbing with a full width side-sheet on a desktop viewport', () => {
        cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
        mountWithFocusableContent({ open: true, fullWidth: true });

        cy.get('#first-action').focus();
        pressShiftTab();

        cy.get('#first-action').should('not.have.focus');
        shouldFocusToggleButton(false);
    });

    it('should return focus to the toggle button when closing a full width side-sheet on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true, fullWidth: true });

        cy.get('#first-action').focus();
        cy.get('vl-side-sheet').then(($sideSheet) => ($sideSheet[0] as VlSideSheet).close());

        shouldFocusToggleButton(true);
        cy.get('vl-side-sheet').shadow().find('vl-button').should('not.have.attr', 'tabindex');
    });

    // Meerdere side-sheets tegelijk is een anti-pattern (zie de documentatie), maar mag niet eindigen in twee focus
    // traps die de focus van elkaar blijven wegtrekken.
    it('should leave focus in another open side-sheet on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountTwoSideSheets();

        cy.get('#second-sheet-action').focus();

        cy.get('#second-sheet-action').should('have.focus');
    });

    it('should move focus into one of the side-sheets when focus moves outside two open side-sheets on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountTwoSideSheets();

        cy.get('#outside-action').focus();

        cy.document().should((doc) => {
            expect(doc.activeElement?.tagName.toLowerCase()).to.equal('vl-side-sheet');
        });
    });

    it('should return focus to the side-sheet when focus moves outside on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        cy.get('#outside-action').focus();

        cy.get('vl-side-sheet').shadow().find('div#vl-side-sheet').should('have.focus');
    });

    it('should not trap focus outside the side-sheet on a desktop viewport', () => {
        cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
        mountWithFocusableContent({ open: true });

        cy.get('#outside-action').focus();

        cy.get('#outside-action').should('have.focus');
    });

    it('should not trap focus when the side-sheet is closed on a mobile viewport', () => {
        cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
        mountWithFocusableContent({});

        cy.get('#outside-action').focus();

        cy.get('#outside-action').should('have.focus');
    });

    it('should return focus to the toggle button when closing the side-sheet', () => {
        mountWithFocusableContent({ open: true });

        cy.get('#first-action').focus();
        cy.get('vl-side-sheet').then(($sideSheet) => ($sideSheet[0] as VlSideSheet).close());

        shouldFocusToggleButton(true);
    });

    it('should return focus to the element that had focus before opening when closing with a hidden toggle button', () => {
        mountWithFocusableContent({ hideToggleButton: true });

        cy.get('#outside-action').focus();
        cy.get('vl-side-sheet').then(($sideSheet) => ($sideSheet[0] as VlSideSheet).open());
        cy.get('vl-side-sheet').shadow().find('div#vl-side-sheet').should('have.focus');
        cy.get('vl-side-sheet').then(($sideSheet) => ($sideSheet[0] as VlSideSheet).close());

        cy.get('#outside-action').should('have.focus');
        shouldFocusToggleButton(false);
    });

    it('should not move focus to the toggle button when the left attribute changes on a closed side-sheet', () => {
        mountWithFocusableContent({});

        cy.get('#outside-action').focus();
        cy.get('vl-side-sheet').invoke('attr', 'left', '');

        shouldFocusToggleButton(false);
        cy.get('#outside-action').should('have.focus');
    });
});

const DESKTOP_VIEWPORT = { width: 1280, height: 800 };
const MOBILE_VIEWPORT = { width: 375, height: 667 };

// De toggle button zit twee shadow roots diep; de have.focus-assertion van Cypress kijkt niet zo ver.
const shouldFocusToggleButton = (focused: boolean) => {
    cy.get('vl-side-sheet').should(($sideSheet) => {
        const shadowRoot = $sideSheet[0].shadowRoot;
        const toggleButton = shadowRoot?.querySelector('#toggle-button');
        expect(shadowRoot?.activeElement === toggleButton).to.equal(focused);
    });
};

const mountTwoSideSheets = () => {
    cy.mount(html`
        <vl-side-sheet open>
            <button id="first-sheet-action" type="button">actie in de eerste side-sheet</button>
        </vl-side-sheet>
        <vl-side-sheet open left>
            <button id="second-sheet-action" type="button">actie in de tweede side-sheet</button>
        </vl-side-sheet>
        <button id="outside-action" type="button">actie buiten de side-sheets</button>
    `);
    cy.get('vl-side-sheet').last().shadow().find('vl-button').shadow().find('button').should('exist');
};

const focusToggleButton = () => {
    cy.get('vl-side-sheet').shadow().find('vl-button').shadow().find('button').focus();
};

// cy.press ondersteunt geen modifier keys; via het Chrome DevTools Protocol verloopt Shift+Tab als echte browser-input.
const pressShiftTab = () => {
    const SHIFT_MODIFIER = 8;
    (['keyDown', 'keyUp'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchKeyEvent',
                params: { type, key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, modifiers: SHIFT_MODIFIER },
            }),
        );
    });
};

const mountWithFocusableContent = ({
    open,
    left,
    hideToggleButton,
    fullWidth,
}: {
    open?: boolean;
    left?: boolean;
    hideToggleButton?: boolean;
    fullWidth?: boolean;
}) => {
    cy.mount(html`
        <vl-side-sheet
            ?open=${open}
            ?left=${left}
            ?hide-toggle-button=${hideToggleButton}
            style=${fullWidth ? '--vl-side-sheet-width: 100%; --vl-side-sheet-width-mobile: 100%' : nothing}
        >
            <button id="first-action" type="button">eerste actie</button>
            <button id="second-action" type="button">tweede actie</button>
        </vl-side-sheet>
        <button id="outside-action" type="button">actie buiten de side-sheet</button>
    `);
    // vl-button rendert zijn button pas na de eerste Lit-update; zonder deze wachtstap test een focus-assertie niets.
    cy.get('vl-side-sheet').shadow().find('vl-button').shadow().find('button').should('exist');
};

const shouldClickToggleButton = () => {
    cy.get('vl-side-sheet').shadow().find('vl-button').shadow().find('button').click({ force: true });
};

const shouldBeOpen = () => {
    cy.get('vl-side-sheet').should('have.attr', 'open');
    cy.get('vl-side-sheet')
        .shadow()
        .find('div#vl-side-sheet')
        .shouldHaveComputedStyle({ style: 'display', value: 'block' });
};

const shouldBeClosed = () => {
    cy.get('vl-side-sheet').should('not.have.attr', 'open');
    cy.get('vl-side-sheet')
        .shadow()
        .find('div#vl-side-sheet')
        .shouldHaveComputedStyle({ style: 'display', value: 'none' });
};

const shouldHaveIcon = (iconName: string) => {
    cy.get('vl-side-sheet')
        .shadow()
        .find('vl-button')
        .shadow()
        .find('button span')
        .should('have.class', `vl-icon--${iconName}`);
};

const mountDefault = ({
    enableSwipe,
    absolute,
    left,
    top,
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
    top?: string;
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
            ?enable-swipe=${enableSwipe}
            ?absolute=${absolute}
            ?left=${left}
            top=${top}
            ?right=${right}
            toggle-text=${toggleText}
            tooltip-text=${tooltipText}
            custom-icon=${customIcon}
            icon-placement=${iconPlacement}
            ?hide-toggle-button=${hideToggleButton}
            ?open=${open}
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

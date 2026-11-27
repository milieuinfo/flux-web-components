import { registerWebComponents } from '@domg-wc/common';
import { html, nothing } from 'lit';
import { VlPillComponent } from './vl-pill.component';

registerWebComponents([VlPillComponent]);

const PILL_TYPES = ['success', 'warning', 'error'] as const;

const mount = ({
    checkable,
    checked,
    clickable,
    closable,
    disabled,
    isInMap,
    type,
    content = 'Pill',
    handleCheck,
    handleClick,
    handleClose,
}: {
    checkable?: boolean;
    checked?: boolean;
    clickable?: boolean;
    closable?: boolean;
    disabled?: boolean;
    isInMap?: boolean;
    type?: (typeof PILL_TYPES)[number];
    content?: string;
    handleCheck?: (event: CustomEvent) => void;
    handleClick?: (event: MouseEvent) => void;
    handleClose?: () => void;
}) =>
    cy.mount(html`
        <vl-pill
            data-cy="pill"
            checkable=${checkable || nothing}
            clickable=${clickable || nothing}
            closable=${closable || nothing}
            disabled=${disabled || nothing}
            type=${type || nothing}
            checked=${checked || nothing}
            isInMap=${isInMap || nothing}
            @check=${handleCheck || nothing}
            @click=${handleClick || nothing}
            @close=${handleClose || nothing}
        >
            ${content}
        </vl-pill>
    `);

type Point = { x: number; y: number };
type PillParts = { label: DOMRect; checkBox: DOMRect; text: DOMRect };

const centerOf = (rect: DOMRect): Point => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

// cy.click() bootst events na en stuurt ze naar één element. Via het Chrome DevTools Protocol (enkel Chromium)
// verloopt de klik als echte muisinvoer, en kiest de browser zelf het element onder de muis.
const realClick = (getPoint: (parts: PillParts) => Point) => {
    cy.get('vl-pill').shadow().find('label').should('exist');
    cy.get('vl-pill').then(($pill) => {
        const pill = $pill[0];
        const autWindow = pill.ownerDocument.defaultView!;
        const frameRect = autWindow.frameElement!.getBoundingClientRect();
        const scale = frameRect.width / autWindow.innerWidth;
        const slottedText = pill.ownerDocument.createRange();
        slottedText.selectNodeContents(pill);
        const point = getPoint({
            label: pill.shadowRoot!.querySelector('label')!.getBoundingClientRect(),
            checkBox: pill.shadowRoot!.querySelector('.vl-icon')!.getBoundingClientRect(),
            text: slottedText.getBoundingClientRect(),
        });
        const x = frameRect.left + point.x * scale;
        const y = frameRect.top + point.y * scale;
        (['mousePressed', 'mouseReleased'] as const).forEach((type) => {
            cy.then(() =>
                Cypress.automation('remote:debugger:protocol', {
                    command: 'Input.dispatchMouseEvent',
                    params: { type, x, y, button: 'left', clickCount: 1 },
                }),
            );
        });
    });
};

const CLICKS_ON_THE_HOST: Record<string, () => void> = {
    'a click on the pill': () => cy.get('vl-pill').click(),
    'click() from code': () => cy.get('vl-pill').then(($pill) => $pill[0].click()),
};

const USER_INPUT: Record<string, () => void> = {
    'a real mouse click on the text': () => realClick(({ text }) => centerOf(text)),
    'a real mouse click on the check box': () => realClick(({ checkBox }) => centerOf(checkBox)),
    'the space bar on the focused checkbox': () => {
        cy.get('vl-pill').shadow().find('input').focus();
        cy.press(Cypress.Keyboard.Keys.SPACE);
    },
};

// De omwegen die afnemers vandaag gebruiken, met force: true inbegrepen, mogen niet dubbel wisselen.
const EXISTING_WORKAROUNDS: Record<string, () => void> = {
    'a forced click on the label': () => cy.get('vl-pill').shadow().find('label').click({ force: true }),
    'a click on the left of the pill': () => cy.get('vl-pill').click('left'),
    'click() on the checkbox from code': () =>
        cy
            .get('vl-pill')
            .shadow()
            .find('input')
            .then(($input) => $input[0].click()),
};

// Cypress weigert zelf een klik zonder force op een disabled pill: met force slaat het die controle over.
const CLICKS_ON_A_DISABLED_HOST: Record<string, () => void> = {
    'a forced click on the pill': () => cy.get('vl-pill').click({ force: true }),
    'click() from code': CLICKS_ON_THE_HOST['click() from code'],
};

// Lang genoeg om het midden van de pill op de tekst te leggen: daar stuurt Cypress in Chromium de klik naar de host.
const TEXT = 'Kenmerk';

const NON_CHECKABLE_VARIANTS = {
    default: {},
    closable: { closable: true },
    clickable: { clickable: true },
    'closable and checkable': { closable: true, checkable: true },
};

const VETO_LISTENERS = ['on the pill', 'on an ancestor', 'on an ancestor during capture'] as const;

const mountWithVeto = (
    listener: (typeof VETO_LISTENERS)[number],
    veto: { active: boolean; refusals: number },
    handleCheck: (event: CustomEvent) => void,
) => {
    const preventClick = (event: Event) => {
        if (veto.active) {
            event.preventDefault();
            veto.refusals++;
        }
    };
    const ancestorListeners = {
        'on the pill': nothing,
        'on an ancestor': preventClick,
        'on an ancestor during capture': { handleEvent: preventClick, capture: true },
    };

    return cy.mount(html`
        <div id="pill-container" @click=${ancestorListeners[listener]}>
            <vl-pill checkable @check=${handleCheck} @click=${listener === 'on the pill' ? preventClick : nothing}>
                ${TEXT}
            </vl-pill>
        </div>
    `);
};

const shouldHaveChecked = (handleCheck: sinon.SinonStub, times: number, checked: boolean) =>
    cy.get('vl-pill').should(($pill) => {
        expect(handleCheck).to.have.callCount(times);
        expect(handleCheck.lastCall.args[0].detail).to.deep.equal({ checked });
        expect($pill).to.have.prop('checked', checked);
        expect($pill[0].shadowRoot!.querySelector('input')).to.have.property('checked', checked);
    });

const shouldNotHaveChecked = (handleCheck: sinon.SinonStub) =>
    cy.get('vl-pill').should(($pill) => {
        expect(handleCheck).to.have.callCount(0);
        expect($pill).to.have.prop('checked', false);
        expect($pill[0].shadowRoot!.querySelector('input')?.checked ?? false).to.equal(false);
    });

describe('cypress-component - block components - vl-pill', () => {
    it('should contain a text', () => {
        const mockContent = 'Optie 1';
        mount({ content: mockContent });
        cy.getDataCy('pill').contains(mockContent);
    });

    PILL_TYPES.forEach((type) =>
        it(`should contain a ${type} pill`, () => {
            mount({ type });
            cy.getDataCy('pill').shadow().find('.vl-pill').should('have.class', `vl-pill--${type}`);
        })
    );

    it('should contain a disabled pill', () => {
        mount({ disabled: true });
        cy.getDataCy('pill').shadow().find('.vl-pill').should('have.class', 'vl-pill--disabled');
    });

    it('should contain a closable pill', () => {
        mount({ closable: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--closable')
            .find('button')
            .should('have.class', 'vl-pill__close');
    });

    it('should contain a checkable pill that by default is unchecked but when clicked, becomes checked', () => {
        mount({ checkable: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--checkable')
            .find('input.vl-pill--checkable__checkbox')
            .should('not.have.attr', 'checked');

        cy.getDataCy('pill').click();

        cy.getDataCy('pill').shadow().find('input.vl-pill--checkable__checkbox').should('have.attr', 'checked');
    });

    it('should contain a checkable pill that is disabled and when clicking, does not enable the checkbox', () => {
        mount({ checkable: true, disabled: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--checkable')
            .find('input.vl-pill--checkable__checkbox')
            .should(($input) => {
                expect($input).to.have.attr('disabled');
                expect($input).to.not.have.attr('checked');
            });

        CLICKS_ON_A_DISABLED_HOST['click() from code']();

        cy.getDataCy('pill').shadow().find('input.vl-pill--checkable__checkbox').should('not.have.attr', 'checked');
    });

    it('should contain a checkable pill that is disabled and checked, as it is checked, should show a checkmark', () => {
        mount({ checkable: true, disabled: true, checked: true });
        cy.getDataCy('pill')
            .shadow()
            .find('.vl-pill')
            .should('have.class', 'vl-pill--checkable')
            .find('input.vl-pill--checkable__checkbox')
            .should(($input) => {
                expect($input).to.have.attr('disabled');
                expect($input).to.have.attr('checked');
            });
    });

    it('should send a click on the pill to the pill itself, not to its label', () => {
        const clicksOnHost: boolean[] = [];
        const handleClick = (event: MouseEvent) => clicksOnHost.push(event.composedPath()[0] === event.currentTarget);
        mount({ checkable: true, content: TEXT, handleClick });

        cy.get('vl-pill').click();

        cy.wrap(clicksOnHost).should('include', true);
    });

    Object.entries({ ...CLICKS_ON_THE_HOST, ...USER_INPUT, ...EXISTING_WORKAROUNDS }).forEach(([name, toggle]) =>
        it(`should check and uncheck a checkable pill exactly once per action with ${name}`, () => {
            const handleCheck = cy.stub();
            mount({ checkable: true, content: TEXT, handleCheck });

            toggle();
            shouldHaveChecked(handleCheck, 1, true);

            toggle();
            shouldHaveChecked(handleCheck, 2, false);
        }),
    );

    Object.entries(CLICKS_ON_A_DISABLED_HOST).forEach(([name, clickOnHost]) =>
        it(`should not check a disabled checkable pill with ${name}`, () => {
            const handleCheck = cy.stub();
            mount({ checkable: true, content: TEXT, disabled: true, handleCheck });
            cy.get('vl-pill').shadow().find('input').should('be.disabled');

            clickOnHost();

            shouldNotHaveChecked(handleCheck);
        }),
    );

    Object.entries(CLICKS_ON_THE_HOST).forEach(([name, clickOnHost]) =>
        Object.entries(NON_CHECKABLE_VARIANTS).forEach(([variant, attributes]) =>
            it(`should not check or close a ${variant} pill with ${name}`, () => {
                const handleCheck = cy.stub();
                const handleClose = cy.stub();
                mount({ ...attributes, content: TEXT, handleCheck, handleClose });
                cy.get('vl-pill').shadow().find('.vl-pill').should('exist');

                clickOnHost();

                shouldNotHaveChecked(handleCheck);
                cy.wrap(handleClose).should('not.be.called');
            }),
        ),
    );

    it('should not check a pill that is stretched by its container with a real mouse click next to the pill', () => {
        const handleCheck = cy.stub();
        const handleClick = cy.stub();
        cy.mount(html`
            <div id="pill-container" style="display: grid; grid-template-columns: 400px;">
                <vl-pill checkable @check=${handleCheck} @click=${handleClick}>${TEXT}</vl-pill>
            </div>
        `);

        realClick(({ label }) => ({ x: label.right + 100, y: centerOf(label).y }));

        cy.wrap(handleClick).should('be.calledOnce');
        shouldNotHaveChecked(handleCheck);
    });

    it('should check a pill when click() is called right after the pill is added', () => {
        const handleCheck = cy.stub();
        cy.mount(html`<div id="pill-container"></div>`);

        cy.get('#pill-container').then(($container) => {
            const pill = $container[0].ownerDocument.createElement('vl-pill');
            pill.setAttribute('checkable', '');
            pill.textContent = TEXT;
            pill.addEventListener('check', handleCheck);
            $container[0].append(pill);

            pill.click();

            expect(handleCheck).to.have.callCount(1);
            expect(pill).to.have.property('checked', true);
        });
    });

    it('should check a pill when click() is called right after the pill is made checkable', () => {
        const handleCheck = cy.stub();
        mount({ content: TEXT, handleCheck });
        cy.get('vl-pill').shadow().find('.vl-pill').should('exist');

        cy.get('vl-pill').then(($pill) => {
            $pill[0].setAttribute('checkable', '');
            $pill[0].click();
        });

        shouldHaveChecked(handleCheck, 1, true);
    });

    it('should not check a pill when click() is called right after the pill is disabled', () => {
        const handleCheck = cy.stub();
        mount({ checkable: true, content: TEXT, handleCheck });
        cy.get('vl-pill').shadow().find('input').should('exist');

        cy.get('vl-pill').then(($pill) => {
            $pill[0].setAttribute('disabled', '');
            $pill[0].click();
        });

        shouldNotHaveChecked(handleCheck);
    });

    VETO_LISTENERS.forEach((listener) =>
        Object.entries({ ...CLICKS_ON_THE_HOST, ...USER_INPUT }).forEach(([name, toggle]) =>
            it(
                `should not check a pill when a click listener ${listener} calls preventDefault, with ${name}, ` +
                    'and stay operable afterwards',
                () => {
                    const handleCheck = cy.stub();
                    const veto = { active: true, refusals: 0 };
                    mountWithVeto(listener, veto, handleCheck);

                    toggle();
                    cy.wrap(veto).its('refusals').should('be.greaterThan', 0);
                    shouldNotHaveChecked(handleCheck);

                    cy.then(() => (veto.active = false));
                    cy.get('body').click();
                    cy.press(Cypress.Keyboard.Keys.TAB);
                    cy.press(Cypress.Keyboard.Keys.SPACE);
                    shouldHaveChecked(handleCheck, 1, true);

                    cy.get('vl-pill').click();
                    shouldHaveChecked(handleCheck, 2, false);
                },
            ),
        ),
    );

    it('should contain a clickable pill', () => {
        const handleClick = cy.stub();
        mount({ clickable: true, handleClick });
        cy.getDataCy('pill')
            .click()
            .then(() => expect(handleClick).to.be.called);
    });

    it('should contain a disabled clickable pill', () => {
        const handleClick = cy.stub();
        mount({ clickable: true, handleClick, disabled: true });
        cy.getDataCy('pill').shadow().find('button').should('be.disabled');
    });
});

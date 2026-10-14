import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlLinkComponent } from '../../atom/link';
import { VlAccordionComponent } from './vl-accordion.component';

registerWebComponents([VlAccordionComponent, VlLinkComponent]);

describe('cypress-component - block components - vl-accordion', () => {
    const content = `Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze
    samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het
    belang van wetenschappelijk onderzoek.`;
    beforeEach(() => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling">
                <span> ${content} </span>
            </vl-accordion>
        `);
    });

    it('should mount', () => {
        cy.get('vl-accordion');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-accordion');
    });

    it('should contain a title', () => {
        cy.get('vl-accordion')
            .shadow()
            .find('.vl-accordion > .vl-accordion__button-container > button > slot.vl-accordion__title')
            .contains('Lees meer over de onderwijsdoelstelling');
    });

    it('should not show content on first render', () => {
        shouldBeRendered('vl-accordion span', false);
    });

    it('should show the content when the expand button is clicked', () => {
        cy.get('vl-accordion')
            .shadow()
            .find('.vl-accordion > .vl-accordion__button-container > button')
            .click({ force: true });

        cy.get('vl-accordion').shadow().find('.vl-accordion > .vl-accordion__content').should('be.visible');

        cy.get('vl-accordion').then(($accordion) => {
            const shadowRoot = $accordion[0].shadowRoot;

            const contentElement = (
                shadowRoot?.querySelector('slot[id=accordion-slot]') as HTMLSlotElement
            )?.assignedNodes()[0] as HTMLElement;
            contentElement.contains(contentElement);
        });
    });

    it('should show an icon', () => {
        cy.get('vl-accordion').invoke('attr', 'icon', 'university');

        cy.get('vl-accordion')
            .shadow()
            .find('.vl-accordion > .vl-accordion__button-container > button > vl-icon')
            .shadow()
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--university');
    });

    it('should show the title using the title slot', () => {
        const titleText = 'Title from slot';

        cy.get('vl-accordion').then(($accordion) => {
            const shadowRoot = $accordion[0].shadowRoot;
            const title = document.createElement('span');

            title.innerText = titleText;
            title.setAttribute('slot', 'title');
            $accordion[0].appendChild(title);

            const titleElement = (
                shadowRoot?.querySelector('slot[name=title]') as HTMLSlotElement
            )?.assignedNodes()[0] as HTMLElement;
            expect(titleElement.innerText).to.equal(titleText);
        });
    });

    it('should show the subtitle using the subtitle slot', () => {
        const subtitleText = 'subtitle from slot';

        cy.get('vl-accordion').then(($accordion) => {
            const shadowRoot = $accordion[0].shadowRoot;
            const title = document.createElement('span');

            title.innerText = subtitleText;
            title.setAttribute('slot', 'subtitle');
            $accordion[0].appendChild(title);

            const titleElement = (
                shadowRoot?.querySelector('slot[name=subtitle]') as HTMLSlotElement
            )?.assignedNodes()[0] as HTMLElement;
            expect(titleElement.innerText).to.equal(subtitleText);
        });
    });

    it('should show the menu item using the menu slot', () => {
        const spanElement = `
            <span slot="menu">
                <vl-link id="btn-acties" icon="menu" button-as-link>
                </vl-link>
            </span>`;

        cy.get('vl-accordion').then(($accordion) => {
            const shadowRoot = $accordion[0].shadowRoot;

            $accordion.append(spanElement);

            const menuElement = (
                shadowRoot?.querySelector('slot[name=menu]') as HTMLSlotElement
            )?.assignedNodes()[0] as HTMLElement;

            cy.wrap(menuElement).find('vl-link').shadow().find('span.vl-icon').should('exist');
        });
    });
});

describe('cypress-component - block components - vl-accordion - default testen', () => {
    const accordionDefaultHtml = html`
        <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling">
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should display story', () => {
        cy.mount(accordionDefaultHtml);
        cy.get('vl-accordion').shadow();
    });

    it('should be toggleable', () => {
        cy.mount(accordionDefaultHtml);
        shouldBeToggleable();
    });

    it('should set default slot', () => {
        cy.mount(accordionDefaultHtml);
        shouldSetDefaultSlot();
    });

    it('should set title', () => {
        cy.mount(accordionDefaultHtml);
        shouldSetTitle('Lees meer over de onderwijsdoelstelling');
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling" disabled>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordion();
    });

    it('should set bold', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling" bold>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetBold();
    });

    it('should set content padding', () => {
        cy.mount(html`
            <vl-accordion
                icon="university"
                toggle-text="Lees meer over de onderwijsdoelstelling"
                content-padding="none"
            >
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetContentPadding('0px');
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionDefaultHtml);
        shouldEmitEventOnToggle();
    });

    it('should be open by default', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling" default-open>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldBeOpen();
    });
});

describe('cypress-component - block components - vl-accordion - headings testen', () => {
    const accordionHeadingsHtml = html`
        <vl-accordion icon="university" toggle-text="Dit is een heading van ingevouwen inhoud" heading-level="3">
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should display story', () => {
        cy.mount(accordionHeadingsHtml);
        cy.get('vl-accordion').shadow();
    });

    it('should have heading level 3', () => {
        cy.mount(accordionHeadingsHtml);
        cy.get('vl-accordion')
            .shadow()
            .find('.vl-accordion__button-container > h3 > button > slot.vl-accordion__title')
            .contains('Dit is een heading van ingevouwen inhoud');
    });

    it('should not have heading level when not set', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Dit is een heading van ingevouwen inhoud">
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        cy.get('vl-accordion')
            .shadow()
            .find(
                '.vl-accordion__button-container > h1, .vl-accordion__button-container > h2, .vl-accordion__button-container > h3, .vl-accordion__button-container > h4, .vl-accordion__button-container > h5, .vl-accordion__button-container > h6'
            )
            .should('not.exist');
    });

    it('should update heading level when changed', () => {
        cy.mount(accordionHeadingsHtml);
        cy.get('vl-accordion').then(($accordion) => {
            $accordion[0].setAttribute('heading-level', '4');
        });
        cy.get('vl-accordion')
            .shadow()
            .find('.vl-accordion__button-container > h4 > button > slot.vl-accordion__title')
            .contains('Dit is een heading van ingevouwen inhoud');
    });

    it('should be toggleable', () => {
        cy.mount(accordionHeadingsHtml);
        shouldBeToggleable();
    });

    it('should set default slot', () => {
        cy.mount(accordionHeadingsHtml);
        shouldSetDefaultSlot();
    });

    it('should set title', () => {
        cy.mount(accordionHeadingsHtml);
        shouldSetTitle('Dit is een heading van ingevouwen inhoud');
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion
                icon="university"
                toggle-text="Dit is een heading van ingevouwen inhoud"
                heading-level="3"
                disabled
            >
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordion();
    });

    it('should set bold', () => {
        cy.mount(html`
            <vl-accordion
                icon="university"
                toggle-text="Dit is een heading van ingevouwen inhoud"
                heading-level="3"
                bold
            >
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetBold();
    });

    it('should set content padding', () => {
        cy.mount(html`
            <vl-accordion
                icon="university"
                toggle-text="Dit is een heading van ingevouwen inhoud"
                heading-level="3"
                content-padding="none"
            >
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetContentPadding('0px');
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionHeadingsHtml);
        shouldEmitEventOnToggle();
    });
});

describe('cypress-component - block components - vl-accordion - dynamic toggle testen', () => {
    const accordionDynamicToggleHtml = html`
        <vl-accordion
            icon="university"
            toggle-text="Lees meer over de onderwijsdoelstelling"
            close-toggle-text="Sluit de onderwijsdoelstelling"
            open-toggle-text="Open de onderwijsdoelstelling"
        >
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should display story', () => {
        cy.mount(accordionDynamicToggleHtml);
        cy.get('vl-accordion').shadow();
    });

    it('should be toggleable', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldBeToggleable();
    });

    it('should set default slot', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldSetDefaultSlot();
    });

    it('should set dynamic toggle', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldSetTitle('Open de onderwijsdoelstelling');
        toggleAccordion();
        shouldSetTitle('Sluit de onderwijsdoelstelling');
        toggleAccordion();
        shouldSetTitle('Open de onderwijsdoelstelling');
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion
                icon="university"
                toggle-text="Lees meer over de onderwijsdoelstelling"
                close-toggle-text="Sluit de onderwijsdoelstelling"
                open-toggle-text="Open de onderwijsdoelstelling"
                disabled
            >
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordion();
    });

    it('should set bold', () => {
        cy.mount(html`
            <vl-accordion
                icon="university"
                toggle-text="Lees meer over de onderwijsdoelstelling"
                close-toggle-text="Sluit de onderwijsdoelstelling"
                open-toggle-text="Open de onderwijsdoelstelling"
                bold
            >
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetBold();
    });

    it('should set content padding', () => {
        cy.mount(html`
            <vl-accordion
                icon="university"
                toggle-text="Lees meer over de onderwijsdoelstelling"
                close-toggle-text="Sluit de onderwijsdoelstelling"
                open-toggle-text="Open de onderwijsdoelstelling"
                content-padding="none"
            >
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetContentPadding('0px');
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldEmitEventOnToggle();
    });
});

describe('cypress-component - block components - vl-accordion - title slot testen', () => {
    const accordionTitleSlotHtml = html`
        <vl-accordion icon="university">
            <span slot="title">Lees meer over de onderwijsdoelstelling</span>
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should display story', () => {
        cy.mount(accordionTitleSlotHtml);
        cy.get('vl-accordion').shadow();
    });

    it('should be toggleable', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldBeToggleable();
    });

    it('should set default slot', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldSetDefaultSlot();
    });

    it('should set title slot', () => {
        cy.mount(accordionTitleSlotHtml);
        cy.get('vl-accordion').find('[slot="title"]').contains('Lees meer over de onderwijsdoelstelling');
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university" disabled>
                <span slot="title">Lees meer over de onderwijsdoelstelling</span>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordion();
    });

    it('should set bold', () => {
        cy.mount(html`
            <vl-accordion icon="university" bold>
                <span slot="title">Lees meer over de onderwijsdoelstelling</span>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetBold();
    });

    it('should set content padding', () => {
        cy.mount(html`
            <vl-accordion icon="university" content-padding="none">
                <span slot="title">Lees meer over de onderwijsdoelstelling</span>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldSetContentPadding('0px');
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldEmitEventOnToggle();
    });
});

describe('cypress-component - block components - vl-accordion - vindbaar via zoeken in de pagina', () => {
    const accordionHtml = html`
        <vl-accordion toggle-text="Onderwijsdoelstelling">
            <p id="doel">Onderwijs helpt jonge mensen.</p>
        </vl-accordion>
    `;

    it('should hide closed content with hidden="until-found"', () => {
        cy.mount(accordionHtml);
        shouldHaveContentHidden('until-found');
        shouldBeRendered('#doel', false);
    });

    it('should open when the browser reveals the content', () => {
        cy.mount(accordionHtml);
        cy.createStubForEvent('vl-accordion', 'vl-on-toggle');
        dispatchBeforeMatch();
        shouldBeOpen();
        shouldHaveContentHidden(null);
        shouldBeRendered('#doel', true);
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });

    it('should restore hidden="until-found" when closed again', () => {
        cy.mount(accordionHtml);
        toggleAccordion();
        shouldHaveContentHidden(null);
        toggleAccordion();
        shouldHaveContentHidden('until-found');
    });

    it('should not be revealable when disabled', () => {
        cy.mount(html`
            <vl-accordion toggle-text="Onderwijsdoelstelling" disabled>
                <p id="doel">Onderwijs helpt jonge mensen.</p>
            </vl-accordion>
        `);
        shouldHaveContentHidden('');
        shouldBeRendered('#doel', false);
        dispatchBeforeMatch();
        shouldBeClosed();
        shouldBeRendered('#doel', false);
    });
});

describe('cypress-component - block components - vl-accordion - border en achtergrond opties', () => {
    it('should apply alt-background class when alt-background attribute is set', () => {
        cy.mount(html`
            <vl-accordion toggle-text="Alternatieve achtergrond" alt-background>
                <span>Content.</span>
            </vl-accordion>
        `);
        cy.get('vl-accordion').should('have.class', 'vl-accordion--alt-background');
    });

    it('should not have alt-background class by default', () => {
        cy.mount(html`
            <vl-accordion toggle-text="Standaard achtergrond">
                <span>Content.</span>
            </vl-accordion>
        `);
        cy.get('vl-accordion').should('not.have.class', 'vl-accordion--alt-background');
    });

    it('should keep a manually set host class when the attribute is absent', () => {
        cy.mount(html`
            <vl-accordion class="vl-accordion--bold" toggle-text="Handmatige klasse">
                <span>Content.</span>
            </vl-accordion>
        `);
        cy.get('vl-accordion').shadow().find('button.vl-toggle').click({ force: true });
        cy.get('vl-accordion').should('have.class', 'vl-accordion--bold');
    });

    it('should remove the host class when the attribute is removed', () => {
        cy.mount(html`
            <vl-accordion toggle-text="Attribuut verwijderd" bold>
                <span>Content.</span>
            </vl-accordion>
        `);
        cy.get('vl-accordion').should('have.class', 'vl-accordion--bold');
        cy.get('vl-accordion').invoke('removeAttr', 'bold');
        cy.get('vl-accordion').should('not.have.class', 'vl-accordion--bold');
    });
});

const toggleAccordion = () => {
    cy.get('vl-accordion').shadow().find('button.vl-toggle').click({ force: true });
};

const shouldHaveContentHidden = (value: string | null) => {
    cy.get('vl-accordion')
        .shadow()
        .find('.vl-accordion__content')
        .should(($content) => expect($content[0].getAttribute('hidden')).to.equal(value));
};

const shouldBeRendered = (selector: string, rendered: boolean) => {
    cy.get(selector).should(($element) => expect($element[0].checkVisibility()).to.equal(rendered));
};

const dispatchBeforeMatch = () => {
    cy.get('vl-accordion')
        .shadow()
        .find('.vl-accordion__content')
        .then(($content) => $content[0].dispatchEvent(new Event('beforematch')));
};

const shouldBeClosed = () => {
    cy.get('vl-accordion').shadow().find('.vl-accordion').should('not.have.class', 'js-vl-accordion--open');
};

const shouldBeOpen = () => {
    cy.get('vl-accordion').shadow().find('.vl-accordion').should('have.class', 'js-vl-accordion--open');
};

const shouldBeToggleable = () => {
    shouldBeClosed();
    toggleAccordion();
    shouldBeOpen();
    toggleAccordion();
    shouldBeClosed();
};

const shouldSetDefaultSlot = () => {
    cy.get('vl-accordion').contains('Onderwijs helpt jonge mensen');
};

const shouldSetTitle = (title: string) => {
    cy.get('vl-accordion').shadow().find('.vl-accordion__title').contains(title);
};

const shouldDisableAccordion = () => {
    cy.get('vl-accordion').shadow().find('button.vl-toggle').should('be.disabled');
};

const shouldSetBold = () => {
    cy.get('vl-accordion').should('have.class', 'vl-accordion--bold');
};

const shouldSetContentPadding = (padding: string) => {
    cy.get('vl-accordion').shadow().find('.vl-accordion__panel').should('have.css', 'padding', padding);
};

const shouldEmitEventOnToggle = () => {
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');
    toggleAccordion();
    cy.get('@vl-on-toggle').should('have.been.calledOnce');
};

describe('cypress-component - block components - vl-accordion - api - default testen', () => {
    const accordionDefaultHtml = html`
        <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling">
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should be toggleable', () => {
        cy.mount(accordionDefaultHtml);
        shouldBeToggleableViaApi();
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling" disabled>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordionViaApi();
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionDefaultHtml);
        shouldEmitEventOnToggleViaApi();
    });

    it('should emit event on open', () => {
        cy.mount(accordionDefaultHtml);
        shouldEmitEventOnOpenViaApi();
    });

    it('should emit event on close', () => {
        cy.mount(accordionDefaultHtml);
        shouldEmitEventOnCloseViaApi();
    });

    it('should be open by default', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling" default-open>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldBeOpenViaApi();
    });
});

describe('cypress-component - block components - vl-accordion - api - dynamic toggle testen', () => {
    const accordionDynamicToggleHtml = html`
        <vl-accordion
            icon="university"
            toggle-text="Lees meer over de onderwijsdoelstelling"
            close-toggle-text="Sluit de onderwijsdoelstelling"
            open-toggle-text="Open de onderwijsdoelstelling"
        >
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should be toggleable', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldBeToggleableViaApi();
    });


    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university"
                              toggle-text="Lees meer over de onderwijsdoelstelling"
                              close-toggle-text="Sluit de onderwijsdoelstelling"
                              open-toggle-text="Open de onderwijsdoelstelling"
                              disabled
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordionViaApi();
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldEmitEventOnToggleViaApi();
    });

    it('should emit event on open', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldEmitEventOnOpenViaApi();
    });

    it('should emit event on close', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldEmitEventOnCloseViaApi();
    });
});

describe('cypress-component - block components - vl-accordion - api - title slot testen', () => {
    const accordionTitleSlotHtml = html`
        <vl-accordion icon="university">
            <span slot="title">Lees meer over de onderwijsdoelstelling</span>
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should be toggleable', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldBeToggleableViaApi();
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university" disabled>
                <span>Onderwijs helpt jonge mensen.</span>
                <span slot="title">Lees meer over de onderwijsdoelstelling</span>
            </vl-accordion>
        `);
        shouldDisableAccordionViaApi();
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldEmitEventOnToggleViaApi();
    });

    it('should emit event on open', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldEmitEventOnOpenViaApi();
    });

    it('should emit event on close', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldEmitEventOnCloseViaApi();
    });
});

describe('cypress-component - block components - vl-accordion - api - isOpen', () => {
    it('should expose the open state via isOpen and _isOpen', () => {
        cy.mount(html`
            <vl-accordion toggle-text="Onderwijsdoelstelling">
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
            expect(component.isOpen).to.be.false;
            expect(component._isOpen).to.be.false;
            component.open();
            expect(component.isOpen).to.be.true;
            expect(component._isOpen).to.be.true;
        });
    });
});

describe('cypress-component - block components - vl-accordion - api - properties na het toevoegen', () => {
    it('should be open when default-open is set as property before the first render', () => {
        cy.mount(html`<div id="host"></div>`);
        cy.get('#host').then(($host) => {
            const accordion = document.createElement('vl-accordion') as VlAccordionComponent;
            accordion.setAttribute('toggle-text', 'Onderwijsdoelstelling');
            $host[0].appendChild(accordion);
            accordion.defaultOpen = true;
            return accordion.updateComplete;
        });
        shouldBeOpenViaApi();
    });
});

const shouldBeToggleableViaApi = async () => {
    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        expect(component._isOpen).to.be.false;
        component.open();
        expect(component._isOpen).to.be.true;
        component.close();
        expect(component._isOpen).to.be.false;
        component.toggle();
        expect(component._isOpen).to.be.true;
        component.toggle();
        expect(component._isOpen).to.be.false;
    });
};

const shouldBeOpenViaApi = async () => {
    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        expect(component._isOpen).to.be.true;
    });
};

const shouldDisableAccordionViaApi = () => {
    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        expect(component._isOpen).to.be.false;
        component.open();
        expect(component._isOpen).to.be.false;
        component.close();
        expect(component._isOpen).to.be.false;
        component.toggle();
        expect(component._isOpen).to.be.false;
    });
};

const shouldEmitEventOnToggleViaApi = () => {
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');

    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        component.toggle();
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });
};

const shouldEmitEventOnOpenViaApi = () => {
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');

    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        component.open();
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });
};

const shouldEmitEventOnCloseViaApi = () => {
    // Open de accordion vooraleer de eventListener toe te voegen
    cy.get('vl-accordion').shadow().find('button.vl-toggle').click({force: true});
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');

    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        component.close();
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });
};

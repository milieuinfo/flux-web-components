import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlLinkComponent } from '../../atom/link';
import { VlAccordionComponent } from './vl-accordion.component';

registerWebComponents([VlAccordionComponent, VlLinkComponent]);

describe('cypress-component - block components - vl-accordion dom', () => {
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
        cy.get('vl-accordion')
            .shadow()
            .find('.vl-accordion > .vl-accordion__content')
            .should('have.css', 'display', 'none');
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

describe('cypress-component - block components - vl-accordion dom - default testen', () => {
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

describe('cypress-component - block components - vl-accordion dom - headings testen', () => {
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

describe('cypress-component - block components - vl-accordion dom - dynamic toggle testen', () => {
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

describe('cypress-component - block components - vl-accordion dom - title slot testen', () => {
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

describe('cypress-component - block components - vl-accordion dom - border en achtergrond opties', () => {
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
});

const toggleAccordion = () => {
    cy.get('vl-accordion').shadow().find('button.vl-toggle').click({ force: true });
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

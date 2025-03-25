import { VlLinkComponent } from '@domg-wc/components/next/link';
import { html } from 'lit';
import { VlAccordionComponent } from './vl-accordion.component';
import { registerWebComponents } from '@domg-wc/common-utilities';

registerWebComponents([VlAccordionComponent, VlLinkComponent]);

describe('component vl-accordion', () => {
    const content = `Onderwijs helpt jonge mensen en volwassenen om zichzelf te ontwikkelen en hun weg te vinden in onze
    samenleving. Het hoger onderwijs speelt daarnaast een belangrijke rol in innovatie dankzij het
    belang van wetenschappelijk onderzoek.`;
    beforeEach(() => {
        cy.mount(html`
            <vl-accordion data-vl-icon="university" data-vl-toggle-text="Lees meer over de onderwijsdoelstelling">
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
        cy.get('vl-accordion').invoke('attr', 'data-vl-icon', 'university');

        cy.get('vl-accordion')
            .shadow()
            .find('.vl-accordion > .vl-accordion__button-container > button > vl-icon-next')
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
                <vl-link-next id="btn-acties" icon="menu" button-as-link>
                </vl-link-next>
            </span>`;

        cy.get('vl-accordion').then(($accordion) => {
            const shadowRoot = $accordion[0].shadowRoot;

            $accordion.append(spanElement);

            const menuElement = (
                shadowRoot?.querySelector('slot[name=menu]') as HTMLSlotElement
            )?.assignedNodes()[0] as HTMLElement;

            cy.wrap(menuElement).find('vl-link-next').shadow().find('span.vl-icon').should('exist');
        });
    });
});

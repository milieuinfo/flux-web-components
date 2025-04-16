import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlDoormatComponent } from './vl-doormat.component';

registerWebComponents([VlDoormatComponent]);

describe('component - vl-doormat', () => {
    it('should mount', () => {
        cy.mount(html`
            <vl-doormat href="https://www.vlaanderen.be/bouwen-wonen-en-energie">
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);
        cy.get('vl-doormat').shadow().find('a.vl-doormat');
    });

    it('should be accessible', () => {
        cy.mount(html`
            <vl-doormat href="https://www.vlaanderen.be/bouwen-wonen-en-energie">
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-doormat');
    });

    it('should set href', () => {
        cy.mount(html`
            <vl-doormat href="https://www.vlaanderen.be/bouwen-wonen-en-energie">
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'href', 'https://www.vlaanderen.be/bouwen-wonen-en-energie');
        cy.get('vl-doormat')
            .shadow()
            .find('a.vl-doormat')
            .should('have.attr', 'href', 'https://www.vlaanderen.be/bouwen-wonen-en-energie');
    });

    it('should set external', () => {
        cy.mount(html`
            <vl-doormat href="https://www.vlaanderen.be/bouwen-wonen-en-energie" external>
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'external');
        cy.get('vl-doormat').shadow().find('a.vl-doormat').should('have.attr', 'target', '_blank');
    });

    it('should set alt', () => {
        cy.mount(html`
            <vl-doormat href="https://www.vlaanderen.be/bouwen-wonen-en-energie" alt>
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'alt');
        cy.get('vl-doormat').shadow().find('a.vl-doormat').should('have.class', 'vl-doormat--alt');
    });

    it('should set image-src', () => {
        cy.mount(html`
            <vl-doormat
                href="https://www.vlaanderen.be/bouwen-wonen-en-energie"
                image-src="https://picsum.photos/100/150?image=1048"
            >
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'image-src', 'https://picsum.photos/100/150?image=1048');
        cy.get('vl-doormat')
            .shadow()
            .find('a.vl-doormat')
            .find('img.vl-doormat__image')
            .should('have.attr', 'src', 'https://picsum.photos/100/150?image=1048');
    });

    it('should set image-alt', () => {
        cy.mount(html`
            <vl-doormat
                href="https://www.vlaanderen.be/bouwen-wonen-en-energie"
                image-src="https://picsum.photos/100/150?image=1048"
                image-alt="Bouwen in Brussel"
            >
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'image-alt', 'Bouwen in Brussel');
        cy.get('vl-doormat')
            .shadow()
            .find('a.vl-doormat')
            .find('img.vl-doormat__image')
            .should('have.attr', 'alt', 'Bouwen in Brussel');
    });

    it('should set image-width', () => {
        cy.mount(html`
            <vl-doormat
                href="https://www.vlaanderen.be/bouwen-wonen-en-energie"
                image-src="https://picsum.photos/100/150?image=1048"
                image-alt="Bouwen in Brussel"
                image-width="50"
            >
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'image-width', 50);
        cy.get('vl-doormat')
            .shadow()
            .find('a.vl-doormat')
            .find('img.vl-doormat__image')
            .should('have.attr', 'width', 50);
    });

    it('should set image-height', () => {
        cy.mount(html`
            <vl-doormat
                href="https://www.vlaanderen.be/bouwen-wonen-en-energie"
                image-src="https://picsum.photos/100/150?image=1048"
                image-alt="Bouwen in Brussel"
                image-height="100"
            >
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'image-height', 100);
        cy.get('vl-doormat')
            .shadow()
            .find('a.vl-doormat')
            .find('img.vl-doormat__image')
            .should('have.attr', 'height', 100);
    });

    it('should set graphic', () => {
        cy.mount(html`
            <vl-doormat
                href="https://www.vlaanderen.be/bouwen-wonen-en-energie"
                image-src="https://picsum.photos/1600/400?image=1048"
                image-alt="Bouwen in Brussel"
                graphic
            >
                <span slot="title">Bouwen, wonen en energie</span>
                <span slot="text"
                    >De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te maken. Ze
                    biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en energiezuinig maakt en
                    zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te houden.</span
                >
            </vl-doormat>
        `);

        cy.get('vl-doormat').should('have.attr', 'graphic', '');
        cy.get('vl-doormat')
            .shadow()
            .find('a.vl-doormat')
            .find('div.vl-doormat__graphic-wrapper')
            .find('img.vl-doormat__graphic')
            .should('have.attr', 'src', 'https://picsum.photos/1600/400?image=1048');
    });
});

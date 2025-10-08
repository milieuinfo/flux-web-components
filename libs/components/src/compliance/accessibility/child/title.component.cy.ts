import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import { title, titleElements, type TitleProps } from './title.component';

registerWebComponents(titleElements());

const mountDefault = ({ version, date }: TitleProps) => cy.mount(title({ version, date }));

GlobalStyles.getInstance().register();

const props: TitleProps = {
    version: '1.0',
    date: '01/01/2021',
};

describe('cypress-component - compliance components - accessibility title', () => {
    beforeEach(() => {
        mountDefault({ ...props });
    });

    it('should mount', () => {
        cy.get('[data-cy-root]').within(() => {
            cy.get('section.vl-section').should('exist');
        });
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('section.vl-section');
    });

    it('should render with some basic styling from DV - h2 should have the correct style', () => {
        cy.get('section.vl-section').should('have.css', 'padding', '20px 0px 60px');
        cy.get('section.vl-section').find('div.vl-content-block').should('have.css', 'min-width', '0px');
    });
});

describe('cypress-component - compliance components - accessibility title - version and date props', () => {
    it('should render the version and date', () => {
        mountDefault({ ...props });
        cy.get('section.vl-section').contains(`Versie ${props.version} - ${props.date}`);
    });
});

describe('cypress-component - compliance components - accessibility title - helper function <titleElements()> ', () => {
    it('should return an array of WebComponents with a length of 1', () => {
        const elements = titleElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(1);
    });
});

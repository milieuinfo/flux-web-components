import { registerWebComponents } from '@domg-wc/common';
import { COMPLIANCE_STATUS } from '../';
import { type SideNavigationProps, sideNavigation, sideNavigationComponents } from './side-navigation.component';

registerWebComponents(sideNavigationComponents());

const mountDefault = (props: SideNavigationProps) => cy.mount(sideNavigation(props));

const props: SideNavigationProps = {
    compliance: COMPLIANCE_STATUS.NOT_COMPLIANT,
};

describe('cypress-component - compliance components - accessibility side-navigation - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('vl-side-navigation-next').contains('Opstelling van deze toegankelijkheidsverklaring');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('#side-nav-accessibility');
    });
});

describe('cypress-component - compliance components - accessibility side-navigation - COMPLIANCE messages and css', () => {
    it('should hide content for FULLY_COMPLIANT websites', () => {
        mountDefault({
            ...props,
            compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT,
        });

        const listItemWithComplianceStyles = cy.get('vl-side-navigation-next').find('ul > li').eq(1);

        listItemWithComplianceStyles.should('have.css', 'display', 'none').should('have.attr', 'hidden');
    });

    it('should show content for websites that are not FULLY_COMPLIANT', () => {
        mountDefault(props);

        cy.get('vl-side-navigation-next').find('ul > li').eq(1).should('be.visible').should('not.have.attr', 'hidden');
    });

    Object.values(COMPLIANCE_STATUS).forEach((compliance) => {
        it(`should not use a style attribute for ${compliance} websites`, () => {
            mountDefault({ compliance });

            cy.get('vl-side-navigation-next').find('ul > li').eq(1).should('not.have.attr', 'style');
        });
    });
});

describe('cypress-component - compliance components - accessibility side-navigation - helper function <sideNavigationComponents()> ', () => {
    it('should return an array of WebComponents with a length of 1', () => {
        const elements = sideNavigationComponents();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(1);
    });
});

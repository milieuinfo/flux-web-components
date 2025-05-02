import { registerWebComponents } from '@domg-wc/common';
import { COMPLIANCE_STATUS } from '../';
import { type SideNavigationProps, sideNavigation, sideNavigationComponents } from './side-navigation.component';

registerWebComponents(sideNavigationComponents());

const mountDefault = (props: SideNavigationProps) => cy.mount(sideNavigation(props));

const props: SideNavigationProps = {
    compliance: COMPLIANCE_STATUS.NOT_COMPLIANT,
};

describe('component side-navigation - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('div.vl-column').contains('Opstelling van deze toegankelijkheidsverklaring');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('#side-nav-accessibility');
    });
});

describe('component side-navigation - COMPLIANCE messages and css', () => {
    it('should hide content for FULLY_COMPLIANT websites', () => {
        mountDefault({
            ...props,
            compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT,
        });

        const listItemWithComplianceStyles = cy
            .get('div.vl-column')
            .find('vl-side-navigation-group > vl-side-navigation-item')
            .eq(1);

        listItemWithComplianceStyles.should('have.css', 'display', 'none');
    });
});

describe('component side-navigation - helper function <sideNavigationComponents()> ', () => {
    it('should return an array of WebComponents with a length of 1', () => {
        const elements = sideNavigationComponents();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(1);
    });
});

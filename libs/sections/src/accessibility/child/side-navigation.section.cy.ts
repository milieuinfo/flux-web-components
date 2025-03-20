import { registerWebComponents } from '@domg-wc/common-utilities';
import { COMPLIANCE_STATUS } from '../';
import { type SideNavigationProps, sideNavigation, sideNavigationElements } from './side-navigation.section';

registerWebComponents(sideNavigationElements());

const mountDefault = (props: SideNavigationProps) => cy.mount(sideNavigation(props));

const props: SideNavigationProps = {
    compliance: COMPLIANCE_STATUS.NOT_COMPLIANT,
};

describe('component side-navigation - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('div[class="vl-column-next"]').contains('Opstelling van deze toegankelijkheidsverklaring');
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
            .get('div[class="vl-column-next"]')
            .find('ul[is="vl-side-navigation-group"] > li[is="vl-side-navigation-item"]')
            .eq(1);

        listItemWithComplianceStyles.should('have.css', 'display', 'none');
    });
});

describe('component side-navigation - helper function <sideNavigationElements()> ', () => {
    it('should return an array of WebComponents with a length of 7', () => {
        const elements = sideNavigationElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(7);
    });
});

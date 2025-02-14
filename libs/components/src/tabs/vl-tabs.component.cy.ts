import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlIconElement } from '@domg-wc/elements';
import { html } from 'lit';
import { VlTabSectionComponent } from './vl-tab-section.component';
import { VlTabComponent } from './vl-tab.component';
import { VlTabsPaneComponent } from './vl-tabs-pane.component';
import { VlTabsComponent } from './vl-tabs.component';
import { DisplayStyle } from './vl-tabs.model';

registerWebComponents([VlTabsComponent, VlTabComponent, VlTabsPaneComponent, VlTabSectionComponent, VlIconElement]);

const VlTabsComponentTestUtils = {
    shouldHaveTabWithTitle: (selector: string, title: string) => {
        cy.get('vl-tabs').shadow().find('ul.vl-tabs').find(selector).find('a').find('slot').contains(title);
    },
    shouldBeVisible: (selector: string) => {
        cy.get('vl-tabs')
            .shadow()
            .find(selector)
            .should('have.attr', 'data-vl-show', 'true')
            .should('have.css', 'display', 'block');
    },
    shouldBeHidden: (selector: string) => {
        cy.get('vl-tabs')
            .shadow()
            .find(selector)
            .should('have.attr', 'data-vl-show', 'false')
            .should('have.css', 'display', 'none');
    },
};

type MountDefaultProps = {
    activeTab?: string;
    alt?: boolean;
    disableLinks?: boolean;
    id?: string;
    title?: string;
    responsiveLabel?: string;
    observeTitle?: boolean;
    displayStyle?: DisplayStyle;
    onChangeActiveTab: (activeTab: string) => void;
    onVlClickActiveTab: (activeTab: string) => void;
};

const props: MountDefaultProps = {
    activeTab: '',
    alt: false,
    disableLinks: true,
    id: '',
    title: '=',
    responsiveLabel: '',
    observeTitle: false,
    onChangeActiveTab: (activeTab) => {
        console.log(activeTab);
    },
    onVlClickActiveTab: (activeTab) => {
        console.log(activeTab);
    },
    displayStyle: 'default',
};

const mountDefault = ({
    activeTab,
    alt,
    responsiveLabel,
    disableLinks,
    onChangeActiveTab,
    onVlClickActiveTab,
    observeTitle,
    displayStyle,
}: MountDefaultProps) => {
    return cy.mount(html` <div>
        <vl-tabs
            data-vl-active-tab=${activeTab}
            ?data-vl-alt=${alt}
            data-vl-responsive-label=${responsiveLabel}
            ?data-vl-disable-links=${disableLinks}
            data-vl-display-style=${displayStyle}
            @change=${(event: CustomEvent) => onChangeActiveTab(event.detail)}
            @vl-click=${(event: CustomEvent) => onVlClickActiveTab(event.detail)}
        >
            <vl-tabs-pane data-vl-id="trein" data-vl-title="Trein" ?data-vl-observe-title=${observeTitle}>
                Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                venenatis dapibus posuere velit aliquet.
            </vl-tabs-pane>
            <vl-tabs-pane data-vl-id="metro" data-vl-title="Metro, tram en bus" ?data-vl-observe-title=${observeTitle}>
                Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem
                malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
            </vl-tabs-pane>
            <vl-tabs-pane data-vl-id="fiets" data-vl-title="Fiets" ?data-vl-observe-title=${observeTitle}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean
                eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </vl-tabs-pane>
        </vl-tabs>
    </div>`);
};

describe('component vl-tabs', () => {
    beforeEach(() => {
        mountDefault({ ...props });
    });

    it('should mount', () => {
        mountDefault({ ...props });

        cy.get('[data-cy-root]').within(() => {
            cy.get('vl-tabs').shadow();
        });
    });
});

describe('component vl-tabs - accessibility', () => {
    it('should be accessible on larger devices', () => {
        mountDefault({ ...props });
        cy.viewport(1920, 1080);

        cy.injectAxe();

        cy.checkA11y('vl-tabs');
    });

    it('should be accessible on small devices', () => {
        mountDefault({ ...props });
        cy.viewport(749, 660);

        cy.injectAxe();

        cy.checkA11y('vl-tabs');
    });
});

describe('component vl-tabs - attributes', () => {
    it('should render tabs view for containers with width > 767', () => {
        mountDefault({ ...props });
        cy.viewport(1920, 1080);

        cy.get('vl-tabs').find('vl-tabs-pane');
        cy.get('vl-tabs')
            .shadow()
            .find('div#tabs > div#tabs-wrapper > ul#tab-list > li')
            .each(($el) => {
                expect($el.css('display')).to.eq('inline-block');
            });
    });

    it('should render collapsed view for containers with width <= 767', () => {
        mountDefault({ ...props });
        cy.viewport(767, 500);

        cy.get('vl-tabs')
            .shadow()
            .find('div#tabs > div#tabs-wrapper > ul#tab-list > li')
            .each(($el) => {
                expect($el.css('display')).to.eq('block');
            });
    });

    it('should render the collapsed view for containers with width > 767 with collapsed display style', () => {
        mountDefault({ ...props, displayStyle: 'collapsed' });
        cy.viewport(1920, 1080);

        cy.get('vl-tabs')
            .shadow()
            .find('div#tabs > div#tabs-wrapper > ul#tab-list > li')
            .each(($el) => {
                expect($el.css('display')).to.eq('inline-block');
            });
    });

    it('should render tabs view for containers with width <= 767 with tabs display style', () => {
        mountDefault({ ...props, displayStyle: 'tabs' });
        cy.viewport(767, 500);

        cy.get('vl-tabs')
            .shadow()
            .find('div#tabs > div#tabs-wrapper > ul#tab-list > li')
            .each(($el) => {
                expect($el.css('display')).to.eq('block');
            });
    });

    it('should not have an <activeTab> selected', () => {
        mountDefault({ ...props, activeTab: '' });

        cy.get('vl-tabs').shadow().find('a[aria-selected="true"]').should('not.exist');
    });

    it('should set the <activeTab> when passed', () => {
        mountDefault({ ...props, activeTab: 'trein' });

        cy.get('vl-tabs').should('have.attr', 'data-vl-active-tab', 'trein');
        cy.get('vl-tabs').invoke('attr', 'data-vl-active-tab', 'metro');
        cy.get('vl-tabs').should('have.attr', 'data-vl-active-tab', 'metro');
    });

    it('should set de <responsiveLabel> in smaller devices when', () => {
        mountDefault({ ...props, responsiveLabel: 'Navigatie/menu' });
        cy.viewport(749, 660);

        cy.get('vl-tabs')
            .shadow()
            .find('#data-vl-tabs-responsive-label')
            .should('have.text', 'Navigatie/menu')
            .should('be.visible');
    });

    it('should set <alt> when passed', () => {
        mountDefault({ ...props, alt: true });

        cy.get('vl-tabs').should('have.attr', 'data-vl-alt');
    });

    it('should set <disableLinks> when passed', () => {
        mountDefault({ ...props, disableLinks: true });

        cy.get('vl-tabs').should('have.attr', 'data-vl-disable-links');
    });
});

describe('component vl-tabs-pane - functionality on larger devices', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        document.querySelector('div')?.setAttribute('style', 'width:768px');
    });

    it('should emit events on click tab', () => {
        mountDefault({ ...props });

        cy.createStubForEvent('vl-tabs', 'change');
        cy.createStubForEvent('vl-tabs', 'vl-click');
        cy.get('vl-tabs').shadow().find('a#trein').click();
        cy.get('@change').should('have.been.called');
        cy.get('@vl-click').should('have.been.called');

        cy.get('vl-tabs').shadow().find('a#metro').click();
        cy.get('@change').should('have.been.called');
        cy.get('@vl-click').should('have.been.called');

        cy.get('vl-tabs').shadow().find('a#fiets').click();
        cy.get('@change').should('have.been.called');
        cy.get('@vl-click').should('have.been.called');
    });

    it('should show/hide content on click tab', () => {
        mountDefault({ ...props });

        cy.get('vl-tabs').shadow().find('a#trein').click();
        VlTabsComponentTestUtils.shouldBeVisible('section#trein-pane');
        VlTabsComponentTestUtils.shouldBeHidden('section#metro-pane');
        VlTabsComponentTestUtils.shouldBeHidden('section#fiets-pane');

        cy.get('vl-tabs').shadow().find('a#metro').click();
        VlTabsComponentTestUtils.shouldBeVisible('section#metro-pane');
        VlTabsComponentTestUtils.shouldBeHidden('section#trein-pane');
        VlTabsComponentTestUtils.shouldBeHidden('section#fiets-pane');

        cy.get('vl-tabs').shadow().find('a#fiets').click();
        VlTabsComponentTestUtils.shouldBeVisible('section#fiets-pane');
        VlTabsComponentTestUtils.shouldBeHidden('section#trein-pane');
        VlTabsComponentTestUtils.shouldBeHidden('section#metro-pane');
    });
});

describe('component vl-tabs-pane - functionality on smaller devices', () => {
    beforeEach(() => {
        cy.viewport(550, 750);
        document.querySelector('div')?.setAttribute('style', 'width:767px');
    });

    it('should emit event on click tab', () => {
        mountDefault({ ...props });

        cy.createStubForEvent('vl-tabs', 'change');
        cy.get('vl-tabs').shadow().find('button.vl-tabs__toggle').click();
    });

    it('should contain three tabs with titles', () => {
        mountDefault({ ...props });

        VlTabsComponentTestUtils.shouldHaveTabWithTitle('li[data-vl-id="trein"]', 'Trein');
        VlTabsComponentTestUtils.shouldHaveTabWithTitle('li[data-vl-id="metro"]', 'Metro, tram en bus');
        VlTabsComponentTestUtils.shouldHaveTabWithTitle('li[data-vl-id="fiets"]', 'Fiets');
    });

    it('should set active-tab', () => {
        mountDefault({ ...props, activeTab: 'metro' });

        VlTabsComponentTestUtils.shouldBeVisible('section#metro-pane');

        VlTabsComponentTestUtils.shouldBeHidden('section#trein-pane');
        VlTabsComponentTestUtils.shouldBeHidden('section#fiets-pane');
    });

    it('should open/close tablist on mobile', () => {
        mountDefault({ ...props, disableLinks: true, activeTab: 'trein' });

        VlTabsComponentTestUtils.shouldBeVisible('section#trein-pane');

        cy.get('vl-tabs').shadow().find('ul#tab-list').should('have.attr', 'data-vl-show', 'false');
        cy.get('vl-tabs').shadow().find('button.vl-tabs__toggle').click();
        cy.get('vl-tabs').shadow().find('ul#tab-list').should('have.attr', 'data-vl-show', 'true');
        cy.get('vl-tabs').shadow().find('button.vl-tabs__toggle').click();
        cy.get('vl-tabs').shadow().find('ul#tab-list').should('have.attr', 'data-vl-show', 'false');
    });
});

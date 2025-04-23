import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { TemplateFn, CascaderItem, VlCascaderComponent, VlCascaderItemComponent } from './index';
import { cascaderItemTemplates } from './stories/vl-cascader.stories-util.templates';
import { VlInfoTile } from '../info-tile';
import { nodeData } from './stories/vl-cascader.stories-util.data';
import { getItemList } from './stories/vl-cascader.stories-util.item-list-function';
import { ItemListFn } from './vl-cascader.model';
import { VlAccordionComponent } from '../accordion';

registerWebComponents([VlCascaderComponent, VlCascaderItemComponent, VlAccordionComponent, VlInfoTile]);

const mountWithSlots = (
    placeholderText: string,
    homeSlotText: string,
    label: string,
    labelSlotText: string,
    contentSlotText: string,
    headerSlotText: string
) => {
    cy.mount(html`
        <vl-cascader>
            <p slot="home">${homeSlotText}</p>
            <p slot="header">${headerSlotText}</p>
            <p slot="breadcrumb-placeholder">
                <label>${placeholderText}</label>
                <vl-autocomplete placeholder=${placeholderText}></vl-autocomplete>
            </p>
            <vl-cascader-item label=${label}>
                <vl-title type="h5" underline alt no-space-bottom slot="label"> ${labelSlotText} </vl-title>
                <p slot="content">${contentSlotText}</p>
                <vl-cascader-item label="2e niveau"> </vl-cascader-item>
            </vl-cascader-item>
        </vl-cascader>
    `);
};

const mountWithPropertyBinding = (
    items: CascaderItem[],
    templates: Map<string, TemplateFn>,
    itemListFn: ItemListFn
) => {
    cy.mount(html` <vl-cascader .items=${items} .templates=${templates} .itemListFn=${itemListFn}> </vl-cascader> `);
};

const getCascaderNodeByLabel = (label: string) =>
    cy.get('vl-cascader').shadow().find(`vl-cascader-item[label="${label}"]`);

const getCascaderItemByLabel = (label: string) => cy.get('vl-cascader').shadow().contains('.vl-cascader-item', label);

const getBreadcrumbItemByText = (text: string) =>
    cy.get('vl-cascader').shadow().contains('span[class="vl-breadcrumb__list__item__cta"]', text);

const navigate3levelsForward = () => {
    navigateChosenLevelsForward(['West-Vlaanderen', 'Gemeente: Damme', 'Deelgemeente - Moerkerke']);
};

const navigateChosenLevelsForward = (navigationLevels: string[]) => {
    cy.get('vl-cascader').should('have.attr', 'level', 0);
    navigationLevels.forEach((label, index) => {
        getCascaderNodeByLabel(label).click();
        cy.get('vl-cascader').should('have.attr', 'level', index + 1);
    });
};
const navigateChosenLevelsForwardItems = (navigationLevels: string[]) => {
    cy.get('vl-cascader').should('have.attr', 'level', 0);
    navigationLevels.forEach((label, index) => {
        getCascaderItemByLabel(label).click();
        cy.get('vl-cascader').should('have.attr', 'level', index + 1);
    });
};

const testMountAndAccessibility = (additionalComponents?: string[]) => {
    it('should mount', () => {
        cy.get('vl-cascader');
        additionalComponents?.forEach((component: string) => cy.get(component));
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('vl-cascader');
        additionalComponents?.forEach((component: string) => cy.checkA11y(component));
    });

    it('should be accessible on mobile', () => {
        cy.injectAxe();
        cy.viewport(320, 480);

        cy.checkA11y('vl-cascader');
        additionalComponents?.forEach((component: string) => cy.checkA11y(component));
    });
};

describe('component vl-cascader default', () => {
    beforeEach(() => {
        mountDefault();
    });

    testMountAndAccessibility();

    it('should be loading', () => {
        cy.get('vl-cascader').shadow().find('vl-loader').should('not.exist');
        cy.get('vl-cascader').invoke('attr', 'loading', '');
        cy.get('vl-cascader').shadow().find('vl-loader');
    });

    it('should navigate forward', () => {
        navigate3levelsForward();
    });

    it('should navigate backwards', () => {
        cy.createStubForEvent('vl-cascader', 'vl-click-breadcrumb');

        navigate3levelsForward();

        getBreadcrumbItemByText('Gemeente: Damme').click();
        cy.get('vl-cascader').should('have.attr', 'level', '2');
        cy.get('@vl-click-breadcrumb').should('have.been.calledOnce');
        getBreadcrumbItemByText('West-Vlaanderen').click();
        cy.get('vl-cascader').should('have.attr', 'level', '1');
        cy.get('@vl-click-breadcrumb').should('have.been.calledTwice');
    });

    it('should hide bread crumb', () => {
        cy.get('vl-cascader').shadow().find('nav');
        cy.get('vl-cascader').invoke('attr', 'hide-breadcrumb', 'true');
        cy.get('vl-cascader').shadow().find('nav').should('not.exist');
    });

    it('should display the subtitle', () => {
        cy.get('vl-cascader')
            .shadow()
            .find('vl-cascader-item[label="West-Vlaanderen"]')
            .shadow()
            .find('vl-text[annotation]')
            .should('contain.text', 'ondertitel');

        cy.get('vl-cascader')
            .shadow()
            .find('vl-cascader-item[label="Oost-Vlaanderen"]')
            .shadow()
            .find('vl-text[annotation]')
            .should('not.exist');
    });

    it('should display the header text', () => {
        cy.get('vl-cascader').shadow().find('div > header.vl-header > h4').should('have.text', 'header tekst');
    });
});

describe('component vl-cascader in vl-side-sheet', () => {
    beforeEach(() => {
        mountSideSheet();
    });

    testMountAndAccessibility(['vl-side-sheet']);

    it('should be loading', () => {
        cy.get('vl-cascader').shadow().find('vl-loader').should('not.exist');
        cy.get('vl-cascader').invoke('attr', 'loading', '');
        cy.get('vl-cascader').shadow().find('vl-loader');
    });

    it('should navigate forward', () => {
        navigate3levelsForward();
    });

    it('should navigate backwards', () => {
        cy.createStubForEvent('vl-cascader', 'vl-click-breadcrumb');

        navigate3levelsForward();

        getBreadcrumbItemByText('Gemeente: Damme').click();
        cy.get('vl-cascader').should('have.attr', 'level', '2');
        cy.get('@vl-click-breadcrumb').should('have.been.calledOnce');
        getBreadcrumbItemByText('West-Vlaanderen').click();
        cy.get('vl-cascader').should('have.attr', 'level', '1');
        cy.get('@vl-click-breadcrumb').should('have.been.calledTwice');
    });

    it('should hide bread crumb', () => {
        cy.get('vl-cascader').shadow().find('nav');
        cy.get('vl-cascader').invoke('attr', 'hide-breadcrumb', 'true');
        cy.get('vl-cascader').shadow().find('nav').should('not.exist');
    });
});

describe('component vl-cascader - templating', () => {
    beforeEach(() => {
        mountWithTemplates(cascaderItemTemplates);
    });

    testMountAndAccessibility();

    it('should mount vl-info-tile', () => {
        cy.get('vl-cascader').shadow().find('vl-info-tile');
    });

    it('should display configured template', () => {
        getCascaderNodeByLabel('Provincie: West-Vlaanderen').should('have.attr', 'template-type', 'provincie');
        getCascaderNodeByLabel('Provincie: West-Vlaanderen').shadow().should('contain.text', 'Bekijk deelgemeentes');
    });

    it('should set content slot', () => {
        getCascaderNodeByLabel('Provincie: West-Vlaanderen').find('vl-info-tile').contains(tekstWestVlaanderen);
    });
});

describe('component vl-cascader - slots', () => {
    const placeholderText = 'Zoek...';
    const label = 'West-Vlaanderen';
    const labelSlotText = `Provincie: West-Vlaanderen`;
    const homeSlotText = `België`;
    const headerSlotText = 'header slot tekst';

    beforeEach(() => {
        mountWithSlots(placeholderText, homeSlotText, label, labelSlotText, tekstWestVlaanderen, headerSlotText);
    });

    it('should set label slot', () => {
        getCascaderNodeByLabel(label).find('vl-title[type="h5"]').contains(labelSlotText);
    });

    it('should set header slot', () => {
        cy.get('vl-cascader')
            .shadow()
            .find('header')
            .find('slot')
            .then(($slot) => {
                const slottedContent = $slot[0].assignedNodes()[0].textContent;
                expect(slottedContent).to.contain(headerSlotText);
            });
    });

    it('should set content slot', () => {
        getCascaderNodeByLabel(label).find('p').contains(tekstWestVlaanderen);
    });

    it('should set breadcrumb-placeholder slot', () => {
        cy.get('vl-cascader')
            .shadow()
            .find(`nav.vl-breadcrumb-placeholder`)
            .find('slot')
            .then(($slot) => {
                const slottedContent = $slot[0].assignedNodes()[0].textContent;
                expect(slottedContent).to.contain(placeholderText);
            });

        cy.get('vl-cascader').should('have.attr', 'level', 0);
        getCascaderNodeByLabel(label).find('vl-title[type="h5"]').contains(labelSlotText).click();
        cy.get('vl-cascader').should('have.attr', 'level', 1);
        getCascaderNodeByLabel('2e niveau');

        cy.get('vl-cascader').shadow().find('nav.vl-breadcrumb-placeholder').should('not.exist');

        cy.get('vl-cascader').invoke('attr', 'hide-breadcrumb', 'true');
        cy.get('vl-cascader').shadow().find('nav.vl-breadcrumb').should('not.exist');

        cy.get('vl-cascader')
            .shadow()
            .find(`nav.vl-breadcrumb-placeholder`)
            .find('slot')
            .then(($slot) => {
                const slottedContent = $slot[0].assignedNodes()[0].textContent;
                expect(slottedContent).to.contain(placeholderText);
            });
    });

    it('should set home slot', () => {
        cy.get('vl-cascader').shadow().find('span.vl-breadcrumb-home-slot').should('not.exist');

        cy.get('vl-cascader').should('have.attr', 'level', 0);
        getCascaderNodeByLabel(label).find('vl-title[type="h5"]').contains(labelSlotText).click();
        cy.get('vl-cascader').should('have.attr', 'level', 1);

        cy.get('vl-cascader')
            .shadow()
            .find(`span.vl-breadcrumb-home-slot`)
            .find('slot')
            .then(($slot) => {
                const slottedContent = $slot[0].assignedNodes()[0].textContent;
                expect(slottedContent).to.contain(homeSlotText);
            });

        cy.get('vl-cascader').invoke('attr', 'level', '0');
        cy.get('vl-cascader').shadow().find('span.vl-breadcrumb-home-slot').should('not.exist');

        getCascaderNodeByLabel(label).find('vl-title[type="h5"]').contains(labelSlotText).click();

        cy.get('vl-cascader')
            .shadow()
            .find(`span.vl-breadcrumb-home-slot`)
            .find('slot')
            .then(($slot) => {
                const slottedContent = $slot[0].assignedNodes()[0].textContent;
                expect(slottedContent).to.contain(homeSlotText);
            });
    });
});

describe('component vl-cascader - property binding', () => {
    const vlaamseProvincies = nodeData[0].children;

    beforeEach(() => {
        mountWithPropertyBinding(vlaamseProvincies!, cascaderItemTemplates, getItemList);
    });

    testMountAndAccessibility();

    it('should render requested labels', () => {
        vlaamseProvincies?.forEach(({ label }) => {
            getCascaderItemByLabel(label);
        });

        navigateChosenLevelsForwardItems(['Limburg']);

        const limburgChildren = vlaamseProvincies![2].children;
        limburgChildren?.forEach(({ label }) => {
            getCascaderItemByLabel(label);
        });
    });

    it('should display configured template', () => {
        const antwerpen = vlaamseProvincies![0];
        getCascaderItemByLabel(antwerpen.label)
            .find('span')
            .should('contain.text', 'Bekijk deelgemeentes')
            .and('contain.text', antwerpen.children?.length);

        const brussel = vlaamseProvincies![1];
        getCascaderItemByLabel(brussel.label).should('contain.text', 'Haal deelgemeentes op');

        const limburg = vlaamseProvincies![2];
        getCascaderItemByLabel(limburg.label)
            .should('contain.text', 'Bekijk deelgemeentes')
            .and('contain.text', limburg.children?.length);
    });

    it('should dynamically load children', () => {
        const brussel = vlaamseProvincies![1];
        const { data } = brussel;
        const requestParams = data?.requestParams;

        getCascaderItemByLabel(brussel.label).should('contain.text', 'Haal deelgemeentes op');

        cy.get('vl-cascader').shadow().find('vl-loader').should('not.exist');
        navigateChosenLevelsForwardItems(['Brussel']);
        cy.get('vl-cascader').shadow().find('vl-loader');

        // requestParams is ingesteld als string en zal in label komen van de fake data uit de Promise
        getCascaderItemByLabel(requestParams as string);
    });
});

const defaultCascaderTemplate = html`
    <vl-cascader header-text="header tekst">
        <vl-cascader-item label="West-Vlaanderen" annotation="ondertitel">
            <vl-cascader-item label="Gemeente: Damme">
                <vl-cascader-item label="Deelgemeente - Moerkerke">
                    <vl-cascader-item label="Dorp - Moerkerke"></vl-cascader-item>
                    <vl-cascader-item label="Dorp - Sint-Rita"></vl-cascader-item>
                </vl-cascader-item>
                <vl-cascader-item label="Deelgemeente - Sint-Kruis"></vl-cascader-item>
            </vl-cascader-item>
            <vl-cascader-item label="Gemeente: Brugge"></vl-cascader-item>
        </vl-cascader-item>
        <vl-cascader-item label="Oost-Vlaanderen">
            <vl-cascader-item label="Gemeente: Gent"></vl-cascader-item>
            <vl-cascader-item label="Gemeente: Lokeren"></vl-cascader-item>
        </vl-cascader-item>
    </vl-cascader>
`;

const mountDefault = () => {
    cy.mount(defaultCascaderTemplate);
};

const mountSideSheet = () => {
    cy.mount(html` <vl-side-sheet open=""> ${defaultCascaderTemplate} </vl-side-sheet> `);
};

const tekstWestVlaanderen =
    'Het is de meest westelijk gelegen provincie van Vlaanderen en België en is de enige Belgische provincie die aan de Noordzee ligt. De provincie heeft een oppervlakte van 3.197 km² en telt ruim 1,2 miljoen inwoners. De hoofdstad van West-Vlaanderen is Brugge.';

const mountWithTemplates = (templates: Map<string, TemplateFn>) => {
    cy.mount(html`
        <vl-cascader .templates=${templates}>
            <vl-cascader-item label="Provincie: West-Vlaanderen" template-type="provincie">
                <vl-info-tile toggleable="" slot="content">
                    <span slot="title">Meer Info</span>
                    <span slot="subtitle">Provincie Beschrijving</span>
                    <div slot="content">${tekstWestVlaanderen}</div>
                </vl-info-tile>
                <vl-cascader-item label="Gemeente: Damme">
                    <vl-cascader-item label="Deelgemeente - Moerkerke">
                        <vl-cascader-item label="Dorp - Moerkerke"></vl-cascader-item>
                        <vl-cascader-item label="Dorp - Sint-Rita"></vl-cascader-item>
                    </vl-cascader-item>
                </vl-cascader-item>
                <vl-cascader-item label="Gemeente: Brugge">
                    <vl-cascader-item label="Deelgemeente - Sint-Kruis"></vl-cascader-item>
                </vl-cascader-item>
                <vl-cascader-item label="Gemeente: Kortrijk">
                    <vl-cascader-item label="Dorp - Waereghem"></vl-cascader-item>
                </vl-cascader-item>
            </vl-cascader-item>
            <vl-cascader-item label="Provincie: Oost-Vlaanderen" template-type="provincie">
                <vl-title type="h3" slot="label">Provincie: Oost-Vlaanderen</vl-title>
                <vl-info-tile toggleable="" slot="content">
                    <span slot="title">Meer Info</span>
                    <span slot="subtitle">Provincie Beschrijving</span>
                    <div slot="content">
                        Zij grenst in het westen aan de provincie West-Vlaanderen, in het noorden aan de Nederlandse
                        provincie Zeeland met Zeeuws-Vlaanderen, in het oosten aan de provincies Antwerpen en
                        Vlaams-Brabant, en in het zuiden aan het Waalse Henegouwen. Zij ligt dus niet in het oosten van
                        de huidige Belgische deelstaat Vlaanderen die pas na 1830 ontstond.
                    </div>
                </vl-info-tile>
                <vl-cascader-item label="Gemeente: Gent"></vl-cascader-item>
                <vl-cascader-item label="Gemeente: Lokeren"></vl-cascader-item>
            </vl-cascader-item>
        </vl-cascader>
    `);
};

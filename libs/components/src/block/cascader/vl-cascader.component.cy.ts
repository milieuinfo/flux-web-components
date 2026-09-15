import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { TemplateFn, CascaderItem, VlCascaderComponent, VlCascaderItemComponent } from './index';
import { cascaderItemTemplates } from './stories/vl-cascader.stories-util.templates';
import { VlInfoTile } from '../info-tile';
import { nodeData } from './stories/vl-cascader.stories-util.data';
import { getItemList } from './stories/vl-cascader.stories-util.item-list-function';
import { ItemListFn } from './vl-cascader.model';
import { VlAccordionComponent } from '../accordion';
import { VlSideSheet } from '../side-sheet';

registerWebComponents([VlCascaderComponent, VlCascaderItemComponent, VlAccordionComponent, VlInfoTile, VlSideSheet]);

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

const getNavigationLevel = () => cy.get('vl-cascader').shadow().find('.content section');

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

describe('cypress-component - block components - vl-cascader', () => {
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

    it('should move focus to the new level when navigating forward', () => {
        getCascaderNodeByLabel('West-Vlaanderen').click();
        cy.get('vl-cascader').should('have.attr', 'level', '1');

        getNavigationLevel().should('have.focus');
    });

    it('should move focus to the new level when navigating backwards via the breadcrumb', () => {
        navigate3levelsForward();

        getBreadcrumbItemByText('West-Vlaanderen').click();
        cy.get('vl-cascader').should('have.attr', 'level', '1');

        getNavigationLevel().should('have.focus');
    });

    it('should show a focus outline on the new level when navigating forward with the keyboard', () => {
        getCascaderNodeByLabel('West-Vlaanderen').shadow().find('vl-link').shadow().find('button').focus();
        realPressEnter();
        cy.get('vl-cascader').should('have.attr', 'level', '1');

        getNavigationLevel()
            .should('have.focus')
            .and(shouldMatchFocusVisible(true))
            .shouldHaveComputedStyle({ style: 'outline-style', value: 'solid' });
    });

    it('should not show a focus outline on the new level when navigating forward with the mouse', () => {
        getCascaderNodeByLabel('West-Vlaanderen').shadow().find('vl-link').shadow().find('button').then(realClick);
        cy.get('vl-cascader').should('have.attr', 'level', '1');

        getNavigationLevel()
            .should('have.focus')
            .and(shouldMatchFocusVisible(false))
            .shouldHaveComputedStyle({ style: 'outline-style', value: 'none' });
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

describe('cypress-component - block components - vl-cascader - in vl-side-sheet', () => {
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

    it('should keep focus inside the side-sheet when navigating forward', () => {
        getCascaderNodeByLabel('West-Vlaanderen').click();
        cy.get('vl-cascader').should('have.attr', 'level', '1');

        getNavigationLevel().should('have.focus');
        shouldNotFocusSideSheetToggleButton();
    });

    it('should keep focus inside the side-sheet when navigating forward on a mobile viewport', () => {
        cy.viewport(375, 667);

        getCascaderNodeByLabel('West-Vlaanderen').click();
        cy.get('vl-cascader').should('have.attr', 'level', '1');

        getNavigationLevel().should('have.focus');
        shouldNotFocusSideSheetToggleButton();
    });
});

describe('cypress-component - block components - vl-cascader - templating', () => {
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

describe('cypress-component - block components - vl-cascader - slots', () => {
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

describe('cypress-component - block components - vl-cascader - property binding', () => {
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

// jQuery kent :focus-visible niet, dus de match-assertion van Cypress kan hier niet gebruikt worden.
const shouldMatchFocusVisible = (focusVisible: boolean) => ($element: JQuery<HTMLElement>) =>
    expect($element[0].matches(':focus-visible')).to.equal(focusVisible);

// cy.press(ENTER) verstuurt geen tekeninvoer, waardoor een button niet geactiveerd wordt; via het Chrome DevTools
// Protocol verloopt de toetsaanslag als echte browser-input.
const realPressEnter = () => {
    (['keyDown', 'keyUp'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchKeyEvent',
                params: { type, key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' },
            }),
        );
    });
};

// cy.click() simuleert enkel events, waardoor de browser geen muisinteractie registreert en :focus-visible anders
// beoordeelt; via het Chrome DevTools Protocol verloopt de klik als echte browser-input.
const realClick = ($element: JQuery<HTMLElement>) => {
    const element = $element[0];
    const autWindow = element.ownerDocument.defaultView!;
    const frameRect = autWindow.frameElement!.getBoundingClientRect();
    const scale = frameRect.width / autWindow.innerWidth;
    const elementRect = element.getBoundingClientRect();
    const x = frameRect.left + (elementRect.left + elementRect.width / 2) * scale;
    const y = frameRect.top + (elementRect.top + elementRect.height / 2) * scale;
    (['mousePressed', 'mouseReleased'] as const).forEach((type) => {
        cy.then(() =>
            Cypress.automation('remote:debugger:protocol', {
                command: 'Input.dispatchMouseEvent',
                params: { type, x, y, button: 'left', clickCount: 1 },
            }),
        );
    });
};

// De toggle button zit twee shadow roots diep; de have.focus-assertion van Cypress kijkt niet zo ver.
const shouldNotFocusSideSheetToggleButton = () => {
    cy.get('vl-side-sheet').should(($sideSheet) => {
        const shadowRoot = $sideSheet[0].shadowRoot;
        expect(shadowRoot?.activeElement).not.to.equal(shadowRoot?.querySelector('#toggle-button'));
    });
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

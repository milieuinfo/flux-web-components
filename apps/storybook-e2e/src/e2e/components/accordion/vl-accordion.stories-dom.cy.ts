const accordionDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-accordion--accordion-default&viewMode=story';
const accordionDynamicToggleUrl =
    'http://localhost:8080/iframe.html?id=components-accordion--accordion-dynamic-toggle&viewMode=story';
const accordionIconUrl =
    'http://localhost:8080/iframe.html?id=components-accordion--accordion-title-slot&viewMode=story';
const accordionTitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-accordion--accordion-title-slot&viewMode=story';
const accordionSubtitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-accordion--accordion-subtitle-slot&viewMode=story';
const accordionMenuSlotUrl =
    'http://localhost:8080/iframe.html?id=components-accordion--accordion-menu-slot&viewMode=story';

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

describe('story vl-accordion default', () => {
    it('should display story', () => {
        cy.visit(accordionDefaultUrl);

        cy.get('vl-accordion').shadow();
    });

    it('should be toggleable', () => {
        cy.visit(accordionDefaultUrl);

        shouldBeToggleable();
    });

    it('should set default slot', () => {
        cy.visit(accordionDefaultUrl);

        shouldSetDefaultSlot();
    });

    it('should set title', () => {
        cy.visit(`${accordionDefaultUrl}&args=toggleText:Lees+meer+over+de+onderwijsdoelstelling`);

        shouldSetTitle('Lees meer over de onderwijsdoelstelling');
    });

    it('should disable accordion', () => {
        cy.visit(`${accordionDefaultUrl}&args=disabled:true`);

        shouldDisableAccordion();
    });

    it('should set bold', () => {
        cy.visit(`${accordionDefaultUrl}&args=bold:true`);

        shouldSetBold();
    });

    it('should set content padding', () => {
        cy.visit(`${accordionDefaultUrl}&args=contentPadding:none`);

        shouldSetContentPadding('0px');
    });

    it('should emit event on toggle', () => {
        cy.visit(accordionDefaultUrl);

        shouldEmitEventOnToggle();
    });

    it('should be open by default', () => {
        cy.visit(`${accordionDefaultUrl}&args=defaultOpen:true`);

        shouldBeOpen();
    });
});

describe('story vl-accordion dynamic toggle', () => {
    it('should display story', () => {
        cy.visit(accordionDynamicToggleUrl);

        cy.get('vl-accordion').shadow();
    });

    it('should be toggleable', () => {
        cy.visit(accordionDynamicToggleUrl);

        shouldBeToggleable();
    });

    it('should set default slot', () => {
        cy.visit(accordionDynamicToggleUrl);

        shouldSetDefaultSlot();
    });

    it('should set dynamic toggle', () => {
        cy.visit(
            `${accordionDynamicToggleUrl}&args=openToggleText:Open+de+onderwijsdoelstelling;closeToggleText:Sluit+de+onderwijsdoelstelling`
        );

        shouldSetTitle('Open de onderwijsdoelstelling');
        toggleAccordion();
        shouldSetTitle('Sluit de onderwijsdoelstelling');
        toggleAccordion();
        shouldSetTitle('Open de onderwijsdoelstelling');
    });

    it('should disable accordion', () => {
        cy.visit(`${accordionDynamicToggleUrl}&args=disabled:true`);

        shouldDisableAccordion();
    });

    it('should set bold', () => {
        cy.visit(`${accordionDynamicToggleUrl}&args=bold:true`);

        shouldSetBold();
    });

    it('should set content padding', () => {
        cy.visit(`${accordionDynamicToggleUrl}&args=contentPadding:none`);

        shouldSetContentPadding('0px');
    });

    it('should emit event on toggle', () => {
        cy.visit(accordionDynamicToggleUrl);

        shouldEmitEventOnToggle();
    });
});

describe('story vl-accordion title slot', () => {
    it('should display story', () => {
        cy.visit(accordionTitleSlotUrl);

        cy.get('vl-accordion').shadow();
    });

    it('should be toggleable', () => {
        cy.visit(accordionTitleSlotUrl);

        shouldBeToggleable();
    });

    it('should set default slot', () => {
        cy.visit(accordionTitleSlotUrl);

        shouldSetDefaultSlot();
    });

    it('should set title slot', () => {
        cy.visit(accordionTitleSlotUrl);

        cy.get('vl-accordion').find('[slot="title"]').contains('Lees meer over de onderwijsdoelstelling');
    });

    it('should disable accordion', () => {
        cy.visit(`${accordionTitleSlotUrl}&args=disabled:true`);

        shouldDisableAccordion();
    });

    it('should set bold', () => {
        cy.visit(`${accordionTitleSlotUrl}&args=bold:true`);

        shouldSetBold();
    });

    it('should set content padding', () => {
        cy.visit(`${accordionTitleSlotUrl}&args=contentPadding:none`);

        shouldSetContentPadding('0px');
    });

    it('should emit event on toggle', () => {
        cy.visit(accordionTitleSlotUrl);

        shouldEmitEventOnToggle();
    });
});

describe('story vl-accordion icon', () => {
    it('should display story', () => {
        cy.visit(accordionIconUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('story vl-accordion subtitle slot', () => {
    it('should display story', () => {
        cy.visit(accordionSubtitleSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('story vl-accordion menu slot', () => {
    it('should display story', () => {
        cy.visit(accordionMenuSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});

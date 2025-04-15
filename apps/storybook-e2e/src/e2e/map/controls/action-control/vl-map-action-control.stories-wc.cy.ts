import { VlButtonComponent } from '@domg-wc/components';
import { VlMapAction, VlMapActionControl } from '@domg-wc/map';

const mapActionControlMultipleUrl =
    'http://localhost:8080/iframe.html?id=map-controls-action-control--map-action-control-multiple&viewMode=story';

const drawActionId = 'draw-action';
const modifyActionId = 'modify-action';
const deleteActionId = 'delete-action';

const getButtonForAction = (actionId: string) => {
    return cy
        .get('vl-map')
        .find(`vl-map-action-control[data-vl-action-id="${actionId}"]`)
        .find('vl-button')
        .shadow()
        .find('button');
};

describe('story vl-map-action-control multiple', () => {
    it('should activate/deactivate action and toggle button on click toggle', () => {
        cy.visit(mapActionControlMultipleUrl);

        getButtonForAction(drawActionId).click({ force: true });
        cy.runTestFor<VlMapAction>(`#${drawActionId}`, (action) => {
            expect(action.active).to.be.true;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.true;
            }
        );

        getButtonForAction(drawActionId).click({ force: true });
        cy.runTestFor<VlMapAction>(`#${drawActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );
    });

    it('should activate/deactivate action and toggle button when calling activate()/deactivate()', () => {
        cy.visit(mapActionControlMultipleUrl);

        cy.runTestFor<VlMapActionControl>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"]`,
            (actionControl) => {
                actionControl.activate();
            }
        );
        cy.runTestFor<VlMapAction>(`#${drawActionId}`, (action) => {
            expect(action.active).to.be.true;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.true;
            }
        );

        cy.runTestFor<VlMapActionControl>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"]`,
            (actionControl) => {
                actionControl.deactivate();
            }
        );
        cy.runTestFor<VlMapAction>(`#${drawActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );
    });

    it('should deactivate action and toggle button when activating another action', () => {
        cy.visit(mapActionControlMultipleUrl);

        getButtonForAction(drawActionId).click({ force: true });
        cy.runTestFor<VlMapAction>(`#${drawActionId}`, (action) => {
            expect(action.active).to.be.true;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.true;
            }
        );

        cy.runTestFor<VlMapAction>(`#${modifyActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${modifyActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );

        cy.runTestFor<VlMapAction>(`#${deleteActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${deleteActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );

        getButtonForAction(modifyActionId).click({ force: true });
        cy.runTestFor<VlMapAction>(`#${drawActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );
        cy.runTestFor<VlMapAction>(`#${modifyActionId}`, (action) => {
            expect(action.active).to.be.true;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${modifyActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.true;
            }
        );
        cy.runTestFor<VlMapAction>(`#${deleteActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${deleteActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );

        getButtonForAction(deleteActionId).click({ force: true });
        cy.runTestFor<VlMapAction>(`#${drawActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${drawActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );
        cy.runTestFor<VlMapAction>(`#${modifyActionId}`, (action) => {
            expect(action.active).to.be.false;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${modifyActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.false;
            }
        );
        cy.runTestFor<VlMapAction>(`#${deleteActionId}`, (action) => {
            expect(action.active).to.be.true;
        });
        cy.runTestFor<VlButtonComponent>(
            `vl-map-action-control[data-vl-action-id="${deleteActionId}"] > vl-button`,
            (button) => {
                expect(button.on).to.be.true;
            }
        );
    });
});

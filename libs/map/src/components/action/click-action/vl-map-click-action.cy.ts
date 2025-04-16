import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { MapBrowserEvent } from 'ol';
import Overlay from 'ol/Overlay';
import { VlMap, VlMapBaseLayerGRBGray } from '../../../';
import { VlMapClickAction } from './vl-map-click-action';
import { VlMapClickedEvent } from './VlMapClickedEvent';

registerWebComponents([VlMapClickAction, VlMap, VlMapBaseLayerGRBGray]);

const pointerEvent = new PointerEvent('pointerdown', {
    clientX: 1,
    clientY: 1,
});

describe('vl-map-click-action', () => {
    beforeEach(() => {
        cy.mount(html`
            <section style="width: 100%">
                <vl-map>
                    <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                    <vl-map-click-action></vl-map-click-action>
                </vl-map>
            </section>
        `);
    });

    it('should mount', () => {
        cy.get('vl-map-click-action');
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-map-click-action');
    });

    it('should remove the marker when <vl-map-click-action> is removed from the DOM', () => {
        cy.get('vl-map').should('exist');
        cy.get('vl-map-click-action').should('exist');
        cy.get('vl-map').click();
        cy.get('vl-map').shadow().find('vl-map-click-action-pindrop').should('exist');
        cy.get('vl-map-click-action').then(($el) => $el.remove());
        cy.get('vl-map').shadow().find('vl-map-click-action-pindrop').should('not.exist');
    });

    it('should NOT throw a nullpointer exception (TypeError) when the map is clicked and the vl-map-click-action is not present on the DOM', () => {
        cy.get('vl-map').should('exist');
        cy.get('vl-map-click-action').then(($el) => $el.remove());
        cy.get('vl-map-click-action').should('not.exist');
        cy.get('vl-map').click();
        cy.get('vl-map').should('exist');
        cy.window().then((win) => {
            cy.spy(win.console, 'error').as('consoleError');
        });
        cy.get('@consoleError').should('not.have.been.called');
    });

    it('should add only one overlay to the map even after multiple clicks', () => {
        cy.get('vl-map').should('exist');
        cy.get('vl-map-click-action').should('exist');
        for (let i = 0; i < 5 /* numberOfClicks */; i++) {
            cy.get('vl-map').click();
        }
        cy.get('vl-map').shadow().find('vl-map-click-action-pindrop').should('have.length', 1);
    });

    it('when the map is clicked, an event is fired', () => {
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            vlMap.addEventListener(VlMapClickedEvent.eventType, cy.stub().as('clicked'));
            const event = new MapBrowserEvent<PointerEvent>('singleclick', vlMap.map, pointerEvent);
            vlMap.map.dispatchEvent(event);
            cy.get('@clicked').should('have.been.calledOnce');
            cy.get('@clicked').its('firstCall.args.0.type').should('equal', VlMapClickedEvent.eventType);
        });
    });

    it('when the map is clicked, there is an overlay on the map with a pindrop element at the clicked location', async () => {
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            vlMap.addEventListener(VlMapClickedEvent.eventType, cy.stub().as('clicked'));
            const event = new MapBrowserEvent<PointerEvent>('singleclick', vlMap.map, pointerEvent);
            vlMap.map.dispatchEvent(event);
            cy.get('@clicked').should('have.been.calledOnce');
            const overlays = vlMap.map.getOverlays();
            expect(overlays.getLength()).to.equal(1);
            const pindropOverlay: Overlay = overlays.item(0);
            const pindropOverlayElement: HTMLElement = pindropOverlay.getElement();
            expect(pindropOverlay.getPosition()).to.equal(event.coordinate);
            expect(pindropOverlayElement.tagName.toLowerCase()).to.equal('vl-map-click-action-pindrop');
        });
    });
});

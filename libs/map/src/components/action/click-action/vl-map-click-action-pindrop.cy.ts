import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlMapClickActionPindrop } from './vl-map-click-action-pindrop';

registerWebComponents([VlMapClickActionPindrop]);

describe('cypress-component - map - vl-map-click-action-pindrop', () => {
    beforeEach(() => {
        cy.mount(html` <vl-map-click-action-pindrop></vl-map-click-action-pindrop> `);
    });

    it('component loads ok', () => {
        cy.get('vl-map-click-action-pindrop').shadow();
    });
});

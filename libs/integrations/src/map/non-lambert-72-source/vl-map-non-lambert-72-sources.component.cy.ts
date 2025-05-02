import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMapNonLambert72Sources } from './vl-map-non-lambert-72-sources.component';

registerWebComponents([VlMapNonLambert72Sources]);

describe('integration - map with non-lambert-72 sources', () => {
    it('should render', () => {
        cy.mount(html`<vl-map-non-lambert-72-sources></vl-map-non-lambert-72-sources>`);

        cy.get('vl-map-non-lambert-72-sources').shadow();
    });
});

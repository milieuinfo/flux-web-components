import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapSideSheet } from './vl-map-side-sheet';
import { VlMapSideSheetMenuItem } from './vl-map-side-sheet-menu-item';

registerWebComponents([VlMap, VlMapSideSheet, VlMapSideSheetMenuItem]);

const mapSideSheetMenuItemFixture = html`
    <vl-map>
        <vl-map-side-sheet data-vl-open>
            <vl-map-side-sheet-menu-item></vl-map-side-sheet-menu-item>
        </vl-map-side-sheet>
    </vl-map>
`;

describe('vl-map-side-sheet-menu-item', () => {
    it('bevat default titel', () => {
        cy.mount(mapSideSheetMenuItemFixture);
        cy.runTestFor<VlMapSideSheetMenuItem>('vl-map-side-sheet-menu-item', (vlMapSideSheetMenuItem) => {
            expect(vlMapSideSheetMenuItem._titleElement.innerText).to.be.equal('Terug');
        });
    });

    it('bevat default href', () => {
        cy.mount(mapSideSheetMenuItemFixture);
        cy.runTestFor<VlMapSideSheetMenuItem>('vl-map-side-sheet-menu-item', (vlMapSideSheetMenuItem) => {
            expect(vlMapSideSheetMenuItem._hrefElement.getAttribute('href')).to.be.equal('#');
        });
    });

    it('bevat titel op basis van het titel attribuut', () => {
        cy.mount(mapSideSheetMenuItemFixture);
        cy.runTestFor<VlMapSideSheetMenuItem>('vl-map-side-sheet-menu-item', (vlMapSideSheetMenuItem) => {
            const text = 'Dit is een titel';
            vlMapSideSheetMenuItem.setAttribute('data-vl-title', text);
            expect(vlMapSideSheetMenuItem._titleElement.innerText).to.be.equal(text);
        });
    });

    it('bevat href op basis van het href attribuut', () => {
        cy.mount(mapSideSheetMenuItemFixture);
        cy.runTestFor<VlMapSideSheetMenuItem>('vl-map-side-sheet-menu-item', (vlMapSideSheetMenuItem) => {
            const hrefPath = '/test-path';
            vlMapSideSheetMenuItem.setAttribute('data-vl-href', hrefPath);
            expect(vlMapSideSheetMenuItem._hrefElement.getAttribute('href')).to.be.equal(hrefPath);
        });
    });
});

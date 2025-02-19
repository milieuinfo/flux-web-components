import { registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlInfoTile, VlPopoverComponent } from '@domg-wc/components';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { vlElementsStyle } from '@domg-wc/elements';
import { css, CSSResult, html, LitElement } from 'lit';

@webComponent('vl-popover-menu-info-tile')
export class VlPopoverMenuInfoTileComponent extends LitElement {
    static {
        registerWebComponents([VlInfoTile, VlPopoverComponent, VlButtonComponent]);
    }

    static override get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle, css``];
    }

    override render() {
        return html`
            <vl-info-tile data-vl-toggleable>
                <span slot="title">Broos Deprez</span>
                <span slot="subtitle">Uw zoon (19.05.2005)</span>
                <div slot="content">De studietoelage voor Broos Deprez werd toegekend.</div>
                <span slot="menu">
                    <vl-button-next ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button-next>
                    <vl-popover for="btn-acties" placement="bottom-end">
                        <vl-popover-action-list>
                            <vl-popover-action icon="search">Zoeken</vl-popover-action>
                            <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                            <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
                        </vl-popover-action-list>
                    </vl-popover>
                </span>
            </vl-info-tile>
        `;
    }

    protected override createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-menu-info-tile': VlPopoverMenuInfoTileComponent;
    }
}

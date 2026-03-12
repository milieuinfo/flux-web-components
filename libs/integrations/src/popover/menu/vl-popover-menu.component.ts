import { registerWebComponents, webComponent } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlPopoverComponent } from '@domg-wc/components/block';
import { html, LitElement } from 'lit';

@webComponent('vl-popover-menu')
export class VlPopoverMenuComponent extends LitElement {
    static {
        registerWebComponents([VlPopoverComponent, VlButtonComponent]);
    }

    override render() {
        return html`
            <div>
                <vl-button ghost icon="nav-show-more-vertical" id="btn-acties" label="Acties"></vl-button>
                <vl-popover for="btn-acties" placement="bottom-end" trigger="click" hide-on-click>
                    <vl-popover-action-list>
                        <vl-popover-action icon="search">Zoeken</vl-popover-action>
                        <vl-popover-action icon="edit">Aanpassen</vl-popover-action>
                        <vl-popover-action icon="bin">Verwijderen</vl-popover-action>
                    </vl-popover-action-list>
                </vl-popover>
            </div>
        `;
    }

    protected override createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-menu': VlPopoverMenuComponent;
    }
}

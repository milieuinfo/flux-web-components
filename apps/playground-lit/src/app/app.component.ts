import { registerWebComponents } from '@domg-wc/common';
import { VlPopoverActionComponent, VlPopoverActionListComponent, VlPopoverComponent } from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([
            VlHeader,
            VlPopoverComponent,
            VlPopoverActionListComponent,
            VlPopoverActionComponent,
        ]);
    }

    render() {
        return html`
            <vl-template>
                <vl-header
                    slot="header"
                    development
                    simple
                    identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                ></vl-header>
                <main slot="main">
                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">Breadcrumbs met submenus</vl-title>
                            <vl-breadcrumb>
                                <vl-breadcrumb-item type="button" @click=${(e: Event) => e.preventDefault()}>
                                    <vl-icon small right-margin icon="folder"></vl-icon>
                                    Dieren
                                </vl-breadcrumb-item>
                                <div>
                                    <vl-breadcrumb-item
                                        id="submenu"
                                        type="button"
                                        @click=${(e: Event) => e.preventDefault()}
                                    >
                                        Zoogdieren
                                    </vl-breadcrumb-item>
                                    <vl-popover
                                        distance="6"
                                        for="submenu"
                                        hide-arrow
                                        placement="bottom-start"
                                        trigger="click hover"
                                    >
                                        <vl-popover-action-list>
                                            <vl-popover-action icon="folder"> Zoogdieren </vl-popover-action>
                                            <vl-popover-action icon="folder"> Reptielen </vl-popover-action>
                                            <vl-popover-action icon="folder"> Vogels </vl-popover-action>
                                        </vl-popover-action-list>
                                    </vl-popover>
                                </div>

                                <div>
                                    <vl-breadcrumb-item
                                        id="submenu-apen"
                                        type="button"
                                        @click=${(e: Event) => e.preventDefault()}
                                    >
                                        Apen
                                    </vl-breadcrumb-item>
                                    <vl-popover
                                        distance="6"
                                        for="submenu-apen"
                                        hide-arrow
                                        placement="bottom-start"
                                        trigger="click hover"
                                    >
                                        <vl-popover-action-list>
                                            <vl-popover-action icon="folder"> Apen </vl-popover-action>
                                            <vl-popover-action icon="folder"> Knaagdieren </vl-popover-action>
                                        </vl-popover-action-list>
                                    </vl-popover>
                                </div>
                            </vl-breadcrumb>
                        </div>
                    </section>
                </main>
            </vl-template>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }
}

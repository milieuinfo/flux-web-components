import { registerWebComponents } from '@domg-wc/common';
import {
    VlInfoTile,
    VlPopoverActionComponent,
    VlPopoverActionListComponent,
    VlPopoverComponent,
    VlPropertiesComponent,
} from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { VlDatepickerComponent } from '@domg-wc/components/form';
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
            VlDatepickerComponent,
            VlInfoTile,
            VlPropertiesComponent,
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
                            <vl-info-tile highlight-left>
                                <vl-properties
                                    slot="content"
                                    .props="${[
                                        {
                                            items: [
                                                {
                                                    labels: ['Item'],
                                                    data: ['Value'],
                                                },
                                            ],
                                        },
                                    ]}"
                                >
                                </vl-properties>
                            </vl-info-tile>
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

                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">FLUX-595 — datepicker positioning bug repro</vl-title>
                            <p>
                                Beide datepickers zitten in een identieke <code>transform + overflow:auto</code> parent
                                — de exacte ancestor-conditie die de oude positioning-hack breekt.
                                Klik op de kalender-knoppen om te vergelijken.
                            </p>
                            <div style="display: flex; gap: 20px; margin-top: 16px;">
                                <div style="flex: 1; border: 2px dashed crimson; padding: 12px; background: #fffbe6;">
                                    <strong style="color: crimson;">A — default mode (bug)</strong>
                                    <p style="margin: 4px 0 8px; font-size: 13px; color: #666;">
                                        getBoundingClientRect-hack — calendar landt op verkeerde plek / clipt door overflow.
                                    </p>
                                    <div
                                        style="transform: translateX(0); overflow: auto; max-height: 180px;
                                               border: 1px solid #ccc; padding: 10px;"
                                    >
                                        <div style="height: 60px;"></div>
                                        <vl-datepicker label="Vanaf"></vl-datepicker>
                                        <div style="height: 400px;"></div>
                                    </div>
                                </div>
                                <div style="flex: 1; border: 2px dashed green; padding: 12px; background: #f0fff0;">
                                    <strong style="color: green;">B — anchor-positioning opt-in (fix)</strong>
                                    <p style="margin: 4px 0 8px; font-size: 13px; color: #666;">
                                        Popover top-layer + CSS Anchor Positioning — ontsnapt aan ancestor context.
                                    </p>
                                    <div
                                        style="transform: translateX(0); overflow: auto; max-height: 180px;
                                               border: 1px solid #ccc; padding: 10px;"
                                    >
                                        <div style="height: 60px;"></div>
                                        <vl-datepicker label="Vanaf" anchor-positioning></vl-datepicker>
                                        <div style="height: 400px;"></div>
                                    </div>
                                </div>
                            </div>
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

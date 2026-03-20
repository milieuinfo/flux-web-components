import { registerWebComponents } from '@domg-wc/common';
import { VlHeader } from '@domg-wc/components/compliance';
import { VlFooter } from '@domg-wc/components/compliance/next';
import { VlInputFieldComponent } from '@domg-wc/components/form';
import { vlResetStyles } from '@domg-wc/styles';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { VlDashboardComponent } from './vl-dashboard.component';
import { VlNavLinkComponent } from './vl-nav-link.component';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([VlHeader, VlFooter, VlDashboardComponent, VlNavLinkComponent, VlInputFieldComponent]);
    }

    static get styles() {
        return [vlResetStyles];
    }

    @property({type: Boolean, attribute: false})
    navCollapsed = false;


    connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener('vl-toggle-navigation', (event: CustomEvent) => {
            const collapsed = event.detail.collapsed;
            this.navCollapsed = collapsed;
        });
    }

    render() {
        return html`
            <style>
                /* TODO: eigen component van maken */
                button-badge {
                    min-width: 1.8rem;
                    max-width: 50%;
                    height: 1.8rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.9rem;
                    color: white;
                    background-color: var(--vl-color--background-error);
                    border: 1px solid var(--vl-color--background-error);
                    padding: 0 0.3rem;
                    font-size: 0.6em;
                    font-weight: bold;
                }

                /* Beschikbare variabelen */
                :root {
                    --vl-dashboard-header-height: 43px;
                    --vl-dashboard-footer-height: 128px; /* 35px in het geval dat de footer ingeklapt kan worden */
                    --vl-dashboard-navigation-width: 300px;
                    --vl-dashboard-title-min-width: 300px;
                }
            </style>
            <vl-dashboard
                user-name="Bedrijfsnaam"
                user-icon="building-big"
                page-icon="places-home"
                page-title="Overzicht"
                content-max-width="1280px"
            >
                <!-- Slot header -->
                <vl-header
                    development
                    identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                    simple
                    slot="header"
                ></vl-header>

                <!-- Slot nav-main -->
                <!-- Gebruik ofwel iconen voor àlle knoppen, ofwel geen iconen -->
                <!-- href wordt aangeraden voor navigatie -->
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="places-home" active>
                    Overzicht
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="list">
                    Beheer items
                    <!-- Een nav link kan een icon-only actie knop hebben -->
                    <vl-button icon="plus-circle-filled" label="[x] toevoegen" ghost slot="link-action"></vl-button>
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="bell">
                    Notificaties
                    <!-- Een nav link kan een badge hebben -->
                    <button-badge slot="link-badge">1</button-badge>
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 4
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 5
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 6
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 7
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 8
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 9
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 10
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 11
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 12
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 13
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 14
                </vl-nav-link>
                <vl-nav-link slot="nav-main" ?collapsed=${this.navCollapsed} href="/" icon="paperplane">
                    Item 15
                </vl-nav-link>

                <!-- Slot nav-utils -->
                <vl-nav-link slot="nav-utils" ?collapsed=${this.navCollapsed} href="/" icon="inbox"
                    >Indienen
                    <button-badge slot="link-badge">999</button-badge>
                </vl-nav-link>

                <!-- Slot header-actions -->
                <div slot="header-actions" class="vl-group vl-group--input-group">
                    <vl-input-field
                        name="search"
                        id="search"
                        input-group
                        placeholder="Zoek op deze pagina"
                    ></vl-input-field>
                    <vl-button tertiary label="Zoeken" icon="search" input-group></vl-button>
                </div>
                <vl-button slot="header-actions" icon="add" secondary>Nieuw item</vl-button>
                <vl-button slot="header-actions" icon="bin" error>Verwijderen</vl-button>

                <!-- Slot content -->
                <div slot="content" class="vl-stacked vl-stacked-medium">
                    <vl-title type="h2">Heading level 2</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis eu nunc in facilisis.
                        Vestibulum facilisis, ipsum sit amet mollis lobortis, purus justo consectetur odio, vitae semper
                        mi libero vitae enim. Nunc tincidunt lobortis nunc id vestibulum. Donec rutrum odio ut leo
                        tincidunt, in molestie ante iaculis. Praesent finibus eros vitae libero faucibus vehicula. Sed
                        sollicitudin quam ut sapien molestie, nec hendrerit ligula convallis. Nunc vestibulum, neque vel
                        aliquet tristique, purus ligula elementum libero, nec iaculis orci dui sit amet felis.
                        Suspendisse eu odio orci. Sed auctor odio vehicula feugiat lobortis. Nunc semper iaculis ante,
                        eu fringilla mi ultricies non.
                    </p>

                    <p>
                        Praesent non diam vehicula purus hendrerit elementum. Phasellus faucibus non tortor non viverra.
                        Maecenas porttitor magna ut nisi scelerisque, vel condimentum orci sagittis. Quisque tincidunt,
                        ligula id commodo convallis, enim ligula consequat nulla, vel tincidunt erat nunc in turpis. In
                        iaculis accumsan arcu, vitae pellentesque tortor vestibulum sed. Etiam sed consequat quam, at
                        laoreet metus. Phasellus eget quam at ante lobortis tristique a sit amet justo.
                    </p>

                    <p>
                        Nam ac interdum orci, sit amet volutpat mauris. Etiam tincidunt massa augue, vel convallis lorem
                        porta at. Maecenas tempor aliquet hendrerit. Curabitur non faucibus nisl, nec laoreet dui.
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Pellentesque in tincidunt mi. Donec id vehicula ligula.
                    </p>

                    <p>
                        Phasellus quis arcu dignissim, lobortis purus et, tincidunt nisl. Nulla laoreet dignissim metus,
                        ut dignissim odio eleifend eget. Duis et sollicitudin turpis, consectetur pulvinar leo.
                        Suspendisse vel commodo nunc. Mauris tristique lacus sit amet mi vestibulum, at ullamcorper elit
                        efficitur. Pellentesque mollis finibus accumsan. Mauris fringilla ex quam, pharetra pellentesque
                        risus consequat vel.
                    </p>

                    <p>
                        Proin risus orci, venenatis sed convallis id, semper vitae turpis. Curabitur nunc mi, semper sit
                        amet leo ut, viverra sollicitudin erat. Vestibulum ut est sed odio ornare laoreet. In et
                        pulvinar lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Duis sollicitudin velit lorem, nec accumsan velit venenatis in. Maecenas faucibus
                        posuere ante id faucibus. Suspendisse hendrerit metus sed nunc condimentum, ut eleifend nibh
                        consequat. Aliquam id tellus libero. Nam non dui eu odio ullamcorper sollicitudin id id nulla.
                        In sed maximus turpis. Duis sodales urna turpis, non volutpat felis congue sit amet. Suspendisse
                        potenti. Aenean et gravida mi.
                    </p>
                </div>

                <!-- Slot footer -->
                <vl-footer development identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b" slot="footer"></vl-footer>
            </vl-dashboard>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }
}

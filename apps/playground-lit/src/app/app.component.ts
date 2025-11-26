import { registerWebComponents } from '@domg-wc/common';
import { VlAccordionComponent } from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([VlAccordionComponent, VlHeader]);
    }

    updated() {
        const treeViews = document.querySelectorAll<HTMLElement>('.tree-view');

        treeViews.forEach((treeView) => {
            const folders = treeView.querySelectorAll<HTMLElement>('vl-link:has(+ ul)');
            folders.forEach((folder) => {
                folder.addEventListener('click', () => {
                    folder.classList.toggle('open');
                });
            });
        });
    }

    render() {
        return html`
            <style>
                .tree-view {
                    padding: 0.5rem;
                    border-right: 1px solid var(--vl-color--border);
                    height: 300px;
                    max-width: 100%;
                    overflow: auto;

                    ul,
                    li {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        display: block;
                        box-sizing: border-box;
                        white-space: nowrap;
                    }

                    ul ul {
                        position: relative;
                        &::before {
                            position: absolute;
                            top: 0;
                            left: 0.8rem;
                            content: '';
                            display: block;
                            height: 100%;
                            width: 1px;
                            border-left: 1px dotted var(--vl-color--border);
                        }
                        & > li {
                            margin-left: 2rem;
                            & > vl-link {
                                margin-right: 0.5rem;
                            }
                        }
                    }

                    vl-link:has(+ ul) {
                        & + ul {
                            display: none;
                        }
                        &.open {
                            & + ul {
                                display: block;
                            }
                        }
                        & + ul {
                            display: none;
                        }
                    }

                    vl-link::part(icon) {
                        color: var(--vl-color--icon-subtle);
                    }

                    vl-link vl-icon::part(icon) {
                        color: var(--vl-color--icon-subtle);
                        padding-right: 0.3rem;
                    }

                    vl-link::part(button) {
                        text-decoration: none;
                    }
                }
            </style>
            <vl-template>
                <vl-header
                    slot="header"
                    development
                    simple
                    identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                ></vl-header>
                <main slot="main">
                    <!-- <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">Boomstructuur met vl-link</vl-title>
                            <div class="vl-grid">
                                <div class="vl-column vl-column--2">
                                    <div class="tree-view">
                                        <ul role="tree">
                                            <li role="treeitem">
                                                <vl-link button-as-link icon="folder" icon-placement="before"
                                                    ><vl-icon small icon="arrow-down-fat"></vl-icon> Top folder</vl-link
                                                >
                                                <ul role="group">
                                                    <li role="treeitem">
                                                        <vl-link button-as-link icon="folder" icon-placement="before"
                                                            ><vl-icon small icon="arrow-down-fat"></vl-icon> Level
                                                            2a</vl-link
                                                        >
                                                        <ul role="group">
                                                            <li role="treeitem">
                                                                <vl-link
                                                                    button-as-link
                                                                    icon="folder"
                                                                    icon-placement="before"
                                                                    ><vl-icon small icon="arrow-down-fat"></vl-icon>
                                                                    Level 3</vl-link
                                                                >
                                                                <ul role="group">
                                                                    <li role="treeitem">
                                                                        <vl-link
                                                                            button-as-link
                                                                            icon="folder"
                                                                            icon-placement="before"
                                                                            ><vl-icon
                                                                                small
                                                                                icon="arrow-down-fat"
                                                                            ></vl-icon>
                                                                            Level 4a</vl-link
                                                                        >
                                                                        <ul role="group">
                                                                            <li role="treeitem">
                                                                                <vl-link
                                                                                    button-as-link
                                                                                    icon="folder"
                                                                                    icon-placement="before"
                                                                                    ><vl-icon
                                                                                        small
                                                                                        icon="arrow-down-fat"
                                                                                    ></vl-icon>
                                                                                    Level 5</vl-link
                                                                                >
                                                                                <ul role="group">
                                                                                    <li role="treeitem">
                                                                                        <vl-link
                                                                                            button-as-link
                                                                                            icon="folder"
                                                                                            icon-placement="before"
                                                                                            ><vl-icon
                                                                                                small
                                                                                                icon="arrow-down-fat"
                                                                                                style="opacity: 0"
                                                                                            ></vl-icon>
                                                                                            Level 6a</vl-link
                                                                                        >
                                                                                    </li>
                                                                                    <li role="treeitem">
                                                                                        <vl-link
                                                                                            button-as-link
                                                                                            icon="folder"
                                                                                            icon-placement="before"
                                                                                            ><vl-icon
                                                                                                small
                                                                                                icon="arrow-down-fat"
                                                                                                style="opacity: 0"
                                                                                            ></vl-icon>
                                                                                            Level 6b</vl-link
                                                                                        >
                                                                                    </li>
                                                                                    <li role="treeitem">
                                                                                        <vl-link
                                                                                            button-as-link
                                                                                            icon="folder"
                                                                                            icon-placement="before"
                                                                                            ><vl-icon
                                                                                                small
                                                                                                icon="arrow-down-fat"
                                                                                                style="opacity: 0"
                                                                                            ></vl-icon>
                                                                                            Level
                                                                                            6cccccccccccccccccccccccc</vl-link
                                                                                        >
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                    <li role="treeitem">
                                                                        <vl-link
                                                                            button-as-link
                                                                            icon="folder"
                                                                            icon-placement="before"
                                                                            ><vl-icon
                                                                                small
                                                                                icon="arrow-down-fat"
                                                                                style="opacity: 0"
                                                                            ></vl-icon>
                                                                            Level 4b</vl-link
                                                                        >
                                                                    </li>
                                                                    <li role="treeitem">
                                                                        <vl-link
                                                                            button-as-link
                                                                            icon="folder"
                                                                            icon-placement="before"
                                                                            ><vl-icon
                                                                                small
                                                                                icon="arrow-down-fat"
                                                                                style="opacity: 0"
                                                                            ></vl-icon>
                                                                            Level 4c</vl-link
                                                                        >
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li role="treeitem">
                                                        <vl-link button-as-link icon="folder" icon-placement="before"
                                                            ><vl-icon
                                                                small
                                                                icon="arrow-down-fat"
                                                                style="opacity: 0"
                                                            ></vl-icon>
                                                            Level 2b</vl-link
                                                        >
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> -->
                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">Breadcrumbs met submenus</vl-title>
                            <!-- <div>
                                <vl-icon icon="folder" small></vl-icon>
                                <vl-button ghost narrow>Dieren</vl-button>
                                <vl-icon icon="arrow-right-fat" small></vl-icon>
                                <vl-button ghost narrow id="submenu-dieren-zoogdieren">Zoogdieren</vl-button>
                                <vl-popover for="submenu-dieren-zoogdieren" hide-arrow placement="bottom-start">
                                    <vl-popover-action-list>
                                        <vl-button
                                            ghost
                                            narrow
                                            block
                                            icon="folder"
                                            icon-placement="before"
                                            custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                            >Zoogdieren
                                        </vl-button>
                                        <vl-button
                                            ghost
                                            narrow
                                            block
                                            icon="folder"
                                            icon-placement="before"
                                            custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                            >Reptielen
                                        </vl-button>
                                        <vl-button
                                            ghost
                                            narrow
                                            block
                                            id="submenu2"
                                            icon="folder"
                                            icon-placement="before"
                                            custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                            >Vogels</vl-button
                                        >
                                    </vl-popover-action-list>
                                </vl-popover>
                                <vl-icon icon="arrow-right-fat" small></vl-icon>
                                <vl-button narrow ghost id="submenu-dieren-zoogdieren-apen">Apen</vl-button>
                                <vl-popover for="submenu-dieren-zoogdieren-apen" hide-arrow placement="bottom-start">
                                    <vl-popover-action-list>
                                        <vl-button
                                            ghost
                                            narrow
                                            block
                                            icon="folder"
                                            icon-placement="before"
                                            custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                            >Apen
                                        </vl-button>
                                        <vl-button
                                            ghost
                                            narrow
                                            block
                                            icon="folder"
                                            icon-placement="before"
                                            custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                            >Knaagdieren
                                        </vl-button>
                                    </vl-popover-action-list>
                                </vl-popover>
                            </div> -->

                            <vl-breadcrumb>
                                <vl-breadcrumb-item type="button" @click=${(e: Event) => e.preventDefault()}>
                                    <vl-icon small right-margin icon="folder"></vl-icon>
                                    Dieren
                                </vl-breadcrumb-item>
                                <vl-breadcrumb-item
                                    id="submenu"
                                    type="button"
                                    @click=${(e: Event) => e.preventDefault()}
                                >
                                    Zoogdieren

                                    <vl-popover
                                        distance="6"
                                        for="submenu"
                                        hide-arrow
                                        placement="bottom-start"
                                        trigger="click hover focus"
                                    >
                                        <vl-popover-action-list>
                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                icon="folder"
                                                icon-placement="before"
                                                custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                                >Zoogdieren
                                            </vl-button>
                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                icon="folder"
                                                icon-placement="before"
                                                custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                                >Reptielen
                                            </vl-button>
                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                id="submenu2"
                                                icon="folder"
                                                icon-placement="before"
                                                custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                                >Vogels</vl-button
                                            >
                                        </vl-popover-action-list>
                                    </vl-popover>
                                </vl-breadcrumb-item>
                                <vl-breadcrumb-item
                                    id="submenu-apen"
                                    type="button"
                                    @click=${(e: Event) => e.preventDefault()}
                                >
                                    Apen

                                    <vl-popover
                                        distance="6"
                                        for="submenu-apen"
                                        hide-arrow
                                        placement="bottom-start"
                                        trigger="click hover focus"
                                    >
                                        <vl-popover-action-list>
                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                icon="folder"
                                                icon-placement="before"
                                                custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                                >Apen
                                            </vl-button>
                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                icon="folder"
                                                icon-placement="before"
                                                custom-css="button { align-content: flex-start; justify-content: flex-start; }"
                                                >Knaagdieren
                                            </vl-button>
                                        </vl-popover-action-list>
                                    </vl-popover>
                                </vl-breadcrumb-item>
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

import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent, VlParagraphComponent, VlTitleComponent } from '@domg-wc/components/atom';
import {
    VlAccordionComponent,
    VlFunctionalHeaderComponent,
    VlModalComponent,
    VlPillComponent,
    VlPopoverComponent,
    VlSideNavigationComponent,
    VlSideSheet,
    VlTabsComponent,
} from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { VlDatepickerComponent, VlSelectComponent, VlSelectRichComponent } from '@domg-wc/components/form';
import { VlFormDemoComponent } from '@domg-wc/integrations/form';
import { vlGroupStyles, vlLegacyStyles, vlStackedStyles } from '@domg-wc/styles';
import { VlSideNavigationReferenceComponent } from 'libs/components/src/block/side-navigation';
import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([
            VlAccordionComponent,
            VlButtonComponent,
            VlDatepickerComponent,
            VlFormDemoComponent,
            VlLinkComponent,
            VlModalComponent,
            VlParagraphComponent,
            VlPillComponent,
            VlPopoverComponent,
            VlSelectComponent,
            VlSelectRichComponent,
            VlSideSheet,
            VlTabsComponent,
            VlTitleComponent,
            VlFunctionalHeaderComponent,
            VlHeader,
            VlSideNavigationComponent,
            VlSideNavigationReferenceComponent,
        ]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlLegacyStyles, vlGroupStyles, vlStackedStyles];
    }

    render() {
        return html`
            <main>
                <vl-header development simple identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"></vl-header>
                <vl-functional-header sticky hide-back-link>
                    <div slot="title">Application name</div>
                    <div class="vl-group vl-margin--small vl-margin--no-bottom" slot="top-right">
                        <vl-button
                            tertiary
                            icon="add"
                            label="Taak aanmaken"
                            @click=${() => {
                                document.querySelector<VlModalComponent>('#taak-modal')?.open();
                            }}
                            >Taak</vl-button
                        >
                        <vl-button
                            tertiary
                            icon="add"
                            label="Aantekening aanmaken"
                            @click=${() => {
                                document.querySelector<VlModalComponent>('#aantekening-modal')?.open();
                            }}
                            >Aantekening</vl-button
                        >
                        <vl-button
                            tertiary
                            icon="edit"
                            label="edit"
                            @click=${() => {
                                document.querySelector<VlModalComponent>('#edit-modal')?.open();
                            }}
                        ></vl-button>
                        <vl-button
                            tertiary
                            error
                            icon="bin"
                            label="delete"
                            @click=${() => {
                                document.querySelector<VlModalComponent>('#delete-modal')?.open();
                            }}
                        ></vl-button>
                    </div>
                    <div class="vl-group vl-group--separator-row" slot="sub-title">
                        <vl-button ghost narrow id="back" icon="arrow-left-fat">Terug</vl-button>
                        <vl-button ghost narrow id="trein">Trein</vl-button>
                        <vl-button ghost narrow id="metro">Metro, tram en bus</vl-button>
                        <div>
                            <vl-button ghost narrow id="submenu" icon="arrow-down-fat" icon-placement="after"
                                >Knop met submenu</vl-button
                            >
                            <vl-popover for="submenu" hide-arrow distance="12" placement="bottom-end">
                                <vl-popover-action-list>
                                    <vl-button
                                        ghost
                                        narrow
                                        block
                                        cta-link="https://google.be"
                                        icon="external"
                                        icon-placement="after"
                                        custom-css="a { align-content: flex-start; justify-content: space-between; }"
                                        >Google.be</vl-button
                                    >
                                    <vl-button
                                        ghost
                                        narrow
                                        block
                                        custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                        >Andere actie</vl-button
                                    >

                                    <vl-button
                                        ghost
                                        narrow
                                        block
                                        id="submenu2"
                                        icon="arrow-right-fat"
                                        icon-placement="after"
                                        custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                        >Level 2</vl-button
                                    >
                                    <vl-popover
                                        for="submenu2"
                                        hide-arrow
                                        distance="12"
                                        placement="right-start"
                                        custom-css=".popover-content { filter: none }"
                                    >
                                        <vl-popover-action-list>
                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                >Heellangwoorddfasdfasdfasdfasdfasdfasdfasdfsd</vl-button
                                            >

                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                id="submenu3"
                                                icon="arrow-right-fat"
                                                icon-placement="after"
                                                custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                >Level 3</vl-button
                                            >
                                            <vl-popover
                                                for="submenu3"
                                                hide-arrow
                                                distance="12"
                                                placement="right-start"
                                                custom-css=".popover-content { filter: none }"
                                            >
                                                <vl-popover-action-list>
                                                    <vl-button
                                                        ghost
                                                        narrow
                                                        block
                                                        id="submenu4"
                                                        icon="arrow-right-fat"
                                                        icon-placement="after"
                                                        custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                        >Level 4</vl-button
                                                    >
                                                    <vl-popover
                                                        for="submenu4"
                                                        hide-arrow
                                                        distance="12"
                                                        placement="right-start"
                                                        custom-css=".popover-content { filter: none }"
                                                    >
                                                        <vl-popover-action-list>
                                                            <vl-button
                                                                ghost
                                                                narrow
                                                                block
                                                                custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                                >Andere actie</vl-button
                                                            >

                                                            <vl-button
                                                                ghost
                                                                narrow
                                                                block
                                                                id="submenu5"
                                                                icon="arrow-right-fat"
                                                                icon-placement="after"
                                                                custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                                >Level 5</vl-button
                                                            >
                                                            <vl-popover
                                                                for="submenu5"
                                                                hide-arrow
                                                                distance="12"
                                                                placement="right-start"
                                                                custom-css=".popover-content { filter: none }"
                                                            >
                                                                <vl-popover-action-list>
                                                                    <vl-button
                                                                        ghost
                                                                        narrow
                                                                        block
                                                                        custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                                        >Andere actie</vl-button
                                                                    >
                                                                    <vl-button
                                                                        ghost
                                                                        narrow
                                                                        block
                                                                        custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                                        >Andere actie</vl-button
                                                                    >
                                                                </vl-popover-action-list>
                                                            </vl-popover>

                                                            <vl-button
                                                                ghost
                                                                narrow
                                                                block
                                                                custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                                >Andere actie</vl-button
                                                            >
                                                        </vl-popover-action-list>
                                                    </vl-popover>
                                                    <vl-button
                                                        ghost
                                                        narrow
                                                        block
                                                        custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                        >Andere actie</vl-button
                                                    >
                                                    <vl-button
                                                        ghost
                                                        narrow
                                                        block
                                                        custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                        >Andere actie</vl-button
                                                    >
                                                </vl-popover-action-list>
                                            </vl-popover>

                                            <vl-button
                                                ghost
                                                narrow
                                                block
                                                custom-css="button { align-content: flex-start; justify-content: space-between; }"
                                                >Andere actie</vl-button
                                            >
                                        </vl-popover-action-list>
                                    </vl-popover>
                                </vl-popover-action-list>
                            </vl-popover>
                        </div>

                        <vl-button ghost narrow id="fiets">Fiets</vl-button>
                    </div>
                </vl-functional-header>

                <div class="vl-content-block">
                    <div class="vl-grid vl-stacked-small">
                        <div class="vl-column vl-column--8 vl-column--m-9 vl-column--s-12 vl-column--xs-12">
                            <vl-side-navigation-reference>
                                <section class="vl-section">
                                    <vl-title type="h2" id="hoofdstuk-1">Hoofdstuk 1</vl-title>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dignissim magna.
                                    Integer ligula lacus, volutpat vitae arcu eu, laoreet euismod sapien. Donec viverra
                                    nunc non lectus hendrerit, eget faucibus dolor congue. Fusce at dolor dictum ligula
                                    efficitur varius vitae quis massa. Pellentesque porta et ligula at feugiat. Nulla
                                    sit amet erat fringilla, dapibus sapien quis, efficitur neque. Fusce vulputate eu
                                    felis ut rhoncus. Maecenas suscipit nunc ligula. Cras ullamcorper interdum risus, id
                                    tempus erat aliquet ut. Duis dapibus convallis eros. Praesent mollis, nunc vitae
                                    molestie mattis, leo nisl sagittis tortor, sit amet tristique justo metus ac justo.
                                    Suspendisse potenti. Phasellus non lobortis felis. Nam sit amet dui magna. Etiam a
                                    sagittis turpis. Nulla vitae mattis massa. Donec pulvinar, ipsum eget luctus
                                    molestie, odio orci vehicula nibh, sed molestie mauris justo ut est. Nam gravida,
                                    turpis fringilla luctus tempor, neque velit volutpat nibh, nec volutpat est nibh sed
                                    augue. Mauris malesuada nibh est. Nam suscipit quam nec placerat efficitur.
                                </section>

                                <section class="vl-section">
                                    <vl-title type="h2" id="hoofdstuk-2">Hoofdstuk 2</vl-title>
                                    Morbi sed mollis justo, sed ultrices nibh. Morbi sagittis rutrum quam, quis suscipit
                                    lectus vestibulum eu. Cras vehicula placerat velit, eu tincidunt nunc dapibus sed.
                                    Morbi quis bibendum dolor, id bibendum risus. Nulla ultricies bibendum bibendum.
                                    Aliquam et iaculis lacus. Donec rutrum luctus lectus, at molestie dui suscipit eu.
                                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed metus turpis,
                                    gravida et lobortis viverra, consequat id arcu. Phasellus aliquet mollis euismod.
                                    Morbi scelerisque, erat at fringilla accumsan, magna neque facilisis quam, ac
                                    aliquet tortor ipsum ut sem. Nunc diam tellus, suscipit sit amet egestas ut, auctor
                                    nec eros. Cras quis libero arcu. Maecenas sed ornare diam. Ut ac sollicitudin
                                    tortor. Integer ac sapien viverra sapien auctor aliquet dignissim et nibh. Curabitur
                                    mollis condimentum vehicula. Aenean eu egestas massa. Nam accumsan sapien lectus, id
                                    tincidunt tellus commodo at. Fusce rutrum imperdiet semper. Nam porttitor tincidunt
                                    est eget tristique. Curabitur tempus ex libero, a tristique leo sagittis non. Etiam
                                    id tincidunt dui. Aliquam erat volutpat. Vivamus placerat in diam eu consectetur. In
                                    hac habitasse platea dictumst. Aenean est urna, rhoncus vel feugiat vel, feugiat sed
                                    tellus. Maecenas gravida, justo suscipit consequat vulputate, nisl nunc blandit
                                    felis, non varius tortor ipsum et leo. Proin arcu tortor, euismod a venenatis sed,
                                    volutpat quis metus. Integer lacinia libero quis lorem fringilla vehicula. Sed augue
                                    urna, posuere quis est vel, convallis tristique neque. Morbi efficitur scelerisque
                                    eros nec vulputate. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Sed ac dignissim magna. Integer ligula lacus, volutpat
                                    vitae arcu eu, laoreet euismod sapien. Donec viverra nunc non lectus hendrerit, eget
                                    faucibus dolor congue. Fusce at dolor dictum ligula efficitur varius vitae quis
                                    massa. Pellentesque porta et ligula at feugiat. Nulla sit amet erat fringilla,
                                    dapibus sapien quis, efficitur neque. Fusce vulputate eu felis ut rhoncus. Maecenas
                                    suscipit nunc ligula. Cras ullamcorper interdum risus, id tempus erat aliquet ut.
                                    Duis dapibus convallis eros. Praesent mollis, nunc vitae molestie mattis, leo nisl
                                    sagittis tortor, sit amet tristique justo metus ac justo. Suspendisse potenti.
                                    Phasellus non lobortis felis. Nam sit amet dui magna. Etiam a sagittis turpis. Nulla
                                    vitae mattis massa. Donec pulvinar, ipsum eget luctus molestie, odio orci vehicula
                                    nibh, sed molestie mauris justo ut est. Nam gravida, turpis fringilla luctus tempor,
                                    neque velit volutpat nibh, nec volutpat est nibh sed augue. Mauris malesuada nibh
                                    est.
                                </section>

                                <section class="vl-section">
                                    <vl-title type="h2" id="hoofdstuk-3">Hoofdstuk 3</vl-title>Nam suscipit quam nec
                                    placerat efficitur. Morbi sed mollis justo, sed ultrices nibh. Morbi sagittis rutrum
                                    quam, quis suscipit lectus vestibulum eu. Cras vehicula placerat velit, eu tincidunt
                                    nunc dapibus sed. Morbi quis bibendum dolor, id bibendum risus. Nulla ultricies
                                    bibendum bibendum. Aliquam et iaculis lacus. Donec rutrum luctus lectus, at molestie
                                    dui suscipit eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed
                                    metus turpis, gravida et lobortis viverra, consequat id arcu. Phasellus aliquet
                                    mollis euismod. Morbi scelerisque, erat at fringilla accumsan, magna neque facilisis
                                    quam, ac aliquet tortor ipsum ut sem. Nunc diam tellus, suscipit sit amet egestas
                                    ut, auctor nec eros. Cras quis libero arcu. Maecenas sed ornare diam. Ut ac
                                    sollicitudin tortor. Integer ac sapien viverra sapien auctor aliquet dignissim et
                                    nibh. Curabitur mollis condimentum vehicula. Aenean eu egestas massa. Nam accumsan
                                    sapien lectus, id tincidunt tellus commodo at. Fusce rutrum imperdiet semper. Nam
                                    porttitor tincidunt est eget tristique. Curabitur tempus ex libero, a tristique leo
                                    sagittis non. Etiam id tincidunt dui. Aliquam erat volutpat. Vivamus placerat in
                                    diam eu consectetur. In hac habitasse platea dictumst. Aenean est urna, rhoncus vel
                                    feugiat vel, feugiat sed tellus. Maecenas gravida, justo suscipit consequat
                                    vulputate, nisl nunc blandit felis, non varius tortor ipsum et leo. Proin arcu
                                    tortor, euismod a venenatis sed, volutpat quis metus. Integer lacinia libero quis
                                    lorem fringilla vehicula. Sed augue urna, posuere quis est vel, convallis tristique
                                    neque. Morbi efficitur scelerisque eros nec vulputate. In hac habitasse platea
                                    dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dignissim
                                    magna. Integer ligula lacus, volutpat vitae arcu eu, laoreet euismod sapien. Donec
                                    viverra nunc non lectus hendrerit, eget faucibus dolor congue. Fusce at dolor dictum
                                    ligula efficitur varius vitae quis massa. Pellentesque porta et ligula at feugiat.
                                    Nulla sit amet erat fringilla, dapibus sapien quis, efficitur neque. Fusce vulputate
                                    eu felis ut rhoncus. Maecenas suscipit nunc ligula. Cras ullamcorper interdum risus,
                                    id tempus erat aliquet ut. Duis dapibus convallis eros. Praesent mollis, nunc vitae
                                    molestie mattis, leo nisl sagittis tortor, sit amet tristique justo metus ac justo.
                                </section>

                                <section class="vl-section">
                                    <vl-title type="h2" id="hoofdstuk-4">Hoofdstuk 4</vl-title>
                                    Suspendisse potenti. Phasellus non lobortis felis. Nam sit amet dui magna. Etiam a
                                    sagittis turpis. Nulla vitae mattis massa. Donec pulvinar, ipsum eget luctus
                                    molestie, odio orci vehicula nibh, sed molestie mauris justo ut est. Nam gravida,
                                    turpis fringilla luctus tempor, neque velit volutpat nibh, nec volutpat est nibh sed
                                    augue. Mauris malesuada nibh est. Nam suscipit quam nec placerat efficitur. Morbi
                                    sed mollis justo, sed ultrices nibh. Morbi sagittis rutrum quam, quis suscipit
                                    lectus vestibulum eu. Cras vehicula placerat velit, eu tincidunt nunc dapibus sed.
                                    Morbi quis bibendum dolor, id bibendum risus. Nulla ultricies bibendum bibendum.
                                    Aliquam et iaculis lacus. Donec rutrum luctus lectus, at molestie dui suscipit eu.
                                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed metus turpis,
                                    gravida et lobortis viverra, consequat id arcu. Phasellus aliquet mollis euismod.
                                    Morbi scelerisque, erat at fringilla accumsan, magna neque facilisis quam, ac
                                    aliquet tortor ipsum ut sem. Nunc diam tellus, suscipit sit amet egestas ut, auctor
                                    nec eros. Cras quis libero arcu. Maecenas sed ornare diam. Ut ac sollicitudin
                                    tortor. Integer ac sapien viverra sapien auctor aliquet dignissim et nibh. Curabitur
                                    mollis condimentum vehicula. Aenean eu egestas massa. Nam accumsan sapien lectus, id
                                    tincidunt tellus commodo at. Fusce rutrum imperdiet semper. Nam porttitor tincidunt
                                    est eget tristique. Curabitur tempus ex libero, a tristique leo sagittis non. Etiam
                                    id tincidunt dui. Aliquam erat volutpat. Vivamus placerat in diam eu consectetur. In
                                    hac habitasse platea dictumst. Aenean est urna, rhoncus vel feugiat vel, feugiat sed
                                    tellus. Maecenas gravida, justo suscipit consequat vulputate, nisl nunc blandit
                                    felis, non varius tortor ipsum et leo. Proin arcu tortor, euismod a venenatis sed,
                                    volutpat quis metus. Integer lacinia libero quis lorem fringilla vehicula. Sed augue
                                    urna, posuere quis est vel, convallis tristique neque. Morbi efficitur scelerisque
                                    eros nec vulputate. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Sed ac dignissim magna. Integer ligula lacus, volutpat
                                    vitae arcu eu, laoreet euismod sapien. Donec viverra nunc non lectus hendrerit, eget
                                    faucibus dolor congue. Fusce at dolor dictum ligula efficitur varius vitae quis
                                    massa. Pellentesque porta et ligula at feugiat. Nulla sit amet erat fringilla,
                                    dapibus sapien quis, efficitur neque. Fusce vulputate eu felis ut rhoncus. Maecenas
                                    suscipit nunc ligula. Cras ullamcorper interdum risus, id tempus erat aliquet ut.
                                    Duis dapibus convallis eros. Praesent mollis, nunc vitae molestie mattis, leo nisl
                                    sagittis tortor, sit amet tristique justo metus ac justo. Suspendisse potenti.
                                    Phasellus non lobortis felis. Nam sit amet dui magna. Etiam a sagittis turpis. Nulla
                                    vitae mattis massa. Donec pulvinar, ipsum eget luctus molestie, odio orci vehicula
                                    nibh, sed molestie mauris justo ut est. Nam gravida, turpis fringilla luctus tempor,
                                    neque velit volutpat nibh, nec volutpat est nibh sed augue. Mauris malesuada nibh
                                    est. Nam suscipit quam nec placerat efficitur. Morbi sed mollis justo, sed ultrices
                                    nibh. Morbi sagittis rutrum quam, quis suscipit lectus vestibulum eu. Cras vehicula
                                    placerat velit, eu tincidunt nunc dapibus sed. Morbi quis bibendum dolor, id
                                    bibendum risus. Nulla ultricies bibendum bibendum. Aliquam et iaculis lacus. Donec
                                    rutrum luctus lectus, at molestie dui suscipit eu. Interdum et malesuada fames ac
                                    ante ipsum primis in faucibus. Sed metus turpis, gravida et lobortis viverra,
                                    consequat id arcu. Phasellus aliquet mollis euismod. Morbi scelerisque, erat at
                                    fringilla accumsan, magna neque facilisis quam, ac aliquet tortor ipsum ut sem. Nunc
                                    diam tellus, suscipit sit amet egestas ut, auctor nec eros. Cras quis libero arcu.
                                    Maecenas sed ornare diam. Ut ac sollicitudin tortor. Integer ac sapien viverra
                                    sapien auctor aliquet dignissim et nibh. Curabitur mollis condimentum vehicula.
                                    Aenean eu egestas massa. Nam accumsan sapien lectus, id tincidunt tellus commodo at.
                                    Fusce rutrum imperdiet semper. Nam porttitor tincidunt est eget tristique. Curabitur
                                    tempus ex libero, a tristique leo sagittis non. Etiam id tincidunt dui. Aliquam erat
                                    volutpat. Vivamus placerat in diam eu consectetur. In hac habitasse platea dictumst.
                                    Aenean est urna, rhoncus vel feugiat vel, feugiat sed tellus. Maecenas gravida,
                                    justo suscipit consequat vulputate, nisl nunc blandit felis, non varius tortor ipsum
                                    et leo. Proin arcu tortor, euismod a venenatis sed, volutpat quis metus. Integer
                                    lacinia libero quis lorem fringilla vehicula. Sed augue urna, posuere quis est vel,
                                    convallis tristique neque. Morbi efficitur scelerisque eros nec vulputate. In hac
                                    habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed ac dignissim magna. Integer ligula lacus, volutpat vitae arcu eu, laoreet
                                    euismod sapien. Donec viverra nunc non lectus hendrerit, eget faucibus dolor congue.
                                    Fusce at dolor dictum ligula efficitur varius vitae quis massa. Pellentesque porta
                                    et ligula at feugiat. Nulla sit amet erat fringilla, dapibus sapien quis, efficitur
                                    neque. Fusce vulputate eu felis ut rhoncus. Maecenas suscipit nunc ligula. Cras
                                    ullamcorper interdum risus, id tempus erat aliquet ut. Duis dapibus convallis eros.
                                    Praesent mollis, nunc vitae molestie mattis, leo nisl sagittis tortor, sit amet
                                    tristique justo metus ac justo. Suspendisse potenti. Phasellus non lobortis felis.
                                    Nam sit amet dui magna. Etiam a sagittis turpis. Nulla vitae mattis massa.
                                </section>
                                <section class="vl-section">
                                    <vl-title type="h2" id="hoofdstuk-5">Hoofdstuk 5</vl-title>
                                    Donec pulvinar, ipsum eget luctus molestie, odio orci vehicula nibh, sed molestie
                                    mauris justo ut est. Nam gravida, turpis fringilla luctus tempor, neque velit
                                    volutpat nibh, nec volutpat est nibh sed augue. Mauris malesuada nibh est. Nam
                                    suscipit quam nec placerat efficitur. Morbi sed mollis justo, sed ultrices nibh.
                                    Morbi sagittis rutrum quam, quis suscipit lectus vestibulum eu. Cras vehicula
                                    placerat velit, eu tincidunt nunc dapibus sed. Morbi quis bibendum dolor, id
                                    bibendum risus. Nulla ultricies bibendum bibendum. Aliquam et iaculis lacus. Donec
                                    rutrum luctus lectus, at molestie dui suscipit eu. Interdum et malesuada fames ac
                                    ante ipsum primis in faucibus. Sed metus turpis, gravida et lobortis viverra,
                                    consequat id arcu. Phasellus aliquet mollis euismod. Morbi scelerisque, erat at
                                    fringilla accumsan, magna neque facilisis quam, ac aliquet tortor ipsum ut sem. Nunc
                                    diam tellus, suscipit sit amet egestas ut, auctor nec eros. Cras quis libero arcu.
                                    Maecenas sed ornare diam. Ut ac sollicitudin tortor. Integer ac sapien viverra
                                    sapien auctor aliquet dignissim et nibh. Curabitur mollis condimentum vehicula.
                                    Aenean eu egestas massa. Nam accumsan sapien lectus, id tincidunt tellus commodo at.
                                    Fusce rutrum imperdiet semper. Nam porttitor tincidunt est eget tristique. Curabitur
                                    tempus ex libero, a tristique leo sagittis non. Etiam id tincidunt dui. Aliquam erat
                                    volutpat. Vivamus placerat in diam eu consectetur. In hac habitasse platea dictumst.
                                    Aenean est urna, rhoncus vel feugiat vel, feugiat sed tellus. Maecenas gravida,
                                    justo suscipit consequat vulputate, nisl nunc blandit felis, non varius tortor ipsum
                                    et leo. Proin arcu tortor, euismod a venenatis sed, volutpat quis metus. Integer
                                    lacinia libero quis lorem fringilla vehicula. Sed augue urna, posuere quis est vel,
                                    convallis tristique neque. Morbi efficitur scelerisque eros nec vulputate. In hac
                                    habitasse platea dictumst.
                                </section>
                            </vl-side-navigation-reference>
                        </div>
                        <div
                            class="vl-column vl-column--3 vl-column--m-3 vl-column--s-12 vl-column--xs-12 vl-column--start-10 vl-column--s-start-1 vl-margin--medium"
                        >
                            <vl-side-navigation aria-label="inhoudsopgave">
                                <vl-side-navigation-h5>Op deze pagina</vl-side-navigation-h5>
                                <vl-side-navigation-content>
                                    <vl-side-navigation-group>
                                        <vl-side-navigation-item>
                                            <a href="#hoofdstuk-1"> Hoofdstuk 1 </a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#hoofdstuk-2"> Hoofdstuk 2 </a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#hoofdstuk-3"> Hoofdstuk 3 </a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#hoofdstuk-4"> Hoofdstuk 4 </a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#hoofdstuk-5"> Hoofdstuk 5 </a>
                                        </vl-side-navigation-item>
                                    </vl-side-navigation-group>
                                </vl-side-navigation-content>
                            </vl-side-navigation>
                        </div>
                    </div>
                </div>
            </main>
            <vl-modal closable id="taak-modal" position="right"> Taak modal (right) </vl-modal>
            <vl-modal closable id="aantekening-modal" size="full-screen"> Aantekening modal (full-screen)</vl-modal>
            <vl-modal closable id="edit-modal" position="left"> Edit modal (left)</vl-modal>
            <vl-modal closable id="delete-modal"> Delete modal</vl-modal>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }
}

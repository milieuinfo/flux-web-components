const createFunctionalHeaderHtmlWithExtraComponent = (component: string, sourceCode = false) => `
<vl-functional-header
    title="School- en studietoelagen"
    hide-back-link
    custom-css=".vl-functional-header__sub-actions, .vl-functional-header__sub__action { width: 100% } ::slotted(.vl-group) { width: 100% } ${
        sourceCode ? '' : ':host .vl-content-block { min-width: 900px}'
    }"
>
    <div class="vl-group vl-group--space-between" slot="sub-title">
        <vl-breadcrumb slot="sub-title">
            <vl-breadcrumb-item href="#1">Vlaanderen Intern</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#2">Regelgeving</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#3">Webuniversum</vl-breadcrumb-item>
            <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
        </vl-breadcrumb>
        ${component}
    </div>
</vl-functional-header>
`;

export const functionalHeaderWithButtonHtml = createFunctionalHeaderHtmlWithExtraComponent(
    '<vl-button>Actie knop</vl-button>'
);
export const functionalHeaderWithSearchHtml = createFunctionalHeaderHtmlWithExtraComponent(
    `<form role="search" aria-label="Zoeken op deze site">
        <div class="vl-group vl-group--input-group">
            <vl-input-field input-group block type="search" name="zoekterm" label="Zoekterm"></vl-input-field>
            <vl-button input-group icon="search" type="submit" label="Zoeken" tertiary></vl-button>
        </div>
    </form>`
);
export const functionalHeaderWithButtonHtmlSourceCode = createFunctionalHeaderHtmlWithExtraComponent(
    '<vl-button>Actie knop</vl-button>',
    true
);
export const functionalHeaderWithSearchHtmlSourceCode = createFunctionalHeaderHtmlWithExtraComponent(
    `<form role="search" aria-label="Zoeken op deze site">
        <div class="vl-group vl-group--input-group">
            <vl-input-field input-group block type="search" name="zoekterm" label="Zoekterm"></vl-input-field>
            <vl-button input-group icon="search" type="submit" label="Zoeken" tertiary></vl-button>
        </div>
    </form>`,
    true
);

const createFunctionalHeaderHtmlWithBackAndTabs = (sourceCode = false) => ` <vl-functional-header
        title="School- en studietoelagen"
        custom-css="${`
                :host .vl-functional-header__sub-row {
                    margin-bottom: 0;
                }
                :host .vl-functional-header__sub__action + .vl-functional-header__sub__action::before {
                    margin: 1rem;
                }
                ${sourceCode ? '' : ':host .vl-content-block { min-width: 900px}'}
            `}"
    >
        <vl-tabs-next
            slot="sub-title"
            label="Onderwerpen"
            horizontal-navigation
            no-border
        >
            <vl-tab-link-next id="tab1" href="#trein">Trein</vl-tab-link-next>
            <vl-tab-link-next id="tab2" href="#ov">Metro, tram en bus</vl-tab-link-next>
            <vl-tab-link-next id="tab3" href="#fiets">Fiets</vl-tab-link-next>
        </vl-tabs-next>
    </vl-functional-header>`;

export const functionalHeaderWithBackAndTabsHtml = createFunctionalHeaderHtmlWithBackAndTabs();
export const functionalHeaderWithBackAndTabsSourceCode = createFunctionalHeaderHtmlWithBackAndTabs(true);

export const functionalHeaderWithActionButtonsHTML = ` <vl-functional-header
        title="School- en studietoelagen"
    >
        <div class="vl-group vl-margin--small vl-margin--no-bottom" slot="top-right">
            <vl-button
                tertiary
                icon="add"
                label="Aanmaken"
                onclick="javascript:console.log('actie: Aanmaken')"
                >Aanmaken</vl-button
            >
            <vl-button
                tertiary
                icon="edit"
                label="edit"
                onclick="javascript:console.log('actie: edit')"
            ></vl-button>
            <vl-button
                tertiary
                error
                icon="bin"
                label="delete"
                onclick="javascript:console.log('actie: delete')"
            ></vl-button>
        </div>
    </vl-functional-header>`;

export const functionalHeaderStickyWithSideNavigationHTML = `
    <main>
        <vl-header development simple identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"></vl-header>
        <vl-functional-header sticky skip-to-content-id="#hoofdstuk-1">
            <div slot="title">Sticky functional header demo</div>
        </vl-functional-header>

        <vl-side-navigation-layout-next content-block class="vl-margin--large" custom-css=":host {--vl-side-navigation-top: 200px}">
            <div slot="content" id="sticky-demo-content">
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

`;

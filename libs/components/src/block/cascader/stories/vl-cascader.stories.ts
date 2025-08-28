import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { nothing } from 'lit';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-cascader.component';
import { VlIconComponent } from '../../../atom/icon';
import { VlLinkComponent } from '../../../atom/link';
import { CascaderArgs, cascaderArgs, cascaderArgTypes } from './vl-cascader.stories-arg';
import cascaderDoc from './vl-cascader.stories-doc.mdx';
import { nodeData } from './vl-cascader.stories-util.data';
import { getItemList } from './vl-cascader.stories-util.item-list-function';
import { cascaderItemTemplates } from './vl-cascader.stories-util.templates';

export default {
    id: 'components-block-cascader-cascader',
    title: 'Components - Block/cascader/cascader',
    tags: ['autodocs'],
    args: cascaderArgs,
    argTypes: cascaderArgTypes,
    parameters: {
        docs: {
            page: cascaderDoc,
        },
    },
} as Meta<CascaderArgs>;

registerWebComponents([VlIconComponent, VlLinkComponent]);

const mediumWidthDecorator = (story: () => unknown) => {
    return html` <div style="width: 600px;margin: auto auto;">${story()}</div>`;
};

export const CascaderDefault = story(
    cascaderArgs,
    ({ level, loadingMessage, loading, hideBreadcrumb, headerSlot, headerText, onVlClickBreadcrumb }) => {
        return html`
            <vl-cascader
                level="${level}"
                hide-breadcrumb="${hideBreadcrumb}"
                loading="${loading}"
                loading-message="${loadingMessage}"
                header-text="${headerText}"
                @vl-click-breadcrumb="${onVlClickBreadcrumb}"
            >
                ${headerSlot ? unsafeHTML(headerSlot) : nothing}
                <vl-cascader-item label="Provincie: West-Vlaanderen" annotation="Ondertitel West-Vlaanderen">
                    <vl-cascader-item label="Gemeente: Damme">
                        <vl-cascader-item label="Deelgemeente - Moerkerke">
                            <vl-cascader-item label="Dorp - Moerkerke"></vl-cascader-item>
                            <vl-cascader-item label="Dorp - Sint-Rita"></vl-cascader-item>
                        </vl-cascader-item>
                        <vl-cascader-item label="Deelgemeente - Sint-Kruis"></vl-cascader-item>
                    </vl-cascader-item>
                    <vl-cascader-item label="Gemeente: Brugge"></vl-cascader-item>
                </vl-cascader-item>
                <vl-cascader-item label="Provincie: Oost-Vlaanderen" annotation="Ondertitel Oost-Vlaanderen">
                    <vl-cascader-item label="Gemeente: Gent"></vl-cascader-item>
                    <vl-cascader-item label="Gemeente: Lokeren"></vl-cascader-item>
                </vl-cascader-item>
            </vl-cascader>
        `;
    }
);
CascaderDefault.storyName = 'vl-cascader - default';
CascaderDefault.decorators = [mediumWidthDecorator];
CascaderDefault.parameters = {
    controls: {
        exclude: ['content', 'label', 'labelSlot'],
    },
};

export const CascaderSideSheet = story(
    cascaderArgs,
    ({ breadcrumbPlaceholder, level, loadingMessage, loading, hideBreadcrumb, homeSlot, onVlClickBreadcrumb }) => {
        return html`
            <vl-side-sheet
                left
                custom-css=".vl-layout {padding:0} .vl-region{padding:0} .vl-region:first-child{padding:0} :host #vl-side-sheet {padding:0} :host {--vl-side-sheet-width: 600px;}"
                open
            >
                <vl-cascader
                    level="${level}"
                    hide-breadcrumb="${hideBreadcrumb}"
                    loading="${loading}"
                    loading-message="${loadingMessage}"
                    @vl-click-breadcrumb="${onVlClickBreadcrumb}"
                >
                    ${homeSlot ? unsafeHTML(homeSlot) : nothing}
                    ${breadcrumbPlaceholder ? unsafeHTML(breadcrumbPlaceholder) : nothing}
                    <vl-cascader-item label="Provincie: West-Vlaanderen">
                        <vl-cascader-item label="Gemeente: Damme">
                            <vl-cascader-item label="Deelgemeente - Moerkerke">
                                <vl-cascader-item label="Dorp - Moerkerke"></vl-cascader-item>
                                <vl-cascader-item label="Dorp - Sint-Rita"></vl-cascader-item>
                            </vl-cascader-item>
                            <vl-cascader-item label="Deelgemeente - Sint-Kruis"></vl-cascader-item>
                        </vl-cascader-item>
                        <vl-cascader-item label="Gemeente: Brugge"></vl-cascader-item>
                    </vl-cascader-item>
                    <vl-cascader-item label="Provincie: Oost-Vlaanderen">
                        <vl-cascader-item label="Gemeente - Gent"></vl-cascader-item>
                        <vl-cascader-item label="Gemeente - Lokeren"></vl-cascader-item>
                    </vl-cascader-item>
                </vl-cascader>
            </vl-side-sheet>
        `;
    }
);
CascaderSideSheet.storyName = 'vl-cascader - side-sheet';
CascaderSideSheet.args = {
    breadcrumbPlaceholder: '<vl-autocomplete placeholder="Zoek..." slot="breadcrumb-placeholder"></vl-autocomplete>',
};
CascaderSideSheet.parameters = {
    controls: {
        exclude: ['content', 'label', 'labelSlot'],
    },
};
export const CascaderDynamicTemplating = story(
    cascaderArgs,
    ({ level, loadingMessage, loading, hideBreadcrumb, templates, onVlClickBreadcrumb }) => {
        return html`
            <vl-cascader
                level="${level}"
                hide-breadcrumb="${hideBreadcrumb}"
                loading="${loading}"
                loading-message="${loadingMessage}"
                .templates=${templates}
                @vl-click-breadcrumb="${onVlClickBreadcrumb}"
            >
                <vl-cascader-item label="Provincie: West-Vlaanderen" template-type="provincie">
                    <vl-info-tile toggleable="" slot="content">
                        <span slot="title">Meer Info</span>
                        <span slot="subtitle">Provincie Beschrijving</span>
                        <div slot="content">
                            Het is de meest westelijk gelegen provincie van Vlaanderen en België en is de enige
                            Belgische provincie die aan de Noordzee ligt. De provincie heeft een oppervlakte van 3.197
                            km² en telt ruim 1,2 miljoen inwoners. De hoofdstad van West-Vlaanderen is Brugge.
                        </div>
                    </vl-info-tile>
                    <vl-cascader-item label="Gemeente: Damme">
                        <vl-cascader-item label="Deelgemeente - Moerkerke">
                            <vl-cascader-item label="Dorp - Moerkerke"></vl-cascader-item>
                            <vl-cascader-item label="Dorp - Sint-Rita"></vl-cascader-item>
                        </vl-cascader-item>
                    </vl-cascader-item>
                    <vl-cascader-item label="Gemeente: Brugge">
                        <vl-cascader-item label="Deelgemeente - Sint-Kruis"></vl-cascader-item>
                    </vl-cascader-item>
                    <vl-cascader-item label="Gemeente: Kortrijk">
                        <vl-cascader-item label="Dorp - Waereghem"></vl-cascader-item>
                    </vl-cascader-item>
                </vl-cascader-item>
                <vl-cascader-item label="Provincie: Oost-Vlaanderen" template-type="provincie">
                    <vl-title type="vl-h3" slot="label">Provincie: Oost-Vlaanderen</vl-title>
                    <vl-info-tile toggleable="" slot="content">
                        <span slot="title">Meer Info</span>
                        <span slot="subtitle">Provincie Beschrijving</span>
                        <div slot="content">
                            Zij grenst in het westen aan de provincie West-Vlaanderen, in het noorden aan de Nederlandse
                            provincie Zeeland met Zeeuws-Vlaanderen, in het oosten aan de provincies Antwerpen en
                            Vlaams-Brabant, en in het zuiden aan het Waalse Henegouwen. Zij ligt dus niet in het oosten
                            van de huidige Belgische deelstaat Vlaanderen die pas na 1830 ontstond.
                        </div>
                    </vl-info-tile>
                    <vl-cascader-item label="Gemeente: Gent"></vl-cascader-item>
                    <vl-cascader-item label="Gemeente: Lokeren"></vl-cascader-item>
                </vl-cascader-item>
            </vl-cascader>
        `;
    }
);
CascaderDynamicTemplating.storyName = 'vl-cascader - dynamic templating';
CascaderDynamicTemplating.decorators = [mediumWidthDecorator];
CascaderDynamicTemplating.argTypes = {
    templates: { table: { disable: false } },
};
CascaderDynamicTemplating.args = {
    templates: cascaderItemTemplates,
};
CascaderDynamicTemplating.parameters = {
    controls: {
        exclude: ['content', 'label', 'labelSlot'],
    },
};
export const CascaderPropertyBinding = story(cascaderArgs, ({ items }) => {
    return html`
        <vl-cascader .items=${items} .itemListFn=${getItemList} .templates=${cascaderItemTemplates}></vl-cascader>
    `;
});
CascaderPropertyBinding.storyName = 'vl-cascader - property binding';
CascaderPropertyBinding.decorators = [mediumWidthDecorator];
CascaderPropertyBinding.parameters = {
    controls: {
        include: ['itemListFn', 'items', 'templates'],
    },
};
CascaderPropertyBinding.argTypes = {
    itemListFn: { table: { disable: false } },
    items: { table: { disable: false } },
    templates: { table: { disable: false } },
};
CascaderPropertyBinding.args = {
    items: nodeData,
};
CascaderPropertyBinding.parameters = {
    controls: {
        exclude: ['content', 'label', 'labelSlot'],
    },
};

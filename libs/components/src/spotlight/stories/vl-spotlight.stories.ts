import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-spotlight.component';
import { SIZE } from '../vl-spotlight.model';
import { spotlightArgs, spotlightArgTypes } from './vl-spotlight.stories-arg';
import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { VlDocumentComponent } from '../../document/index';

registerWebComponents([VlDocumentComponent]);

export default {
    id: 'components-spotlight',
    title: 'components/spotlight',
    tags: ['autodocs'],
    args: spotlightArgs,
    argTypes: spotlightArgTypes,
} as Meta<typeof spotlightArgs>;

const spotlightTemplate = story(
    spotlightArgs,
    ({
        link,
        alt,
        size,
        imgSrc,
        imgAlt,
        title,
        subtitle,
        text,
        content,
        external,
        noBorder,
    }: typeof spotlightArgs) => html`
        <vl-spotlight
            data-vl-link=${link}
            ?data-vl-alt=${alt}
            ?data-vl-no-border=${noBorder}
            ?data-vl-external=${external}
            data-vl-size=${size}
            data-vl-img-src=${imgSrc}
            data-vl-img-alt=${imgAlt}
        >
            ${title ? html`<span slot="title"> ${title} </span>` : ``}
            ${subtitle ? html`<span slot="subtitle"> ${subtitle} </span>` : ``}
            ${text ? html`<span slot="text"> ${text} </span>` : ``}
            ${content ? html`<span slot="content"> ${content} </span>` : ``}
        </vl-spotlight>
    `
);
export const SpotLightDefault = spotlightTemplate.bind({});
SpotLightDefault.storyName = 'vl-spotlight - default';
SpotLightDefault.args = { title: 'Premies voor renovatie' };
export const SpotlightWithLink = story(
    spotlightArgs,
    ({ external }: typeof spotlightArgs) => html`
        <vl-spotlight data-vl-link="http://www.google.com" ?data-vl-external=${external}>
            <span slot="title">
                Premies voor renovatie
                <span class="vl-icon vl-icon--light vl-vi vl-vi-external"></span>
                <span class="vl-u-visually-hidden">Opent in nieuw venster</span>
            </span>
        </vl-spotlight>
    `
);
SpotlightWithLink.storyName = 'vl-spotlight - with link';
SpotlightWithLink.parameters = {
    controls: {
        include: ['data-vl-external'],
    },
};

export const spotlightNoLink = () => html`
    <vl-spotlight>
        <span slot="title"> Premies voor renovatie </span>
    </vl-spotlight>
`;
spotlightNoLink.storyName = 'vl-spotlight - no link';
spotlightNoLink.parameters = { controls: { disable: true } };

export const SpotlightWithContent = () => html`
    <vl-spotlight data-vl-link="https://google.be" data-vl-alt data-vl-size="${SIZE.S}">
        <span slot="title"> Verslag bestuursvergadering </span>
        <vl-document slot="content">
            <span slot="type">DOCX</span>
            <span slot="title">document</span>
            <span slot="metadata">DOCX-112kb</span>
        </vl-document>
    </vl-spotlight>
`;
SpotlightWithContent.storyName = 'vl-spotlight - with content';
SpotlightWithContent.parameters = { controls: { disable: true } };

export const SpotlightWithText = () => html`
    <vl-spotlight data-vl-link="https://google.be">
        <span slot="title">
            Premies voor renovatie
            <span class="vl-icon vl-icon--light vl-vi vl-vi-external"></span>
            <span class="vl-u-visually-hidden">Opent in nieuw venster</span>
        </span>
        <span slot="text"
            >Gaat u bouwen of verbouwen? Investeer in energiebesparende maatregelen en bespaar heel wat op uw
            energiefactuur.</span
        >
    </vl-spotlight>
`;
SpotlightWithText.storyName = 'vl-spotlight - with text';
SpotlightWithText.parameters = { controls: { disable: true } };

export const SpotlightWithImage = () => html`
    <vl-spotlight
        data-vl-img-src="//d201gzvprbtpxy.cloudfront.net/sites/default/files/styles/medium/public/images/vla_themateaser_350_dakisolatie.jpg?itok=cKDE21Pe"
        data-vl-img-alt="spotlight image"
    >
        <span slot="title"> Premies voor renovatie </span>
        <span slot="subtitle">Er zijn er verschillende...</span>
        <span slot="text"
            >Gaat u bouwen of verbouwen? Investeer in energiebesparende maatregelen en bespaar heel wat op uw
            energiefactuur.</span
        >
    </vl-spotlight>
`;
SpotlightWithImage.storyName = 'vl-spotlight - with image';
SpotlightWithImage.parameters = { controls: { disable: true } };
SpotlightWithImage.decorators = [(story: () => unknown) => html` <div style="width: 600px;">${story()}</div>`];

export const SpotlightWithSubtitle = () => html`
    <vl-spotlight data-vl-link="https://google.be">
        <span slot="title">Communicatiespecialist te Willebroek - contract 1 jaar</span>
        <span slot="subtitle">Niveau A (universitair diploma)</span>
        <span slot="text">
            <ul class="vl-icon-list">
                <li class="vl-icon-list__item">Waterwegen en Zeekanaal NV in Brussel</li>
                <li class="vl-icon-list__item">Natuur en bos</li>
                <li class="vl-icon-list__item"></li>
            </ul>
        </span>
    </vl-spotlight>
`;
SpotlightWithSubtitle.storyName = 'vl-spotlight - with subtitle';
SpotlightWithSubtitle.parameters = { controls: { disable: true } };

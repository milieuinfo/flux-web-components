import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-http-error-message.component';
import { httpErrorMessageArgs, httpErrorMessageArgTypes } from './vl-http-error-message.stories-arg';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import httpErrorMessageDoc from './vl-http-error-message.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '../../../atom/button';

registerWebComponents([VlButtonComponent]);

export default {
    id: 'components-block-http-error-message',
    title: 'Components - Block/http-error-message',
    tags: ['autodocs'],
    args: httpErrorMessageArgs,
    argTypes: httpErrorMessageArgTypes,
    parameters: {
        docs: {
            page: httpErrorMessageDoc,
        },
    },
} as Meta<typeof httpErrorMessageArgs>;

const httpErrorMessageTemplate = story(
    httpErrorMessageArgs,
    ({ title, image, alt, errorCode, textSlot, actionsSlot }: typeof httpErrorMessageArgs) => html`
        <vl-http-error-message title=${title} image=${image} image-alt=${alt} error-code=${errorCode}>
            ${unsafeHTML(textSlot)} ${unsafeHTML(actionsSlot)}
        </vl-http-error-message>
    `
);

export const httpErrorMessageDefault = httpErrorMessageTemplate.bind({});
httpErrorMessageDefault.storyName = 'vl-http-error-message - default';
httpErrorMessageDefault.args = {
    title: 'Niets gevonden hiervoor.',
    image: 'https://cdn.milieuinfo.be/http-error-message-assets/LATEST/img/unexpected-error.svg',
    alt: 'Niets gevonden',
    textSlot: `<p slot="text">Sorry, er liep iets onverwachts mis.</p>`,
    actionsSlot: `<div slot="actions">
                    <vl-button-next cta-link="#">Opnieuw opstarten</vl-button-next>
                  </div>`,
};

export const httpErrorMessage400 = httpErrorMessageTemplate.bind({});
httpErrorMessage400.storyName = 'vl-http-error-message - 400';
httpErrorMessage400.args = {
    errorCode: '400',
};

export const httpErrorMessage401 = httpErrorMessageTemplate.bind({});
httpErrorMessage401.storyName = 'vl-http-error-message - 401';
httpErrorMessage401.args = {
    errorCode: '401',
};

export const httpErrorMessage403 = httpErrorMessageTemplate.bind({});
httpErrorMessage403.storyName = 'vl-http-error-message - 403';
httpErrorMessage403.args = {
    errorCode: '403',
};

export const httpErrorMessage404 = httpErrorMessageTemplate.bind({});
httpErrorMessage404.storyName = 'vl-http-error-message - 404';
httpErrorMessage404.args = {
    errorCode: '404',
};

export const httpErrorMessage405 = httpErrorMessageTemplate.bind({});
httpErrorMessage405.storyName = 'vl-http-error-message - 405';
httpErrorMessage405.args = {
    errorCode: '405',
};

export const httpErrorMessage408 = httpErrorMessageTemplate.bind({});
httpErrorMessage408.storyName = 'vl-http-error-message - 408';
httpErrorMessage408.args = {
    errorCode: '408',
};

export const httpErrorMessage410 = httpErrorMessageTemplate.bind({});
httpErrorMessage410.storyName = 'vl-http-error-message - 410';
httpErrorMessage410.args = {
    errorCode: '410',
};

export const httpErrorMessage411 = httpErrorMessageTemplate.bind({});
httpErrorMessage411.storyName = 'vl-http-error-message - 411';
httpErrorMessage411.args = {
    errorCode: '411',
};

export const httpErrorMessage412 = httpErrorMessageTemplate.bind({});
httpErrorMessage412.storyName = 'vl-http-error-message - 412';
httpErrorMessage412.args = {
    errorCode: '412',
};

export const httpErrorMessage413 = httpErrorMessageTemplate.bind({});
httpErrorMessage413.storyName = 'vl-http-error-message - 413';
httpErrorMessage413.args = {
    errorCode: '413',
};

export const httpErrorMessage414 = httpErrorMessageTemplate.bind({});
httpErrorMessage414.storyName = 'vl-http-error-message - 414';
httpErrorMessage414.args = {
    errorCode: '414',
};

export const httpErrorMessage415 = httpErrorMessageTemplate.bind({});
httpErrorMessage415.storyName = 'vl-http-error-message - 415';
httpErrorMessage415.args = {
    errorCode: '415',
};

export const httpErrorMessage500 = httpErrorMessageTemplate.bind({});
httpErrorMessage500.storyName = 'vl-http-error-message - 500';
httpErrorMessage500.args = {
    errorCode: '500',
};

export const httpErrorMessage501 = httpErrorMessageTemplate.bind({});
httpErrorMessage501.storyName = 'vl-http-error-message - 501';
httpErrorMessage501.args = {
    errorCode: '501',
};

export const httpErrorMessage502 = httpErrorMessageTemplate.bind({});
httpErrorMessage502.storyName = 'vl-http-error-message - 502';
httpErrorMessage502.args = {
    errorCode: '502',
};

export const httpErrorMessage503 = httpErrorMessageTemplate.bind({});
httpErrorMessage503.storyName = 'vl-http-error-message - 503';
httpErrorMessage503.args = {
    errorCode: '503',
};

export const httpErrorMessage504 = httpErrorMessageTemplate.bind({});
httpErrorMessage504.storyName = 'vl-http-error-message - 504';
httpErrorMessage504.args = {
    errorCode: '504',
};

export const httpErrorMessage505 = httpErrorMessageTemplate.bind({});
httpErrorMessage505.storyName = 'vl-http-error-message - 505';
httpErrorMessage505.args = {
    errorCode: '505',
};

export const httpErrorMessage506 = httpErrorMessageTemplate.bind({});
httpErrorMessage506.storyName = 'vl-http-error-message - 506';
httpErrorMessage506.args = {
    errorCode: '506',
};

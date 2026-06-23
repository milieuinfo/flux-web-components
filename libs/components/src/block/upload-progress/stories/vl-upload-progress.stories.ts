import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { VlUploadProgressComponent } from '../vl-upload-progress.component';
import { uploadProgressArgs, uploadProgressArgTypes } from './vl-upload-progress.stories-arg';
import uploadProgressDoc from './vl-upload-progress.stories-doc.mdx';

registerWebComponents([VlUploadProgressComponent]);

export default {
    id: 'components-block-upload-progress',
    title: 'Components - Block/upload-progress',
    tags: ['autodocs'],
    args: uploadProgressArgs,
    argTypes: uploadProgressArgTypes,
    parameters: {
        docs: {
            page: uploadProgressDoc,
        },
    },
} as Meta<typeof uploadProgressArgs>;

const Template = story(
    uploadProgressArgs,
    ({
        filename,
        filesize,
        progress,
        indeterminate,
        label,
        cancellable,
        retryable,
        error,
        success,
        message,
        hideProgress,
        onVlUploadProgressRetry,
        onVlUploadProgressCancel,
    }) => html`
        <vl-upload-progress
            filename=${ifDefined(filename)}
            filesize=${ifDefined(filesize)}
            progress=${ifDefined(progress)}
            label=${ifDefined(label)}
            ?indeterminate=${indeterminate}
            ?cancellable=${cancellable}
            ?retryable=${retryable}
            ?error=${error}
            ?success=${success}
            ?hide-progress=${hideProgress}
            message=${ifDefined(message)}
            @vl-upload-progress-retry=${onVlUploadProgressRetry}
            @vl-upload-progress-cancel=${onVlUploadProgressCancel}
        ></vl-upload-progress>
    `
);

export const UploadProgressDefault = Template.bind({});
UploadProgressDefault.storyName = 'vl-upload-progress - default';
UploadProgressDefault.args = {
    filename: 'Document.pdf',
    filesize: '123 MB',
    progress: 50,
    retryable: false,
};

export const UploadProgressIndeterminate = Template.bind({});
UploadProgressIndeterminate.storyName = 'vl-upload-progress - indeterminate';
UploadProgressIndeterminate.args = {
    filename: 'Document.pdf',
    filesize: '123 MB',
    indeterminate: true,
    retryable: false,
};

export const UploadProgressError = Template.bind({});
UploadProgressError.storyName = 'vl-upload-progress - error';
UploadProgressError.args = {
    filename: 'Document.pdf',
    filesize: '123 MB',
    progress: 23,
    error: true,
    message: 'Er liep iets fout bij het uploaden, gelieve opnieuw te proberen of de upload te annuleren.',
    retryable: true,
    cancellable: true,
};

export const UploadProgressSuccess = Template.bind({});
UploadProgressSuccess.storyName = 'vl-upload-progress - success';
UploadProgressSuccess.args = {
    filename: 'Document.pdf',
    filesize: '123 MB',
    progress: 100,
    success: true,
    message: 'Upload voltooid',
};

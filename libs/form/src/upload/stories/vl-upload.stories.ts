import { story } from '@domg-wc/common-storybook';
import { uploadArgTypes, uploadArgs } from './vl-upload.stories-arg';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import uploadDocs from './vl-upload.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlUploadComponent } from '../vl-upload.component';
import { uploadDefaults } from '../vl-upload.defaults';

registerWebComponents([VlUploadComponent]);

export default {
    id: 'form-upload',
    title: 'Form/upload',
    tags: ['autodocs'],
    args: uploadArgs,
    argTypes: uploadArgTypes,
    parameters: {
        docs: {
            page: uploadDocs,
        },
    },
} as Meta<typeof uploadArgs>;

export const UploadDefault = story(
    uploadArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        readonly,
        error,
        success,
        url,
        disallowDuplicates,
        maxSize,
        maxFiles,
        parallelUploads,
        autoProcess,
        acceptedFiles,
        subTitle,
        mainTitle,
        errorMessageMaxFiles,
        errorMessageFilesize,
        errorMessageAcceptedFiles,
        onVlChange,
        onVlInput,
        onVlValid,
        onVlError,
        onVlSuccess,
        onVlComplete,
        onVlQueueComplete,
        onVlInitialised,
        onVlRemovedFile,
        onVlAddedFile,
        onVlUploadProgress,
    }) => {
        let subtitleComposed;
        if (subTitle.toString() === 'Symbol(lit-nothing)') {
            const { maxFiles, subTitle: subtitleDefault, maxSize } = uploadDefaults;
            const acceptedFilesMessage = !(acceptedFiles.toString() === 'Symbol(lit-nothing)')
                ? `\n De toegestane bestandstypes zijn: ${acceptedFiles}\n`
                : '';
            subtitleComposed = `${subtitleDefault} \nUpload ${maxFiles} bestand(en) van maximaal ${maxSize} MB${acceptedFilesMessage}`;
        } else {
            subtitleComposed = subTitle;
        }
        return html`
            <vl-upload
                id=${id}
                name=${name}
                label=${label}
                ?required=${required}
                ?disabled=${disabled}
                ?readonly=${readonly}
                ?error=${error}
                ?success=${success}
                ?disallow-duplicates=${disallowDuplicates}
                ?auto-process=${autoProcess}
                accepted-files=${acceptedFiles}
                max-size=${maxSize}
                max-files=${maxFiles}
                parallel-uploads=${parallelUploads}
                url=${url}
                sub-title=${subtitleComposed}
                main-title=${mainTitle}
                error-message-max-files=${errorMessageMaxFiles}
                error-message-filesize=${errorMessageFilesize}
                error-message-accepted-files=${errorMessageAcceptedFiles}
                @vl-upload-progress=${onVlUploadProgress}
                @vl-change=${onVlChange}
                @vl-input=${onVlInput}
                @vl-valid=${onVlValid}
                @vl-error=${onVlError}
                @vl-success=${onVlSuccess}
                @vl-complete=${onVlComplete}
                @vl-queuecomplete=${onVlQueueComplete}
                @vl-initialised=${onVlInitialised}
                @vl-addedfile=${onVlAddedFile}
                @vl-removedfile=${onVlRemovedFile}
            >
            </vl-upload>
        `;
    }
);
UploadDefault.storyName = 'vl-upload - default';
UploadDefault.args = {
    label: 'bestand uploaden',
    url: 'http://httpbin.org/post',
};

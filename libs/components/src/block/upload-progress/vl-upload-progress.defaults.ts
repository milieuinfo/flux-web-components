
export type UploadProgressDefaults = {
    label: string;
    filename: string;
    filesize: string;
    progress: number;
    indeterminate: boolean;
    cancellable: boolean;
    retryable: boolean;
    error: boolean;
    message: string;
    hideProgress?: boolean;
};

export const uploadProgressDefaults: UploadProgressDefaults = {
    label: '',
    filename: 'Document.pdf',
    filesize: '123 MB',
    progress: 0,
    indeterminate: false,
    cancellable: false,
    retryable: false,
    error: false,
    message: '',
    hideProgress: false,
};

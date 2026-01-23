
export type ProgressBarDefaults = {
    value: number;
    label: string;
    labelledby: string;
    indeterminate: boolean;
    error: boolean;
    success: boolean;
};

export const progressBarDefaults: ProgressBarDefaults = {
    value: 0,
    label: '',
    labelledby: '',
    indeterminate: false,
    error: false,
    success: false,
};
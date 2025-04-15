import { TemplateResult } from 'lit';
import { VlCascaderItemComponent } from './vl-cascader-item.component';

export interface CascaderItem<
    D = {
        [key: string]: string | unknown;
    }
> {
    label: string;
    templateType?: string;
    children?: CascaderItem[];
    component?: VlCascaderItemComponent;
    narrowDown?: boolean;
    annotation?: string;
    data?: D;
}

export interface NarrowDownFn {
    (item: CascaderItem): void;
}

export interface TemplateFn {
    (item: CascaderItem, narrowDownFn: NarrowDownFn): TemplateResult;
}

export interface ItemListFn {
    (item: CascaderItem): CascaderItem[] | Promise<CascaderItem[]>;
}

export const CASCADER_MESSAGES = {
    LOADING: 'Aan het laden',
    LABEL_MISSING: 'geen label',
} as const;

export type CASCADER_MESSAGES = (typeof CASCADER_MESSAGES)[keyof typeof CASCADER_MESSAGES];

export const CASCADER_SLOTS = {
    HEADER: 'header',
    BREADCRUMB_PLACEHOLDER: 'breadcrumb-placeholder',
    CONTENT: 'content',
    HOME: 'home',
    LABEL: 'label',
} as const;

export type CASCADER_SLOTS = (typeof CASCADER_SLOTS)[keyof typeof CASCADER_SLOTS];

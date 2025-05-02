import { CASCADER_MESSAGES, CascaderItem, ItemListFn, TemplateFn } from './vl-cascader.model';

export const cascaderDefaults = {
    breadcrumbPlaceholder: '' as string,
    level: 0 as number,
    hideBreadcrumb: false as boolean,
    loading: false as boolean,
    itemListFn: null as unknown as ItemListFn,
    items: [] as CascaderItem[],
    loadingMessage: CASCADER_MESSAGES.LOADING as string,
    templates: null as unknown as Map<string, TemplateFn>,
    headerText: '' as string,
};

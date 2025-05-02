import { ItemListFn, CascaderItem } from '../vl-cascader.model';

export const getItemList: ItemListFn = async (item: CascaderItem): Promise<CascaderItem[]> => {
    const { data } = item;
    const requestParams = data?.requestParams;
    // hier kan een API request gedefinieerd worden
    await new Promise((res) => setTimeout(res, 3000));
    return [
        {
            label: requestParams + ' ' + new Date().getHours(),
            children: [
                {
                    label: requestParams + ' ' + new Date().getMinutes(),
                    children: [
                        {
                            label: requestParams + ' ' + new Date().getMilliseconds(),
                            narrowDown: true,
                            data: {
                                requestParams: 'Niveau-deeper',
                            },
                        },
                        {
                            label: '[- ' + requestParams + ' -]',
                            templateType: 'provincie',
                        },
                    ],
                },
                {
                    label: requestParams + ' ' + new Date().getMinutes(),
                },
            ],
        },
        {
            label: requestParams + ' ' + new Date().getMinutes(),
            children: [
                {
                    label: requestParams + ' ' + new Date().getMilliseconds(),
                    narrowDown: true,
                    data: {
                        requestParams: 'Niveau-deeper',
                    },
                },
                {
                    label: '[- ' + requestParams + ' -]',
                    templateType: 'provincie',
                },
            ],
        },
        {
            label: requestParams + ' ' + new Date().getMinutes(),
        },
    ];
};

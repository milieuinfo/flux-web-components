import { CascaderItem } from '../vl-cascader.model';

export const nodeData: CascaderItem[] = [
    {
        label: 'Vlaanderen',
        children: [
            {
                label: 'Antwerpen',
                templateType: 'provincie',
                children: [
                    {
                        label: 'Niveau 2 - A',
                        children: [
                            {
                                label: 'Niveau 3 - A',
                                children: [
                                    {
                                        label: 'Niveau 4 - A',
                                    },
                                    {
                                        label: 'Niveau 4 - B',
                                    },
                                ],
                            },
                            {
                                label: 'Niveau 3 - B',
                            },
                        ],
                    },
                    {
                        label: 'Niveau 2 - B',
                    },
                    {
                        label: 'Berchem',
                    },
                ],
            },
            {
                label: 'Brussel',
                templateType: 'provincie',
                narrowDown: true,
                data: {
                    requestParams: 'Niveau-id',
                },
            },
            {
                label: 'Limburg',
                templateType: 'provincie',
                children: [
                    {
                        label: 'Hasselt',
                    },
                    {
                        label: 'Zonhoven',
                    },
                    {
                        label: 'Lummen',
                    },
                    {
                        label: 'Halen',
                    },
                    {
                        label: 'Tongeren',
                    },
                ],
            },
            {
                label: 'Vlaams-Brabant',
                templateType: 'provincie',
                narrowDown: true,
                data: {
                    requestParams: 'Niveau-id',
                },
            },
        ],
    },
    {
        label: 'Wallonië',
    },
];

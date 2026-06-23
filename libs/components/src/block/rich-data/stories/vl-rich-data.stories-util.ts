import { Pagination } from '../../pager';
import { RichData, VlRichData } from '../vl-rich-data.component';
import { richDataMockData } from './vl-rich-data.stories-mock';
import { debounce } from '@domg-wc/common';

export const richDataPaginationImplementation = () => {
    customElements.whenDefined('vl-rich-data').then(() => {
        const richDataComponent = document.querySelector('#rich-data') as VlRichData | null;
        const content = richDataComponent?.querySelector('[slot="content"]');
        const sorter = richDataComponent?.querySelector('[slot="sorter"]');
        const pager = richDataComponent?.querySelector('vl-pager');

        const data = richDataMockData;

        let newData: unknown[] | undefined = undefined;

        const setContentData = (data: any[] | undefined, from: number, to: number) => {
            newData = data;
            if(content) {
                content.innerHTML = ``;
            }
            data?.slice(from, to).forEach((project) => {
                const now = new Date().toLocaleString();
                const manager = project.manager;
                const medewerker = project.medewerkers[0];
                const html = `
                        <vl-search-result-title>
                            <a href="#">${project.name}</a>
                        </vl-search-result-title>
                        <vl-search-result-text>
                            <time>Gestart op ${now}</time>
                        </vl-search-result-text>
                        <vl-search-result-properties>
                            <vl-property>ID</vl-property>
                            <vl-property-data>${project.id}</vl-property-data>
                            <vl-property>Naam manager</vl-property>
                            <vl-property-data>${manager.lastName}</vl-property-data>
                            <vl-property>Eerste medewerker</vl-property>
                            <vl-property-data>${medewerker.lastName}</vl-property-data>
                            <vl-property>
                                <span>Project o.l.v. <strong>manager</strong></span>
                            </vl-property>
                            <vl-property-data>
                                <span>${project.name} o.l.v. <strong>${manager.firstName} ${manager.lastName}</strong></span>
                            </vl-property-data>
                        </vl-search-result-properties>
                  `;
                if(content) {
                    content.insertAdjacentHTML('beforeend', `<vl-search-result>${html}</vl-search-result>`);
                }
            });
        };

        const filter = (data: any[], pathToKey: any, value: string) => {
            if (value === '') {
                return data;
            }
            return data.filter((element) => {
                const valueByPath = findValueByPath(element, pathToKey);
                return valueByPath.includes(value);
            });
        };

        const findValueByPath = (element: any, pathToKey: string) => {
            const keys = pathToKey.split('.');

            let current = element;
            for (let i = 0; i < keys.length; i++) {
                if (current[keys[i]] !== undefined) {
                    current = current[keys[i]];
                } else {
                    return undefined;
                }
            }
            return current.toString();
        };

        const debouncedOnChange = debounce(([event]) => {
            let newData = data.data;
            let totalItems = data.data.length;
            let filterEntries = undefined;

            const customEvent = event as CustomEvent;
            if (customEvent.detail.formData) {
                filterEntries = [];
                for (const entry of customEvent.detail.formData.entries()) {
                    newData = filter(newData, entry[0], entry[1]);
                    totalItems = newData.length;
                    filterEntries.push({
                        name: entry[0],
                        value: entry[1],
                    });
                }
            }
            const pagination: Pagination = customEvent.detail.paging;
            if (pagination) {
                const from = (pagination.currentPage - 1) * 10;
                setContentData(newData, from, from + 10);
            }
            if (richDataComponent) {
                richDataComponent.data = <RichData>{
                    paging: <Pagination>{
                        currentPage: customEvent.detail.paging.currentPage,
                        totalItems: totalItems,
                    },
                    filter: filterEntries,
                };
            }
        }, 500);

        richDataComponent?.addEventListener('change', debouncedOnChange);

        sorter?.addEventListener('vl-change', (event: Event) => {
            const data = newData;
            event.stopPropagation();
            if (!data) return;
            data.sort((firstElement, secondElement) => {
                const keys = (event.target as HTMLSelectElement)?.value?.split('.');

                if (!keys) {
                    return 0;
                }

                const getValue = (element: unknown) =>
                    keys.reduce((value: any, key) => value[key], element)?.toString() || '';

                const firstValue = getValue(firstElement);
                const secondValue = getValue(secondElement);

                return firstValue.localeCompare(secondValue);
            });
            if (richDataComponent) {
                richDataComponent.data = <RichData>{
                    paging: <Pagination>{
                        currentPage: 1,
                        totalItems: data.length,
                    },
                };
            }
            setContentData(data, 0, 10);
        });

        if (richDataComponent) {
            richDataComponent.data = <any>{
                paging: <Pagination>{
                    currentPage: 1,
                    totalItems: 25,
                },
            };
        }

        const itemsPerPage = Number(pager?.getAttribute('items-per-page') ?? 10);
        setContentData(data.data, 0, itemsPerPage);
    });
};

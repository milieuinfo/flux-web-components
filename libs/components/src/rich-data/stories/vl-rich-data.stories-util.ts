import { Pagination } from '../../pager';
import { RichData, VlRichData } from '../vl-rich-data.component';
import { richDataMockData } from './vl-rich-data.stories-mock';

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
            content.innerHTML = ``;
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
                            <label>ID</label>
                            <data>${project.id}</data>
                            <label>Naam manager</label>
                            <data>${manager.lastName}</data>
                            <label>Eerste medewerker</label>
                            <data>${medewerker.lastName}</data>
                            <label>
                                <span>Project o.l.v. <strong>manager</strong></span>
                            </label>
                            <data>
                                <span>${project.name} o.l.v. <strong>${manager.firstName} ${manager.lastName}</strong></span>
                            </data>
                        </vl-search-result-properties>
                  `;
                content.insertAdjacentHTML('beforeend', `<vl-search-result>${html}</vl-search-result>`);
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

        richDataComponent?.addEventListener('change', (event: CustomEvent) => {
            let newData = data.data;
            let totalItems = data.data.length;

            let filterEntries = undefined;
            if (event.detail.formData) {
                filterEntries = [];
                for (const entry of event.detail.formData.entries()) {
                    newData = filter(newData, entry[0], entry[1]);
                    totalItems = newData.length;
                    filterEntries.push({
                        name: entry[0],
                        value: entry[1],
                    });
                }
            }
            const pagination: Pagination = event.detail.paging;
            if (pagination) {
                const from = (pagination.currentPage - 1) * 10;
                setContentData(newData, from, from + 10);
            }
            if (richDataComponent) {
                richDataComponent.data = <RichData>{
                    paging: <Pagination>{
                        currentPage: event.detail.paging.currentPage,
                        totalItems: totalItems,
                    },
                    filter: filterEntries,
                };
            }
        });

        sorter?.addEventListener('vl-change', (event: CustomEvent) => {
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

        setContentData(data.data, 0, pager.getAttribute('items-per-page'));
    });
};

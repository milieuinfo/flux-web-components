import { Item, Props } from './vl-properties.model';

const cloneElements = (elements: Element[]): Node[] => elements.map((element) => element.cloneNode(true));

const buildItems = (elements: Element[]): Item[] => {
    const items: Item[] = [];
    let labels: any[] = [],
        data: any[] = [];

    elements.forEach((element: Element) => {
        switch (element.localName) {
            case 'label':
                // een nieuw item begint als er gestart wordt met een nieuw label (in dat geval is er al data)
                if (labels.length && data.length) {
                    items.push({ labels, data });
                    labels = [];
                    data = [];
                }
                labels.push(element.children.length > 0 ? cloneElements([...element.children]) : element.innerHTML);
                break;
            case 'data':
                data.push(element.children.length > 0 ? cloneElements([...element.children]) : element.innerHTML);
                break;
        }
    });
    // de items uitbreiden met het laatste item
    if (labels.length) items.push({ labels, data });

    return items;
};

export const buildProperties = (elements: Element[] | null): Props => {
    if (elements == null || elements.length == 0) {
        console.warn('vl-properties - geen props opgegeven');
        return [];
    }
    if (elements[0]?.localName === 'div') {
        // er is een 'column' gedefinieerd: verwerk ze
        return elements.map((element: Element) => ({
            class: element.className,
            items: buildItems([...element.children]),
        }));
    } else {
        // er is geen 'column' aanwezig, enkel labels en data
        return [{ items: buildItems(elements) }];
    }
};

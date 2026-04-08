import { Item, Props } from './vl-properties.model';

const moveChildNodes = (childNodes: ChildNode[], clone: boolean): Node[] =>
    clone ? childNodes.map((node) => node.cloneNode(true)) : childNodes;

const buildItems = (elements: Element[], clone: boolean): Item[] => {
    const items: Item[] = [];
    let labels: any[] = [],
        data: any[] = [];

    elements.forEach((element: Element) => {
        switch (element.localName) {
            case 'label':
            case 'vl-property':
                // een nieuw item begint als er gestart wordt met een nieuw label (in dat geval is er al data)
                if (labels.length && data.length) {
                    items.push({ labels, data });
                    labels = [];
                    data = [];
                }
                labels.push(
                    element.children.length > 0 ? moveChildNodes([...element.childNodes], clone) : element.innerHTML,
                );
                break;
            case 'data':
            case 'vl-property-data':
                data.push(
                    element.children.length > 0 ? moveChildNodes([...element.childNodes], clone) : element.innerHTML,
                );
                break;
        }
    });
    // de items uitbreiden met het laatste item
    if (labels.length) items.push({ labels, data });

    return items;
};

export const buildProperties = (elements: Element[] | null, clone: boolean): Props => {
    if (elements == null || elements.length == 0) {
        return [];
    }
    if (elements[0]?.localName === 'div') {
        // er is een 'column' gedefinieerd: verwerk ze
        return elements.map((element: Element) => ({
            class: element.className,
            items: buildItems([...element.children], clone),
        }));
    } else {
        // er is geen 'column' aanwezig, enkel labels en data
        return [{ items: buildItems(elements, clone) }];
    }
};

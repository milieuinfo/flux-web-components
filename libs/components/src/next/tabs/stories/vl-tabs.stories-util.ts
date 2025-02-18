let index = 0;

export const addPane = () => {
    const div = document.createElement('div');
    div.innerHTML =
        '<vl-tabs-pane-next id="fiets-' +
        index +
        '" title="Fiets ' +
        index +
        '">TEST ' +
        index +
        '</vl-tabs-pane-next>';

    if (div.firstElementChild) {
        document.querySelector('vl-tabs-next#tabs')?.appendChild(div.firstElementChild);
        index++;
    }
};

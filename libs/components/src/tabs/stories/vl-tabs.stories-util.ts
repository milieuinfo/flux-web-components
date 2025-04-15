let index = 0;

export const addPane = () => {
    const div = document.createElement('div');
    div.innerHTML =
        '<vl-tabs-pane id="fiets-' + index + '" title="Fiets ' + index + '">TEST ' + index + '</vl-tabs-pane>';

    if (div.firstElementChild) {
        document.querySelector('vl-tabs#tabs')?.appendChild(div.firstElementChild);
        index++;
    }
};

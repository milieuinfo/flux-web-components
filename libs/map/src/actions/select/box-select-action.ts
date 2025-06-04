import { VlSelectAction } from './select-action';
import DragBox from 'ol/interaction/DragBox';

export class VlBoxSelectAction extends VlSelectAction {
    readonly dragBoxInteraction: DragBox;

    constructor(layer, onSelect, options) {
        super(
            layer,
            (feature) => {
                if (feature) {
                    onSelect([feature]);
                }
            },
            options
        );

        this.dragBoxInteraction = new DragBox();
        this.addInteraction(this.dragBoxInteraction);

        this.dragBoxInteraction.on('boxdrag', () => {
            const boxExtent = this.dragBoxInteraction.getGeometry().getExtent();
            this.hoverInteraction.getFeatures().clear();
            layer.getSource().forEachFeatureIntersectingExtent(boxExtent, (feature) => {
                if (this.filter(feature, layer)) {
                    this.hoverInteraction.getFeatures().push(feature);
                }
            });
        });

        this.dragBoxInteraction.on('boxend', () => {
            if (this.hoverInteraction.getFeatures().getLength() > 0) {
                onSelect(this.hoverInteraction.getFeatures().getArray().slice(0)); // copy of the current array to prevent issues in IE
            }
        });
    }
}

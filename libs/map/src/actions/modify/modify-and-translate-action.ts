import { Translate } from 'ol/interaction';
import { VlModifyAction } from './modify-action';

export class VlModifyAndTranslateAction extends VlModifyAction {
    translateInteraction: Translate;

    constructor(layer, onModify, options?) {
        super(layer, onModify, options);

        this.translateInteraction = new Translate({
            features: this.selectInteraction.getFeatures(),
        });

        this.addInteraction(this.translateInteraction);

        this.translateInteraction.on('translateend', (event) => {
            event.features.forEach((feature) => {
                onModify(feature, (feature) => {
                    feature.getGeometry().setCoordinates(feature.get('entity').geometry.coordinates);
                });
                this.selectInteraction.getFeatures().clear();
            });
        });
    }
}

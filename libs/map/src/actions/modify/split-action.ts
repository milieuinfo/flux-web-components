import Feature from 'ol/Feature';
import * as jsts from 'jsts/dist/jsts.min';
import { Polygonizer } from 'jsts/org/locationtech/jts/operation/polygonize';
import { Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon } from 'ol/geom';
import { VlSelectAction } from '../select/select-action';
import { VlBaseMapAction } from '../mapaction';
import { VlDrawAction } from '../draw/draw-action';

export class VlSplitAction extends VlBaseMapAction {
    private selectAction: any;
    private drawAction: any;
    override map: any;

    constructor(layer, onSplit, options) {
        const reader = new jsts.io.OL3Parser();
        reader.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
        const interactions = [];

        const selectAction = new VlSelectAction(
            layer,
            (feature) => {
                if (feature) {
                    this.selectAction.deactivate();
                    this.drawAction.activate();
                }
            },
            options
        );

        const drawAction = new VlDrawAction(
            layer,
            'LineString',
            (drawnFeature) => {
                const { selectedFeature } = this.selectAction;
                const selectedGeometry = reader.read(selectedFeature.getGeometry().getPolygons()[0]);
                const drawnGeometry = reader.read(drawnFeature.getGeometry());
                const union = selectedGeometry.getExteriorRing().union(drawnGeometry);
                const polygonizer = new Polygonizer();
                polygonizer.add(union);
                const result = [];
                const polygons = polygonizer.getPolygons();
                for (let i = polygons.iterator(); i.hasNext(); ) {
                    const multiPolygon = new MultiPolygon([]);
                    multiPolygon.appendPolygon(reader.write(i.next()));
                    result.push(
                        new Feature({
                            geometry: multiPolygon,
                        })
                    );
                }

                if (onSplit) {
                    onSplit(selectedFeature, result);
                }

                this.selectAction.clearFeatures();

                setTimeout(() => {
                    this.drawAction.deactivate();
                    this.selectAction.activate();
                });
            },
            options
        );

        super(interactions);

        this.interactions = interactions;
        this.selectAction = selectAction;
        this.drawAction = drawAction;
    }

    activate() {
        this.map.addAction(this.selectAction);
        this.map.addAction(this.drawAction);
        this.selectAction.activate();
    }

    deactivate() {
        this.selectAction.deactivate();
        this.drawAction.deactivate();
    }
}

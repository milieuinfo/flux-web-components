import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import VectorSource from 'ol/source/Vector';
import OlGML2 from 'ol/format/GML2';
import fetchMock from 'fetch-mock';
import MultiPolygon from 'ol/geom/MultiPolygon';
import MultiLineString from 'ol/geom/MultiLineString';
import { JSDOM } from 'jsdom';
import { VlCompositeVectorSource } from './composite-vector-source';
import 'node-fetch';

describe('jest - map - composite-vector-source', () => {
    // node heeft geen fetch dus die polyfillen we
    // if (!globalThis.fetch) {
    //   globalThis.fetch = fetch;
    // }
    // node heeft geen DOMParser dus die polyfillen we
    // voor het kunnen parsen van de GML antwoorden
    global.DOMParser = new JSDOM().window.DOMParser;

    it('bevraagt alle vector sources en voegt alle features toe', (done) => {
        const extent = [147470.04878680006, 195835.79059690205, 149463.51367699227, 197387.00407890222];
        const resolution = 2.222368885387087;
        const projection = {};

        const source1 = new VectorSource({
            format: new OlGML2(),
            url: (extent, resolution, projection) => {
                expect(extent).toBe(extent);
                expect(resolution).toBe(resolution);
                expect(projection).toBe(projection);
                return 'http://localhost/kaartlaag1';
            },
        });

        const source2 = new VectorSource({
            format: new OlGML2(),
            url: (extent, resolution, projection) => {
                expect(extent).toBe(extent);
                expect(resolution).toBe(resolution);
                expect(projection).toBe(projection);
                return 'http://localhost/kaartlaag2';
            },
        });

        const features1 = `<?xml version="1.0" encoding="utf-8" ?>
    <wfs:FeatureCollection xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:Watervlakken="https:gisservices.inbo.be/arcgis/services/Watervlakken/MapServer/WFSServer" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd https:gisservices.inbo.be/arcgis/services/Watervlakken/MapServer/WFSServer https://gisservices.inbo.be/arcgis/services/Watervlakken/MapServer/WFSServer?service=wfs%26version=1.0.0%26request=DescribeFeatureType">
      <gml:boundedBy>
        <gml:Box srsName="EPSG:31370">
          <gml:coordinates>149941.4421000034,196141.5964000002,150141.1713000014,196560.068</gml:coordinates>
        </gml:Box>
      </gml:boundedBy>
      <gml:featureMember>
        <Watervlakken:Watervlakken fid="Watervlakken.562">
          <Watervlakken:SHAPE><gml:MultiPolygon srsName="EPSG:31370"><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>0,0 0,10 10,10, 10,0 0,0</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon></Watervlakken:SHAPE>
          <Watervlakken:WVLC>ANTWIL0101</Watervlakken:WVLC>
        </Watervlakken:Watervlakken>
      </gml:featureMember>
    </wfs:FeatureCollection>`;

        const features2 = `<?xml version="1.0" encoding="UTF-8"?>
     <wfs:FeatureCollection xmlns="http://www.opengis.net/wfs" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:vmm="vismigratie-dev" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs https://geoserver.vmm.be/geoserver/schemas/wfs/1.0.0/WFS-basic.xsd vismigratie-dev https://geoserver.vmm.be/geoserver/vmm/wfs?service=WFS&amp;version=1.0.0&amp;request=DescribeFeatureType&amp;typeName=vmm%3Aowl_l">
       <gml:featureMember>
         <vmm:owl_l fid="owl_l.660">
           <vmm:waterlicha>VL11_42</vmm:waterlicha>
         <vmm:the_geom>
             <gml:MultiLineString srsName="http://www.opengis.net/gml/srs/epsg.xml#31370">
             <gml:lineStringMember>
               <gml:LineString>
                 <gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">0,0 20,20</gml:coordinates>
                 </gml:LineString>
               </gml:lineStringMember>
             </gml:MultiLineString>
           </vmm:the_geom>
         </vmm:owl_l>
       </gml:featureMember>
     </wfs:FeatureCollection>
   `;

        fetchMock.mock('http://localhost/kaartlaag1', { status: 200, body: features1, headers: {} });
        fetchMock.mock('http://localhost/kaartlaag2', { status: 200, body: features2, headers: {} });

        const compositeVectorSource = new VlCompositeVectorSource([source1, source2]);
        const loader = compositeVectorSource['loader_'];
        loader(extent, resolution, projection);
        setTimeout(() => {
            expect(compositeVectorSource.getFeatures().length).toBe(2);
            expect(compositeVectorSource.getFeatures()[0].getGeometry() instanceof MultiPolygon).toBe(true);
            expect(
                (<any>compositeVectorSource.getFeatures()[0].getGeometry()).getPolygons()[0].getCoordinates()
            ).toEqual([
                [
                    [0, 0, 0],
                    [0, 10, 0],
                    [10, 10, NaN],
                    [10, 0, 0],
                    [0, 0, 0],
                ],
            ]);
            expect(compositeVectorSource.getFeatures()[1].getGeometry() instanceof MultiLineString).toBe(true);
            expect(
                (<any>compositeVectorSource.getFeatures()[1].getGeometry()).getLineStrings()[0].getCoordinates()
            ).toEqual([
                [0, 0, 0],
                [20, 20, 0],
            ]);
            done();
        });
    });
});

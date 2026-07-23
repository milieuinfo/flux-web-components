import './preferences';
import './vds-prefix-aware';
// MOET voor app.component: claimt de vl-button tag voordat flux' eigen
// VlButtonComponent (transitief geladen via app.component) registreert.
import './vl-button-adapter';
import './app/app.component';
import './app/form/form-blur-poc.component';

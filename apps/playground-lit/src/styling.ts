// FLUX-704 PoC (aparte pagina): kunnen we VDS-componenten herstijlen zodat ze
// op flux lijken? Twee hefbomen: (1) hun design-TOKENS (--base-*) hermappen
// naar flux-waarden, (2) ::part() voor wat tokens niet dekken.
//
// Deze entry registreert ECHTE flux-componenten (zonder de vl-button adapter)
// naast de VDS-componenten, zodat we flux / VDS-default / VDS-flux-skin naast
// elkaar kunnen vergelijken.
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import './vds-scale-compensation.css';

import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { VlInputFieldComponent } from '@domg-wc/components/form';

import './flux-button.component';
import './flux-input.component';
import './flux-link.component';
import './vds-styling-demo.component';

// VDS onder de eigen vlds- prefix (geen collision met flux vl-*).
defineAll('vlds');

// Echte flux-componenten registreren (vl-button hier NIET via adapter).
registerWebComponents([VlButtonComponent, VlLinkComponent, VlTitleComponent, VlInputFieldComponent]);

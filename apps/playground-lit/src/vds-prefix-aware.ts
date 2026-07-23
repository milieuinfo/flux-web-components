// FLUX-704 PoC: consume the prefix-aware VDS web-components under a
// non-`vl-` prefix so they coexist with flux's own `vl-*` components.
//
// `defineAll('vlds')` registers every upstream component as `vlds-*`
// (e.g. `vlds-button`, `vlds-icon`). The prefix MUST be a single
// lowercase identifier with no hyphens; defineAll() throws otherwise
// (upstream B5 guard).
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
// The `/css` export is base + utils only; the design TOKENS (the
// `--base-color-*` / `--global-*` custom properties the components read)
// ship as a separate theme. Without it, components register and render
// but the skin is unstyled (transparent button, etc). Tokens are on
// `:root`, so they inherit through the shadow boundary.
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';

defineAll('vlds');

// Sanity-check that the B5 prefix guard reaches consumers: a hyphenated
// prefix must throw. Logged, not thrown, so it cannot break the page.
try {
    defineAll('foo-bar');
    // eslint-disable-next-line no-console
    console.error('[FLUX-704] B5 guard FAILED: defineAll("foo-bar") did not throw');
} catch (e) {
    // eslint-disable-next-line no-console
    console.info('[FLUX-704] B5 guard OK:', (e as Error).message);
}

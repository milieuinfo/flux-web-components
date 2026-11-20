import { ContextRoot } from '@lit/context';

// In gewone HTML starten componenten in de volgorde van hun registratie.
// Dit wil zeggen dat een grafiek om data kan vragen voordat
// `vl-data-source` geladen is; de ContextRoot onthoudt die vraag bij en
// geeft ze door zodra de bron er is.
// https://lit.dev/docs/data/context/#contextroot
new ContextRoot().attach(document.documentElement);

# Strategie 2: flux-tags hernoemen (`vl-` naar `flux-`)

Een eenmalige hernoeming van flux z'n tags van `vl-` naar `flux-`, zodat VDS de `vl-`
namespace krijgt en er geen clash meer is. Lijkt simpel ("find & replace"), maar dat is
misleidend.

## Waarom een blinde find & replace NIET werkt

In `libs/components/src` komt `vl-` **17817 keer** voor. Daarvan zijn er maar een
fractie echte tags:

- **1331** `.vl-`-CSS-klassen. Dit zijn GEEN tags maar styling-klassen (govflanders /
  Web Universum). Hernoemen breekt de styling en het contract met afnemers / externe CSS.
- Attributen, ids, tekst, commentaar en documentatie bevatten ook `vl-`.
- De echte tag-voorkomens: ~83 registraties + ~115 template-tags + ~40 DOM-queries.

Een ongerichte `vl-` naar `flux-` replace raakt dus duizenden plaatsen die NIET mogen
veranderen. Het is geen veilige operatie.

## Wat een correcte hernoeming wel vergt

Om enkel de TAGS te hernoemen (en CSS-klassen, attributen, tekst met rust te laten) moet
je precies dezelfde plaatsen identificeren als in strategie 1:

1. De **83** `@webComponent('vl-...')`-registraties → `'flux-...'`.
2. De **115** `<vl-...>`-template-tags → `<flux-...>` (maar niet de `.vl-`-klassen in
   diezelfde templates).
3. De **40** DOM-query-literals (`closest('vl-...')`, `customElements.get('vl-...')`, ...).
4. `HTMLElementTagNameMap`-declaraties.
5. Alle componenttests (`.cy.ts`) die hardcoded `vl-`-tags mounten/asserten.
6. CSS-klassen `.vl-` expliciet UITSLUITEN.

Dat is dezelfde gerichte refactor-omvang als strategie 1, maar zonder de flexibiliteit:
het resultaat is een vaste `flux-` prefix i.p.v. een configureerbare.

## Effort-inschatting

- **Naief (blind replace): klein, maar fout.** Breekt 1331 CSS-klassen en talloze
  niet-tag-voorkomens. Niet te doen.
- **Correct (enkel tags): middelgroot tot groot.** Vergelijkbaar met strategie 1 qua
  plaatsen-die-je-moet-aanraken (registraties + 115 templates + 40 queries + tests),
  minus het bouwen van een prefix-mechanisme. Je krijgt er geen prefix-vrijheid voor
  terug.

## Breaking change

Hoe dan ook een **breaking change voor afnemers**: elke `vl-*` in hun markup wordt
`flux-*`. Dat vergt een migratiegids en een major-release.

## Wanneer kiezen

Zelden de beste keuze. Enkel als een vaste, definitieve `flux-` namespace gewenst is en
prefix-configureerbaarheid (strategie 1) expliciet niet nodig is. In de praktijk levert
strategie 1 hetzelfde resultaat plus flexibiliteit voor ongeveer dezelfde moeite, en
strategie 3 lost de clash op zonder breaking change.

## Conclusie

"Gewoon hernoemen" is de schijnbaar makkelijke optie maar in werkelijkheid noch
makkelijk noch veilig: de moeilijkheid zit niet in het hernoemen zelf, maar in het
betrouwbaar onderscheiden van tags (mag wijzigen) versus CSS-klassen/attributen/tekst
(mag niet). Dat onderscheid maken is exact het werk van strategie 1.

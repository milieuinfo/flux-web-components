# text

## impact op

/text: vl-text -> wordt vervangen door een 'next' variant: `vl-text-next`


## next implementatie

Eeen` vl-text-next` component maken conform `vl-title-next` met de attributen:
  * visually-hidden -> vl-text-next--visually-hidden
  * success -> vl-text-next--success - kleur die in de variabelen gedefinieerd is
  * warning -> vl-text-next--warning - kleur die in de variabelen gedefinieerd is
  * error -> vl-text-next--error - kleur die in de variabelen gedefinieerd is
  * italic
  * underlined
  * bold


## bedenking

Eerst de kleur herwerking doen: in lijn brengen brengen met de andere variabelen
  - `--vl-white` wordt `--vl-color--white`
  - `--vl-light-text-color` wordt `--vl-color--light-text`
  - `--vl-border-color` wordt `vl-color--border`



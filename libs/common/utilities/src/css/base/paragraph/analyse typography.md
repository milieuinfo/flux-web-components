# typography

## impact op

/typography: vl-typography -> wordt vervangen door een 'next' variant: `vl-typography-next`


## next implementatie

Het doel is 'basis' styling (voor native tags) onder css/base te steken:
 -> onder css/base komt dan bvb. een /table en een /list folder met daarin per native component de styling voor die native tag 
 -> die styling mag niets afweten van vl-typography

In <vl-typography-next> is er dan voor .vl-typography-next een import met een & die dan bij gebruik van een native <table/> in een
.vl-typography-next de juiste styling toepast. De table style uit css/base zou op termijn ook gebruikt moeten worden in de table component.

Het is in elk geval niet de bedoeling om css voor een concrete component onder css/base te gaan steken, enkel de styling voor native of
eventueel gedeelde styling hoort daar thuis (en gedeelde is te bekijken als we een use-case hebben).


## bedenking

- moeten we deze component nu wel doen: het is geen element


## opmerkingen mbt de PR die al bestaat

- die vl-typography-title.css.ts kan de huidige vl-heading gebruiken 
- er wordt ook styling voorzien voor  
   * hx.no-space-bottom - maar ik vind die in de oude code niet, wel een .vl-title--no-space-bottom -> het idee zou net zijn dan de vl-margin-next--no-bottom te gebruiken
   * hx.underline en hx.alt: het doel is 'native' html te ondersteunen, dat lijkt mij niet native
   * vl-data-table__grouped-row--first of vl-data-table--no-header moet toch niet in typography, is niets 'native'

Moesten dat echt use-cases zijn - die om de een of andere rede behouden moeten blijven - dan zou ik een vl-typography-legacy voorzien. Maar ik zou die initieel
niet maken, pas als we in v2 (of v1) een melding daarover krijgen (en dan nog zijn er opties: ze voegen het zelf toe / wij het in de next component via
een flag de legacy styling / we maken er een aparte legacy component van).

Die extractCSSVariables code zou ik niet doen. Wat test je? Wat is de meerwaarde?

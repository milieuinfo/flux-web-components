# input-group

## impact op

De volgende `legacy` componenten worden vervangen in de `next` opzet

- /input-addon: vl-button-input-addon & vl-input-addon
- /input-field: vl-input-field
- /input-group: vl-input-group


## vervanging

- <vl-group-next /> gebruiken (als vervanging van input-group)
  -> als het kan 'gewoon', als het moet met de extra modifier `vl-group-next--input-group` met specifieke styling 
- in de group komt dan, met een `input-group` attribuut:
    * <vl-button-next input-group />
    * <vl-input-field-next input-group />
- de kind-componenten moeten dan zelf bepalen (door hun shadow-dom heen) of ze als eerste of als laatste in de group zitten en de juiste styling gebruiken


## implementatie

- de 3 bestaande componenten worden uitgebreid (geen nieuwe dus): <vl-group-next/> / <vl-button-next/> / <vl-input-field-next/>
- de belangrijkste documentatie, de voorbeelden, komen bij onder <vl-group-next/>
- <vl-button-next/> / <vl-input-field-next/> het attribuut wordt gedocumenteerd met een referentie naar de `vl-group-next` documentatie
- ook <vl-input-field-masked-next/> moet als kind gebruikt kunnen worden


## bedenking

We moeten eerst duidelijk definiëren hoe <vl-button-next/> en <vl-icon-next/> zich tot elkaar verhouden als het puur om een klikbaar icoon gaat.
-> button = met randje / hoover: heel knopje grijst uit
-> icon = zonder randje / hoover: er komt een randje

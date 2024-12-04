# introduction

## impact op

/introduction: vl-introduction


## next implementatie - base/paragraph

De `legacy` introduction component bevat een <p> tag met specifieke styling. In de next opzet zou er dan:

- voor de <p> tag onder css/base/paragraph utility styling voorzien worden (conform heading)
    -> vl-paragraph.css.ts / vlParagraph
- met daarin de styling
    * vl-paragraph-next--introduction -> de 'introduction' modifier
    * vl-paragraph-next--bold -> de 'bold' modifier


## next implementatie - vl-paragraph-next

Daarnaast komt er een `vl-paragraph-next` web-component die de <p> tag utility methodes gebruikt met boolean attributen
    * introduction
    * bold


## bedenking

Hoe moet een default paragraph eruit zien als de attributen (van vl-paragraph-next) niet opstaan?

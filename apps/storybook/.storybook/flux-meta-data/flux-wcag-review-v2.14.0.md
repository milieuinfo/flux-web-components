# WCAG review - FLUX storybook

Overzicht van de componenten uit [FLUX-722](https://jira.omgeving.vlaanderen.be/jira/browse/FLUX-722): een tussentijdse review van de componenten waar op dat
moment geen gekende WCAG issues voor openstonden, op versie 2.14.0 van
<https://flux.omgeving.vlaanderen.be/release-v2/latest/storybook/>. Aangevuld met de nog openstaande WCAG tickets
uit epic [FLUX-4](https://jira.omgeving.vlaanderen.be/jira/browse/FLUX-4) - [2026] - WCAG - werking, ondersteuning en verbeteringen.

Kolommen:

- **legacy WCAG** - WCAG ticket uit epic FLUX-4 voor die component. ~~Doorstreept~~ = het ticket is intussen
  gesloten. Leeg = geen ticket.
- **review v2.14.0** - het subtaak-ticket onder FLUX-722 voor die component. `reviewed, ok` betekent nagekeken
  zonder dat er een subtaak voor nodig was. Leeg = de component stond niet in de FLUX-722 lijst.
- **te reviewen** - component die nog nagekeken moet worden. `TODO` = nog te reviewen. `nee, verdwijnt` = wordt
  niet meer nagekeken, de component verdwijnt.

## Atoms

| Component    | legacy WCAG  | review v2.14.0 | te reviewen |
| ------------ | ------------ | -------------- | ----------- |
| vl-button    | ~~FLUX-154~~ |                |             |
| vl-icon      |              | reviewed, ok   |             |
| vl-link      |              | FLUX-726       |             |
| vl-paragraph |              | reviewed, ok   |             |
| vl-text      |              | reviewed, ok   |             |
| vl-title     |              | reviewed, ok   |             |

## Block

| Component                      | legacy WCAG  | review v2.14.0 | te reviewen    |
| ------------------------------ |--------------|----------------| -------------- |
| vl-accordion                   | FLUX-205     |                |                |
| vl-alert                       | ~~FLUX-207~~ |                |                |
| vl-autocomplete                | FLUX-208     |                |                |
| vl-breadcrumb                  |              | FLUX-732       |                |
| vl-cascader                    | FLUX-211     |                |                |
| vl-contact-card                | ~~FLUX-213~~ |                |                |
| vl-content-header              | FLUX-216     |                |                |
| vl-description-data            |              |                | TODO           |
| vl-document                    |              | reviewed, ok   |                |
| vl-doormat                     | FLUX-221     |                |                |
| vl-functional-header           |              | FLUX-728       |                |
| vl-http-error-message          | ~~FLUX-236~~ |                |                |
| vl-info-tile                   |              | FLUX-731       |                |
| vl-infoblock                   | FLUX-239     |                |                |
| vl-infotext                    |              | FLUX-734       |                |
| vl-input-slider                | FLUX-241     |                |                |
| vl-loader                      | ~~FLUX-243~~ |                |                |
| vl-modal                       |              | FLUX-735       |                |
| vl-pager                       |              | FLUX-740       |                |
| vl-pill                        |              | FLUX-741       |                |
| vl-popover                     |              | FLUX-744       |                |
| vl-progress-bar                |              | reviewed, ok   |                |
| vl-progress-indicator          |              | FLUX-748       |                |
| vl-properties                  |              | reviewed, ok   |                |
| vl-proza-message               | FLUX-267     |                |                |
| vl-rich-data-table             |              | FLUX-749       |                |
| vl-rich-data                   |              | FLUX-750       |                |
| vl-search-result               |              | reviewed, ok   |                |
| vl-search                      |              | reviewed, ok   |                |
| vl-search-filter               | FLUX-271     |                |                |
| vl-share-buttons               |              | reviewed, ok   |                |
| vl-side-navigation             |              |                | nee, verdwijnt |
| vl-side-navigation-layout-next |              | FLUX-736       |                |
| vl-side-navigation-next        |              | FLUX-737       |                |
| vl-side-sheet                  |              | FLUX-751       |                |
| vl-spotlight                   | FLUX-283     |                |                |
| vl-steps                       |              | FLUX-752       |                |
| vl-table                       | FLUX-287     |                |                |
| vl-tabs                        |              |                | nee, verdwijnt |
| vl-tabs-next                   |              | FLUX-739       |                |
| vl-template                    | FLUX-721     |                |                |
| vl-toaster                     | FLUX-294     |                |                |
| vl-tooltip                     |              | reviewed, ok   |                |
| vl-typography                  |              | reviewed, ok   |                |
| vl-upload-progress             |              | reviewed, ok   |                |
| vl-video-player                | FLUX-298     |                |                |
| vl-wizard                      | FLUX-300     |                |                |

## Compliance

| Component           | legacy WCAG | review v2.14.0 | te reviewen |
| ------------------- | ----------- | -------------- | ----------- |
| vl-accessibility    |             | FLUX-753       |             |
| vl-cookie-consent   | FLUX-466    |                |             |
| vl-cookie-statement |             | FLUX-754       |             |
| vl-footer-next      |             | reviewed, ok   |             |
| vl-header-next      |             | FLUX-756       |             |
| vl-privacy          |             | FLUX-755       |             |

## Form

| Component             | legacy WCAG | review v2.14.0 | te reviewen |
| --------------------- | ----------- | -------------- | ----------- |
| vl-checkbox           |             | reviewed, ok   |             |
| vl-datepicker         | FLUX-179    |                |             |
| vl-fieldset           |             | FLUX-758       |             |
| vl-form-label         |             | reviewed, ok   |             |
| vl-form-message       | FLUX-182    |                |             |
| vl-input-field        |             |                | TODO        |
| vl-input-field-masked | FLUX-256    |                |             |
| vl-input-group        |             | reviewed, ok   |             |
| vl-radio-group        |             | FLUX-759       |             |
| vl-radio              | FLUX-185    | reviewed, ok   |             |
| vl-select             |             | FLUX-761       |             |
| vl-select-rich        | FLUX-188    |                |             |
| vl-textarea           |             | FLUX-762       |             |
| vl-textarea-rich      | FLUX-191    |                |             |
| vl-upload             | FLUX-196    |                |             |

## Aandachtspunten

- `vl-radio` staat in beide kolommen: de component kwam mee in de FLUX-722 review, maar heeft nog een openstaand
  legacy ticket ([FLUX-185](https://jira.omgeving.vlaanderen.be/jira/browse/FLUX-185)).
- `vl-input-slider` en `vl-toaster` hebben elk twee openstaande tickets.

## Niet component-gebonden tickets uit epic FLUX-4

Deze openstaande tickets uit de epic gaan niet over een concrete component en staan daarom niet in de tabellen.

| Ticket   | Omschrijving                                                                  |
|----------|-------------------------------------------------------------------------------|
| FLUX-98  | algemeen - overzicht per team van hun toepassingen                            |
| FLUX-158 | WCAG review - MER screening                                                   |
| FLUX-159 | WCAG review - Jubel                                                           |
| FLUX-164 | algemeen - phoenix ondersteunen bij toevoegen van toegankelijkheidsverklaring |
| FLUX-181 | form - WCAG ge-audit - ontwerp/form demo                                      |
| FLUX-228 | WCAG review - LVBR                                                            |
| FLUX-388 | algemeen - WCAG - documentatie over (het testen van) toegankelijkheid         |
| FLUX-768 | WCAG - color contrast vl-toaster met vl-alert                                 |
| FLUX-792 | algemeen - screenreadermelding bij externe links                              |
| LVBR-470 | WCAG review voor LVBR - Flow 1                                                |

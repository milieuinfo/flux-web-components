---
name: jira-ticket
description: Maak een FLUX Jira-ticket aan met componentprefix, Nederlandse beschrijving en link naar het [meta]-ticket; pas na bevestiging.
argument-hint: "<korte omschrijving>"
---

# FLUX Jira-ticket aanmaken

Onderwerp: `$ARGUMENTS`

## Conventies

- **Componentticket**: titel begint met de componentnaam, bv. `vl-modal: focus keert niet terug na sluiten`. Meerdere componenten: `vl-side-sheet, vl-cascader: ...`.
- **Niet elk ticket gaat over een component** (CI, documentatie, tooling): dan geen prefix.
- **Meta-ticket**: issue type `Meta`, titel `[meta] - {componentnaam}` (bv. `[meta] - vl-modal`). Algemene meta-tickets beginnen met `[meta]`.
- **Link**: elk componentticket wordt gelinkt aan het meta-ticket van dat component met de relatie **"is gerelateerd aan"**.

## Stappen

1. **Component(en) bepalen** uit het onderwerp. Controleer dat de tag bestaat (`grep -r "'vl-xxx'" libs/`).
2. **Meta-ticket zoeken**:
   - Eerst lokaal: het `jiraMeta`-veld van het component in `apps/storybook/.storybook/flux-meta-data/json/*.meta-data.json` (waarde `geen` = onbekend).
   - Anders: `mcp__jira__jira_search` met `project = FLUX AND issuetype = Meta AND summary ~ "vl-xxx"` en filter op een titel die exact `[meta] - vl-xxx` is.
   - Geen meta-ticket? Stel voor er een aan te maken. Stel na aanmaak ook voor om `jiraMeta` in de metadata-JSON bij te werken.
3. **Dubbels vermijden**: zoek open tickets met gelijkaardige titel (`project = FLUX AND statusCategory != Done AND summary ~ "..."`). Toon mogelijke dubbels.
4. **Issue type**: kies uit de types die het FLUX-project effectief gebruikt (kijk bij twijfel naar recente tickets via `jira_search` met `fields: issuetype`). Bug voor defecten, anders het type dat het team voor features/taken gebruikt.
5. **Beschrijving** in het Nederlands:
   - *Bug*: Probleem · Stappen om te reproduceren (met story-URL of codevoorbeeld) · Verwacht · Werkelijk · Versie (`@domg-wc/components` x.y.z) en browser
   - *Feature/taak*: Doel · Acceptatiecriteria (lijst) · Buiten scope · Toegankelijkheid (relevante WCAG-criteria)
6. **Voorstel tonen**: titel, type, beschrijving, meta-link. **Wacht op bevestiging**, want het ticket is zichtbaar voor het team.
7. **Aanmaken**: `mcp__jira__jira_create_issue` (project `FLUX`), daarna de link met `mcp__jira__jira_create_issue_link`. Zoek de exacte link-typenaam op met `mcp__jira__jira_get_link_types`: het type waarvan inward/outward "is gerelateerd aan" is (meestal `Relates`).
8. Toon de ticket-key en de URL `https://jira.omgeving.vlaanderen.be/jira/browse/FLUX-{nr}`.

**Jira-MCP geeft 401?** Dan is het token verlopen. Meld dat, en geef het volledige voorstel als tekst zodat de gebruiker het manueel kan aanmaken.

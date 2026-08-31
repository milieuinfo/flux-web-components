---
name: test-coverage
description: Zorg dat nieuwe features tests hebben en bugfixes een regressietest. Wordt automatisch ingeroepen door Claude bij feature-werk of bugfixes.
user-invocable: false
---

# Test Coverage

Regels voor wanneer tests vereist zijn. Voor test-conventies (stijl, naming, A11y-helpers): zie `CLAUDE.md` Testing-sectie. Voor het draaien van tests: `/run-tests`.

## Kernregels

- **Nieuwe feature** → tests toevoegen voor nieuwe property/attribuut/event/slot/interactie; bestaande tests aanpassen als gedrag verandert; voeg Storybook E2E test toe als er nieuwe stories zijn
- **Bugfix** → schrijf eerst een regressietest die zonder de fix faalt en mét de fix slaagt; pas dan implementeren
- Volg het patroon van het bestaande testbestand van dezelfde component (describe/it-structuur, mount/visit-stijl, assertion-stijl)
- Nooit een fix als "werkt" rapporteren zonder een test die het bewijst

# ReportPortal

## Accounts

admin: superadmin / erebus
default: default / 1q2w3e
kris: kris /
karim: karim /
koen: koen /


## Projects

flux-web-components / nW7[kU5!kY3~
API Key Name: fwc_q1uWiggnR0-uwRsd323e4UypcGt5l2C--uGPPDRiwtbSfUf_Mw6uc0qoWwvfV-GQ


## uitvoeren

source ./resources/reportportal/rp-env.sh
node ./resources/reportportal/rp-launch-start.mjs
source ./resources/reportportal/rp-load-launch-id.sh
npm run libs:jest
npm run libs:web-types:validate
npm run apps:storybook-e2e:run
npm run libs:component-tests:run
node ./resources/reportportal/rp-launch-finish.mjs


## TODO

 - technische gebruiker per project - flux-web-components
 - gebruiker voor Kris / Karim / Koen
 - dashboard maken onder Kris, Karim en Koen rechten geven
 - start-launch en finish-launch beide via REST api
 - beide launch informatie via attributes doorgeven vanuit Bamboo: branch, agent, 
 - launch-id delen via een bestand en in Bamboo via artifacts
 - test logging
   * cypress-component laten loggen 
   * cypress-e2e laten loggen 
   * jest laten loggen 

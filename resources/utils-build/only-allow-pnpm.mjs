#!/usr/bin/env node

/**
 * Preinstall-guard: weigert een install met een andere package manager dan pnpm.
 *
 * Een 'npm install' uit gewoonte geeft een gehoiste node_modules en een package-lock.json, waardoor de strikte
 * pnpm-setup (phantom-dependency-detectie, allowBuilds, minimumReleaseAge) lokaal stil ondermijnd wordt.
 *
 * Bewust geen 'npx only-allow pnpm' (de variant uit de pnpm-docs): npx haalt dat package bij elke install
 * ongepind van de registry, ook in CI, en buiten de supply-chain-regels van pnpm-workspace.yaml om. Deze check
 * doet hetzelfde als only-allow (npm_config_user_agent lezen) zonder netwerk of extra dependency.
 *
 * NB: npm 7+ draait de preinstall van de root pas ná het schrijven van node_modules en package-lock.json. De
 * guard maakt de vergissing dus zichtbaar, maar kan ze niet voorkomen: opruimen met
 * 'rm -rf node_modules package-lock.json && pnpm install'. Daarom staat package-lock.json ook in .gitignore.
 *
 * Voor npm 10.9+ komt het zover niet meer: het 'devEngines'-veld in package.json laat npm elk commando in deze map
 * weigeren (EBADDEVENGINES) vóór het iets schrijft. Deze guard is het vangnet voor oudere npm-versies, andere
 * package managers, en wie de check met '--force' omzeilt.
 */

const userAgent = process.env.npm_config_user_agent ?? '';
const packageManager = userAgent.split('/')[0] || 'onbekend';

if (packageManager !== 'pnpm') {
    console.error(`
  Dit project gebruikt pnpm, geen ${packageManager}.

  Maak pnpm eenmalig beschikbaar, op één van twee manieren (ze sluiten elkaar uit):
    - corepack: 'corepack enable'
    - Volta:    'export VOLTA_FEATURE_PNPM=1' in je shell-profiel (Volta pakt dan de pnpm-versie uit package.json)
  Ruim de resten van deze install op met 'rm -rf node_modules package-lock.json' en installeer met 'pnpm install'.
  Meer uitleg: Storybook-docs, Bijdragen > Opzet & Structuur > Package manager: pnpm.
`);
    process.exit(1);
}

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
 */

const userAgent = process.env.npm_config_user_agent ?? '';
const packageManager = userAgent.split('/')[0] || 'onbekend';

if (packageManager !== 'pnpm') {
    console.error(`
  Dit project gebruikt pnpm, geen ${packageManager}.

  Zet corepack eenmalig aan met 'corepack enable' en installeer met 'pnpm install'.
  Ruim de resten van deze install op met: rm -rf node_modules package-lock.json
`);
    process.exit(1);
}

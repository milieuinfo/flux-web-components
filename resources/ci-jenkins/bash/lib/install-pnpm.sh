#!/bin/bash

# Installeert in de Jenkins-pod de pnpm-versie uit het packageManager-veld van package.json, via npm.
#
# Niet via corepack: corepack leest geen auth uit .npmrc en stuurt zijn eigen token (COREPACK_NPM_TOKEN) alleen mee
# als de tarball-URL exact de origin van COREPACK_NPM_REGISTRY heeft. Met een registry-URL met pad (Artifactory,
# /artifactory/api/npm/acd-npm/) is dat nooit zo, dus de tarball-download krijgt een 403. npm gebruikt de auth uit
# /root/.npmrc wél. Een globale npm-install valt buiten de devEngines-check van package.json.
#
# Verwacht: cwd is de root van de repo. Wordt ge-sourced na quiet-step.sh.

PNPM_PACKAGE_MANAGER="$(node -p "require('./package.json').packageManager")"

if [[ ! ${PNPM_PACKAGE_MANAGER} =~ ^pnpm@([0-9]+\.[0-9]+\.[0-9]+)(\+.*)?$ ]]; then
    echo "[FOUT] - install-pnpm - packageManager in package.json is geen pnpm-versie: '${PNPM_PACKAGE_MANAGER}'" >&2
    exit 1
fi

PNPM_VERSION="${BASH_REMATCH[1]}"

if [[ "$(pnpm --version 2>/dev/null)" == "${PNPM_VERSION}" ]]; then
    echo "[done] - install-pnpm - pnpm ${PNPM_VERSION} staat al op PATH"
else
    quiet_step "npm install -g pnpm@${PNPM_VERSION}" npm install -g "pnpm@${PNPM_VERSION}" --no-audit --no-fund

    INSTALLED_PNPM_VERSION="$(pnpm --version 2>/dev/null || true)"

    if [[ "${INSTALLED_PNPM_VERSION}" != "${PNPM_VERSION}" ]]; then
        echo "[FOUT] - install-pnpm - pnpm ${PNPM_VERSION} verwacht, maar 'pnpm --version' geeft '${INSTALLED_PNPM_VERSION:-niets}'" >&2
        exit 1
    fi

    echo "[done] - install-pnpm - pnpm ${PNPM_VERSION} geïnstalleerd"
fi

#!/bin/bash

# Corepack haalt pnpm standaard van npmjs, onbereikbaar in de Jenkins-pod. Wijs het naar de Artifactory-registry
# die npm/pnpm al gebruiken. De packageManager-hash is gepind omdat Artifactory de npmjs-signatuur niet meelevert.
COREPACK_NPM_REGISTRY="$(npm config get registry)"
export COREPACK_NPM_REGISTRY

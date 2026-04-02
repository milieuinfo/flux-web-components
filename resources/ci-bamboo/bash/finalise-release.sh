#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: finalise-release.sh'
cd flux-web-components

# verificatie: enkel uitvoeren op een release branch, versie extracten
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "${CURRENT_BRANCH}" != release-v* ]]; then
    echo "INFO: finalise-release moet enkel lopen op een release branch (begint met 'release-v'), huidige branch: ${CURRENT_BRANCH}" >&2
    exit 0
fi
echo "Branch verificatie OK: ${CURRENT_BRANCH}"

# versie afleiden uit branchnaam: release-vX -> X
VERSION="${CURRENT_BRANCH#release-v}"
DEVELOP_BRANCH="develop-v${VERSION}"
echo "Release branch: ${CURRENT_BRANCH} -> Develop branch: ${DEVELOP_BRANCH}"

# rebase develop branch onto release branch
echo "checkout ${DEVELOP_BRANCH}"
git checkout ${DEVELOP_BRANCH}

echo "rebase ${DEVELOP_BRANCH} onto ${CURRENT_BRANCH}"
git rebase ${CURRENT_BRANCH}

echo "push ${DEVELOP_BRANCH}"
git push origin ${DEVELOP_BRANCH}

echo 'FINALISE-RELEASE - DONE'

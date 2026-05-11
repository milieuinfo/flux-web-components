#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: finalise-release.sh'
cd flux-web-components

# Branchnaam bepalen via BAMBOO_BRANCH_NAME (bamboo.planRepository.branchName).
# Bamboo's checkout-task zet de werkdir in detached HEAD op de trigger-SHA, en na de
# chore(release) [skip ci] commit van @semantic-release/git geeft git rev-parse niet
# meer de echte branchnaam terug. Geen fallback op git rev-parse: zo faalt het script
# hard als de env var niet correct wordt doorgegeven, in plaats van stilletjes het
# oude (falende) gedrag te herhalen.
if [[ -z "${BAMBOO_BRANCH_NAME:-}" || "${BAMBOO_BRANCH_NAME}" == "not-specified" ]]; then
    echo "ERROR: BAMBOO_BRANCH_NAME is niet gezet of staat op 'not-specified' - controleer bamboo.yml en compose.yaml" >&2
    exit 1
fi
CURRENT_BRANCH="${BAMBOO_BRANCH_NAME}"

# verificatie: enkel uitvoeren op een release branch
if [[ "${CURRENT_BRANCH}" != release-v* ]]; then
    echo "INFO: finalise-release moet enkel lopen op een release branch (begint met 'release-v'), huidige branch: ${CURRENT_BRANCH}" >&2
    exit 0
fi
echo "Branch verificatie OK: ${CURRENT_BRANCH}"

# versie afleiden uit branchnaam: release-vX -> X
VERSION="${CURRENT_BRANCH#release-v}"
DEVELOP_BRANCH="develop-v${VERSION}"
echo "Release branch: ${CURRENT_BRANCH} -> Develop branch: ${DEVELOP_BRANCH}"

# op Bamboo bevat SECRET_GITHUB_TOKEN het GitHub PAT met de juiste rechten - nodig voor de push
if [[ -z "${SECRET_GITHUB_TOKEN+x}" || -z "${SECRET_GITHUB_TOKEN}" || "${SECRET_GITHUB_TOKEN}" == "not-specified" ]]; then
    echo "SECRET_GITHUB_TOKEN is NIET gezet - kan geen geauthenticeerde push uitvoeren" >&2
    exit 1
fi

# de remote set by Bamboo is not authenticated, so remove the remote and add one with authentication
echo 'git remote rm origin'
git remote rm origin &> /dev/null
echo 'git remote add origin (met authenticatie)'
git remote add origin https://${SECRET_GITHUB_TOKEN}@github.com/milieuinfo/flux-web-components.git &> /dev/null

# git user instellen (kan nodig zijn als de rebase een merge-commit zou maken)
GITHUB_USER=kspeltix
GITHUB_EMAIL=kris.speltincx@vlaanderen.be
git config user.name ${GITHUB_USER}
git config user.email ${GITHUB_EMAIL}
git config pull.ff only

# fetch om de chore(release) [skip ci] commit van semantic-release/git op te halen
echo 'git fetch --prune origin'
git fetch --prune origin

# release branch op de remote tip brengen (inclusief de chore(release) commit) zodat
# de rebase die commit ook meeneemt naar de develop branch
echo "git checkout ${CURRENT_BRANCH}"
git checkout ${CURRENT_BRANCH}
echo "git pull --ff-only origin ${CURRENT_BRANCH}"
git pull origin ${CURRENT_BRANCH}

# develop branch op de remote tip brengen vóór de rebase
echo "git checkout ${DEVELOP_BRANCH}"
git checkout ${DEVELOP_BRANCH}
echo "git pull --ff-only origin ${DEVELOP_BRANCH}"
git pull origin ${DEVELOP_BRANCH}

echo "rebase ${DEVELOP_BRANCH} onto ${CURRENT_BRANCH}"
git rebase ${CURRENT_BRANCH}

echo "push ${DEVELOP_BRANCH}"
git push origin ${DEVELOP_BRANCH}

echo 'FINALISE-RELEASE - DONE'

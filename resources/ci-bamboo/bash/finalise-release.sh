#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: finalise-release.sh'
cd "$(dirname "$0")/../../.."

# op Jenkins is de checkout gedaan door een andere user (jnlp container) dan de user
# die dit script draait (root in de cypress container) - zonder safe.directory weigert
# git dan elke operatie; op Bamboo is dit een onschuldige extra config entry
git config --global --add safe.directory "$(pwd)"

# Branchnaam bepalen via de CI omgeving:
# - Bamboo: BAMBOO_BRANCH_NAME (bamboo.planRepository.branchName). Bamboo's
#   checkout-task zet de werkdir in detached HEAD op de trigger-SHA, en na de
#   chore(release) [skip ci] commit van @semantic-release/git geeft git rev-parse
#   niet meer de echte branchnaam terug.
# - Jenkins: BRANCH_NAME (multibranch) of GIT_BRANCH.
# Geen fallback op git rev-parse: zo faalt het script hard als er geen branchnaam
# wordt doorgegeven, in plaats van stilletjes het oude (falende) gedrag te herhalen.
if [[ -n "${BAMBOO_BRANCH_NAME:-}" && "${BAMBOO_BRANCH_NAME}" != "not-specified" ]]; then
    CURRENT_BRANCH="${BAMBOO_BRANCH_NAME}"
elif [[ -n "${BRANCH_NAME:-}" ]]; then
    CURRENT_BRANCH="${BRANCH_NAME}"
elif [[ -n "${GIT_BRANCH:-}" ]]; then
    CURRENT_BRANCH="${GIT_BRANCH#origin/}"
else
    echo "ERROR: geen branchnaam gevonden (BAMBOO_BRANCH_NAME/BRANCH_NAME/GIT_BRANCH) - controleer bamboo.yml en compose.yaml, of de Jenkins omgeving" >&2
    exit 1
fi

# verificatie: enkel uitvoeren op een hoofd-release branch (release-v<major>, bv.
# release-v1 of release-v2). Een fix-release branch zoals release-v2-2.15 mag NIET
# rebasen naar een develop branch - die wordt overgeslagen maar de stap slaagt (exit 0).
if [[ ! "${CURRENT_BRANCH}" =~ ^release-v[0-9]+$ ]]; then
    echo "INFO: finalise-release rebaset enkel een hoofd-release branch (release-v<major>, bv. release-v1 of release-v2) naar zijn develop branch; huidige branch '${CURRENT_BRANCH}' wordt overgeslagen" >&2
    exit 0
fi
echo "Branch verificatie OK: ${CURRENT_BRANCH}"

# versie afleiden uit branchnaam: release-vX -> X
VERSION="${CURRENT_BRANCH#release-v}"
DEVELOP_BRANCH="develop-v${VERSION}"
echo "Release branch: ${CURRENT_BRANCH} -> Develop branch: ${DEVELOP_BRANCH}"

# op Bamboo bevat SECRET_GITHUB_TOKEN het GitHub PAT met de juiste rechten; op Jenkins
# wordt GITHUB_TOKEN rechtstreeks gezet via withCredentials - nodig voor de push
if [[ -n "${SECRET_GITHUB_TOKEN:-}" && "${SECRET_GITHUB_TOKEN}" != "not-specified" ]]; then
    GITHUB_TOKEN="${SECRET_GITHUB_TOKEN}"
fi
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
    echo "GITHUB_TOKEN/SECRET_GITHUB_TOKEN is NIET gezet - kan geen geauthenticeerde push uitvoeren" >&2
    exit 1
fi

# de remote gezet door de CI server is niet geauthenticeerd, dus de remote verwijderen
# en eentje met authenticatie toevoegen; de 'x-access-token' username werkt zowel met
# een PAT (Bamboo) als met een GitHub App token (Jenkins)
echo 'git remote rm origin'
git remote rm origin &> /dev/null
echo 'git remote add origin (met authenticatie)'
git remote add origin https://x-access-token:${GITHUB_TOKEN}@github.com/milieuinfo/flux-web-components.git &> /dev/null

# git user instellen (kan nodig zijn als de rebase een merge-commit zou maken)
GITHUB_USER=kspeltix
GITHUB_EMAIL=kris.speltincx@vlaanderen.be
git config user.name ${GITHUB_USER}
git config user.email ${GITHUB_EMAIL}
git config pull.ff only

# fetch om de chore(release) [skip ci] commit van semantic-release/git op te halen
echo 'git fetch --prune origin'
git fetch --prune origin

# Jenkins kan een shallow clone maken; de rebase heeft de volledige historiek van
# beide branches nodig - op Bamboo is de clone niet shallow (no-op)
if [[ "$(git rev-parse --is-shallow-repository)" == "true" ]]; then
    echo 'git fetch --unshallow origin'
    git fetch --unshallow origin
fi

# op Jenkins delen de release stages één workspace: release-and-publish en
# verify-release laten gewijzigde tracked files achter (o.a. apps/consumer/package.json
# met de ingevulde versie) en die zouden de checkout/rebase hieronder blokkeren.
# Op Bamboo (verse checkout per job) is dit een no-op.
echo 'git reset --hard'
git reset --hard

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

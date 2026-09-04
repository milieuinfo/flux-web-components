#!/bin/bash

# Gedeelde helper voor de CI bash-scripts. Sourcen met:
#
#   SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
#   source "${SCRIPT_DIR}/lib/quiet-step.sh"
#
# 'quiet_step' voert een stap uit en toont de output enkel als die stap faalt. Bedoeld voor stappen die veel output
# produceren maar kort zijn (pnpm install, generatoren).
#
# Roep lang lopende stappen (builds, cypress) NIET via 'quiet_step' aan maar rechtstreeks, zodat hun output live in de
# Jenkins console verschijnt:
# - die stroom bewijst dat het proces nog leeft, dan is geen keepalive-heartbeat nodig
# - bij een hangende run zie je waar hij blijft steken
# - bij een crash of OOM-kill is de output al zichtbaar in plaats van dat hij samen met het proces verdwijnt
#   (een gebufferd bestand wordt dan nooit meer uitgeschreven)
#
# stdout en stderr gaan samen naar één bestand, zodat de volgorde bewaard blijft: build-tools printen voortgang op
# stdout en de eigenlijke fout op stderr, en die combinatie is nodig om te zien waar het misging.
quiet_step() {
    local label="$1"
    shift

    local log
    log="$(mktemp)"

    echo "${label} - start"
    if "$@" >"${log}" 2>&1; then
        echo "${label} - success"
        rm -f "${log}"
    else
        local status=$?
        echo "${label} - error (exit ${status})" >&2
        cat "${log}" >&2
        rm -f "${log}"
        exit "${status}"
    fi
}

#!/usr/bin/env bash
# Leest rp-context/rp.properties en exporteert LAUNCH_ID
# Gebruik: source ./rp-load-launch-id.sh
# Optioneel: RP_PROPS_FILE=/pad/naar/bestand.properties source ./load-rp-launch-id.sh

set -euo pipefail

# script folder bepalen (werkt bij run én bij source; tolerant voor set -u)
SCRIPT_SRC="${BASH_SOURCE[0]-$0}"
SCRIPT_DIR="$(cd -- "$(dirname -- "$SCRIPT_SRC")" >/dev/null 2>&1 && pwd -P)"

REL_FILE="${RP_PROPS_FILE:-rp-context/rp.properties}"
FILE="$SCRIPT_DIR/$REL_FILE"

if [[ ! -f "$FILE" ]]; then
  echo "❌ Properties bestand niet gevonden: $FILE"
  return 1 2>/dev/null || exit 1
fi

# RP_LAUNCH_ID eruit halen (KEY=VALUE, comments overslaan)
RP_LAUNCH_ID="$(
  awk -F'=' '
    /^[[:space:]]*(#|;)/ {next}              # comments
    /^[[:space:]]*$/        {next}           # lege regels
    toupper($1) ~ /^[[:space:]]*LAUNCH_ID$/ {
      # Trim spaties rond waarde
      sub(/^[[:space:]]*/, "", $2)
      sub(/[[:space:]]*$/, "", $2)
      print $2
      exit
    }
  ' "$FILE"
)"

if [[ -z "${RP_LAUNCH_ID:-}" ]]; then
  echo "❌ LAUNCH_ID niet gevonden in $FILE"
  return 1 2>/dev/null || exit 1
fi

export RP_LAUNCH_ID
echo "✓ RP_LAUNCH_ID=$RP_LAUNCH_ID (geëxporteerd)"

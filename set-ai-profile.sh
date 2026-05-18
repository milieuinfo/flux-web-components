#!/usr/bin/env bash
#
# Activeer een AI configuratie profile uit ai/profiles/.
# Gebruik: ./set-ai-profile.sh <profile-naam>
#
# Maakt/vervangt:
#   - CLAUDE.local.md                  (als profile een CLAUDE.md heeft)
#   - .claude/settings.local.json      symlink (als profile een settings.json heeft)
#   - .claude/skills                   symlink (als profile een skills/ folder heeft)
#   - AGENTS.md                        symlink (als profile een AGENTS.md heeft, cross-tool)
#   - SKILLS.md                        symlink (als profile een SKILLS.md heeft, cross-tool)
#
# Let op: .claude/settings.json is GECOMMIT (team-wide hook + permissies) en
# wordt door dit script NIET aangeraakt. Profile-specifieke settings cascaden
# via .claude/settings.local.json (gitignored).

# Weiger sourcen: dit script moet als subprocess draaien, anders kan een `exit`
# de shell van de gebruiker afsluiten en blijven environment-wijzigingen plakken.
_sourced=0
if [ -n "${ZSH_VERSION:-}" ]; then
    case "${ZSH_EVAL_CONTEXT:-}" in *:file*) _sourced=1;; esac
elif [ -n "${BASH_VERSION:-}" ]; then
    (return 0 2>/dev/null) && _sourced=1
fi
if [ "$_sourced" -eq 1 ]; then
    echo "Fout: dit script moet uitgevoerd worden, niet gesourced." >&2
    echo "Gebruik: ./set-ai-profile.sh <profile-naam>" >&2
    return 1 2>/dev/null || exit 1
fi
unset _sourced

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

list_profiles() {
    if [ -d ai/profiles ]; then
        find ai/profiles -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort
    fi
}

usage() {
    echo "Gebruik: $0 <profile-naam>"
    echo ""
    echo "Beschikbare profiles:"
    list_profiles | sed 's/^/  - /'
}

if [ $# -ne 1 ]; then
    usage
    exit 1
fi

PROFILE="$1"
PROFILE_DIR="ai/profiles/$PROFILE"

if [ ! -d "$PROFILE_DIR" ]; then
    echo "Fout: profile '$PROFILE' niet gevonden in ai/profiles/" >&2
    echo "" >&2
    usage >&2
    exit 1
fi

# Verwijder bestaande symlink op pad, maar weiger gewone bestanden/folders
# te overschrijven (anders zou eigen werk verloren kunnen gaan).
remove_existing_symlink() {
    local path="$1"
    if [ -L "$path" ]; then
        rm -f "$path"
    elif [ -e "$path" ]; then
        echo "Fout: '$path' bestaat al en is geen symlink. Verwijder of verplaats het manueel." >&2
        exit 1
    fi
}

mkdir -p .claude

remove_existing_symlink .claude/settings.local.json
remove_existing_symlink .claude/skills
remove_existing_symlink AGENTS.md
remove_existing_symlink SKILLS.md

# CLAUDE.local.md is geen symlink maar een gewoon (gitignored) bestand.
# We schrijven het altijd zodat de aanwezigheid een betrouwbare "profile
# geactiveerd"-marker is voor de bootstrap-check (ook voor opt-out profiles
# zoals 'no' die bewust geen CLAUDE.md hebben).
if [ -f "$PROFILE_DIR/CLAUDE.md" ]; then
    printf '@%s/CLAUDE.md\n' "$PROFILE_DIR" > CLAUDE.local.md
    echo "  CLAUDE.local.md             -> @$PROFILE_DIR/CLAUDE.md"
else
    printf '# profile: %s (geen CLAUDE.md — opt-out)\n' "$PROFILE" > CLAUDE.local.md
    echo "  CLAUDE.local.md             (marker: profile heeft geen CLAUDE.md)"
fi

if [ -f "$PROFILE_DIR/settings.json" ]; then
    ln -s "../$PROFILE_DIR/settings.json" .claude/settings.local.json
    echo "  .claude/settings.local.json -> ../$PROFILE_DIR/settings.json"
fi

if [ -d "$PROFILE_DIR/skills" ]; then
    ln -s "../$PROFILE_DIR/skills" .claude/skills
    echo "  .claude/skills              -> ../$PROFILE_DIR/skills"
fi

if [ -f "$PROFILE_DIR/AGENTS.md" ]; then
    ln -s "$PROFILE_DIR/AGENTS.md" AGENTS.md
    echo "  AGENTS.md                   -> $PROFILE_DIR/AGENTS.md"
fi

if [ -f "$PROFILE_DIR/SKILLS.md" ]; then
    ln -s "$PROFILE_DIR/SKILLS.md" SKILLS.md
    echo "  SKILLS.md                   -> $PROFILE_DIR/SKILLS.md"
fi

echo ""
echo "Profile '$PROFILE' geactiveerd. Herstart Claude Code om de nieuwe configuratie te laden."

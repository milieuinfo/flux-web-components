#!/usr/bin/env bash
#
# Activeer een AI configuratie profile uit ai/profiles/.
# Gebruik: ./set-ai-profile.sh <profile-naam>
#
# Maakt/vervangt:
#   - CLAUDE.local.md                  (als profile een CLAUDE.md heeft)
#   - .claude/settings.local.json      MERGE (als profile een settings.json heeft)
#   - .claude/skills                   symlink (als profile een skills/ folder heeft)
#   - AGENTS.md                        symlink (als profile een AGENTS.md heeft, cross-tool)
#   - SKILLS.md                        symlink (als profile een SKILLS.md heeft, cross-tool)
#
# Let op: .claude/settings.json is GECOMMIT (team-wide hook + permissies) en
# wordt door dit script NIET aangeraakt.
#
# .claude/settings.local.json wordt door Claude Code zelf beheerd: het programma
# schrijft daar jouw "altijd toelaten"-keuzes in weg. Daarom maken we er GEEN
# symlink van (dat zou die keuzes naar de gecommitte profile-folder lekken en in
# worktrees botsen). In plaats daarvan MERGEN we de profile-permissies erin
# (permissions.allow, permissions.deny en permissions.ask):
#   - bestaande entries (incl. door Claude Code weggeschreven keuzes) blijven staan
#   - de profile-permissies worden toegevoegd
#   - bij een profielwissel wordt enkel de vorige profile-laag verwijderd
# Welke entries het script zelf injecteerde, onthoudt het in het geheugenbriefje
# .claude/.profile-injected.json (gitignored, object {allow,deny,ask}). Vergt 'jq'.

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
    if ! command -v jq >/dev/null 2>&1; then
        echo "Fout: 'jq' is nodig om de profile-permissies te mergen, maar niet gevonden." >&2
        echo "Installeer jq (bv. 'brew install jq') en draai dit script opnieuw." >&2
        exit 1
    fi

    SETTINGS_LOCAL=".claude/settings.local.json"
    MEMO=".claude/.profile-injected.json"

    # Migratie van de oude aanpak: was settings.local.json nog een symlink
    # (naar een profile), verwijder die. We starten dan met een lege local en
    # Claude Code vult ze opnieuw met jouw keuzes.
    if [ -L "$SETTINGS_LOCAL" ]; then
        rm -f "$SETTINGS_LOCAL"
    fi

    # Huidige local (of leeg object). Weiger bij ongeldige JSON i.p.v. te overschrijven.
    if [ -f "$SETTINGS_LOCAL" ]; then
        if ! jq empty "$SETTINGS_LOCAL" >/dev/null 2>&1; then
            echo "Fout: '$SETTINGS_LOCAL' bevat ongeldige JSON. Repareer of verwijder het manueel." >&2
            exit 1
        fi
        CURRENT_JSON="$(cat "$SETTINGS_LOCAL")"
    else
        CURRENT_JSON='{}'
    fi

    # Geheugenbriefje: wat injecteerde de vorige activatie? (of lege lijst)
    if [ -f "$MEMO" ] && jq empty "$MEMO" >/dev/null 2>&1; then
        PREV_JSON="$(cat "$MEMO")"
    else
        PREV_JSON='[]'
    fi

    PROFILE_ALLOW_JSON="$(jq '.permissions.allow // []' "$PROFILE_DIR/settings.json")"
    PROFILE_DENY_JSON="$(jq '.permissions.deny // []' "$PROFILE_DIR/settings.json")"
    PROFILE_ASK_JSON="$(jq '.permissions.ask // []' "$PROFILE_DIR/settings.json")"

    # Merge per lijst: (huidige lijst ZONDER vorige profile-laag) + nieuwe profile-laag.
    # Geldt voor allow, deny en ask. Overige sleutels (env, hooks, ...) blijven ongemoeid.
    # $prev kan het oude memo-formaat (bare array = enkel allow) of het nieuwe object zijn.
    NEW_LOCAL_JSON="$(jq -n \
        --argjson cur "$CURRENT_JSON" \
        --argjson prev "$PREV_JSON" \
        --argjson profAllow "$PROFILE_ALLOW_JSON" \
        --argjson profDeny "$PROFILE_DENY_JSON" \
        --argjson profAsk "$PROFILE_ASK_JSON" \
        '(if ($prev | type) == "array"
            then {allow: $prev, deny: [], ask: []}
            else {allow: ($prev.allow // []), deny: ($prev.deny // []), ask: ($prev.ask // [])}
          end) as $p
         | (((($cur.permissions.allow // []) - $p.allow) + $profAllow) | unique) as $mAllow
         | (((($cur.permissions.deny  // []) - $p.deny)  + $profDeny)  | unique) as $mDeny
         | (((($cur.permissions.ask   // []) - $p.ask)   + $profAsk)   | unique) as $mAsk
         | $cur
         | .permissions = ((.permissions // {})
             | (if ($mAllow | length) > 0 then .allow = $mAllow else del(.allow) end)
             | (if ($mDeny  | length) > 0 then .deny  = $mDeny  else del(.deny)  end)
             | (if ($mAsk   | length) > 0 then .ask   = $mAsk   else del(.ask)   end))')"

    MEMO_JSON="$(jq -n \
        --argjson allow "$PROFILE_ALLOW_JSON" \
        --argjson deny "$PROFILE_DENY_JSON" \
        --argjson ask "$PROFILE_ASK_JSON" \
        '{allow: $allow, deny: $deny, ask: $ask}')"

    printf '%s\n' "$NEW_LOCAL_JSON" > "$SETTINGS_LOCAL"
    printf '%s\n' "$MEMO_JSON" > "$MEMO"
    echo "  .claude/settings.local.json (merge: bestaande keuzes behouden + profile allow/deny/ask toegevoegd)"
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

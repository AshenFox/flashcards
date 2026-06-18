#!/bin/bash
# Interactive manual backup tool. Prompts for a source URI, then runs mongodump inside the
# `mongo` container, writing a gzip archive into infra/backups/. The `-manual-` prefix keeps
# these clear of the weekly retention prune (which only matches flashcards-weekly-*), so
# manual exports are never auto-deleted even though they share the weekly cron's folder.
# Run from the project root, or via `npm run db-backup`.
set -e

# Paths below are relative to the container's working dir (/), which keeps them immune to
# Git Bash path mangling and maps to the host via the compose bind mount
# (./infra/backups → /backups).
# Single-quoted: the $MONGO_INITDB_* vars must expand inside the container, not on the host.
LOCAL_URI_TEMPLATE='mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost/flashcards?authSource=admin'
STAMP="$(date +%Y%m%d-%H%M%S)"

# --- 1. source URI ---
echo "Source MongoDB URI to back up FROM."
echo "Press Enter to use the local container database, or paste a full URI (e.g. Atlas)."
read -rp "URI: " USER_URI

# The container must be up for `docker exec` to work.
if ! docker ps --format '{{.Names}}' | grep -qx mongo; then
  echo "ERROR: the 'mongo' container is not running. Start it first (npm run db / npm run prod)." >&2
  exit 1
fi

# --- 2. run mongodump in the container ---
TARGET="./backups/flashcards-manual-${STAMP}.archive.gz"
DUMP_ARGS="--archive=${TARGET} --gzip"

echo
echo "Creating manual backup → infra/${TARGET#./} ..."
# shellcheck disable=SC2086  # DUMP_ARGS is intentionally word-split into separate flags.
if [ -n "$USER_URI" ]; then
  # Explicit URI provided — pass it straight through.
  docker exec mongo mongodump --uri="$USER_URI" $DUMP_ARGS
else
  # Default: build the URI from the container's own env so no credentials touch the host shell.
  docker exec mongo sh -c "mongodump --uri=\"$LOCAL_URI_TEMPLATE\" $DUMP_ARGS"
fi

echo "Done: infra/${TARGET#./}"

#!/bin/bash
# New-VPS first-boot: start the stack, optionally restore the DB from a chosen archive,
# and install the weekly backup cron.
# Run from the project root: ./infra/scripts/bootstrap.sh
set -e

ENV_FILE="packages/config/.env.server"

# Load Mongo credentials from the (gitignored) env file so they aren't hardcoded here.
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found — cannot read Mongo credentials." >&2
  exit 1
fi
set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

echo "Creating runtime directories..."
mkdir -p ./infra/data ./infra/uploads ./infra/backups

echo "Starting containers..."
docker compose -f docker-compose.prod.yaml up -d

echo "Waiting for MongoDB to be ready..."
until docker exec mongo mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
  sleep 1
done

# --- Optional restore ---
RESTORE_URI="mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost/flashcards?authSource=admin"

echo
read -rp "Restore the database from an existing backup archive? [y/N]: " RESTORE_CHOICE
if [[ ! "$RESTORE_CHOICE" =~ ^[Yy]$ ]]; then
  echo "Skipping restore — starting with an empty database."
else
  # Collect archives in infra/backups (weekly + manual), newest first.
  mapfile -t FILES < <(ls -1t ./infra/backups/*.archive.gz 2>/dev/null)
  if [ "${#FILES[@]}" -eq 0 ]; then
    echo "No .archive.gz files found in ./infra/backups — starting with an empty database."
  else
    echo "Archives in ./infra/backups (newest first):"
    for i in "${!FILES[@]}"; do
      printf "  %d) %s\n" "$((i + 1))" "$(basename "${FILES[$i]}")"
    done
    read -rp "Choose a number to restore: " FILE_NUM
    if ! [[ "$FILE_NUM" =~ ^[0-9]+$ ]] || [ "$FILE_NUM" -lt 1 ] || [ "$FILE_NUM" -gt "${#FILES[@]}" ]; then
      echo "ERROR: invalid selection '$FILE_NUM'." >&2
      exit 1
    fi
    CHOSEN="$(basename "${FILES[$((FILE_NUM - 1))]}")"
    echo "Restoring ./infra/backups/${CHOSEN} ..."
    # Path is relative to the container's working dir (/), mapping to the bind mount.
    # Non-fatal: a failed restore (wrong Mongo version, corrupt archive) must NOT
    # abort the script under `set -e`, or the backup cron below would never install.
    if docker exec mongo mongorestore \
      --uri="$RESTORE_URI" \
      --drop --gzip --archive="./backups/${CHOSEN}"; then
      echo "Database restored."
    else
      echo "WARNING: restore failed — continuing so the backup cron still gets installed." >&2
      echo "         Investigate the archive/version, then restore manually (see infra/README.md)." >&2
    fi
  fi
fi

echo "Installing weekly backup cron..."
# User crontab (the deploy user is in the docker group, so no sudo needed). Idempotent via
# a named marker tag: we strip any line carrying $CRON_TAG and re-add a single fresh entry,
# so re-running bootstrap replaces rather than duplicates. The tag is a trailing shell
# comment — cron passes the line to /bin/sh, which ignores everything after the '#'.
PROJECT_DIR="$(pwd)"
CRON_TAG="# flashcards-weekly-backup"   # unique id for this job — match on this, not the command
CRON_LINE="0 3 * * 0 cd ${PROJECT_DIR} && ./infra/scripts/backup.sh >> ${PROJECT_DIR}/infra/backups/backup.log 2>&1 ${CRON_TAG}"
( crontab -l 2>/dev/null | grep -v -F "$CRON_TAG"; echo "$CRON_LINE" ) | crontab -
echo "Weekly backup cron installed (Sundays 03:00)."

echo "Bootstrap complete."

#!/bin/bash
# Weekly DB backup: timestamped, gzipped mongodump into infra/backups, with retention.
# Installed as a weekly user cron by infra/scripts/bootstrap.sh.
# Run from the project root: ./infra/scripts/backup.sh
set -e

ENV_FILE="packages/config/.env.server"
BACKUP_DIR="./infra/backups"
RETENTION=8   # keep the newest N weekly archives (~2 months)

# Load Mongo credentials from the (gitignored) env file so they aren't hardcoded here.
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found — cannot read Mongo credentials." >&2
  exit 1
fi
set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

# `-weekly-` prefix marks the automated job's archives. Retention below prunes ONLY
# this pattern, so manual archives (flashcards-manual-*, written by backup-manual.sh
# into the same folder) are never auto-deleted.
ARCHIVE="flashcards-weekly-$(date +%F).archive.gz"

echo "[$(date)] Starting backup → $ARCHIVE"
# Runs inside the mongo container, so localhost is correct here. Writes to the
# bind-mounted /backups (== host $BACKUP_DIR).
docker exec mongo mongodump \
  --uri="mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost/flashcards?authSource=admin" \
  --archive="/backups/${ARCHIVE}" --gzip
echo "[$(date)] Backup complete: ${BACKUP_DIR}/${ARCHIVE}"

# Retention prune. mongodump runs as root inside the container, so the archives are
# root-owned on the host — the non-root cron user can't delete them. Prune from inside
# the container (root) to match ownership.
docker exec mongo bash -c \
  "ls -1t /backups/flashcards-weekly-*.archive.gz 2>/dev/null | tail -n +$((RETENTION + 1)) | xargs -r rm -f"
echo "[$(date)] Retention applied (kept newest ${RETENTION})."

# === OFF-BOX COPY — TODO ===
# A backup on the same VPS/disk as the database does NOT survive disk/VPS loss. Once a
# provider is chosen, push the archive off-box here, e.g.:
#   rclone copy "${BACKUP_DIR}/${ARCHIVE}" remote:flashcards-backups/
# Note: ${ARCHIVE} is root-owned on the host (see above), so the copy step may need
# `sudo` or to run via `docker exec mongo`.
# ===========================

echo "[$(date)] Done."

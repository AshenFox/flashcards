# infra/

All infrastructure for the self-hosted stack lives here — one folder, no scattered paths across the VPS filesystem. Docker bind-mounts these directories into the containers using paths relative to the project root.

## Structure

```
infra/
├── README.md          # this file
├── mongo/
│   └── init.js        # first-boot hook — runs once on empty DB (no indexes;    [committed]
│                      # those live in the Mongoose schemas)
├── scripts/
│   ├── bootstrap.sh        # new-VPS first-boot automation (npm run db-bootstrap) [committed]
│   ├── backup.sh           # weekly mongodump (installed as a cron)              [committed]
│   └── backup-manual.sh    # interactive manual backup tool (npm run db-backup)  [committed]
├── data/              # MongoDB data files (WiredTiger)                        [gitignored]
├── uploads/           # uploaded card images                                   [gitignored]
└── backups/           # gzip archives — weekly (flashcards-weekly-*) +         [gitignored]
                       # manual (flashcards-manual-*), same .archive.gz format
```

## What's committed vs gitignored

| Path | In git? | Why |
|---|---|---|
| `mongo/init.js` | ✅ | Config — reproducible DB setup |
| `scripts/bootstrap.sh` | ✅ | Config — reproducible deploy |
| `scripts/backup.sh` | ✅ | Config — reproducible backup job |
| `scripts/backup-manual.sh` | ✅ | Config — reproducible manual export tool |
| `data/` | ❌ | Live binary DB files, file-locked, can be GBs |
| `uploads/` | ❌ | User data |
| `backups/` | ❌ | Gzip archives — weekly cron (`flashcards-weekly-*`) and manual (`flashcards-manual-*`, `npm run db-backup`) |

The runtime dirs are kept (via `.gitkeep`) but their contents are ignored.

## Bind mounts (docker-compose.prod.yaml)

```yaml
mongo:
  volumes:
    - ./infra/data:/data/db
    - ./infra/backups:/backups
    - ./infra/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro
app:
  volumes:
    - ./infra/uploads:/app/uploads
```

## Backups

`bootstrap.sh` installs a weekly **user** cron (Sundays 03:00) that runs `backup.sh`:

```
0 3 * * 0  cd <project> && ./infra/scripts/backup.sh >> ./infra/backups/backup.log 2>&1
```

Each run writes a timestamped gzip archive (`backups/flashcards-weekly-YYYY-MM-DD.archive.gz`) via `docker exec mongo mongodump`, then prunes to the newest **8** (~2 months). The prune matches **only** the `flashcards-weekly-*` prefix, so manual archives written by the tool below (`flashcards-manual-*`) are never auto-deleted, even when they share the `backups/` folder. `bootstrap.sh` restores from the newest archive on a fresh VPS.

⚠️ These archives live on the **same disk as the database**, so they survive a bad migration or dropped collection but **not** disk/VPS loss. The `# OFF-BOX COPY — TODO` hook in `backup.sh` is where to add an off-site copy (rclone/S3/etc.) once a provider is chosen — do this before relying on it as your only backup.

### Manual commands

For an interactive one-off, use the manual tool — it asks for a source **URI** (Enter =
local container, or paste a remote one such as Atlas) and writes a timestamped
`flashcards-manual-<timestamp>.archive.gz` into `backups/`. The `-manual-` prefix keeps it
clear of the weekly retention prune (which only matches `flashcards-weekly-*`), so manual
archives are never auto-deleted:

```bash
npm run db-backup         # → infra/scripts/backup-manual.sh
```

Or run the automated weekly backup directly (same as the cron, incl. retention prune):

```bash
./infra/scripts/backup.sh
```

For ad-hoc `mongodump`/`mongorestore`, run them **inside** the `mongo` container with
`docker exec mongo sh -c '…'`. Wrapping the command in `sh -c '…'` (single quotes) is what
makes these portable: the credentials are expanded from the container's own environment,
and the host shell never touches the quotes or paths — so the **same line works in
PowerShell and Git Bash**. (Passing creds/paths directly on the host fails: `$URI`-style
vars don't expand in PowerShell, and Git Bash rewrites a leading `/backups` into a bogus
`C:/Program Files/Git/backups`.)

Paths use `./backups`, which is relative to the container's working dir (`/`) and so maps to
the host's `infra/backups`. (A leading `/backups` is equivalent here but gets mangled by Git
Bash — see above — so the `./` form is the portable choice.) All archives share the same
gzip-archive format and live in `backups/`; the filename prefix (`-weekly-` vs `-manual-`)
is what distinguishes the automated job from hand-made exports.

```bash
# Manual backup archive → infra/backups/flashcards-manual-<date>.archive.gz
docker exec mongo sh -c 'mongodump --uri="mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost/flashcards?authSource=admin" --archive=./backups/flashcards-manual-$(date +%F).archive.gz --gzip'
```

```bash
# Restore from an archive (replaces existing data — note --drop)
docker exec mongo sh -c 'mongorestore --uri="mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost/flashcards?authSource=admin" --drop --gzip --archive=./backups/flashcards-weekly-2026-06-18.archive.gz'
```

> `--drop` removes each collection before restoring it. Omit it to merge into existing data instead of replacing.

## Connecting with MongoDB Compass

Credentials come from `packages/config/.env.server` (`MONGO_INITDB_ROOT_USERNAME` /
`MONGO_INITDB_ROOT_PASSWORD`). The root user lives in the `admin` database, so every
connection string needs `?authSource=admin`.

### Local (dev)

`docker-compose.dev.yaml` publishes `27017:27017`, so connect straight to localhost:

```
mongodb://<user>:<pass>@localhost:27017/?authSource=admin
```

### VPS (prod) — over an SSH tunnel

Prod publishes Mongo on the VPS **loopback only** (`127.0.0.1:27017`), so it is not
reachable from the internet — you reach it by tunnelling through SSH. Use a *different*
local port (e.g. 27018) so it doesn't clash with a local dev Mongo on 27017:

```bash
# Keep this running in a terminal; forwards laptop:27018 → VPS-internal mongo:27017
ssh -L 27018:localhost:27017 <user>@<vps-host>
```

Then point Compass at the tunnel:

```
mongodb://<user>:<pass>@localhost:27018/?authSource=admin
```

Alternatively, use Compass's built-in SSH support: fill the connection as
`localhost:27017` + `authSource=admin`, then under **Advanced → Proxy/SSH** choose
*SSH with Identity File*, and enter the VPS host, your SSH user, and key. Compass opens
the tunnel for you.

## ⚠️ Warning

`data/` (and `backups/`) hold the live database and its archives inside the repo working tree. Normal git operations ignore them, but **never run `git clean -fdx` on the VPS** — that wipes gitignored files, including your database and every backup.

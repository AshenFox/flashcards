# Image Upload Plan

## Filesystem + Sharp

**Problem:** `imgurl` currently stores external web URLs which can go dead. No user upload support.

**Solution:** Support both external URLs and locally stored uploaded images. No schema change needed — `imgurl` stays a `string`; a local path like `/uploads/abc123.webp` is just another string value. The client renders both identically.

---

### Docker volume (persistent storage across container restarts)

In `docker-compose.prod.yml` (consolidated under `infra/` — see [infra/README.md](infra/README.md)):
```yaml
volumes:
  - ./infra/uploads:/app/uploads
```

`infra/uploads` is gitignored but tracked via `.gitkeep`, so it exists on clone (and `bootstrap.sh` creates it defensively).

---

### Nginx — serve uploads directly from disk

```nginx
location /uploads/ {
    alias /path/to/flashcards/infra/uploads/;
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

Image requests bypass Node entirely — nginx serves them straight from disk.

---

### Upload endpoint — `POST /api/edit/card/image`

New dependencies: `multer` (file handling) + `sharp` (compression).

Flow:
1. Client posts image file
2. Server validates, compresses, saves to `/app/uploads/<userId>/<uuid>.webp`
3. Returns `{ imgurl: "/uploads/<userId>/<uuid>.webp" }`
4. Client saves that string via the normal card save route

On card delete: if `imgurl` starts with `/uploads/`, delete the file from disk.

---

### Security layers

| Layer | What it does |
|---|---|
| multer `fileFilter` | Rejects non-image MIME types as first gate |
| `limits.fileSize` | Caps upload at 5MB to prevent DoS |
| Sharp re-encoding | Actually decodes the file — executables, scripts, polyglots all fail here. Strongest check. |
| UUID filename | Never use original filename — eliminates path traversal |
| Per-user directory | `/uploads/<userId>/` — users can only affect their own files |
| Nginx static serving | Uploads directory has no script execution, ever |

---

### Why not MinIO/S3

MinIO is a self-hosted S3-compatible object storage service. Benefits: S3-compatible API, web UI, presigned URLs, multi-server scaling. Cost: another Docker container (~100-200MB RAM), more setup, still writes to the filesystem under the hood.

**Decision:** Filesystem is sufficient for a single-VPS personal project. If the app ever scales to multiple servers, migrating to MinIO or AWS S3 at that point is straightforward.

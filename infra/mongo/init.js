// First-boot DB init — runs once when MongoDB initializes an empty /data/db,
// in the context of MONGO_INITDB_DATABASE (flashcards). It runs before/independent
// of any mongorestore.
//
// Indexes are NOT defined here: they live in the Mongoose schemas
// (apps/server/src/models/*.ts) so they self-heal on every app connect, including
// future additions on already-initialized deployments. This file is kept as the
// mount target and a hook for any future one-time first-boot setup.

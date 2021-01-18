// server.js
// const path = require('path');
const express = require('express');
const connectDB = require('../config/db');
const next = require('next');

const webpush = require('web-push');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Connect database
connectDB();

// Tune next.js
const app = next({ dev });

const handle = app.getRequestHandler();

// Tune server
const server = express();

server.use(express.json({ extended: false }));

// ----------
// ----------
// ----------

// Define routes
server.use('/api/auth', require('./routes/auth'));
server.use('/api/main', require('./routes/main'));
server.use('/api/imgsearch', require('./routes/img_search'));
server.use('/api/scrape', require('./routes/scrape'));
server.use('/api/edit', require('./routes/edit'));
server.use('/api/sr', require('./routes/sr'));

server.all('*', (req, res) => {
  return handle(req, res);
});

// ----------
// ----------
// ----------

// Push notifications
const publicVapidKey =
  '***REMOVED***';
const privateVapidKey = '***REMOVED***';

webpush.setVapidDetails('***REMOVED***', publicVapidKey, privateVapidKey);

/* let pushInterval = setInterval(async () => {
  await notifications.sendNotifications();
}, 5000); */

// ----------
// ----------
// ----------

const start = async () => {
  try {
    // Prepare next.js
    await app.prepare();
    console.log(`Next.js is ready`);
    // Start server
    await server.listen(port);
    console.log(`Server is ready on http://localhost:${port}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();

// ====================
// ====================
// ====================

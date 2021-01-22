// server.js
// const path = require('path');
const express = require('express');
const connectDB = require('../config/db');
const next = require('next');
const config = require('config');

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
server.use('/api/notifications', require('./routes/notifications'));

server.all('*', (req, res) => {
  return handle(req, res);
});

// ----------
// ----------
// ----------

// Push notifications

const { send_notifications } = require('./supplemental/notifications_control');

const publicVapidKey = config.get('publicVapidKey');
const privateVapidKey = config.get('privateVapidKey');
const webpushSubject = config.get('webpushSubject');

webpush.setVapidDetails(webpushSubject, publicVapidKey, privateVapidKey);

let pushInterval = setInterval(async () => {
  await send_notifications();
}, 5000);

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

// ----------
// ----------
// ----------

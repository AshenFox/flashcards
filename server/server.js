// server.js
// const path = require('path');
const express = require('express');
const connectDB = require('../config/db');
const next = require('next');
const config = require('config');
const https = require('https');
const fs = require('fs');

const webpush = require('web-push');

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';

const credentials = {};

if (dev) {
  credentials.key = fs.readFileSync('.cert/key.pem', 'utf8');
  credentials.cert = fs.readFileSync('.cert/cert.pem', 'utf8');
  credentials.passphrase = 'cats';
}

// Connect database
connectDB();

// Tune next.js
const nextApp = next({ dev });

const handle = nextApp.getRequestHandler();

// Tune server
const expressServer = express();

expressServer.use(express.json({ extended: false }));

// ----------
// ----------
// ----------

// Define routes
expressServer.use('/api/auth', require('./routes/auth'));
expressServer.use('/api/main', require('./routes/main'));
expressServer.use('/api/imgsearch', require('./routes/img_search'));
expressServer.use('/api/scrape', require('./routes/scrape'));
expressServer.use('/api/edit', require('./routes/edit'));
expressServer.use('/api/sr', require('./routes/sr'));
expressServer.use('/api/notifications', require('./routes/notifications'));

expressServer.all('*', (req, res) => {
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
    await nextApp.prepare();
    console.log(`Next.js is ready`);
    // Start server
    if (dev) {
      await https.createServer(credentials, expressServer).listen(port);
    } else {
      await expressServer.listen(port);
    }
    console.log(`Server is ready on https://localhost:${port}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();

// ----------
// ----------
// ----------

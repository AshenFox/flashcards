// dependencies
import express from 'express';
import connectDB from '../config/db';
import next from 'next';
import config from 'config';
import https from 'https';
import fs from 'fs';

// import routes
import auth from './routes/auth.js';
import main from './routes/main.js';
import img_search from './routes/img_search.js';
import scrape from './routes/scrape.js';
import edit from './routes/edit.js';
import sr from './routes/sr.js';
import notifications from './routes/notifications.js';

const webpush = require('web-push');

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';

interface Credentials {
  key?: string;
  cert?: string;
  passphrase?: string;
}

const credentials: Credentials = {};

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

// expressServer.use(express.json({ extended: false }));
expressServer.use(express.urlencoded({ extended: false }));
expressServer.use(express.json());

// ----------
// ----------
// ----------

// Define routes
expressServer.use('/api/auth', auth);
expressServer.use('/api/main', main);
expressServer.use('/api/imgsearch', img_search);
expressServer.use('/api/scrape', scrape);
expressServer.use('/api/edit', edit);
expressServer.use('/api/sr', sr);
expressServer.use('/api/notifications', notifications);

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
    console.error(err);
    process.exit(1);
  }
};

start();

// ----------
// ----------
// ----------

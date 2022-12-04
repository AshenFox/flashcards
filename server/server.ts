// dependencies
import express from 'express';
import connectDB from './supplemental/db';
import next from 'next';
import config from 'config';
import https, { ServerOptions } from 'https';
import fs from 'fs';
import webpush from 'web-push';
import notifications_control from './supplemental/notifications_control';

// import routes
import auth from './routes/auth';
import main from './routes/main';
import img_search from './routes/img_search';
import scrape from './routes/scrape';
import edit from './routes/edit';
import sr from './routes/sr';
import notifications from './routes/notifications';

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';

const serverOptions: ServerOptions = {};

if (dev) {
  serverOptions.key = fs.readFileSync('.cert/key.pem', 'utf8');
  serverOptions.cert = fs.readFileSync('.cert/cert.pem', 'utf8');
  serverOptions.passphrase = 'cats';
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

const { send_notifications } = notifications_control;

const publicVapidKey = config.get('publicVapidKey') as string;
const privateVapidKey = config.get('privateVapidKey') as string;
const webpushSubject = config.get('webpushSubject') as string;

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
      await https.createServer(serverOptions, expressServer).listen(port);
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

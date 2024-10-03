import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import ConnectMongoDBSession from 'connect-mongodb-session';
import session from 'express-session';
const port = process.env.PORT || 3000;
const start = async () => {
  const app = express();
  await initializeDb();
  const admin = new AdminJS(options);
  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }
  const MongoDBStore = ConnectMongoDBSession(session);
  console.log(process.env.DATABASE_URL);

  const sessionStore = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: 'sessions',
  });
  sessionStore.on('error', (error) => {
    console.log('Session store error', error);
  });
  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      store: sessionStore,
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );
  app.use(admin.options.rootPath, router);
  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};
start();

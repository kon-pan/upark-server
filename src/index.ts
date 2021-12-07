import express from 'express';
import cors from 'cors';
import driverRouter from './routes/driver/router.driver';
import passport from 'passport';
import localAuth from './util/passport/passport.local';
import session from 'express-session';
import Driver from './models/Driver';
import { IPostgresDriver } from './interfaces/interface.driver';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_HOSTNAME, credentials: true }));
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passport.use(localAuth);

passport.serializeUser((user: IPostgresDriver, done: any) => {
  console.log('Serialize', user.id);

  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: any) => {

  try {
    const user = await Driver.findOne('id', id);
    console.log('Deserialize', user);

    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

// API ROUTING
app.use('/driver', driverRouter);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

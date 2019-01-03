import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import json from 'koa-json';
import serve from 'koa-static';
import mount from 'koa-mount';
import config from './config';
import Router from './router/index';
import passport from './assets/passport';
import errorHandling from './assets/errors';

//node --experimental-modules desov.mjs

const app = new Koa();

app.keys = ['secret'];
app.use(session({}, app));
app.use(bodyParser());

app.use(json());

app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandling);

app.use(mount('/static', serve(config.permanentFileDirectory)));

app.use(Router.routes());

app.listen(config.port);
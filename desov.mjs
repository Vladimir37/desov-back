import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import json from 'koa-json';
import Router from './router/index';
import passport from './assets/passport';
import errorHandling from './assets/errors';

const app = new Koa();

app.keys = ['secret'];
app.use(session({}, app));
app.use(bodyParser());

app.use(json());

app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandling);

app.use(Router.routes());
//node --experimental-modules desov.mjs
app.listen(3000);
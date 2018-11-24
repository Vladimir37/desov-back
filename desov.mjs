import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import Router from './router/index';

const app = new Koa();

app.keys = ['secret'];
app.use(session({}, app));
app.use(bodyParser());

// app.use(passport.initialize());
// app.use(passport.session());

app.use(Router.routes());

app.listen(3000);
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import captcha from 'koa-captcha-v2';
import json from 'koa-json';
import serve from 'koa-static';
import mount from 'koa-mount';
import config from './config';
import Router from './router/index';
import passport from './assets/passport';
import errorHandling from './assets/errors';

//node --experimental-modules desov.mjs

const captchaConfig = {
    background: '#593196',
    background_image: null,
    case_sensitivity: false,
    char_pool: '0123456789',
    char_length: 6,
    color: '#FFF',
    font_family: 'SpicyRice',
    font_size: '30px',
    font_style: 'normal',
    font_weight: 'normal',
    fonts: {},
    height: 60,
    prefix: 'captcha_',
    rotate: 30,
    timeout_in: 60 * 1000,
    type: 'character',
    width: 160,
};

const app = new Koa();

app.keys = ['secret'];
app.use(session({}, app));
app.use(bodyParser());

app.use(json());

app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandling);

app.use(captcha(captchaConfig));

app.use(mount('/static', serve(config.permanentFileDirectory)));

app.use(Router.routes());

app.listen(config.port);
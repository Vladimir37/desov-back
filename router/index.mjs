import Router from 'koa-router';
import admin from './admin';

let router = new Router();

router.use(admin.routes());

export default router;
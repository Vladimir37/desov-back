import Router from 'koa-router';
import auth from './auth';
import admin from './admin';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/admin', admin.routes());

export default router;
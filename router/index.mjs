import Router from 'koa-router';
import auth from './auth';
import admin from './admin';
import find from './find';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/admin', admin.routes());
router.use('/find', find.routes());

export default router;
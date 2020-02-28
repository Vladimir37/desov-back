import Router from 'koa-router';
import auth from './auth';
import admin from './admin';
import find from './find';
import issue from './issue';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/admin', admin.routes());
router.use('/find', find.routes());
router.use('/issue', issue.routes());

export default router;
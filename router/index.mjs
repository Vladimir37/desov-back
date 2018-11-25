import Router from 'koa-router';
import auth from './auth';

let router = new Router();

router.use('/auth', auth.routes());

export default router;
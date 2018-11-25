import Router from 'koa-router';
import auth from './auth';
import users from './admin/users';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/users', users.routes());

export default router;
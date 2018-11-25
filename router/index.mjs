import Router from 'koa-router';
import auth from './auth';
import users from './admin/users';
import password from './admin/password';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/users', users.routes());
router.use('/password', password.routes());

export default router;
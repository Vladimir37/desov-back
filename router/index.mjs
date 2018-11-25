import Router from 'koa-router';
import auth from './auth';
import users from './admin/users';
import errorHandling from '../assets/errors';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/users', users.routes());

// router.use(errorHandling);

export default router;
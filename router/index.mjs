import Router from 'koa-router';
import Middlewares from '../assets/middlewares';
import auth from './auth';
import users from './admin/users';
import password from './admin/password';
import oblast from './admin/oblast';
import city from './admin/city';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/users', Middlewares.forAdmin, users.routes());
router.use('/password', Middlewares.forAll, password.routes());
router.use('/oblast', Middlewares.forAll, oblast.routes());
router.use('/city', Middlewares.forAll, city.routes());

export default router;
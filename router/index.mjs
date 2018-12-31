import Router from 'koa-router';
import Middlewares from '../assets/middlewares';
import auth from './auth';
import users from './admin/users';
import password from './admin/password';
import oblast from './admin/oblast';
import city from './admin/city';
import street from './admin/street';
import district from './admin/district';
import person from './admin/person';
import metro from './admin/metro';

let router = new Router();

router.use('/auth', auth.routes());
router.use('/users', Middlewares.forAdmin, users.routes());
router.use('/password', Middlewares.forAll, password.routes());
router.use('/oblast', Middlewares.forAll, oblast.routes());
router.use('/city', Middlewares.forAll, city.routes());
router.use('/street', Middlewares.forAll, street.routes());
router.use('/district', Middlewares.forAll, district.routes());
router.use('/person', Middlewares.forAdmin, person.routes());
router.use('/metro', Middlewares.forAdmin, metro.routes());

export default router;
import Router from 'koa-router';
import Users from '../../controllers/admin/users';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.user), Users.create);
router.post('/edit', Users.edit);
router.post('/deactivate', Users.deactivate);

export default router;
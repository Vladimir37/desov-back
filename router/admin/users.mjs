import Router from 'koa-router';
import Users from '../../controllers/admin/users';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.createUser), Users.create);
router.post('/edit', Validation(Validators.editUser), Users.edit);
router.post('/deactivate', Validation(Validators.id), Users.deactivate);

export default router;
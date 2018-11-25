import Router from 'koa-router';
import Password from '../../controllers/admin/password';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/', Validation(Validators.changePass), Password.change);

export default router;
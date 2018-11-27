import Router from 'koa-router';
import Oblast from '../../controllers/admin/oblast';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.changePass), Oblast.create);
router.post('/edit', Validation(Validators.changePass), Oblast.edit);


export default router;
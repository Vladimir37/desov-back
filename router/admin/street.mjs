import Router from 'koa-router';
import Street from '../../controllers/admin/street';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.createStreet), Street.create);
router.post('/edit', Validation(Validators.editStreet), Street.edit);

export default router;
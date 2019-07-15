import Router from 'koa-router';
import Details from '../../controllers/admin/details';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.createDetails), Details.create);
router.post('/edit', Validation(Validators.editDetails), Details.edit);

export default router;
import Router from 'koa-router';
import City from '../../controllers/admin/city';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.createCity), City.create);
router.post('/edit', Validation(Validators.editCity), City.edit);

export default router;
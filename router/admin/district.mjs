import Router from 'koa-router';
import District from '../../controllers/admin/district';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.createDistrict), District.create);
router.post('/edit', Validation(Validators.editDistrict), District.edit);

export default router;
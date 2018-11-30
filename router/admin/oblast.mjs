import Router from 'koa-router';
import Oblast from '../../controllers/admin/oblast';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.createOblast), Oblast.create);
router.post('/edit', Validation(Validators.editOblast), Oblast.edit);

export default router;
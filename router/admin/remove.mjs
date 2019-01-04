import Router from 'koa-router';
import Remove from '../../controllers/admin/remove';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/oblast', Validation(Validators.remove), Remove.removeOblast);
router.post('/city', Validation(Validators.remove), Remove.removeCity);
router.post('/street', Validation(Validators.id), Remove.removeStreet);
router.post('/district', Validation(Validators.id), Remove.removeDistrict);
router.post('/monument', Validation(Validators.id), Remove.removeMonument);
router.post('/other', Validation(Validators.id), Remove.removeOther);
router.post('/company', Validation(Validators.id), Remove.removeCompany);

export default router;
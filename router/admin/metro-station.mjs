import Router from 'koa-router';
import MetroStation from '../../controllers/admin/metro-station';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

let router = new Router();

router.post('/create', Validation(Validators.createMetroStation), MetroStation.create);
router.post('/edit', Validation(Validators.editMetroStation), MetroStation.edit);
router.post('/remove', Validation(Validators.id), MetroStation.remove);

export default router;
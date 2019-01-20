import Router from 'koa-router';
import Validation from 'koa2-validation';
import Validators from '../assets/validators';
import Find from '../controllers/find';

let router = new Router();

router.get('/oblast', Find.oblast);
router.get('/city', Validation(Validators.getCity), Find.city);
router.get('/metro', Validation(Validators.getMetro), Find.metro);
router.get('/metro-station', Validation(Validators.getMetroStation), Find.metroStation);
router.get('/street', Validation(Validators.getStreet), Find.street);
router.get('/district', Validation(Validators.getDistrict), Find.district);
router.get('/monument', Validation(Validators.getMonument), Find.monument);
router.get('/other', Validation(Validators.getOther), Find.other);

export default router;
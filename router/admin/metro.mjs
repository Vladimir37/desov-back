import Router from 'koa-router';
import multer from 'koa-multer';
import Metro from '../../controllers/admin/Metro';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

const upload = multer({ 
    dest: 'temp/',
    limits: {
        fileSize: 524288
    }
});

let router = new Router();

router.post('/create', upload.single('logo'), Metro.create);
router.post('/edit', Validation(Validators.editMetro), Metro.edit);
router.post('/image', upload.single('logo'), Metro.image);
router.post('/remove', Validation(Validators.id), Metro.remove);

export default router;
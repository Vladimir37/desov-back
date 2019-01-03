import Router from 'koa-router';
import multer from 'koa-multer';
import config from '../../config';
import Other from '../../controllers/admin/other';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

const upload = multer({ 
    dest: config.tempFileDirectory,
    limits: {
        fileSize: config.maxFileSize
    }
});

let router = new Router();

router.post('/create', upload.single('photo'), Other.create);
router.post('/edit', Validation(Validators.editOther), Other.edit);
router.post('/image', upload.single('photo'), Other.image);

export default router;
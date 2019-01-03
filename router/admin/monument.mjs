import Router from 'koa-router';
import multer from 'koa-multer';
import config from '../../config';
import Monument from '../../controllers/admin/monument';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

const upload = multer({ 
    dest: config.tempFileDirectory,
    limits: {
        fileSize: config.maxFileSize
    }
});

let router = new Router();

router.post('/create', upload.single('photo'), Monument.create);
router.post('/edit', Validation(Validators.editMonument), Monument.edit);
router.post('/image', upload.single('photo'), Monument.image);

export default router;
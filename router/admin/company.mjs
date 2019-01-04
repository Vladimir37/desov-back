import Router from 'koa-router';
import multer from 'koa-multer';
import config from '../../config';
import Company from '../../controllers/admin/company';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

const upload = multer({ 
    dest: config.tempFileDirectory,
    limits: {
        fileSize: config.maxFileSize
    }
});

let router = new Router();

router.post('/create', upload.single('logo'), Company.create);
router.post('/edit', Validation(Validators.editCompany), Company.edit);
router.post('/image', upload.single('logo'), Company.image);

export default router;
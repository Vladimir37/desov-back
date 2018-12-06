import Router from 'koa-router';
import multer from 'koa-multer';
import Person from '../../controllers/admin/person';
import Validation from 'koa2-validation';
import Validators from '../../assets/validators';

const upload = multer({ 
    dest: 'temp/',
    limits: {
        fileSize: 524288
    }
});

let router = new Router();

router.post('/create', upload.single('photo'), Person.create);
router.post('/edit', Validation(Validators.editPerson), Person.edit);
router.post('/image', upload.single('photo'), Person.image);
router.post('/remove', Validation(Validators.id), Person.remove);

export default router;
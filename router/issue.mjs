import Router from 'koa-router';
import Validation from 'koa2-validation';
import Validators from '../assets/validators';
import Issue from '../controllers/issue';

let router = new Router();

router.post('/create', Validation(Validators.createIssue), Issue.create);

export default router;
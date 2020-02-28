import Router from 'koa-router';
import Validation from 'koa2-validation';
import Validators from '../assets/validators';
import Issue from '../../controllers/admin/issue';

let router = new Router();

router.get('/get', Issue.getAllIssues);
router.post('/close', Validation(Validators.closeIssue), Issue.closeIssue);
router.post('/close-by-ip', Validation(Validators.closeIssueByIP), Issue.closeByIp);
router.post('/close-all', Issue.closeAll);

export default router;
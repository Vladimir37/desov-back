import Router from 'koa-router';
import Auth from '../controllers/auth';

let router = new Router();

router.get('/status', Auth.getStatus);
router.post('/login', Auth.login);
router.post('/logout', Auth.logout);

export default router;
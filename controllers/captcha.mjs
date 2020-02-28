import config from '../config';

export default {
    getCaptcha(ctx) {
        ctx.type = ctx.captcha.type;
        ctx.body = ctx.captcha.refresh(config.captchaKey, 5 * 60 * 1000);
        return;
    }
}
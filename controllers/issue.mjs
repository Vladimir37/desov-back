import {
    IssueModel
} from "../models/models";
import config from '../config';

export default {
    async create(ctx) {
        const captcha = ctx.request.body.captcha;
        const captchaResult = ctx.captcha.verify(config.captchaKey, captcha);

        if (!captchaResult) {
            ctx.throw(400, 'Incorrect captcha');
        }

        await IssueModel.create({
            ip: ctx.request.ip,
            text: ctx.request.body.text,
            mail: ctx.request.body.mail,
            active: true,
        });
        ctx.body = {
            success: true,
        };
    }
}
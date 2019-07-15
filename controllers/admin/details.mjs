import { DetailModel } from '../../models/models';

export default {
    async create(ctx) {
        await DetailModel.create({
            title: ctx.request.body.title,
            text: ctx.request.body.text,
            regex: ctx.request.body.regex,
            hidden: ctx.request.body.hidden,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let detail = await DetailModel.findById(ctx.request.body.id);
        if (!detail) {
            ctx.throw(400, 'Incorrect details id');
        }

        detail.title = ctx.request.body.title;
        detail.text = ctx.request.body.text;
        detail.regex = ctx.request.body.regex;
        detail.hidden = ctx.request.body.hidden;

        await detail.save();
        
        ctx.body = {
            success: true,
        };
    }
}
import { OblastModel } from '../../models/models';

export default {
    async create(ctx) {
        await OblastModel.create({
            old_name: ctx.request.body.old_name,
            new_name: ctx.request.body.new_name,
            to_rename: ctx.request.body.to_rename,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let oblast = await OblastModel.findById(ctx.request.body.id);
        if (!oblast) {
            ctx.throw(400, 'Incorrect id');
        }
        
        oblast.old_name = ctx.request.body.old_name;
        oblast.new_name = ctx.request.body.new_name;
        oblast.to_rename = ctx.request.body.to_rename;

        await oblast.save();

        ctx.body = {
            success: true,
        };
    },
}
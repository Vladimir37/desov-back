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
        let oblast = OblastModel.findById(ctx.request.body.id);
        
    },
}
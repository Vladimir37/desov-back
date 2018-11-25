import md5 from 'md5';
import { UserModel } from '../../models/models';

export default {
    async create(ctx) {
        const user = await UserModel.findOne({
            login: ctx.request.body.login,
        });
        if (user) {
            ctx.throw(400, 'Login already in use');
        }
        await UserModel.create({
            status: ctx.request.body.status,
            login: ctx.request.body.login,
            pass: md5(ctx.request.body.pass),
            active: true,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        const user = await UserModel.findById(ctx.request.body.id);
        if (!user) {
            ctx.throw(400, 'User not found');
        }
        if (ctx.request.body.login != user.login) {
            const userWithNewName = await UserModel.findOne({
                login: ctx.request.body.login,
            });
            if (userWithNewName) {
                ctx.throw(400, 'Login already in use');
            }
        }
        user.login = ctx.request.body.login;
        user.status = ctx.request.body.status;
        await user.save();
        ctx.body = {
            success: true,
        };
    },
    async deactivate(ctx) {
        const user = await UserModel.findById(ctx.request.body.id);
        if (!user) {
            ctx.throw(400, 'User not found');
        }
        user.active = false;
        await user.save();
        ctx.body = {
            success: true,
        };
    }
}
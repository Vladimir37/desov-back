import md5 from 'md5';
import { UserModel } from '../../models/models';

export default {
    async change(ctx) {
        let user = await UserModel.findById(ctx.state.user._id);
        if (!user) {
            ctx.throw(400, 'User not found');
        }
        if (user.pass != md5(ctx.request.body.old_pass)) {
            ctx.throw(403, 'Invalid old password');
        }
        user.pass = md5(ctx.request.body.new_pass);
        await user.save();
        ctx.body = {
            success: true,
        };
    }
}
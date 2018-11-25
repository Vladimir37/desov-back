import passport from '../assets/passport';

export default {
    getStatus(ctx) {
        ctx.body = {
            logged: ctx.isAuthenticated(),
            user: ctx.state.user,
        };
    },
    login(ctx) {
        return passport.authenticate('local', function(err, user) {
            if (user === false) {
                ctx.body = { 
                    success: false,
                }
                ctx.throw(401);
            } else {
                ctx.body = {
                    success: true,
                };
                return ctx.login(user);
            }
        })(ctx);
    },
    logout(ctx) {
        ctx.logout();
        ctx.body = {
            success: true,
        };
    },
}
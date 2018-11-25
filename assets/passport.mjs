import passport from 'koa-passport';
import local from 'passport-local';
import md5 from 'md5';
import { UserModel } from '../models/models';

const LocalStrategy = local.Strategy;

passport.use(new LocalStrategy(
    (login, pass, done) => {
        const passHash = md5(pass);
        UserModel.findOne({
            login,
            active: true,
        }).then(user => {
            if (!user || user.pass != passHash) {
                done(null, false);
            }
            user.pass = '';
            done(null, user);
        }).catch(err => {
            done(err);
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        user.pass = '';
        done(err, user);
    })
});

export default passport;
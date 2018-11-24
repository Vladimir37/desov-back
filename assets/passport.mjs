import passport from 'koa-passport';
import {Strategy} from 'passport-local';
import md5 from 'md5';
import {User} from '../models/models';

passport.use(new Strategy(
    (login, pass, done) => {
        User.findOne({username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user || !user.checkPassword(password)) {
                return done(null, false, {message: ''});
            }
            return done(null, user);
        });
        User.findOne({username}).then(result => {
            //
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user.username);
    })
});
module.exports = passport;
import { localStrategy } from './localStrategy.js';

export function initializePassport(passport) {
    passport.use(localStrategy);

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function (user, done) {
        done(null, user);
    });
}

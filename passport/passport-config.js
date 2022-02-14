const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

function initialize(passport) {

    passport.use(new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const user = await User.find(email);

                if (user[0].length !== 1) {
                    const error = new Error('Wrong Credentials.');
                    error.statusCode = 401;
                    throw error;
                }
                const storedUser = user[0][0];
                const isEqual = await bcrypt.compare(password, storedUser.password);

                if (!isEqual) {
                    const error = new Error('Wrong Credentials.');
                    error.statusCode = 401;
                    throw error;
                }
                delete user[0][0]['password'];
                return done(null, user[0][0]);

            } catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                done(err);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function (user, done) {
        done(null, user)
    });
}

module.exports = initialize;
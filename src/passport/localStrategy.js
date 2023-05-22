import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

const authenticateUser = async (req, email, password, done) => {
    try {
        const [user] = await User.findByEmail(email);

        if (user.length !== 1) {
            const error = new Error('Wrong Credentials...');
            error.statusCode = 401;
            throw error;
        }
        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(password, storedUser.password);

        if (!isEqual) {
            const error = new Error('Wrong Credentials...');
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
};

export const localStrategy = new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    authenticateUser
);

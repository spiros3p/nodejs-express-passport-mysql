import { User } from '../models/user.model.js';

export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ statusCode: 401, message: 'not authenticated' });
}

export function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.status(400).json({
            statusCode: 400,
            message: 'Already authenticated',
        });
        return;
    }
    next();
}

export async function checkAdmin(req, res, next) {
    try {
        const email = req.session.passport.user.email;
        const [user] = await User.findByEmail(email);
        if (!user[0].isAdmin) {
            res.status(403).json({
                statusCode: 403,
                message: 'No Admin status found',
            });
            return;
        }
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function checkIsAccepted(req, res, next) {
    try {
        const email = req.session.passport.user.email;
        const [user] = await User.findByEmail(email);
        if (!user[0].isAllowed) {
            req.logout();
            res.status(403).json({
                statusCode: 403,
                message: 'Not accepted yet',
            });
            return;
        }
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

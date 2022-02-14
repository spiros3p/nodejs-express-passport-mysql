const User = require('../models/user');

exports.checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(400).json({ "statusCode": 400, "message": "not authenticated" })
}

exports.checkNotAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.status(400).json({ "statusCode": 400, "message": "Already authenticated" })
        return
    }
    next()
}

exports.checkAdmin = async function (req, res, next) {
    try {
        const user = await User.find(req.session.passport.user.email);
        if (!user[0][0].admin) {
            res.status(400).json({ "statusCode": 400, "message": "No Admin status found" })
            return
        }
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.checkAccepted = async function (req, res, next) {
    try {
        const user = await User.find(req.session.passport.user.email);
        if (!user[0][0].accepted) {
            req.logout();
            res.status(400).json({ "statusCode": 400, "message": "Not accepted yet" })
            return
        }
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
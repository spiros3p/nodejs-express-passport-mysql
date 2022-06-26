const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const path = require('path');

const User = require('../models/user');

exports.checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

exports.checkNotAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        // res.status(400).json({ "statusCode": 400, "message": "Already authenticated" })
        res.redirect('/home');
        return
    }
    next();
}

exports.checkAccepted = async function (req, res, next) {
    try {
        const user = await User.find(req.session.passport.user.email);
        if (!user[0][0].accepted) {
            req.logout();
            req.redirect('/');
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

exports.renderLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
}

exports.renderHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
}

exports.renderSignup = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors[0] });
    };

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword,
        };

        const result = await User.create(userDetails);
        res.redirect('/');

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
export function logout(req, res, next) {
    try {
        req.logout();

        res.clearCookie('connect.sid'); // clean up!
        res.status(200).json({ message: 'Succsesfully logged out...' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export function okRespone(req, res) {
    res.status(200).json({ statusCode: 200 });
}

export function loginResponse(req, res) {
    delete req.user['password'];
    res.status(200).json({ user: req.user });
}


const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.logout = (req, res, next) => {
  try {
    req.logout();
    res.status(200).json({ "statusCode": 200, "message": "Succsesfully Logged Out" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
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
    res.status(201).json({ message: 'User registered!' });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
const User = require('../models/user');

exports.fetchUsers = async (req, res, next) => {
  try {
    const [allUsers] = await User.fetchAllUsers();
    res.status(200).json(removePassword(allUsers));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const deleteResponse = await User.delete(req.params.id);
    if (deleteResponse[0].affectedRows) {
      res.status(200).json({ message: 'User was succesfully deleted' });
    } else {
      res.status(400).json({ "statusCode": 400, "message": "User Not Found" })
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.toggleUserAccepted = async (req, res, next) => {
  try {
    const result = await User.toggleUserAccepted(req.params.id);
    if (result[0].affectedRows) {
      res.status(201).json({ message: 'User acceptance in the app changed!' });
    } else {
      res.status(400).json({ "statusCode": 400, "message": "User Not Found" })
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

function removePassword(users) {
  for (let user in users) {
    delete users[user]['password'];
  }
  return users;
}
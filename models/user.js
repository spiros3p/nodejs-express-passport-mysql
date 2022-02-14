const db = require('../db/db.mysql');

module.exports = class User {

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static find(email) {
    return db.execute(
      'SELECT * FROM tbl_users WHERE email = ?',
      [email]
    );
  }

  static findById(id) {
    return db.execute(
      'SELECT * FROM tbl_users WHERE id = ?',
      [id]
    );
  }

  static fetchAllUsers() {
    return db.execute(
      'SELECT * FROM tbl_users'
    );
  }

  static delete(id){
    return db.execute(
      'DELETE FROM tbl_users WHERE id = ?',
      [id]
    );
  }

  static save(user) {
    return db.execute(
      'INSERT INTO tbl_users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    );
  }

  static toggleUserAccepted(id) {
    return db.execute(
      'UPDATE tbl_users SET accepted = !accepted WHERE id = ?',
      [id]
    );
  }
};
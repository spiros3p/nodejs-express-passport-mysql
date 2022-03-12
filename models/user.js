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

  static getMultiple() {
    return db.execute(
      'SELECT * FROM tbl_users'
    );
  }

  static get(id) {
    return db.execute(
      'SELECT * FROM tbl_users WHERE id = ?',
      [id]
    );
  }

  static remove(id){
    return db.execute(
      'DELETE FROM tbl_users WHERE id = ?',
      [id]
    );
  }

  static create(user) {
    return db.execute(
      'INSERT INTO tbl_users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    );
  }

  static update(id, data) {
    return db.execute(
      'UPDATE tbl_users SET accepted = ? WHERE id=?',
      [data.accepted, id]
    );
  }
};
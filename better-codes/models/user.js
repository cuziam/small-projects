const { ObjectId } = require("mongodb");
const db = require("../data/database");

class User {
  constructor(email, password, id) {
    this.email = email;
    this.password = password;
    if (id) {
      this.id = new ObjectId();
    }
  }
}

module.exports = User;

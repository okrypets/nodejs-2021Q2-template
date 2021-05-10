const { v4 } = require('uuid');

class User {
  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  update(newdata) {
    if (newdata.name) this.name = newdata.name;
    if (newdata.login) this.login = newdata.login;
    if (newdata.password) this.password = newdata.password;
  }
}

module.exports = User;

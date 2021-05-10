const User = require('../resources/users/user.model');

const DB = {
  users: [new User(), new User(), new User()],
};

const getUsers = () => DB.users;

const getUser = (id) => {
  const filteredUser = DB.users.filter((user) => user.id === id);
  //   if (filteredUser.length > 0) {
  //     throw new Error();
  //   }
  return filteredUser[0];
};

const createUser = (userData) => {
  const newUser = new User({ ...userData });
  DB.users.push(newUser);
  return newUser;
};

const updateUser = (id, userData) => {
  const userIndex = DB.users.findIndex((user) => user.id === id);
  DB.users[userIndex].update(userData);
  return DB.users[userIndex];
};

const deleteUserById = (id) => {
  const userIndex = DB.users.findIndex((user) => user.id === id);
  DB.users.splice(userIndex, 1);
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUserById };

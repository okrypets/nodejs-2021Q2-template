const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.get(req.params.userId);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(201);
  res.json(User.toResponse(user));
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.update(req.params.userId, req.body);
  res.json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  await usersService.deleteUser(req.params.userId);
  res.json('User has been deleted');
});

module.exports = router;

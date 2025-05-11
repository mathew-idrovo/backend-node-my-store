const express = require('express');

const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,

  getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get(
  '/',
  validatorHandler(getUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;

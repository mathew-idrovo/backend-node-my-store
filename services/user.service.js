const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcryptjs');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({ include: ['customer'] });
    return users;
  }
  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    if (!user) {
      throw boom.unauthorized('invalid credentials');
    }
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
module.exports = UserService;

const { sequelize } = require('../libs/sequelize.js');
const boom = require('@hapi/boom');

const { models } = sequelize;

class UserService {
  constructor() {}

  async find() {
    console.log('find');
    const res = await models.User.findAll();
    const users = res.map(user => {
      return user.dataValues;
    })
    return users;
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
    const res = await user.update(changes);
    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;

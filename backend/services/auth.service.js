const bcrypt = require('bcrypt');

const { sequelize } = require('../libs/sequelize.js');
const cloudinary = require('../libs/cloudinary.js');
const UserService = require('./user.service.js');

const { models } = sequelize;

class AuthService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({ where: { email } });
    return user;
  }

  async updateProfile(profilePic, user) {
    console.log({ profilePic, user });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const userFromDb = await models.User.findOne({
      where: { username: user.username },
    });

    // console.log({ userFromDb:userFromDb.dataValues })

    const newUser = {
      ...userFromDb.dataValues,
      profilePic: uploadResponse.secure_url,
    };
    const updatedUser = await userFromDb.update(newUser);

    // console.log({ updatedUser: updatedUser.dataValues })

    delete updatedUser.dataValues.password;

    return updatedUser;
  }
}

module.exports = AuthService;

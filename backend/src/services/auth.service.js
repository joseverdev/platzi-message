const bcrypt = require('bcrypt');

const { sequelize } = require('@database/config/postgres.js');
const cloudinary = require('@config/cloudinary.js');

const { models } = sequelize;

const AuthService = {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  },

  async findByEmail(email) {
    const user = await models.User.findOne({ where: { email } });
    return user;
  },

  async updateProfile(profilePic, user) {
    console.log({ profilePic, user });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const userFromDb = await models.User.findOne({
      where: { username: user.username },
    });

    const newUser = {
      ...userFromDb.dataValues,
      profilePic: uploadResponse.secure_url,
    };
    const updatedUser = await userFromDb.update(newUser);

    delete updatedUser.dataValues.password;

    return updatedUser;
  }
};

module.exports = AuthService;

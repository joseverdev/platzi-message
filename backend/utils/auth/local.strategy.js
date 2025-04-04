const {Strategy} = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const AuthService = require('../../services/auth.service');
const authService = new AuthService();

const LocalStrategy = new Strategy(async(username, password, done) => {
  try {

    const usernameLower = username.toLowerCase()

    const user = await authService.find(usernameLower)

    if (!user) {
      return done(boom.unauthorized(), false)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return done(boom.unauthorized(), false)
    }

    delete user.dataValues.password

    done(null, user)

  } catch (error) {
    done(error, false)
  }
})

module.exports = LocalStrategy;

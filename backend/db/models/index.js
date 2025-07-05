const { User, UserSchema } = require('./user.model.js');
const { Contact, ContactSchema } = require('./contact.model.js');
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Contact.init(ContactSchema, Contact.config(sequelize));
}

module.exports = setupModels;

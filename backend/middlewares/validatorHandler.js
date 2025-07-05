const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    console.log('validator handler rinning');
    const data = req[property];
    const { error } = schema.validate(data);

    if (error) {
      return next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;

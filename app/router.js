const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  ApplicationControllers,
  AuthenticationControllers,
} = require('./controllers');

const {
  User,
} = require('./models');

function apply(app) {
  const userModel = User;

  const applicationControllers = new ApplicationControllers();
  const authenticationControllers = new AuthenticationControllers({
    bcrypt, jwt, userModel,
  });

  app.get('/', applicationControllers.handleGetRoot);

  app.post('/v1/auth/login', authenticationControllers.handleLogin);
  app.post('/v1/auth/register', authenticationControllers.handleRegister);
  app.put('/v1/user/:id', authenticationControllers.handleUpdateUser)
  app.get('/v1/user', authenticationControllers.handleGetUser);

  app.use(applicationControllers.handleError);

  return app;
}

module.exports = { apply };
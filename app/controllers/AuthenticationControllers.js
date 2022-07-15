const ApplicationControllers = require('./ApplicationControllers');
const { JWT_SIGNATURE_KEY } = require('../../config/application');

class AuthenticationControllers extends ApplicationControllers {
  constructor({
    userModel,
    bcrypt,
    jwt,
  }) {
    super();
    this.userModel = userModel;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }
  
  handleRegister = async (req, res, next) => {
    try {
      const { name , password } = req.body;
      const email = req.body.email.toLowerCase();

      const user = await this.userModel.create({
        name,
        email,
        password: this.encryptPassword(password),
      });

      const accessToken = await this.createTokenFromUser(user);

      res.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  handleLogin = async (req, res, next) => {
    try {
      const email = req.body.email.toLowerCase();
      const { password } = req.body;

      const user = await this.userModel.findOne({
        where: { email }
      });
      if (!user) {
        const err = new EmailNotRegisteredError(email);
        res.status(404).json(err);
        return;
      }

      const isPasswordCorrect = await this.verifyPassword(password, user.password);
      if (!isPasswordCorrect) {
        const err = new WrongPasswordError();
        res.status(401).json(err);
        return;
      }

      const accessToken = await this.createTokenFromUser(user, user.Role);
      res.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  handleUpdateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const {
        name,
        address,
        phone,
      } = req.body;

      const checkUser = await this.userModel.findByPk(id);
      const updateUser = await this.userModel.update({
        name,
        address,
        phone
      }, { where: { id: checkUser.id } });

      res.status(201).json(updateUser);
    } catch (err) {
      next(err);
    }
  };

  handleGetUser = async (req, res) => {
    const user = await this.userModel.findAll();

    res.status(200).json(user);
  };

  createTokenFromUser = (user) => this.jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
  }, JWT_SIGNATURE_KEY);

  decodeToken(token) {
    return this.jwt.verify(token, JWT_SIGNATURE_KEY);
  }

  encryptPassword(password) {
    return this.bcrypt.hashSync(password, 10);
  }

  verifyPassword(password, encryptedPassword) {
    return this.bcrypt.compareSync(password, encryptedPassword);
  }
}

module.exports = AuthenticationControllers;
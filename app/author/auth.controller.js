const createError = require('http-errors');
const { generateAccessToken } = require('../../system/services/jwt');
const { hashPassword, validPassword } = require('../../system/services/bcrypt');
const response = require('../common/response');
const { authSchema } = require('./auth.validation');
const { User } = require('../../system/database/models');

const authController = {
  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body, {abortEarly: false});

      const userData = await User.findOne({
        where: {
          email: result.email,
        },
      });
      if (!userData) throw createError.BadRequest('Invalid email');
      const isValidPassword = await validPassword(result.password, userData.password);
      if(!isValidPassword) throw createError.BadRequest('Invalid password');
      const accessToken = await generateAccessToken(userData.id);
      response.created(res, accessToken);
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 404;
        error.message = "Invalid user";
      }
      next(error);
    }
  },

  getMe: async(req, res, next) => {
    try {
      const { aud: userId } = req.payload;
      const userData = await User.findByPk(userId, {
        attributes: ['email', 'id']
      });
      if (!userData) throw createHttpError.NotFound('Invalid User');
      response.created(res, userData);
    } catch (error) {
      next(error);
    }
  },

  register: async(req, res, next) => {
    try {
      //Validate
      const result = await authSchema.validateAsync(req.body, {abortEarly: false});
      const userData = await User.findOne({
        where: {
          email: result.email,
        },
      });
      if (userData) throw createError.BadRequest('This email is available');
      //Create user
      result.password = await hashPassword(result.password);
      const userCreate = await User.create(result);
      response.created(res, userCreate);
    } catch (error) {
      next(error)
    }
  }
};

module.exports = authController;

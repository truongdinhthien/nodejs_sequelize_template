const { verifyToken } = require('../../../system/services/jwt');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  try {
    const headerToken = req.headers['authorization'];
    if (!headerToken)
      return next(createError.Unauthorized('Dont have permission'));
    const bearerToken =
      headerToken.startsWith('Bearer') && headerToken.split(' ')[1];
    if (!bearerToken)
      return next(createError.Unauthorized('Invalid token'));
    req.payload = await verifyToken(bearerToken);
    next();
  } catch (error) {
    next(error);
  }
};

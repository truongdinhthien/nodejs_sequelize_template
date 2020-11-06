const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.generateAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '1h',
      audience: userId + '',
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
};
exports.verifyToken = (bearerToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(createError.Unauthorized(err.message));
        return;
      }
      resolve(payload);
    });
  });
};
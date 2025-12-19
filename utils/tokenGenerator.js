const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_EXPIRE) }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRE) }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};

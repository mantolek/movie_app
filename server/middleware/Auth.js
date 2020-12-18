const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.headers['x-auth-token'];

  const user = await User.findByToken(token);
  if (!user) return res.status(400).json({ msg : 'User does not exist' });
  
  req.token = token;
  req.user = user;
  return next();
};

module.exports = auth;

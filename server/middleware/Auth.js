const User = require('../models/User');

const auth = async (req, res, next) => {
  console.log('middlevare', req.headers)
  const token = req.headers['x-auth-token'];
console.log(token)
  if (!token) return;

  const user = await User.findByToken(token);
  if (!user) return res.status(400).json({ msg : 'User does not exist' });
  
  req.token = token;
  req.user = user;

  return next();
};

module.exports = auth;

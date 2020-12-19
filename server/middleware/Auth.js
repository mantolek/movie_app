const User = require('../models/User');

const auth = async (req, res, next) => {
  console.log('3')
  const token = req.headers['x-auth-token'];

  if (!token) return;

  const user = await User.findByToken(token);
  console.log(user, 'user')
  if (!user) return res.status(400).json({ msg : 'User does not exist' });
  
  req.token = token;
  req.user = user;
  console.log(4)
  return next();
};

module.exports = auth;

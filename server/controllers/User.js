const router = require('express').Router();
const User = require('../models/User');

/**
 * Register
 * POST
 */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Missing data
  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  // User exist
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ msg: 'User already exist.' });

  try {
    const user = await new User(req.body);
    const newUser = await user.save();

    // User save error
    if (!newUser)
      return res
        .status(400)
        .json({ msg: 'Something went wrong with saving new user.' });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Login
 * POST
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Missing data
  if (!email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Wrong credentials' });

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Wrong credentials' });

    // Create token
    const token = await user.generateToken();
    if (!token) return res.status(400).json({ msg: 'Token problem' });

    return res
      .status(200)
      .send({ success: true, token: user.token, id: user._id });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }

  /*
   * *** UNDEFEATABLE CROS ERROR :D
   * res.cookie("w_auth", user.token).status(200).json({
   *         loginSuccess: true, userId: user._id
   * });
   */
};

/**
 * Logout
 * POST
 */
exports.logout = async (req, res) => {
  try {
    // User exist
    let updated = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' }
    );
    if (!updated) return res.status(400).json({ msg: 'Cannot logout' });

    // Logged out
    res.status(200).send({ success: false });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

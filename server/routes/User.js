const router = require('express').Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', auth, user.logout);
router.get('/auth', auth, user.auth);

module.exports = router;


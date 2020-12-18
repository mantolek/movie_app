const router = require('express').Router();
const user = require('../controllers/user');

router.post('/register', user.register);
router.get('/login', user.login);
// router.post('/logout', user.logout);

module.exports = router;


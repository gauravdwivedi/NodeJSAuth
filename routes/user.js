const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user_controller');

router.get('/login', userController.login);
router.post('/signup', userController.createUser);


module.exports = router;
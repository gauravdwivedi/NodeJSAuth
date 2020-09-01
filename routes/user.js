const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user_controller');

router.get('/login', userController.login);


module.exports = router;
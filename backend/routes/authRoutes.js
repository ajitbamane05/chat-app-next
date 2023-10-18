const express = require('express');
const { AuthHandler } = require('../handler')
const router = express.Router();

router.post('/login', AuthHandler.login);
router.post('/logout', AuthHandler.logout);
module.exports = router;

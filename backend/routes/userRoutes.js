const express = require('express');
const { UserHandler } = require('../handler');
const { Authentication } = require('../middleware')
const { Authorization } = require('../middleware')
const router = express.Router();

router.post('/createuser', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, UserHandler.createNewUser);
router.post('/createadmin', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, UserHandler.createAdmin);
router.post('/deleteuser', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, UserHandler.deleteUser);
router.get('/getallusers', Authentication.checkIfAuthenticated, UserHandler.getAllUsers)
module.exports = router;

const express = require('express');
const  MessageHandler = require('../handler/messageHandler');
const router = express.Router();
const Authentication = require('../middleware/authentication');
const Authorization = require('../middleware/authorization');

router.post('/sendmessage', Authentication.checkIfAuthenticated,Authorization.authorisedSender, MessageHandler.sendMessage);
router.post('/getchat', Authentication.checkIfAuthenticated, MessageHandler.getChat);
router.post('/deletemessage', Authentication.checkIfAuthenticated, MessageHandler.deleteMessage);


module.exports = router;

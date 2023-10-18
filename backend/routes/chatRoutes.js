const express = require('express');
// const  MessageHandler = require('../handler/messageHandler');
const { MessageHandler } = require('../handler')
const router = express.Router();
const { Authentication } = require('../middleware');
const { Authorization } = require('../middleware');

router.post('/sendmessage', Authentication.checkIfAuthenticated, Authorization.authorisedSender, MessageHandler.sendMessage);
router.post('/getchat', Authentication.checkIfAuthenticated, MessageHandler.getChat);
router.post('/deletemessage', Authentication.checkIfAuthenticated, MessageHandler.deleteMessage);


module.exports = router;

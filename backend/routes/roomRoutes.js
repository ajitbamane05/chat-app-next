const express = require('express');
const { RoomHandler } = require('../handler');
const { RoomMemberHandler } = require('../handler');
const { Authentication } = require('../middleware');
const { Authorization } = require('../middleware')
const router = express.Router();

router.post('/createdirectroom', Authentication.checkIfAuthenticated, RoomHandler.createDirectRoom)
router.post('/createroom', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, RoomHandler.creteRoom);
router.post('/deleteroom', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, RoomHandler.deleteRoom);
router.post('/getmembership', Authentication.checkIfAuthenticated, RoomMemberHandler.getMemberships);
router.post('/addroommember', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, RoomMemberHandler.addRoomMember)
router.post('/removeroommember', Authentication.checkIfAuthenticated, Authorization.checkIfAuthorised, RoomMemberHandler.removeRoomMember)

module.exports = router;

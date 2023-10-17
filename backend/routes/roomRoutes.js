const express = require('express');
const RoomHandler = require('../handler/roomHandler.js');
const RoomMemberHandler = require('../handler/roomMemberHandler.js');
const Authentication = require('../middleware/authentication.js');
const Authorised = require('../middleware/authorization.js')
const router = express.Router();

router.post('/createdirectroom',Authentication.checkIfAuthenticated,RoomHandler.createDirectRoom)
router.post('/createroom', Authentication.checkIfAuthenticated,Authorised.checkIfAuthorised, RoomHandler.creteRoom);
router.post('/deleteroom', Authentication.checkIfAuthenticated, Authorised.checkIfAuthorised, RoomHandler.deleteRoom);
router.post('/getmembership', Authentication.checkIfAuthenticated, RoomMemberHandler.getMemberships);
router.post('/addroommember',Authentication.checkIfAuthenticated,Authorised.checkIfAuthorised,RoomMemberHandler.addRoomMember)
router.post('/removeroommember',Authentication.checkIfAuthenticated,Authorised.checkIfAuthorised,RoomMemberHandler.removeRoomMember)

module.exports = router;

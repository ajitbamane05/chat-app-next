const RoomAccessor = require('../accessor/roomAccessor')

function findRoomWithUsers(memberIds){
    return RoomAccessor.findRoomWithUsers(memberIds)
}
function createRoom(name){
    return RoomAccessor.createRoom(name)
}

function createDirectRoom(name){
    return RoomAccessor.createDirectRoom(name)
}
function deleteRoom(room_id){
    
    return RoomAccessor.deleteRoom(room_id)
}

module.exports = {
    findRoomWithUsers,createRoom,deleteRoom,createDirectRoom
}

const {MessageAccessor} = require('../accessor')

function sendMessage(content,senderId,roomId){
    return MessageAccessor.sendMessage(content,senderId,roomId)
}

function getChat(roomId){
    return MessageAccessor.getChat(roomId)
}

function deleteMessagesofUser(senderId){
    return MessageAccessor.deleteMessagesofUser(senderId)
}

function deleteMessage(message_id){
    return MessageAccessor.deleteMessage(message_id)
}

function deleteRoomMessages(roomId){
    return MessageAccessor.deleteRoomMessages(roomId)
}

module.exports = {
    sendMessage,getChat,deleteMessagesofUser,deleteMessage,deleteRoomMessages
}
const prisma = require('../prisma-client')
// singleton pattern


function sendMessage(content, senderId, roomId) {
    return prisma.message.create({
        data: {
            content, senderId, roomId
        }
    })
}

function getChat(roomId) {
    return prisma.message.findMany({
        where: {
            roomId: roomId
        }
    })
}

function deleteMessagesofUser(senderId) {
    return prisma.message.deleteMany({
        where: {
            senderId: senderId
        }
    })
}

function deleteMessage(message_id) {
    return prisma.message.delete({
        where: { message_id }
    })
}

function deleteRoomMessages(roomId) {
    return prisma.message.deleteMany({
        where: {
            roomId
        }
    })
}
module.exports = {
    sendMessage,getChat,deleteMessagesofUser,deleteMessage,deleteRoomMessages
}
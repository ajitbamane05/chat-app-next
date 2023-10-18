const prisma = require('../prisma-client')
// singleton pattern
class MessageAccessor {
    constructor() {
        if (MessageAccessor.instance) {
            console.log("cashed messages");
            return MessageAccessor.instance
        }
        MessageAccessor.instance = this;
    }

    sendMessage(content, senderId, roomId) {
        return prisma.message.create({
            data: {
                content, senderId, roomId
            }
        })
    }

    getChat(roomId) {
        return prisma.message.findMany({
            where: {
                roomId: roomId
            }
        })
    }

    deleteMessagesofUser(senderId) {
        return prisma.message.deleteMany({
            where: {
                senderId: senderId
            }
        })
    }

    deleteMessage(message_id) {
        return prisma.message.delete({
            where: { message_id }
        })
    }

    deleteRoomMessages(roomId) {
        return prisma.message.deleteMany({
            where: {
                roomId
            }
        })
    }

}
    const instance = new MessageAccessor()

    module.exports = instance
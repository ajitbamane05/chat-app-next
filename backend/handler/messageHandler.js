const { MessageService } = require('../service')

async function sendMessage(req, res) {
    const { content, senderId, roomId } = req.body

    if (!content || !senderId || !roomId) {
        return res.status(400).json({ meaage: "Missing content, senderId or roomId" })
    }
    try {
        const message = await MessageService.sendMessage(content, senderId, roomId)
        return res.status(200).json({ message: "Message send successfully" })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while sending message", error: error.message })
    }

}

async function getChat(req, res) {
    const { roomId } = req.body
    if (!roomId) {
        return res.status(400).json({ message: "Room id not found" })
    }
    try {
        const chat = await MessageService.getChat(roomId)
        return res.status(200).json(chat)
    }
    catch (error) {
        return res.status(400).json({ message: "Error while retriving chat", error: error.message })
    }
}

async function deleteMessagesofUser(req, res) {
    const { senderId } = req.body
    if (!senderId) {
        return res.status(400).json({ message: "Sender Id not found" })
    }
    try {
        const messagesDeleted = await MessageService.deleteMessagesofUser(senderId)
        return res.status(200).json({ message: "User Messages Deleted!" })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while deleting messages!", error: error.message })
    }
}

async function deleteMessage(req, res) {
    const { message_id } = req.body
    if (!message_id) {
        return res.status(400).json({ message: "Message Id not found" })
    }
    try {
        const messageDeleted = await MessageService.deleteMessage(message_id)
        return res.status(200).json({ message: "User Message Deleted!" })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while deleting message!", error: error.message })
    }
}



module.exports = {
    sendMessage, getChat, deleteMessagesofUser, deleteMessage
}
const { RoomService } = require('../service')
const { RoomMemberService } = require('../service')
const { MessageService } = require('../service')

async function creteRoom(req, res) {
    const { name, type, memberIds, userId } = req.body
    if (!name || !type) {
        return res.status(400).json({ message: "Name or type not provided." });
    }
    if (type !== "GROUP") {
        return res.status(400).json({ message: "Invalid room type provided." });
    }
    if (!memberIds) {
        return res.status(400).json({ message: "MemberIds not provided" })
    }
    if (!userId) {
        return res.status(400).json({ message: "UserId not provided!" })
    }
    if (type === "GROUP") {
        try {
            const newRoom = await RoomService.createRoom(name, type)
            const newRoomAdmin = await RoomMemberService.createRoomAdmin(userId, newRoom.room_id)
            const newRoomMembers = await RoomMemberService.createRoomMembers(memberIds, newRoom.room_id)
            return res.status(200).json({ message: "Group Room Created", newRoomAdmin, newRoomMembers })
        }
        catch (error) {
            return res.status(400).json({ message: "Error While Creating Group Chat!", error: error.message })
        }
    }
}

async function createDirectRoom(req, res) {
    const { name, type, memberIds, userId } = req.body
    if (!name || !type) {
        return res.status(400).json({ message: "Name or type not provided." });
    }
    if (type !== "DIRECT") {
        return res.status(400).json({ message: "Invalid room type provided." });
    }
    if (!memberIds) {
        return res.status(400).json({ message: "MemberIds not provided" })
    }
    if (type === "DIRECT") {
        const existingRoom = await RoomService.findRoomWithUsers(memberIds)
        if (existingRoom) {
            return res.status(400).json({ message: "Room already exists with users" })
        }
        try {
            const newRoom = await RoomService.createDirectRoom(name)
            const newRoomMembers = await RoomMemberService.createRoomMembers(memberIds, newRoom.room_id)
            return res.status(200).json({ message: "Direct Chat Created", newRoomMembers })
        }
        catch (error) {
            return res.status(400).json({ message: "Error While Creating Direct Chat!", error: error.message })
        }
    }
}

async function deleteRoom(req, res) {
    const { room_id } = req.body
    if (!room_id) {
        return res.status(400).json({ message: "No room id given!" })
    }
    try {
        const [deletedRoomMessages, deleteRoomMembers] = await Promise.all([MessageService.deleteRoomMessages(room_id),
        RoomMemberService.deleteRoomMembers(room_id)])
        const deletedRoom = await RoomService.deleteRoom(room_id)
        return res.status(200).json({ message: "Room Deleted with room messages and room members!", deletedRoom })
    }
    catch (error) {
        return res.status(400).json({ message: "Error While Deleting Room!", error: error.message })
    }
}

module.exports = {
    creteRoom, deleteRoom, createDirectRoom
}
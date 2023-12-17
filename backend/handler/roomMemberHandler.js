const { RoomMemberService } = require('../service')

async function getMemberships(req, res) {
    const { userId } = req.params
    console.log(userId);
    if (!userId) {
        return res.status(400).json({ message: "User Id not provided" })
    }
    try {
        const memberships = await RoomMemberService.getMemberships(userId)
        return res.status(200).json(memberships)
    }
    catch (error) {
        return res.status(400).json({ message: "Error while retriving membership", error: error.message })
    }
}

async function deleteMemberships(req, res) {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({ message: "User Id not provided" })
    }
    try {
        const membershipsDeleted = RoomMemberService.deleteMemberships(userId)
        return res.status(200).json({ message: "Memberships Deleted Successfully" })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while deleting memberships", error: error.message })
    }
}

async function addRoomMember(req, res) {
    const { userId, roomId } = req.body
    if (!userId) {
        return res.status(400).json({ message: "UserId not provided!" })
    }
    if (!roomId) {
        return res.status(400).json({ message: "RoomId not provided!" })
    }
    try {
        const addRoomMember = await RoomMemberService.addRoomMember(userId, roomId)
        return res.status(200).json({ message: "Room member added!" })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while adding room member", error: error.message })
    }
}
async function removeRoomMember(req, res) {
    const { userId, roomId } = req.body
    if (!userId) {
        return res.status(400).json({ message: "UserId not provided!" })
    }
    if (!roomId) {
        return res.status(400).json({ message: "RoomId not provided!" })
    }
    try {
        const deleteRoomMember = await RoomMemberService.removeRoomMember(userId, roomId)
        return res.status(200).json({ message: "Room member removed!" })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while removing room member", error: error.message })
    }
}
module.exports = {
    getMemberships, deleteMemberships, addRoomMember, removeRoomMember
}
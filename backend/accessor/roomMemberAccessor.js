const prisma = require('../prisma-client')
function createRoomMembers(memberIds, roomId) {
    return prisma.roomMember.createMany({
        data: [
            ...memberIds.map((member) => ({
                userId: member,
                roomId: roomId
            }))
        ]
    })
}

function createRoomAdmin(userId, roomId) {
    return prisma.roomMember.create({
        data: {
            userId: userId,
            roomId: roomId,
            isAdmin: true
        }
    })
}
function getMemberships(userId) {
    return prisma.roomMember.findMany({
        where: {
            userId
        },
        include: {
            room: {
                include: {
                    members: {
                        include: {
                            user: {
                                select: {
                                    user_id: true,
                                    username: true,
                                    email: true,
                                    isAdmin: true
                                }
                            }
                        }
                    }
                }
            }

        }
    })
}

function deleteMemberships(userId) {
    return prisma.roomMember.deleteMany({
        where: {
            userId: userId
        }
    })
}

function deleteRoomMembers(roomId) {
    return prisma.roomMember.deleteMany({
        where: {
            roomId
        }
    })
}

function addRoomMember(userId, roomId) {
    return prisma.roomMember.create({
        data: {
            userId: userId,
            roomId: roomId
        }
    })
}

function removeRoomMember(userId, roomId) {
    return prisma.roomMember.deleteMany({
        where: {
            userId: userId,
            roomId: roomId
        }
    })
}

module.exports = {
    getMemberships, deleteMemberships,
    createRoomMembers, createRoomAdmin, deleteRoomMembers,
    addRoomMember,removeRoomMember
}
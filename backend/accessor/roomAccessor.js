const prisma = require('../prisma-client')

function findRoomWithUsers(memberIds) {
    return prisma.room.findFirst({
        where: {
            type: 'DIRECT',
            AND: [
                ...memberIds.map((member) => ({
                    members: {
                        some: {
                            userId: member
                        }
                    }
                }))
            ]
        }
    })
}

function createRoom(name) {
    return prisma.room.create({
        data: {
            type: 'GROUP',
            name: name
        },
    });
}

function createDirectRoom(name) {
    return prisma.room.create({
        data: {
            type: 'DIRECT',
            name: name
        },
    });
}


function deleteRoom(room_id){
    return prisma.room.delete({
        where: {
            room_id: room_id
        }
    })
}

module.exports = {
    createRoom, findRoomWithUsers,deleteRoom,createDirectRoom
}
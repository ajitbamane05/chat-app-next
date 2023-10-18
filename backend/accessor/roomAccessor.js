const prisma = require('../prisma-client')

class RoomAccessor {
    constructor(){
        if(RoomAccessor.instance){
            return RoomAccessor.instance
        }
        RoomAccessor.instance = this
    }

    findRoomWithUsers(memberIds) {
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

    createRoom(name) {
        return prisma.room.create({
            data: {
                type: 'GROUP',
                name: name
            },
        });
    }

    createDirectRoom(name) {
        return prisma.room.create({
            data: {
                type: 'DIRECT',
                name: name
            },
        });
    }

    deleteRoom(room_id){
        return prisma.room.delete({
            where: {
                room_id: room_id
            }
        })
    }

}

const instance = new RoomAccessor()

module.exports = instance
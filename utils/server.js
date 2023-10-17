import db from "@/db";

export async function getUsers() {
    const users = await db.user.findMany({})
    return JSON.stringify(users)
}

export async function getRoomWithUserName(roomId) {
    const room = await db.room.findUnique({
        where: {
            room_id: roomId
        },
        include: {
            members: true
        }
    })
    return JSON.stringify(room)
}
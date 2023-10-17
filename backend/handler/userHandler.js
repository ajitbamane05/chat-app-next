const UserService = require('../service/userService')
const MessageService = require('../service/messageService')
const RoomMemberService = require('../service/roomMemberService')
async function createNewUser(req, res) {
    const { username, email, password, isAdmin } = req.body;
    
    if (!username) {
        return res.status(400).json({ message: 'Username not found' })
    }
    if (!email) {
        return res.status(400).json({ message: 'Email not found' })
    }
    if (!password) {
        return res.status(400).json({ message: 'Password not found' })
    }
    try {
        const user = await UserService.createNewUser(username, email, password)
        if (user.statusCode === 400) {
            return res.status(user.statusCode).json({message:user.message})
        }
        return res.status(200).json({ message: "User created successfully.", user })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while creating user", error: error.message })
    }


}
async function createAdmin(req, res) {
    const { username, email, password } = req.body;
    
    if (!username) {
        return res.status(400).json({ message: 'Username not found' })
    }
    if (!email) {
        return res.status(400).json({ message: 'Email not found' })
    }
    if (!password) {
        return res.status(400).json({ message: 'Password not found' })
    }
    try {
        const user = await UserService.createAdmin(username, email, password)
        if (user.statusCode === 400) {
            return res.status(user.statusCode).json({message:user.message})
        }
        return res.status(200).json({ message: "Admin created successfully.", user })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while creating user", error: error.message })
    }

}

async function deleteUser(req, res) {
    const { user_id, username } = req.body
    if (!user_id) {
        return res.status(400).json({ message: "Id not provided" })
    }
    if(!username){
        return res.status(400).json({ message: "Username not provided" })
    }
    try {
        const deleteMessageofuser = await MessageService.deleteMessagesofUser(user_id)

        const deleteMemberships = await RoomMemberService.deleteMemberships(user_id)

        const deletedUser = await UserService.deleteUser(username)
        if(deletedUser.statusCode==400){
            return res.status(deletedUser.statusCode).json({message:deletedUser.message})
        }
        return res.status(200).json({ message: "User deleted successfully", deletedUser })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while deleting user", error: error.message })
    }

}

async function getAllUsers(req,res){
    try{
        const users = await UserService.getAllUsers()
        return res.status(200).json(users)
    }
    catch(error){
        return res.status(400).json({message:"Error while fetching data!"})
    }
}



module.exports = {
    createNewUser, createAdmin, deleteUser,getAllUsers
}
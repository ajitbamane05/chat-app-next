const { UserAccessor } = require('../accessor');
const { SessionAccessor } = require('../accessor')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


async function login(username, password) {
    const user = await UserAccessor.findByUsername(username)
    if (!user) {
        return { statusCode: 401, message: "Invalid username!" }
    }
    const compare = bcrypt.compareSync(password, user.password)
    if (!password || !compare) {
        return { statusCode: 401, message: "Invalid password!" }
    }
    const token = jwt.sign({ user_id: user.user_id, email: user.email, username: user.username, isAdmin: user.isAdmin }, secret, { expiresIn: 60 * 60 * 24 })
    const session = await SessionAccessor.createNewSession(user.user_id, token)

    if (session) {
        return { statusCode: 200, token }
    }
}

function logout(userId, token) {
    return SessionAccessor.removeSession(userId, token)
}

module.exports = {
    login, logout
}
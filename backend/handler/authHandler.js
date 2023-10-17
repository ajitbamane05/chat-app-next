const AuthService = require('../service/authService')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const login = await AuthService.login(username, password)
        if (login.statusCode === 200) {
            res.header('Authorization', `Bearer ${login.token}`)
            res.status(200).json({message:"Logged in successfully",token:login.token})
        }
        else {
            res.status(login.statusCode).json(login.message)
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Error while logging in!", error: error.message })
    }

}

async function logout(req, res) {
    const { userId } = req.body
    const tokenString = req.headers['authorization']

    const actualToken = tokenString.split(' ')[1]

    try {
        const logout = await AuthService.logout(userId, actualToken)
        return res.status(200).json({ message: "logged out successfully" })
    }
    catch (error) {
        return res.status(400).json({ message: "Error while logging out!", error: error.message })
    }
}

module.exports = {
    login, logout
}
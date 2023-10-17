const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

async function checkIfAuthorised(req, res, next) {
    const tokenString = req.headers['authorization']
    if (!tokenString) {
        return res.status(401).json({ message: "Please log in before accessing API" });
    }
    const actualToken = tokenString.split(' ')[1]
    if (!actualToken) {
        return res.status(401).json({ message: "Please log in before accessing API" });
    }
    try {
        let data = jwt.verify(actualToken, secret)
        if (data.isAdmin) {
            next()
        } else {
            return res.status(401).json({ message: "You are not authorised!" })
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Session not verifyed", error: error.message })
    }
}

async function authorisedSender(req, res, next) {
    const { senderId } = req.body;
    const tokenString = req.headers['authorization'];
    if (!tokenString) {
        return res.status(401).json({ message: "Logged out login before send messages!" });
    }
    const actualToken = tokenString.split(' ')[1]
    if (!actualToken) {
        return res.status(401).json({ message: "Logged out login before send messages!" });
    }
    try {
        let data = jwt.verify(actualToken, secret);
        if (senderId === data.user_id) {
            next()
        } else {
            return res.status(401).json({ message: "You are not authorised to send chat behalf of this user!" })
        }
    }
    catch(error){
        return res.status(401).json({message:"Session not verifyed!",message:message.error})
    }
}

module.exports = {
    checkIfAuthorised,
    authorisedSender
}
const jwt = require('jsonwebtoken');
require('dotenv').config();
const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(TOKEN_KEY);
    if (!token) {
        return res.status(403).json({ success: false, message: "Token is required" });
    }
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
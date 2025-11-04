const jwt = require('jsonwebtoken');
require('dotenv').config();
const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ success: false, message: "Token is required" });
    }
    if (token.startsWith('Bearer ')) {
        token = token?.slice(7);
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
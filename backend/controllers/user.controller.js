const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "Request body cannot be empty" });
        }
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await userModel.create({ ...req.body, password: encryptedPassword });
        return res.status(201).json({ success: true, message: "User created successfully", data: newUser });
    }catch (error) { 
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        const user = await userModel.findOne({ email: email });
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }else{
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(401).json({ success: false, message: "Invalid password" });
            }  
            const token = jwt.sign(
                { user_id: user._id, email: user.email },
                process.env.TOKEN_KEY,{ expiresIn: "2h" });     
            const userObj = user.toObject();
            delete userObj.password;
            userObj.token = token;
            return res.status(200).json({ success: true, message: "Login successful", data: userObj });
        }
    }catch (error) {
        next(error);
    }
 }

module.exports = {
    createUser,
    loginUser
}
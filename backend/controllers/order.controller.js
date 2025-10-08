const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');

const createOrder = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "Request body cannot be empty" });
        }
        const userId = req.user.user_id;
        const user = await userModel.findById(userId);  
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const order = await orderModel.create({ ...req.body, userId: userId });
        return res.status(201).json({ success: true, message: "Order created successfully", data: order });
    } catch (error) {
        next(error);
    }  
}

const getOrders = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const orders = await orderModel.find({ userId: userId });
        return res.status(200).json({ success: true, message: "User orders fetched successfully", data: orders });
    } catch (error) {
        next(error);
    }   
}

const getMonthlySales = async (req, res, next) => {
    try {
        const sales = await orderModel.aggregate([
            { $group: {     
                _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                totalSales: { $sum: "$totalAmount" },
                orderCount: { $sum: 1 }
            }},
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ]);
        const totalUsers = await userModel.countDocuments();
        sales.unshift({ _id: "Total Users", totalUsers: totalUsers });
        return res.status(200).json({ success: true, message: "Monthly sales data fetched successfully", data: sales });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
    getOrders,
    getMonthlySales
}

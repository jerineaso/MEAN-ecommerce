const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const UserAddressModel = require('../models/user-address.model');

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
        let products = req.body.products || [];
        let userAddress = req.body.userAddress || null;
        if (products.length === 0) {
            return res.status(400).json({ success: false, message: "Products array cannot be empty" });
        }
        if(userAddress == null){
            return res.status(400).json({ success: false, message: "User address is required" });
        }
        products = products.filter(item => item.quantity > 0);
        if (products.length === 0) {
            return res.status(400).json({ success: false, message: "No products with quantity greater than 0" });
        }
        // Fetch product prices from DB and calculate totalAmount
        const productIds = products.map(item => item.productId);
        const dbProducts = await productModel.find({ productId: { $in: productIds } });
        let totalAmount = 0;
        products = products.map(item => {
            const dbProduct = dbProducts.find(p => p.productId === item.productId);
            if (dbProduct && dbProduct.isAddedInCart) {
                const price = dbProduct.price;
                totalAmount += price * item.quantity;
                return {
                    ...item,
                    price: price
                };
            }
            return null;
        }).filter(item => item !== null);
        await UserAddressModel.findOneAndUpdate(
            { userId: userId },
            { ...userAddress, userId: userId },
            { upsert: true, new: true }
        );
        const order = await orderModel.create({ 
            userId: userId,
            products: products,
            totalAmount: totalAmount
        });
        return res.status(201).json({ success: true, message: "Order created successfully", data: order });
    } catch (error) {
        next(error);
    }  
}

const getOrders = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const products = await productModel.find({ isAddedInCart: true, userQuantity: { $gt: 0 } });
        if (products.length === 0) {
            return res.status(200).json({ success: true, message: "No items in cart", data: { user, products: [], totalAmount: 0 } });
        }
        let totalAmount = 0;
        products.forEach(product => {
            totalAmount += product.price * product.userQuantity;
        });
        const UserAddress = await UserAddressModel.findOne({ userId: userId });
        user.address = UserAddress;
        return res.status(200).json({
            success: true,
            message: "Cart details fetched successfully",
            data: {
                orders : {
                    user,
                    products,
                    totalAmount
                },
                userAddress: UserAddress
            }
        });
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

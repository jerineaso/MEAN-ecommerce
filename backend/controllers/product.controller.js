const productModel = require("../models/product.model");

const getAllCategories = async (req, res, next) => {
    try {
        const category = await productModel.distinct('category'); // distinct used to get the category data without any duplication in an array
        return res.status(200).json({ success: true, message: 'All categories', data: category }); // Success generation
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "Request body cannot be empty" });
        }
        const count = await productModel.countDocuments();
        const product = await productModel.create({ ...req.body, productId: count + 1 });
        return res.status(201).json({ success: true, message: "Product created successfully", data: product });
    } catch (error) {
       next(error)
    }
}

const getProductDetails = async (req, res, next) => {
    try {
        const product = await productModel.findOne({ productId: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product details", data: product });
    } catch (error) {
        next(error)
    }
}

const getProductList = async (req, res, next) => {
    try {
        const fullProductList = await productModel.find({})
        return res.status(200).json({ success : true, message : 'All product list', data : fullProductList})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCategories,
    createProduct,
    getProductList,
    getProductDetails
}
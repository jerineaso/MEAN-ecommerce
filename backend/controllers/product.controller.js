const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

const getAllCategories = async (req, res, next) => {
    try {
        // Group by category and get the first icon for each category
        const categories = await productModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    icon: { $first: "$icon" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id", // replace data from above
                    icon: 1 // add icon field
                }
            }
        ]);
        return res.status(200).json({ success: true, message: 'All categories', data: categories });
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "Request body cannot be empty" });
        }
        const lastProduct = await productModel.findOne().sort({ productId: -1 });
        const nextProductId = lastProduct ? lastProduct.productId + 1 : 1;
        const product = await productModel.create({ ...req.body, productId: nextProductId });
        return res.status(201).json({ success: true, message: "Product created successfully", data: product });
    } catch (error) {
       next(error)
    }
}

const getProductDetails = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id);
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

const deleteProduct = async (req, res, next) => {
    try {
        const product = await productModel.findOneAndDelete(Number(req.params.id));
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error)
    }
}

const getFlashSaleProducts = async (req, res, next) => {
    try {
        const flashSaleProducts = await productModel.find({ flashSale: true });
        return res.status(200).json({ success: true, message: "Flash sale products fetched successfully", data: flashSaleProducts });
    } catch (error) {
        next(error);
    }
}

const createCartItems = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const cartItems = req.body.cartItems;
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "cartItems must be a non-empty array" });
        }
        const products = await productModel.find({ productId: { $in: cartItems } });
        if (products.length !== cartItems.length) {
            return res.status(404).json({ success: false, message: "Some products not found" });
        }
        await productModel.updateMany(
            { productId: { $in: cartItems } },
            { $set: { isAddedInCart: true } }
        );
        const updatedProducts = await productModel.find({ productId: { $in: cartItems } });
        return res.status(200).json({ success: true, message: "Products added to cart successfully", data: updatedProducts });
    } catch (error) {
        next(error);
    }   
}

const getCartProducts = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const cartProducts = await productModel.find({ isAddedInCart: true });
        return res.status(200).json({ success: true, message: "Cart products fetched successfully", data: cartProducts });
    } catch (error) {
        next(error);
    }
};

const updateCartItems = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const cartItems = req.body.cartItems;
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "cartItems must be a non-empty array" });
        }
        const productIdsCart = cartItems.map(item => item.productId);
        const products = await productModel.find({ productId: { $in: productIdsCart } });
        if (products.length !== cartItems.length) {
            return res.status(404).json({ success: false, message: "Some products not found" });
        }
        for (const item of cartItems) {
            await productModel.updateOne(
                { productId: item.productId },
                { $set: { isAddedInCart: true, userQuantity: item.quantity } }
            );
        }
        const productIds = cartItems.map(item => item.productId);
        const updatedProducts = await productModel.find({ productId: { $in: productIds } });
        return res.status(200).json({ success: true, message: "Products updated in cart successfully", data: updatedProducts });
    } catch (error) {
        next(error);
    }
};

const createWishListItems = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const wishListItems = req.body.wishListItems;
        if (!Array.isArray(wishListItems) || wishListItems.length === 0) {
            return res.status(400).json({ success: false, message: "wishListItems must be a non-empty array" });
        }
        const products = await productModel.find({ productId: { $in: wishListItems } });
        if (products.length !== wishListItems.length) {
            return res.status(404).json({ success: false, message: "Some products not found" });
        }
        await productModel.updateMany(
            { productId: { $in: wishListItems } },
            { $set: { isWishlisted: true } }
        );
        const updatedProducts = await productModel.find({ productId: { $in: wishListItems } });
        return res.status(200).json({ success: true, message: "Products added to wishlist successfully", data: updatedProducts });
    } catch (error) {
        next(error);
    }
};

const getWishListProducts = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const wishListProducts = await productModel.find({ isWishlisted: true });
        return res.status(200).json({ success: true, message: "Wishlist products fetched successfully", data: wishListProducts });
    } catch (error) {
        next(error);
    }
};

const getCountWishListCartItems = async (req, res, next) => {
    try {
        const wishListCount = await productModel.countDocuments({ isWishlisted: true });
        const cartCount = await productModel.countDocuments({ isAddedInCart: true });
        return res.status(200).json({ success: true, message: "Counts fetched successfully", data: { wishListCount, cartCount } });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    createProduct,
    getProductList,
    getFlashSaleProducts,
    getProductDetails,
    deleteProduct,
    createCartItems,
    getCartProducts,
    createWishListItems,
    getWishListProducts,
    updateCartItems,
    getCountWishListCartItems
}
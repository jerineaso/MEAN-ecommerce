const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'] },
  description: String,
  price: {
    type: Number,
    required: [true, 'Price is required'],
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: 'Price must be a positive number'
    }
  },
  category: { type: String, required: [true, 'Category is required'] },
  inStock: { type: Boolean, required: [true, 'inStock is required'], default: true },
  discountPercentage : { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  productId: { type: Number, unique: true },
  flashSale: { type: Boolean, default: false },
  icon: String,
  images: { type: Array },
  ratings: { type: Number, min: 0, max: 5, default: 0 },
  reviews: { type: Number, min: 0, default: 0 },
  discountPrice: { type: Number, default: 0 },
  isWishlisted: { type: Boolean, default: false },
  availableQuantity: { type: Number, default: 0 },
  isAddedInCart: { type: Boolean, default: false },
  isPurchased: { type: Boolean, default: false },
  userQuantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);

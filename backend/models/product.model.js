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
  discount : { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  productId: { type: Number, unique: true }
});

module.exports = mongoose.model('Product', productSchema);

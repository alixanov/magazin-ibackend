const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     id: {
          type: String,
          required: true,
     },
     titleProduct: {
          type: String,
          required: true,
     },
     swiperuchun: {
          type: String,
          required: true,
     },
     img: {
          type: [String],  // Массив строк для хранения ссылок на изображения
          required: true,
     },
     nameproduct: {
          type: String,
          required: true,
     },
     price: {
          type: Number,
          required: true,
     },
     productinfo: {
          type: String,
          required: true,
     },
     nechtaqolgani: {
          type: Number,
          required: true,
     },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

const { Schema, model } = require("mongoose")
const AdminAddProductSchema = new Schema({
     titleProduct:
          { type: String, required: true, },
     swiperuchun: { type: String, required: true, },
     img: [{ type: String, required: true, }],
     nameproduct: { type: String, required: true, },
     price: { type: Number, required: true, },
     productinfo: { type: String, required: true, },
     nechtaqolgani: { type: Number, required: true, },
});


module.exports = model('AdminAddProductSchema', AdminAddProductSchema);
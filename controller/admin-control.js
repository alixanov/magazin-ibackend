const AdminAddProductSchema = require("../model/admin-add-product")

const addProduct = async (req, res) => {
     try {
          const {  titleProduct, swiperuchun, img, nameproduct, price, productinfo, nechtaqolgani } = req.body
          const newProduct = new AdminAddProductSchema({  titleProduct, swiperuchun, img, nameproduct, price, productinfo, nechtaqolgani })
          await newProduct.save();
          res.status(201).json(newProduct)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при добавлении продукта", error })
     }
}

const getAllProduct = async (req, res) => {
     try {
          const products = await AdminAddProductSchema.find()
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении продуктов", error })
     }
}


const deleteProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const deletedProduct = await AdminAddProductSchema.findByIdAndDelete(id);
          if (!deletedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }
          res.status(200).json({ message: "Продукт успешно удален" });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при удалении продукта", error });
     }
};

const updateProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const {  titleProduct,  swiperuchun, img, nameproduct, price, productinfo, nechtaqolgani } = req.body;

          const updatedProduct = await AdminAddProductSchema.findByIdAndUpdate(
               id,
               { titleProduct, swiperuchun, img, nameproduct, price, productinfo, nechtaqolgani },
               { new: true } // Вернуть обновленный документ
          );

          if (!updatedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }

          res.status(200).json(updatedProduct);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при обновлении продукта", error });
     }
};
module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct }
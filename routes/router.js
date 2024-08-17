
const express = require("express");
const router = express.Router();
const Transaction = require("../model/transaction"); // Обновляем путь к модели
const User = require('../model/users');
const jwt = require('jsonwebtoken');

// Create a new transaction
router.post("/add", async (req, res) => {
    const { cardnumber, carddate, cardcode, totalPrice } = req.body;

    // Проверка наличия всех необходимых данных
    if (!cardnumber || !carddate || !cardcode || totalPrice === undefined) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        // Создание новой транзакции
        const newTransaction = new Transaction({
            cardnumber,
            carddate,
            cardcode,
            totalPrice
        });

        // Сохранение транзакции в базе данных
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// Регистрация
router.post('/register', async (req, res) => {
    const { login, password, mobile } = req.body;

    if (!login || !password || !mobile) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        const newUser = new User({ login, password, mobile });
        await newUser.save();
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Авторизация
router.post('/login', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        const user = await User.findOne({ login });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Неверные логин или пароль' });
        }

        const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Включение userId в токен
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const { addProduct, getAllProduct, deleteProduct, updateProduct } = require("../controller/admin-control")

router.post("/add", addProduct)

router.get("/getall", getAllProduct)

router.delete("/delete/:id", deleteProduct); // New route for deleting a product

router.put("/update/:id", updateProduct); // Новый маршрут для обновления




module.exports = router;
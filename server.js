const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/router");
const itemRoutes = require("./routes/router");
const errorHandler = require("./middleware/item");
const cors = require("cors");
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

// Подключение к базе данных
connectDB()
     .then(() => console.log("Database connected successfully"))
     .catch((error) => {
          console.error("Database connection failed:", error);
          process.exit(1); // Завершение работы приложения в случае ошибки подключения к базе данных
     });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Основные маршруты
app.use("/api/users", userRoutes);
app.use("/api", itemRoutes);
app.get('/api/products', (req, res) => {
     // Логика для обработки запроса
});

// Обработчик ошибок должен быть последним middleware
app.use(errorHandler);

// Настройка сервера
const PORT = process.env.PORT || 3004;

// Создаем и настраиваем Telegram-бота
const token = '7409890621:AAGtsTzdH-U-IQsdam-FVzVMX_EcXCxKe9I';
const bot = new TelegramBot(token, { polling: true });

const startBot = () => {
     // FAQ for incoming messages
     const faq = {
          "salom": "Salom, sizga qanday yordam berишим mumkin?"
     };

     // Set bot commands
     bot.setMyCommands([
          { command: "/start", description: "Начать заново" },
          { command: "/news", description: "Акция на всех товар 25%" },
          { command: "/payment", description: "Способы оплаты" },
          { command: "/product", description: "Посетить" },
     ]);

     // Handle /start command
     bot.onText(/\/start/, (msg) => {
          const chatId = msg.chat.id;
          bot.sendMessage(chatId, `${msg.from.first_name}, желаем вам отличных покупок и прекрасного дня!`);
     });

     // Handle /payment command
     bot.onText(/\/payment/, (msg) => {
          const chatId = msg.chat.id;
          bot.sendMessage(chatId, "UzCard Humo Visa 💳 ");
     });

     // Handle /product command
     bot.onText(/\/product/, (msg) => {
          const chatId = msg.chat.id;
          bot.sendMessage(chatId, "Вы можете покупать любимые продукты", {
               reply_markup: {
                    inline_keyboard: [
                         [
                              {
                                   text: 'Исследуй мир электроники 🛍',
                                   web_app: { url: 'https://newshop-roan.vercel.app/' }
                              }
                         ]
                    ]
               }
          });
     });

     // Handle other messages
     bot.on("message", async (msg) => {
          const chatId = msg.chat.id;
          const text = msg.text.toLowerCase(); // Convert text to lowercase

          // Ignore commands like /start
          if (text.startsWith("/")) {
               return;
          }

          // Respond to FAQ
          if (faq[text]) {
               return bot.sendMessage(chatId, faq[text]);
          } else {
               return bot.sendMessage(chatId, "Нет такого команды 🚫");
          }
     });
};

// Запуск сервера и Telegram-бота
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
     startBot();
});

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
     login: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     // mobile: {
     //      type: String,
     //      required: true
     // }
});

// Хэширование пароля перед сохранением пользователя
UserSchema.pre('save', async function (next) {
     if (this.isModified('password')) {
          this.password = await bcrypt.hash(this.password, 10);
     }
     next();
});

// Метод для проверки пароля
UserSchema.methods.comparePassword = function (candidatePassword) {
     return bcrypt.compare(candidatePassword, this.password);
};

// Метод для генерации токена
UserSchema.methods.generateToken = function () {
     return jwt.sign({ id: this._id }, 'secret_key', { expiresIn: '1h' });
};

module.exports = mongoose.model('User', UserSchema);

const { app, BrowserWindow, ipcMain } = require('electron')
const mongoose = require('mongoose')
const path = require('path')

// Defina o esquema de usuário no MongoDB
const userSchema = new mongoose.Schema({
    username: String,
    password: String // Senha deve ser criptografada no mundo real
})

const User = mongoose.model('User', userSchema)

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/meuApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log
})
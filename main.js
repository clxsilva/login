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
    console.log('Conectado ao MongoDB')
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err)
})

// Função para criar a janela do Electron
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })
    win.loadFile('public/index.html')
}

// Quando o Electron terminar de inicializar, cria a janela
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Finalizando o app quando todas as jenelas forem fechadas
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Lidar com o envio de dados de login
ipcMain.handle('login', async (event, username, password) => {
    try {
        const user = await User.findOne({ username, password })
        if (user) {
            return { sucess: true }
        } else {
            return { sucess: false, message: 'Usuário ou senha incorretos' }
        }
    } catch (error) {
        return { sucess: false, message: 'Erro ao acessar o banco de dados' }
    }
})
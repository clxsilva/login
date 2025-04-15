const { ipcRenderer } = require('electron')

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Pegando os valores dos campos
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const result = await ipcRenderer.invoke('login', username, password)

    // Adicionando uma validação simples para o login (exemplo local)
    if (result.success) {
        alert("Login bem-sucedido!");
        // Aqui você pode redirecionar para outra página ou carregar outro conteúdo
    } else {
        document.getElementById("errorMessage").textContent = result.message;
        document.getElementById("errorMessage").style.display = "block";
    }
}) 
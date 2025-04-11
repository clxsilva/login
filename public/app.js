document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Pegando os valores dos campos
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Adicionando uma validação simples para o login (exemplo local)
    if (username === "" || password === "") {
        document.getElementById("errorMessage").textContent = "Por favor, preencha todos os campos."
        document.getElementById("errorMessage").style.display = "block"
    } else {
        // Simulação de um login bem-sucedido
        // Em um projeto real, a requisição para o servidor seria implementado aqui.
        document.getElementById("errorMessage").style.display = "none"
        alert("Login bem-sucedido!")
        // Redirecionar para a próxima página ou fazer alguma ação.
    }
}) 
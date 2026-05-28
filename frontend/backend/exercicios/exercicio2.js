/**
 * Função que simula uma busca de dados no servidor.
 * Retorna uma Promise que resolve após 2 segundos.
 */
function buscaDadosDoServidor() {
    return new Promise((resolve, reject) => {
        console.log("Buscando dados no servidor...");

        // Simula uma requisição assíncrona com atraso de 2000ms
        setTimeout(() => {
            // Gera um booleano aleatório para simular sucesso ou falha
            let sucesso = Math.random() > 0.5;

            if (sucesso) {
                // Se sucesso, resolvemos a Promise com uma mensagem
                resolve("Dados recebidos com sucesso");
            } else {
                // Se falha, rejeitamos a Promise com um erro
                reject("Falha ao buscar dados do servidor");
            }
        }, 2000);
    });
}

/**
 * Consumo da Promise:
 * .then() é executado se a promessa for resolvida (sucesso).
 * .catch() é executado se a promessa for rejeitada (erro).
 */
buscaDadosDoServidor()
    .then((mensagem) => {
        console.log(mensagem);
    })
    .catch((erro) => {
        console.error(erro);
    });
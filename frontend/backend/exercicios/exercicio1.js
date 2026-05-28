/**
 * Função que simula uma busca de dados periódica no servidor.
 * Usamos setInterval para disparar a busca a cada 2 segundos.
 */
function iniciarBuscaPeriodica() {
    console.log("Iniciando monitoramento do servidor...");

    const intervalo = setInterval(() => {
        console.log("--- Tentando buscar novos dados ---");

        // Simulação da lógica de sucesso/falha
        let sucesso = Math.random() > 0.5;

        if (sucesso) {
            console.log("Sucesso: Dados recebidos!");
        } else {
            console.error("Erro: Falha ao buscar dados.");
        }
    }, 2000); // Executa a cada 2 segundos

    return intervalo; // Retornamos o ID do intervalo para poder parar depois
}

// Inicia o processo
const meuIntervalo = iniciarBuscaPeriodica();

// Exemplo: Parar o intervalo após 10 segundos (para não rodar para sempre)
setTimeout(() => {
    clearInterval(meuIntervalo);
    console.log("Monitoramento encerrado.");
}, 10000);

console.log("Final da execução do script principal (o intervalo continua rodando)");
/**
 * Função que simula uma busca de dados no servidor.
 * Retorna uma Promise que resolve após 2 segundos.
 */
function buscaDadosDoServidor() {
  return new Promise((resolve, reject) => {
    console.log("Buscando dados no servidor...");

    setTimeout(() => {
      let sucesso = Math.random() > 0.5;

      if (sucesso) {
        resolve("Dados recebidos com sucesso");
      } else {
        reject("Falha ao buscar dados do servidor");
      }
    }, 2000);
  });
}

/**
 * Função assíncrona que executa a lógica principal.
 */
const executarPrograma = async () => {
  try {
    console.log("Inicio da execução");

    // O await pausa o fluxo AQUI dentro desta função
    const resultado = await buscaDadosDoServidor();
    console.log(resultado);
  } catch (erro) {
    console.error(erro);
  } finally {
    // O finally garante que isso rode independente de sucesso ou erro
    console.log("Final da execução");
  }
};

// Chamada única para iniciar todo o fluxo de forma organizada
executarPrograma();

// 1. Objeto JavaScript original
const produtos = [
  { id: 1, nome: "Camiseta", preco: 25.99 },
  { id: 2, nome: "Calça", preco: 39.99 },
  { id: 3, nome: "Tênis", preco: 299.9 },
];

// 2. SERIALIZAÇÃO: Objeto -> String JSON
// Usado para "empacotar" dados para transmissão
const produtosJson = JSON.stringify(produtos);
console.log("--- String JSON (Serializado) ---");
console.log(produtosJson);

// 3. DESSERIALIZAÇÃO: String JSON -> Objeto JS
// Usado para "desempacotar" dados recebidos
const produtosObj = JSON.parse(produtosJson);
console.log("\n--- Objeto JS (Desserializado) ---");
console.log(produtosObj);

// Exemplo de acesso após o parse:
console.log(`\nO preço do segundo produto é: ${produtosObj[1].preco}`);

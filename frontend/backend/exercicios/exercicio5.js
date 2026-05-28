// 1. Objeto JavaScript original (multi-dimensional)
const loja = [
  {
    categoria: "Roupas",
    produtos: [
      { id: 1, nome: "Camiseta", preco: 25.99 },
      { id: 2, nome: "Calça", preco: 39.99 }
    ]
  },
  {
    categoria: "Calçados",
    produtos: [
      { id: 3, nome: "Tênis", preco: 299.9 },
      { id: 4, nome: "Sandália", preco: 79.5 }
    ]
  }
];

// 2. SERIALIZAÇÃO: Objeto -> String JSON
const lojaJson = JSON.stringify(loja);
console.log("--- String JSON (Serializado) ---");
console.log(lojaJson);

// 3. DESSERIALIZAÇÃO: String JSON -> Objeto JS
const lojaObj = JSON.parse(lojaJson);
console.log("\n--- Objeto JS (Desserializado) ---");
console.log(lojaObj);

// Exemplo de acesso após o parse:
console.log(`\nO preço da primeira calça é: ${lojaObj[0].produtos[1].preco}`);
console.log(`O nome do segundo calçado é: ${lojaObj[1].produtos[1].nome}`);

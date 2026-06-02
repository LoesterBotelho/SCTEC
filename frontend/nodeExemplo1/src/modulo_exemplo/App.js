var pessoa = require("./commons/Pessoa");
var soma = require("./commons/Soma");
var calcularImposto = require("./commons/CalcularImposto")
var calc = require("./commons/Calculadora");

// Pessoa
loester = pessoa();
console.log(JSON.stringify(loester));

// soma
console.log(soma(2,2));

// CalcularImposto
console.log("Valor do produto com imposto : " + calcularImposto.adicionar(10));
console.log("Valor do imposto : " + calcularImposto.valor(10));
console.log("Taxa do imposto : " + calcularImposto.taxa); // vai ser undefined pois essa variavel é do módulo e não acessível

// Calculadora
console.log(calc.somar(10, 5));          // 15
console.log(calc.subtrair(10, 5));       // 5
console.log(calc.multiplicar(10, 5));    // 50
console.log(calc.dividir(10, 5));        // 2
console.log(calc.modulo(10, 3));         // 1
console.log(calc.parOuImpar(8));         // Par
console.log(calc.parOuImpar(7));         // Ímpar
console.log(calc.multiploDe3(9));        // true
console.log(calc.multiploDe3(10));       // false
console.log(calc.maiorQue(10, 5));       // true
console.log(calc.menorQue(10, 5));       // false
console.log(calc.maiorIgualQue(10, 10)); // true
console.log(calc.menorIgualQue(5, 10));  // true
console.log(calc.stringIgual("5", 5));   // true
console.log(calc.stringIdentica("5", 5));// false

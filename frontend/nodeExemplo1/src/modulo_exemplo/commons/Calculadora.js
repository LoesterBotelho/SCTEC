module.exports = {
  somar(a, b) {
    return a + b;
  },

  subtrair(a, b) {
    return a - b;
  },

  multiplicar(a, b) {
    return a * b;
  },

  dividir(a, b) {
    if (b === 0) {
      throw new Error("Não é possível dividir por zero.");
    }

    return a / b;
  },

  modulo(a, b) {
    return a % b;
  },

  parOuImpar(numero) {
    return numero % 2 === 0 ? "Par" : "Ímpar";
  },

  multiploDe3(numero) {
    return numero % 3 === 0;
  },

  maiorQue(a, b) {
    return a > b;
  },

  menorQue(a, b) {
    return a < b;
  },

  maiorIgualQue(a, b) {
    return a >= b;
  },

  menorIgualQue(a, b) {
    return a <= b;
  },

  stringIgual(a, b) {
    return a == b;
  },

  stringIdentica(a, b) {
    return a === b;
  },
};

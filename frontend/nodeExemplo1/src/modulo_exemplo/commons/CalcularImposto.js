var taxa = 0.1;

exports.valor = function (a) {
  return a * taxa;
};

exports.adicionar = function (a) {
  return a + a * taxa;
};

# 📘 Resumo de Estudos: JavaScript, DOM e Lógica

> Este documento reúne conceitos fundamentais de JavaScript, laços de repetição, manipulação do DOM e exemplos práticos para iniciantes.

---

# 📚 1. Laços de Repetição (Loops)

Os laços de repetição permitem executar blocos de código várias vezes até que uma condição seja satisfeita.

---

## 🔁 Tipos de Laços

| Laço         | Definição                                  | Exemplo                            |
| ------------ | ------------------------------------------ | ---------------------------------- |
| `while`      | Executa enquanto a condição for verdadeira | `while (count < 5) { count++; }`   |
| `do...while` | Executa pelo menos uma vez                 | `do { count++; } while(count < 5)` |
| `for`        | Repetição com contador                     | `for(let i=0; i<5; i++)`           |
| `for...in`   | Percorre propriedades de objetos           | `for(let prop in objeto)`          |
| `for...of`   | Percorre valores iteráveis                 | `for(let item of array)`           |

---

# 🔹 Exemplo: while

```javascript
let contador = 0;

while (contador < 5) {
  console.log(contador);

  contador++;
}
```

---

# 🔹 Exemplo: do...while

```javascript
let contador = 0;

do {
  console.log(contador);

  contador++;
} while (contador < 5);
```

---

# 🔹 Exemplo: for

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

---

# 🔹 Exemplo: for...in

```javascript
const pessoa = {
  nome: "Carlos",
  idade: 25,
};

for (let propriedade in pessoa) {
  console.log(propriedade);
}
```

---

# 🔹 Exemplo: for...of

```javascript
const frutas = ["Maçã", "Banana", "Laranja"];

for (let fruta of frutas) {
  console.log(fruta);
}
```

---

# 🌐 2. Manipulação do DOM

DOM significa:

```text
Document Object Model
```

O DOM permite que o JavaScript interaja com elementos HTML da página.

---

# 🔎 Seleção de Elementos

| Método                     | Descrição                    |
| -------------------------- | ---------------------------- |
| `getElementById()`         | Busca elemento pelo ID       |
| `getElementsByTagName()`   | Busca elementos pela tag     |
| `getElementsByClassName()` | Busca elementos pela classe  |
| `querySelector()`          | Busca o primeiro seletor CSS |
| `querySelectorAll()`       | Busca todos seletores CSS    |

---

# 🔹 Exemplos de Seleção

```javascript
document.getElementById("titulo");

document.querySelector(".card");

document.querySelectorAll("p");
```

---

# 🛠️ Criação e Modificação de Elementos

| Método               | Descrição               |
| -------------------- | ----------------------- |
| `createElement()`    | Cria elemento HTML      |
| `appendChild()`      | Adiciona elemento filho |
| `removeChild()`      | Remove elemento filho   |
| `setAttribute()`     | Define atributo         |
| `addEventListener()` | Escuta eventos          |

---

# 🔹 Criando Elementos

```javascript
const div = document.createElement("div");

div.innerHTML = "Olá Mundo";

document.body.appendChild(div);
```

---

# 🎯 Eventos e Interatividade

Eventos permitem responder ações do usuário.

Exemplos:

- clique
- teclado
- mouse
- scroll
- formulário

---

# 🔹 Evento de Clique

```javascript
document.getElementById("botao").addEventListener("click", function () {
  alert("Botão clicado!");
});
```

---

# 🔹 Evento de Teclado

```javascript
document
  .getElementById("inputBox")
  .addEventListener("keypress", function (event) {
    console.log(event.key);
  });
```

---

# 🎨 Alterando CSS com JavaScript

```javascript
document.body.style.backgroundColor = "red";
```

---

# 🍕 Exemplo Prático: Sistema de Pedidos

```javascript
function clientePedido(numeroPedido) {
  if (numeroPedido == 1) {
    return "Pizza Calabresa";
  } else if (numeroPedido == 2) {
    return "Pizza Quatro Queijos";
  } else if (numeroPedido == 3) {
    return "Pizza Frango com Catupiry";
  } else if (numeroPedido == 4) {
    return "Pizza Brigadeiro";
  } else {
    return "Pedido inválido";
  }
}
```

---

# 🧩 Manipulação Dinâmica do DOM

```javascript
const novaDiv = document.createElement("div");

novaDiv.setAttribute("class", "box");

novaDiv.innerHTML = "Nova DIV criada";

const container = document.getElementById("container");

container.appendChild(novaDiv);
```

---

# ⚡ Conceitos Importantes

| Conceito | Explicação               |
| -------- | ------------------------ |
| `DOM`    | Estrutura da página HTML |
| `Evento` | Ação do usuário          |
| `Loop`   | Repetição                |
| `Função` | Bloco reutilizável       |
| `Array`  | Lista de dados           |
| `Objeto` | Estrutura chave/valor    |

---

# 🧠 Dicas Importantes

✅ Use `let` para variáveis que mudam

✅ Use `const` para valores fixos

✅ Evite usar `var` em projetos modernos

✅ Prefira `querySelector()` em projetos novos

✅ Organize código em funções

---

# 📌 Exemplo Completo

```javascript
const botao = document.getElementById("botao");

botao.addEventListener("click", function () {
  const texto = document.createElement("p");

  texto.innerHTML = "Parágrafo criado!";

  document.body.appendChild(texto);
});
```

# 📘 Guia de Referência: Propriedades e Métodos do DOM

> Este documento explica como acessar, modificar e manipular elementos HTML usando JavaScript e DOM (Document Object Model).

---

# 🌐 O que é DOM?

DOM significa:

```text
Document Object Model
```

O DOM representa a estrutura da página HTML como uma árvore de elementos.

Com JavaScript podemos:

- acessar elementos
- alterar textos
- mudar estilos
- criar elementos
- remover elementos
- responder eventos

---

# 🛠️ 1. Propriedades de Elementos

As propriedades permitem acessar ou modificar informações diretamente dos elementos HTML.

---

## 📋 Tabela de Propriedades

| Propriedade   | Explicação                | Exemplo                        |
| ------------- | ------------------------- | ------------------------------ |
| `innerHTML`   | Lê ou altera HTML interno | `elemento.innerHTML`           |
| `textContent` | Lê ou altera apenas texto | `elemento.textContent`         |
| `style`       | Modifica CSS inline       | `elemento.style.color = 'red'` |
| `className`   | Lê ou altera classes CSS  | `elemento.className = 'box'`   |
| `id`          | Lê ou altera o ID         | `elemento.id`                  |
| `tagName`     | Retorna nome da tag       | `elemento.tagName`             |
| `parentNode`  | Retorna elemento pai      | `elemento.parentNode`          |
| `childNodes`  | Retorna nós filhos        | `elemento.childNodes`          |
| `value`       | Valor de inputs           | `input.value`                  |
| `checked`     | Checkbox marcado          | `checkbox.checked`             |
| `src`         | Caminho imagem/video      | `img.src`                      |
| `href`        | Link URL                  | `link.href`                    |

---

# 🔹 innerHTML

Permite inserir HTML dentro do elemento.

```javascript
const titulo = document.getElementById("titulo");

titulo.innerHTML = "<strong>Olá Mundo</strong>";
```

---

# 🔹 textContent

Insere apenas texto puro.

```javascript
const texto = document.getElementById("texto");

texto.textContent = "Texto simples";
```

---

# 🔹 style

Modifica CSS via JavaScript.

```javascript
const caixa = document.getElementById("caixa");

caixa.style.backgroundColor = "blue";

caixa.style.color = "white";
```

---

# 🔹 className

Altera classes CSS.

```javascript
const card = document.getElementById("card");

card.className = "card-ativo";
```

---

# 🔹 parentNode

Acessa elemento pai.

```javascript
const item = document.getElementById("item");

console.log(item.parentNode);
```

---

# 🔹 childNodes

Retorna filhos do elemento.

```javascript
const lista = document.getElementById("lista");

console.log(lista.childNodes);
```

---

# 🔍 2. Métodos de Seleção

Métodos usados para localizar elementos HTML.

---

## 📋 Tabela de Métodos

| Método                     | Explicação           | Exemplo                                   |
| -------------------------- | -------------------- | ----------------------------------------- |
| `getElementById()`         | Busca pelo ID        | `document.getElementById("box")`          |
| `getElementsByClassName()` | Busca pela classe    | `document.getElementsByClassName("card")` |
| `getElementsByTagName()`   | Busca pela tag       | `document.getElementsByTagName("p")`      |
| `querySelector()`          | Primeiro seletor CSS | `document.querySelector(".box")`          |
| `querySelectorAll()`       | Todos seletores CSS  | `document.querySelectorAll(".box")`       |

---

# 🔹 getElementById()

```javascript
const titulo = document.getElementById("titulo");
```

---

# 🔹 querySelector()

```javascript
const card = document.querySelector(".card");
```

---

# 🔹 querySelectorAll()

```javascript
const cards = document.querySelectorAll(".card");
```

---

# ⚙️ 3. Métodos de Atributos

Métodos usados para manipular atributos HTML.

---

## 📋 Tabela de Métodos

| Método              | Explicação        | Exemplo                                  |
| ------------------- | ----------------- | ---------------------------------------- |
| `getAttribute()`    | Lê atributo       | `elemento.getAttribute("type")`          |
| `setAttribute()`    | Define atributo   | `elemento.setAttribute("type","button")` |
| `removeAttribute()` | Remove atributo   | `elemento.removeAttribute("disabled")`   |
| `hasAttribute()`    | Verifica atributo | `elemento.hasAttribute("required")`      |

---

# 🔹 getAttribute()

```javascript
const tipo = input.getAttribute("type");
```

---

# 🔹 setAttribute()

```javascript
input.setAttribute("placeholder", "Digite seu nome");
```

---

# 🔹 removeAttribute()

```javascript
botao.removeAttribute("disabled");
```

---

# 🧩 4. Criação de Elementos

Podemos criar HTML dinamicamente.

---

## 📋 Métodos Importantes

| Método            | Explicação        |
| ----------------- | ----------------- |
| `createElement()` | Cria elemento     |
| `appendChild()`   | Adiciona elemento |
| `removeChild()`   | Remove elemento   |
| `replaceChild()`  | Troca elemento    |

---

# 🔹 createElement()

```javascript
const div = document.createElement("div");
```

---

# 🔹 appendChild()

```javascript
document.body.appendChild(div);
```

---

# 🔹 removeChild()

```javascript
pai.removeChild(filho);
```

---

# 🎯 5. Eventos

Eventos permitem interação do usuário.

---

## 📋 Eventos Comuns

| Evento      | Explicação         |
| ----------- | ------------------ |
| `click`     | Clique             |
| `mouseover` | Mouse sobre        |
| `mouseout`  | Mouse saiu         |
| `keydown`   | Tecla pressionada  |
| `keyup`     | Tecla solta        |
| `submit`    | Formulário enviado |
| `change`    | Alteração input    |

---

# 🔹 Evento Click

```javascript
botao.addEventListener("click", function () {
  alert("Clicou!");
});
```

---

# 🔹 Evento Keydown

```javascript
document.addEventListener("keydown", function (event) {
  console.log(event.key);
});
```

---

# 💡 Dicas Importantes

---

## 🔸 innerHTML vs textContent

### innerHTML

Permite HTML:

```javascript
div.innerHTML = "<strong>Texto</strong>";
```

Resultado:

```html
<strong>Texto</strong>
```

---

### textContent

Mostra apenas texto:

```javascript
div.textContent = "<strong>Texto</strong>";
```

Resultado visual:

```text
<strong>Texto</strong>
```

---

# 🔸 style vs className

| Método      | Melhor Uso       |
| ----------- | ---------------- |
| `style`     | Alteração rápida |
| `className` | CSS organizado   |

---

# 🔸 DOM Tree

HTML é organizado como árvore.

Exemplo:

```html
<body>
  <div>
    <p>Texto</p>
  </div>
</body>
```

Estrutura:

```text
BODY
 └── DIV
      └── P
```

---

# 📌 Exemplo Completo

```javascript
// Seleciona elemento
const caixa = document.getElementById("caixaPrincipal");

// Altera estilo
caixa.style.backgroundColor = "blue";

// Altera texto
caixa.textContent = "Texto atualizado";

// Verifica atributo
if (caixa.getAttribute("data-status") == "oculto") {
  caixa.setAttribute("data-status", "visivel");
}
```

---
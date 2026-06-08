# Guia Completo de APIs RESTful

## O que é REST?

REST (Representational State Transfer) é um padrão arquitetural utilizado para construir APIs web.

Uma API RESTful utiliza:

* HTTP
* URLs bem definidas
* Recursos identificados por endpoints
* Métodos HTTP padronizados
* Respostas padronizadas

---

# Estrutura de uma API RESTful

## Recurso

Exemplo:

```http
/api/usuarios
/api/produtos
/api/clientes
```

Cada URL representa um recurso.

---

# Métodos HTTP

## GET

Consultar informações.

```http
GET /usuarios
```

Buscar todos os usuários.

```http
GET /usuarios/1
```

Buscar usuário específico.

---

## POST

Criar recursos.

```http
POST /usuarios
```

Body:

```json
{
  "nome": "João",
  "email": "joao@email.com"
}
```

---

## PUT

Atualização completa.

```http
PUT /usuarios/1
```

Body:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

---

## PATCH

Atualização parcial.

```http
PATCH /usuarios/1
```

Body:

```json
{
  "nome": "João Silva"
}
```

---

## DELETE

Remover recurso.

```http
DELETE /usuarios/1
```

---

# Convenções de URL

## Correto

```http
GET /usuarios
GET /usuarios/1

POST /usuarios

PUT /usuarios/1

DELETE /usuarios/1
```

## Evite

```http
GET /buscarUsuario

POST /criarUsuario

DELETE /removerUsuario
```

O verbo deve ficar no método HTTP.

---

# Versionamento

Sempre utilize versão.

```http
/api/v1/usuarios
/api/v2/usuarios
```

Exemplo:

```http
https://api.exemplo.com/v1/usuarios
```

---

# Estrutura de Resposta

## Sucesso

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João"
  }
}
```

---

## Erro

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "Usuário não encontrado"
  }
}
```

---

# Códigos HTTP

## 2xx - Sucesso

### 200 OK

Requisição executada com sucesso.

```http
GET /usuarios/1
```

Resposta:

```http
200 OK
```

---

### 201 Created

Recurso criado.

```http
POST /usuarios
```

Resposta:

```http
201 Created
```

---

### 204 No Content

Sem conteúdo.

```http
DELETE /usuarios/1
```

Resposta:

```http
204 No Content
```

---

# 4xx - Erro do Cliente

## 400 Bad Request

Dados inválidos.

```http
400 Bad Request
```

```json
{
  "message": "Campo nome obrigatório"
}
```

---

## 401 Unauthorized

Usuário não autenticado.

```http
401 Unauthorized
```

---

## 403 Forbidden

Usuário autenticado sem permissão.

```http
403 Forbidden
```

---

## 404 Not Found

Recurso não encontrado.

```http
404 Not Found
```

---

## 405 Method Not Allowed

Método não permitido.

```http
405 Method Not Allowed
```

---

## 409 Conflict

Conflito de dados.

```http
409 Conflict
```

Exemplo:

Email já cadastrado.

---

## 422 Unprocessable Entity

Validação falhou.

```http
422 Unprocessable Entity
```

Exemplo:

CPF inválido.

---

## 429 Too Many Requests

Limite de requisições excedido.

```http
429 Too Many Requests
```

---

# 5xx - Erro do Servidor

## 500 Internal Server Error

Erro interno.

```http
500 Internal Server Error
```

---

## 502 Bad Gateway

Erro em serviço intermediário.

```http
502 Bad Gateway
```

---

## 503 Service Unavailable

Serviço indisponível.

```http
503 Service Unavailable
```

---

# Paginação

## Request

```http
GET /usuarios?page=1&limit=10
```

## Response

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 500,
    "pages": 50
  }
}
```

---

# Ordenação

```http
GET /usuarios?sort=nome
```

```http
GET /usuarios?sort=-nome
```

Sinal:

* nome → crescente
* -nome → decrescente

---

# Filtros

```http
GET /usuarios?nome=joao
```

```http
GET /usuarios?ativo=true
```

```http
GET /usuarios?idade=18
```

---

# Busca

```http
GET /usuarios?search=joao
```

---

# Autenticação JWT

## Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "jwt_token"
}
```

---

## Header

```http
Authorization: Bearer jwt_token
```

---

# Estrutura de Projeto

```text
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── middlewares/
├── routes/
├── validators/
├── config/
├── utils/
└── app.js
```

---

# Camadas da Aplicação

## Controller

Recebe requisição.

```js
async function create(req, res) {}
```

---

## Service

Regras de negócio.

```js
async function createUser(data) {}
```

---

## Repository

Acesso ao banco.

```js
async function findById(id) {}
```

---

# Exemplo Completo

## Criar Usuário

### Request

```http
POST /usuarios
```

```json
{
  "nome": "João",
  "email": "joao@email.com"
}
```

### Response

```http
201 Created
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João",
    "email": "joao@email.com"
  }
}
```

---

# Boas Práticas

* Utilizar HTTPS
* Utilizar versionamento
* Validar entrada de dados
* Utilizar JWT
* Padronizar respostas
* Utilizar códigos HTTP corretos
* Documentar endpoints
* Implementar logs
* Implementar rate limiting
* Utilizar paginação
* Utilizar cache quando necessário
* Separar Controller, Service e Repository
* Retornar mensagens claras de erro
* Utilizar OpenAPI (Swagger)

---

# Checklist RESTful

* [ ] HTTPS
* [ ] Versionamento
* [ ] JWT
* [ ] Validação
* [ ] Paginação
* [ ] Filtros
* [ ] Ordenação
* [ ] Logs
* [ ] Rate Limit
* [ ] Swagger
* [ ] Tratamento de Erros
* [ ] Códigos HTTP corretos
* [ ] Estrutura em camadas
* [ ] Testes automatizados
* [ ] Monitoramento

# HTTP Status Codes - Referência Completa

## 1xx - Informacional

| Código | Nome                | Descrição                           |
| ------ | ------------------- | ----------------------------------- |
| 100    | Continue            | Cliente pode continuar a requisição |
| 101    | Switching Protocols | Mudança de protocolo                |
| 102    | Processing          | Processando requisição              |
| 103    | Early Hints         | Sugestões antecipadas               |

---

# 2xx - Sucesso

| Código | Nome                          | Descrição                            |
| ------ | ----------------------------- | ------------------------------------ |
| 200    | OK                            | Requisição executada com sucesso     |
| 201    | Created                       | Recurso criado                       |
| 202    | Accepted                      | Requisição aceita para processamento |
| 203    | Non-Authoritative Information | Informação de origem alternativa     |
| 204    | No Content                    | Sem conteúdo para retornar           |
| 205    | Reset Content                 | Reiniciar conteúdo                   |
| 206    | Partial Content               | Conteúdo parcial                     |

---

# 3xx - Redirecionamento

| Código | Nome               | Descrição                   |
| ------ | ------------------ | --------------------------- |
| 300    | Multiple Choices   | Múltiplas opções            |
| 301    | Moved Permanently  | Movido permanentemente      |
| 302    | Found              | Redirecionamento temporário |
| 303    | See Other          | Ver outro recurso           |
| 304    | Not Modified       | Conteúdo não modificado     |
| 307    | Temporary Redirect | Redirecionamento temporário |
| 308    | Permanent Redirect | Redirecionamento permanente |

---

# 4xx - Erros do Cliente

## Mais Utilizados

| Código | Nome                            | Quando usar                           |
| ------ | ------------------------------- | ------------------------------------- |
| 400    | Bad Request                     | Dados inválidos                       |
| 401    | Unauthorized                    | Não autenticado                       |
| 402    | Payment Required                | Pagamento necessário                  |
| 403    | Forbidden                       | Sem permissão                         |
| 404    | Not Found                       | Recurso não encontrado                |
| 405    | Method Not Allowed              | Método HTTP não permitido             |
| 406    | Not Acceptable                  | Formato não aceito                    |
| 407    | Proxy Authentication Required   | Autenticação proxy                    |
| 408    | Request Timeout                 | Tempo excedido                        |
| 409    | Conflict                        | Conflito de dados                     |
| 410    | Gone                            | Recurso removido permanentemente      |
| 411    | Length Required                 | Content-Length obrigatório            |
| 412    | Precondition Failed             | Pré-condição falhou                   |
| 413    | Payload Too Large               | Arquivo muito grande                  |
| 414    | URI Too Long                    | URL muito grande                      |
| 415    | Unsupported Media Type          | Tipo de conteúdo inválido             |
| 416    | Range Not Satisfiable           | Intervalo inválido                    |
| 417    | Expectation Failed              | Expectativa falhou                    |
| 418    | I'm a Teapot                    | Código de brincadeira RFC             |
| 421    | Misdirected Request             | Requisição direcionada incorretamente |
| 422    | Unprocessable Entity            | Erro de validação                     |
| 423    | Locked                          | Recurso bloqueado                     |
| 424    | Failed Dependency               | Dependência falhou                    |
| 425    | Too Early                       | Requisição antecipada                 |
| 426    | Upgrade Required                | Upgrade necessário                    |
| 428    | Precondition Required           | Pré-condição obrigatória              |
| 429    | Too Many Requests               | Rate limit excedido                   |
| 431    | Request Header Fields Too Large | Cabeçalhos muito grandes              |
| 451    | Unavailable For Legal Reasons   | Bloqueado por motivos legais          |

---

# 5xx - Erros do Servidor

## Mais Utilizados

| Código | Nome                            | Quando usar                     |
| ------ | ------------------------------- | ------------------------------- |
| 500    | Internal Server Error           | Erro interno                    |
| 501    | Not Implemented                 | Funcionalidade não implementada |
| 502    | Bad Gateway                     | Gateway inválido                |
| 503    | Service Unavailable             | Serviço indisponível            |
| 504    | Gateway Timeout                 | Tempo limite do gateway         |
| 505    | HTTP Version Not Supported      | Versão HTTP não suportada       |
| 506    | Variant Also Negotiates         | Erro de negociação              |
| 507    | Insufficient Storage            | Armazenamento insuficiente      |
| 508    | Loop Detected                   | Loop detectado                  |
| 510    | Not Extended                    | Extensão necessária             |
| 511    | Network Authentication Required | Autenticação de rede necessária |

---

# Status Mais Utilizados em APIs REST

## Sucesso

```http
200 OK
201 Created
204 No Content
```

## Cliente

```http
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
```

## Servidor

```http
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
```

---

# Mapa Mental Rápido

## 200

```text
Funcionou
```

## 201

```text
Criado
```

## 400

```text
Cliente enviou dados inválidos
```

## 401

```text
Login obrigatório
```

## 403

```text
Sem permissão
```

## 404

```text
Não encontrado
```

## 409

```text
Conflito de dados
```

Exemplo:

```text
Email já cadastrado
```

## 422

```text
Validação falhou
```

Exemplo:

```text
CPF inválido
Email inválido
Senha muito curta
```

## 429

```text
Muitas requisições
```

## 500

```text
Erro interno do servidor
```

## 503

```text
Servidor temporariamente indisponível
```

---

# Padrão Recomendado para APIs REST

| Cenário                 | Status |
| ----------------------- | ------ |
| Consulta realizada      | 200    |
| Cadastro realizado      | 201    |
| Exclusão realizada      | 204    |
| Dados inválidos         | 400    |
| Não autenticado         | 401    |
| Sem permissão           | 403    |
| Registro não encontrado | 404    |
| Registro duplicado      | 409    |
| Validação falhou        | 422    |
| Muitas requisições      | 429    |
| Erro interno            | 500    |
| Serviço indisponível    | 503    |

---

# 90% das APIs REST modernas usam principalmente estes códigos:
```
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests

500 Internal Server Error
503 Service UnavailableV
```
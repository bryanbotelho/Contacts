# 📄 API Documentation - Contacts API

Esta documentação descreve todos os endpoints disponíveis na API de contatos, incluindo autenticação, parâmetros e exemplos de requisição/resposta.

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)** para proteger rotas.

### Como usar

Envie o token no header:

```http
Authorization: Bearer {seu_token}
```

---

# 📌 Base URL

```http
http://localhost:3000
```

---

# 👤 Rotas de Autenticação (`/auth`)

---

## 📝 Registrar usuário

```http
POST /auth/register
```

### Body

```json
{
    "name": "test",
    "email": "test@email.com",
    "password": "test1234"
}
```

### Resposta

```json
{
	"message": "Usuário criado com sucesso.",
	"success": true
}
```

---

## 🔑 Login

```http
POST /auth/login
```

### Body

```json
{
  "email": "test@email.com",
  "password": "test1234"
}
```

### Resposta

```json
{
	"success": true,
	"token": "TOKEN-AQUI"
}
```

---

## 👥 Listar usuários

```http
GET /auth/getUsers
```

### Resposta

```json
{
	"result": [
		{
			"id": uuid,
			"email": "teste@email.com",
			"name": "admin"
		}
	],
	"success": true
}
```

---

## 🔍 Buscar usuário por email

```http
GET /auth/getUserByEmail?email=teste@email.com
```

### Resposta

```json
{
	"result": {
		"id": uuid,
		"email": "teste@email.com",
		"name": "admin"
	},
	"success": true
}
```

---

# 📇 Rotas de Contatos (`/contacts`)

---

## ➕ Criar contato

```http
POST /contacts
```

### Headers

```http
Authorization: Bearer {token}
```

### Body

```json
{
    "firstName": "Mester",
	"lastName": "Mago",
	"ddi": "+58",
	"number": 789543659
}
```

### Resposta

```json
{
	"message": "Contato criado com sucesso.",
	"success": true
}
```

---

## ✏️ Atualizar contato

```http
PUT /contacts/:id
```

### Body

```json
{
    "firstName": "Jessie",
	"lastName": "Crean",
	"ddi": "+1",
	"number": 7489389
}
```

### Resposta

```json
{
	"message": "Contato atualizado com sucesso.",
	"success": true
}
```

---

## 📋 Listar contatos

```http
GET /contacts
```

### Resposta

```json
{
	"success": true,
	"contacts": [
		{
			"id": uuid,
			"firstName": "Jessie",
			"lastName": "Crean",
			"number": 7489389,
			"active": true,
			"countryId": 1,
			"createdAt": "26/04/2026, 15:46:37",
			"updatedAt": "26/04/2026, 16:44:02"
		},
		{
			"id": uuid,
			"firstName": "Mester",
			"lastName": "Mago",
			"number": 789543659,
			"active": false,
			"countryId": 8,
			"createdAt": "26/04/2026, 16:42:51",
			"updatedAt": "26/04/2026, 16:42:51"
		}
	],
	"pagination": {
		"total": 2,
		"page": 1,
		"limit": 10,
		"totalPages": 1
	}
}
```

---

## ❌ Remover contato

```http
DELETE /contacts/:id
```

### Resposta

```json
{
	"message": "Contato removido com sucesso",
	"success": true
}
```

---

# 🌎 Identificação de País

A API identifica automaticamente o país com base no DDI do telefone.

### Exemplos

| DDI | País        |
| --- | ----------- |
| +55 | Brasil      |
| +1  | EUA         |
| +44 | Reino Unido |

### Regra utilizada

* Ordenação por maior prefixo
* Comparação com início do número
* Evita conflitos entre DDIs semelhantes

---

# ⚠️ Tratamento de Erros

A API retorna erros padronizados:

```json
{
  "status": 400,
  "success": false,
  "message": "Descrição do erro"
}
```

---

# 📌 Status Codes

| Código | Descrição         |
| ------ | ----------------- |
| 200    | Sucesso           |
| 201    | Criado            |
| 400    | Erro de validação |
| 401    | Não autorizado    |
| 404    | Não encontrado    |
| 500    | Erro interno      |

---

# 🧪 Validações

Utilizando **Joi**:

* Email válido
* Senha obrigatória
* Nome obrigatório
* Telefone com pelo menos 5 digitos

---

# 📌 Observações

* Rotas protegidas exigem JWT
* O país é identificado automaticamente ao criar/atualizar contatos
* A base de países deve estar populada corretamente (seed)
* 

---

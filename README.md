# 📌 Contacts API
API REST para gerenciamento de contatos que identifica automaticamente o país com base no DDI do número de telefone.

A aplicação permite criar, listar, buscar e remover contatos, validando os dados e detectando o país de forma automática.

---

## 🚀 Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* Joi (validação)
* TSX (execução em dev)

---

## 📦 Dependências necessárias

Antes de rodar o projeto, você precisa ter instalado:

* Node.js (>= 18)
* npm
* PostgreSQL

---

## 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/bryanbotelho/Contacts.git
cd Contacts
```

Instale as dependências:

```bash
npm install
```

---

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
PORT=3000
```

---

## 🧱 Banco de dados (Prisma)

Gerar o client:

```bash
npx prisma generate
```

Rodar migrations:

```bash
npx prisma migrate dev
```

Rodar seed:

```bash
npx prisma db seed
```

---

## ▶️ Rodando o projeto

Modo desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado em:

```
http://localhost:3000
```

---

## 📡 Como usar a aplicação

A API permite:

* Criar contatos com nome e telefone
* Validar dados com Joi
* Identificar automaticamente o país pelo DDI
* Listar contatos
* Buscar contatos por ID
* Remover contatos

---


## ❗ Observações

* A identificação do país é feita com base no maior prefixo (DDI)
* Números inválidos são rejeitados via validação (Joi)

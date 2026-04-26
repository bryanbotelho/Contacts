# 📌 Contacts API

API REST para gerenciamento de contatos com identificação automática de país com base no DDI do número de telefone.

A aplicação permite criar, listar, buscar e remover contatos, com validação robusta e detecção inteligente do país.

---

## 🚀 Funcionalidades

* ✅ Cadastro de usuários com autenticação
* 🔐 Login com JWT
* 📇 CRUD completo de contatos
* 🌎 Identificação automática de país via DDI
* ✔️ Validação de dados com Joi
* 🔒 Senhas criptografadas com Bcrypt
* 🐳 Suporte a Docker

---

## 🛠️ Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* JWT (JSON Web Token)
* Bcrypt
* Prisma ORM
* PostgreSQL
* Joi
* Docker & Docker Compose
* TSX

---

## 📦 Pré-requisitos

Antes de rodar o projeto, instale:

* Node.js (>= 18)
* npm
* PostgreSQL
* Docker (opcional)

---

## 📥 Instalação

```bash
git clone https://github.com/bryanbotelho/Contacts.git
cd Contacts
npm install
```

---

### 📥 Coleção de Rotas (Postman / Insomnia)

Para facilitar os testes, deixei um arquivo de coleção pronto no google drive.
* **Arquivo:** `https://drive.google.com/drive/folders/1c2EWEvGXVBMOfe2CGiL9GY_6QwpyaPoS?usp=drive_link`
* **Como usar:** Importe este arquivo no seu **Postman** ou **Insomnia**. Ele já contém todos os exemplos de corpo (body) e a configuração de autenticação necessária.

## ⚙️ Configuração

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
PORT=3000
JWT_SECRET=your_secret_key
```

---

## 🧱 Banco de Dados (Sem Docker)

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

---

## 🐳 Rodando com Docker

```bash
docker-compose up --build
```

---

## ▶️ Rodando o projeto

Modo desenvolvimento:

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3000
```

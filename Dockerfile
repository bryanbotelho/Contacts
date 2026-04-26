FROM node:20-alpine

# Define diretório da aplicação

WORKDIR /app

# Instalar OPENSSL
RUN apk add --no-cache openssl

# Copia dependências primeiro (melhor cache)

COPY package*.json ./

# Instala dependências

RUN npm install

# Copia restante do projeto

COPY . .

# Gera Prisma Client

RUN npx prisma generate

# Expõe a porta da API

EXPOSE 3000

# Comando para rodar em desenvolvimento

CMD ["npm", "run", "dev"]

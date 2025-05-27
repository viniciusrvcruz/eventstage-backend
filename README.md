
<p align="center">
  <img src="https://raw.githubusercontent.com/viniciusrvcruz/eventstage-frontend/main/src/assets/logo.svg" alt="Logo Eventstage" />
</p>

<p align="center">
  Backend da plataforma de eventos <strong>Eventstage</strong>, desenvolvida com <strong>Fastify</strong> e <strong>PostgreSQL</strong>, utilizando Redis, Drizzle ORM e autenticação com JWT.
</p>

---

## Sobre o Projeto

Este repositório contém o **backend** da aplicação **Eventstage**, uma plataforma de eventos iniciada durante a NLW Journey da [Rocketseat](https://www.rocketseat.com.br/) e posteriormente expandida com funcionalidades avançadas como:

- Gerenciamento completo de eventos
- Sistema de autenticação com JWT
- Inscrições em eventos com ranking e convites
- Integração com Redis para contagem e ranking de cliques para cada evento

> ⚠️ Este backend serve como base para o frontend do projeto, que pode ser encontrado [neste repositório](https://github.com/viniciusrvcruz/eventstage-frontend).

---

## 🚀 Instalação

Siga os passos abaixo para clonar o repositório, instalar as dependências e iniciar o servidor localmente:

```bash
# Clone o repositório
git clone https://github.com/viniciusrvcruz/eventstage-backend.git

# Acesse a pasta do projeto
cd eventstage-backend

# Instale as dependências
npm install
```

> 💡 Este projeto requer **Node.js v20**.

---

### ⚙️ Configuração das Variáveis de Ambiente

1. Copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```

2. Atualize os valores conforme necessário:

```env
NODE_ENV="development"
PORT=3333

# URLs
WEB_URL="http://localhost:3000"

# Database
POSTGRES_URL="postgres://docker:docker@localhost:5432/eventstage"
REDIS_URL="redis://localhost:6379"

# JWT Secret
SECRET_KEY="sua-chave-secreta"
```

---

### 🐳 Usando Docker

Se preferir utilizar PostgreSQL e Redis via Docker, você pode usar o `docker-compose.yml` já incluído no projeto:

```bash
docker-compose up -d
```

Isso iniciará:

- PostgreSQL em `localhost:5432`  
- Redis em `localhost:6379`

---

### ▶️ Rodando o Servidor

Após instalar as dependências e configurar o `.env`, inicie o servidor localmente:

```bash
npm run dev
```

---

## 🗂️ Estrutura do Projeto

```txt
src
├── controllers/           # Controladores das rotas
├── drizzle/               # ORM (Drizzle) com schema e migrações SQL
│   ├── client.ts
│   ├── migrations/
│   └── schema/
├── env.ts                 # Tipagem e carregamento de variáveis de ambiente
├── exceptions/            # Exceções personalizadas
├── hooks/                 # Hooks reutilizáveis (ex: validações)
├── redis/                 # Cliente Redis
├── routes/                # Definição das rotas públicas e privadas
├── schemas/               # Schemas de validação com Zod
├── server.ts              # Inicialização do servidor Fastify
├── services/              # Camada de lógica de negócio
├── types/                 # Tipagens auxiliares
└── utils/                 # Funções utilitárias
```

---

## 📦 Tecnologias e Dependências

- **Node.js 20** – Runtime principal
- **Fastify** – Framework web leve e performático
- **Drizzle ORM** – ORM SQL type-safe com suporte a migrations
- **Zod** – Validação de dados e schemas
- **Redis** – Armazenamento em cache e contagem de cliques
- **PostgreSQL** – Banco de dados relacional
- **JWT** – Autenticação segura
- **Biome** – Linter e formatter rápido

---

## 📌 Rotas da API

Abaixo estão listadas as rotas disponíveis nesta API, organizadas por categoria. Todas as rotas começam com o prefixo `/api`.

---

### 🔐 Autenticação

#### `POST /api/register`
Registra um novo usuário.

- **Body JSON:**
```json
{
  "name": "Nome do usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```
- **Resposta 201:**
```json
{
  "userId": "uuid"
}
```

#### `POST /api/login`
Autentica um usuário e retorna um token JWT.

- **Body JSON:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```
- **Resposta 200:**
```json
{
  "token": "jwt-token"
}
```

#### `GET /api/get-auth-user`
Retorna os dados do usuário autenticado.

- **Resposta 200:**
```json
{
  "user": {
    "id": "uuid",
    "name": "Nome do usuário",
    "email": "usuario@exemplo.com"
  }
}
```

---

### 📅 Eventos

#### `GET /api/events`
Lista eventos com paginação, busca e filtros.

- **Query Params (opcionais):**
  - `page`: número da página
  - `pageSize`: itens por página (máx. 100)
  - `search`: busca por título
  - `myEvents`: booleano para eventos criados pelo usuário
  - `mySubscriptions`: booleano para eventos inscritos

- **Resposta 200:**
```json
{
  "events": [ ... ],
  "total": 42
}
```

#### `POST /api/events`
Cria um novo evento.

- **Body JSON:**
```json
{
  "title": "Título",
  "subtitle": "Subtítulo",
  "description": "Descrição do evento",
  "date": "2025-06-01T19:00:00.000Z",
  "url": "https://evento.com",
  "is_live": true
}
```
- **Resposta 201:** Retorna os dados do evento criado.

#### `GET /api/events/{eventId}`
Busca os dados de um evento específico.

#### `PUT /api/events/{eventId}`
Atualiza um evento existente.

#### `DELETE /api/events/{eventId}`
Remove um evento.

---

### 🧾 Inscrições

#### `POST /api/events/{eventId}/subscriptions`
Inscreve um usuário no evento.

- **Body JSON:**
```json
{
  "name": "Nome",
  "email": "email@exemplo.com",
  "referrer": "uuid (opcional)"
}
```
- **Resposta 201:**
```json
{
  "subscriptionId": "uuid"
}
```

#### `GET /api/events/{eventId}/subscription`
Retorna os dados da inscrição do usuário no evento.

#### `GET /api/events/{eventId}/subscriptions/{subscriptionId}/invite`
Redireciona para o link de convite do inscrito.

---

### 🏆 Ranking e Métricas

#### `GET /api/events/{eventId}/subscriptions/ranking`
Retorna o ranking completo de inscrições com pontuação.

#### `GET /api/events/{eventId}/subscriptions/ranking/position`
Retorna a posição do inscrito no ranking.

#### `GET /api/events/{eventId}/subscriptions/ranking/count`
Retorna o número de convites aceitos pelo inscrito.

#### `GET /api/events/{eventId}/subscriptions/ranking/clicks`
Retorna o número de cliques no link de convite.

---

## 📝 License

Licensed under the MIT License.
